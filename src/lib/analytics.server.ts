// Eigenes, leichtgewichtiges Analytics — kein Drittanbieter (GA4 etc.), da
// die Daten direkt im eigenen Admin-Panel angezeigt werden sollen. Schreibt
// in dieselbe Neon-Datenbank wie der Rest der Seite.
import { Pool } from "pg";

function createPool() {
  const connectionString = process.env["DATABASE_URL"];
  if (!connectionString) {
    throw new Error("Missing DATABASE_URL environment variable for the CRM database.");
  }
  return new Pool({ connectionString, max: 3 });
}

let _pool: Pool | undefined;
function getPool(): Pool {
  if (!_pool) _pool = createPool();
  return _pool;
}

// "Online jetzt" = eine Session, deren letzter Herzschlag innerhalb dieses
// Fensters lag. Der Client sendet alle 20s einen Herzschlag (siehe
// analytics.functions.ts), 60s Toleranz deckt einen verpassten Tick ab.
const ONLINE_WINDOW_SECONDS = 60;

// Sehr einfacher In-Memory-Cache für IP → Land, damit nicht bei jedem
// Pageview/Herzschlag derselben Session erneut die Geo-API angefragt wird
// (kostenloses Kontingent bei ip-api.com: 45 Anfragen/Minute).
const countryCache = new Map<string, { country: string | null; expiresAt: number }>();
const COUNTRY_CACHE_TTL_MS = 30 * 60 * 1000;

