// Server-side read access to the real CRM's Neon Postgres database.
// This is the database german-auto-platform (the actual admin panel) writes
// to — car-world-revival only reads from it (public, unauthenticated pages),
// never writes. Kept in a `.server.ts` module + wrapped in createServerFn so
// the connection string and the `pg` client never reach the browser bundle.
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

export interface PublicOfferRow {
  id: string;
  title: string;
  description: string;
  price_label: string | null;
  badge: string | null;
  cta_label: string;
  sort_order: number;
  is_active: boolean;
}

export interface JobOpeningRow {
  id: string;
  title: string;
  subtitle: string;
  employment_type: string;
  description: string;
  requirements: string;
  sort_order: number;
  is_active: boolean;
}

export async function fetchPublicOffers(): Promise<PublicOfferRow[]> {
  const { rows } = await getPool().query<PublicOfferRow>(
    `SELECT id, title, description, price_label, badge, cta_label, sort_order, is_active
     FROM public.offers
     WHERE is_active = true
     ORDER BY sort_order ASC, title ASC`,
  );
  return rows;
}

export async function fetchJobOpenings(): Promise<JobOpeningRow[]> {
  const { rows } = await getPool().query<JobOpeningRow>(
    `SELECT id, title, subtitle, employment_type, description, requirements, sort_order, is_active
     FROM public.job_openings
     WHERE is_active = true
     ORDER BY sort_order ASC, title ASC`,
  );
  return rows;
}