async function lookupCountry(ip: string | undefined): Promise<string | null> {
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return null;
  }
  const cached = countryCache.get(ip);
  if (cached && cached.expiresAt > Date.now()) return cached.country;

  try {
    const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country`, {
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { status: string; country?: string };
    const country = json.status === "success" ? (json.country ?? null) : null;
    countryCache.set(ip, { country, expiresAt: Date.now() + COUNTRY_CACHE_TTL_MS });
    return country;
  } catch {
    return null;
  }
}

export async function ensureSession(input: {
  sessionId: string;
  ip: string | undefined;
  entryPage: string;
  referrer: string | null;
  userAgent: string | null;
}): Promise<void> {
  const country = await lookupCountry(input.ip);
  await getPool().query(
    `INSERT INTO public.cw_analytics_sessions (id, country, entry_page, referrer, user_agent)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (id) DO NOTHING`,
    [input.sessionId, country, input.entryPage, input.referrer, input.userAgent],
  );
}

export async function touchSession(sessionId: string): Promise<void> {
  await getPool().query(`UPDATE public.cw_analytics_sessions SET last_seen = now() WHERE id = $1`, [sessionId]);
}

export async function recordPageview(sessionId: string, pagePath: string): Promise<void> {
  await getPool().query(
    `INSERT INTO public.cw_analytics_pageviews (session_id, page_path) VALUES ($1, $2)`,
    [sessionId, pagePath],
  );
  await touchSession(sessionId);
}

export async function recordClick(sessionId: string, pagePath: string, label: string): Promise<void> {
  await getPool().query(
    `INSERT INTO public.cw_analytics_clicks (session_id, page_path, label) VALUES ($1, $2, $3)`,
    [sessionId, pagePath, label],
  );
  await touchSession(sessionId);
}

export interface OnlineVisitor {
  country: string | null;
  page: string | null;
  lastSeen: string;
}

export async function fetchOnlineNow(): Promise<OnlineVisitor[]> {
  const { rows } = await getPool().query<{ country: string | null; last_seen: string; page: string | null }>(
    `SELECT s.country, s.last_seen,
            (SELECT p.page_path FROM public.cw_analytics_pageviews p
             WHERE p.session_id = s.id ORDER BY p.created_at DESC LIMIT 1) AS page
     FROM public.cw_analytics_sessions s
     WHERE s.last_seen > now() - interval '${ONLINE_WINDOW_SECONDS} seconds'
     ORDER BY s.last_seen DESC`,
  );
  return rows.map((r) => ({ country: r.country, page: r.page, lastSeen: r.last_seen }));
}

export interface AnalyticsSummary {
  rangeDays: number;
  totalSessions: number;
  totalPageviews: number;
  bounceRate: number;
  topPages: { path: string; views: number }[];
  topClicks: { label: string; count: number; page: string }[];
  countries: { country: string; sessions: number }[];
  dailyVisits: { date: string; sessions: number; pageviews: number }[];
}

export async function fetchAnalyticsSummary(rangeDays: number): Promise<AnalyticsSummary> {
  const pool = getPool();
  const since = `now() - interval '${rangeDays} days'`;

  const [sessionsRes, pageviewsRes, topPagesRes, topClicksRes, countriesRes, dailyRes, bounceRes] = await Promise.all(
    [
      pool.query<{ count: string }>(
        `SELECT count(*)::text FROM public.cw_analytics_sessions WHERE first_seen > ${since}`,
      ),
      pool.query<{ count: string }>(
        `SELECT count(*)::text FROM public.cw_analytics_pageviews WHERE created_at > ${since}`,
      ),
      pool.query<{ page_path: string; count: string }>(
        `SELECT page_path, count(*)::text FROM public.cw_analytics_pageviews
         WHERE created_at > ${since} GROUP BY page_path ORDER BY count(*) DESC LIMIT 10`,
      ),
      pool.query<{ label: string; page_path: string; count: string }>(
        `SELECT label, page_path, count(*)::text FROM public.cw_analytics_clicks
         WHERE created_at > ${since} GROUP BY label, page_path ORDER BY count(*) DESC LIMIT 10`,
      ),
      pool.query<{ country: string; count: string }>(
        `SELECT country, count(*)::text FROM public.cw_analytics_sessions
         WHERE first_seen > ${since} AND country IS NOT NULL GROUP BY country ORDER BY count(*) DESC LIMIT 10`,
      ),
      pool.query<{ date: string; sessions: string; pageviews: string }>(
        `SELECT to_char(d.day, 'YYYY-MM-DD') AS date,
                (SELECT count(*) FROM public.cw_analytics_sessions s WHERE date_trunc('day', s.first_seen) = d.day)::text AS sessions,
                (SELECT count(*) FROM public.cw_analytics_pageviews p WHERE date_trunc('day', p.created_at) = d.day)::text AS pageviews
         FROM generate_series(date_trunc('day', ${since}), date_trunc('day', now()), interval '1 day') AS d(day)
         ORDER BY d.day ASC`,
      ),
      // Bounce = Session mit genau 1 Pageview in diesem Zeitraum.
      pool.query<{ total: string; bounced: string }>(
        `WITH counts AS (
           SELECT session_id, count(*) AS n FROM public.cw_analytics_pageviews
           WHERE created_at > ${since} GROUP BY session_id
         )
         SELECT count(*)::text AS total, count(*) FILTER (WHERE n = 1)::text AS bounced FROM counts`,
      ),
    ],
  );

  const total = Number(bounceRes.rows[0]?.total ?? 0);
  const bounced = Number(bounceRes.rows[0]?.bounced ?? 0);

  return {
    rangeDays,
    totalSessions: Number(sessionsRes.rows[0]?.count ?? 0),
    totalPageviews: Number(pageviewsRes.rows[0]?.count ?? 0),
    bounceRate: total > 0 ? Math.round((bounced / total) * 1000) / 10 : 0,
    topPages: topPagesRes.rows.map((r) => ({ path: r.page_path, views: Number(r.count) })),
    topClicks: topClicksRes.rows.map((r) => ({ label: r.label, count: Number(r.count), page: r.page_path })),
    countries: countriesRes.rows.map((r) => ({ country: r.country, sessions: Number(r.count) })),
    dailyVisits: dailyRes.rows.map((r) => ({
      date: r.date,
      sessions: Number(r.sessions),
      pageviews: Number(r.pageviews),
    })),
  };
}
