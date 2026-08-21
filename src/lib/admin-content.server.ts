// Server-side admin CRUD against the shared Neon Postgres database — same
// database public-content.server.ts reads from for the live pages. Every
// mutation here must be called only after the caller has verified a valid
// admin session (done in admin-content.functions.ts, not here).
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
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

export interface AdminOfferRow {
  id: string;
  title: string;
  description: string;
  price_label: string | null;
  badge: string | null;
  image_url: string | null;
  cta_label: string;
  sort_order: number;
  is_active: boolean;
}

export async function fetchAllOffers(): Promise<AdminOfferRow[]> {
  const { rows } = await getPool().query<AdminOfferRow>(
    `SELECT id, title, description, price_label, badge, image_url, cta_label, sort_order, is_active
     FROM public.offers ORDER BY sort_order ASC, title ASC`,
  );
  return rows;
}

export async function createOffer(sortOrder: number): Promise<{ id: string }> {
  const { rows } = await getPool().query<{ id: string }>(
    `INSERT INTO public.offers (title, description, cta_label, sort_order, is_active)
     VALUES ('Neues Angebot', '', 'Per WhatsApp anfragen', $1, false)
     RETURNING id`,
    [sortOrder],
  );
  return rows[0]!;
}

export async function updateOffer(
  id: string,
  fields: { [K in keyof Omit<AdminOfferRow, "id">]?: AdminOfferRow[K] | undefined },
): Promise<void> {
  const entries = Object.entries(fields).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return;
  const setClause = entries.map(([key], i) => `${key} = $${i + 2}`).join(", ");
  const values = entries.map(([, v]) => v);
  await getPool().query(
    `UPDATE public.offers SET ${setClause}, updated_at = now() WHERE id = $1`,
    [id, ...values],
  );
}

export async function deleteOffer(id: string): Promise<void> {
  await getPool().query(`DELETE FROM public.offers WHERE id = $1`, [id]);
}

export interface AdminJobOpeningRow {
  id: string;
  title: string;
  subtitle: string;
  employment_type: string;
  description: string;
  requirements: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export async function fetchAllJobOpenings(): Promise<AdminJobOpeningRow[]> {
  const { rows } = await getPool().query<AdminJobOpeningRow>(
    `SELECT id, title, subtitle, employment_type, description, requirements, image_url, sort_order, is_active
     FROM public.job_openings ORDER BY sort_order ASC, title ASC`,
  );
  return rows;
}

export async function createJobOpening(sortOrder: number): Promise<{ id: string }> {
  const { rows } = await getPool().query<{ id: string }>(
    `INSERT INTO public.job_openings (title, subtitle, employment_type, description, requirements, sort_order, is_active)
     VALUES ('Neue Stelle', '', 'Vollzeit', '', '', $1, false)
     RETURNING id`,
    [sortOrder],
  );
  return rows[0]!;
}

export async function updateJobOpening(
  id: string,
  fields: { [K in keyof Omit<AdminJobOpeningRow, "id">]?: AdminJobOpeningRow[K] | undefined },
): Promise<void> {
  const entries = Object.entries(fields).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return;
  const setClause = entries.map(([key], i) => `${key} = $${i + 2}`).join(", ");
  const values = entries.map(([, v]) => v);
  await getPool().query(`UPDATE public.job_openings SET ${setClause}, updated_at = now() WHERE id = $1`, [
    id,
    ...values,
  ]);
}

export async function deleteJobOpening(id: string): Promise<void> {
  await getPool().query(`DELETE FROM public.job_openings WHERE id = $1`, [id]);
}

export interface AdminQuoteRequestRow {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service_type: string;
  message: string | null;
  photo_keys: string[];
  status: string;
  created_at: string;
}

export async function fetchQuoteRequests(): Promise<AdminQuoteRequestRow[]> {
  const { rows } = await getPool().query<AdminQuoteRequestRow>(
    `SELECT id, name, phone, email, service_type, message, photo_keys, status, created_at
     FROM public.cw_quote_requests ORDER BY created_at DESC`,
  );
  return rows;
}

export async function updateQuoteRequestStatus(id: string, status: string): Promise<void> {
  await getPool().query(`UPDATE public.cw_quote_requests SET status = $2 WHERE id = $1`, [id, status]);
}

export interface AdminPartnerRequestRow {
  id: string;
  name: string;
  email: string;
  message: string | null;
  status: string;
  created_at: string;
}

export async function fetchPartnerRequests(): Promise<AdminPartnerRequestRow[]> {
  const { rows } = await getPool().query<AdminPartnerRequestRow>(
    `SELECT id, name, email, message, status, created_at
     FROM public.cw_partner_requests ORDER BY created_at DESC`,
  );
  return rows;
}

export async function updatePartnerRequestStatus(id: string, status: string): Promise<void> {
  await getPool().query(`UPDATE public.cw_partner_requests SET status = $2 WHERE id = $1`, [id, status]);
}

export interface AdminTestimonialRow {
  id: string;
  name: string;
  role: string;
  text: string;
  image_url: string | null;
  rating: number;
  sort_order: number;
  is_active: boolean;
}

export async function fetchAllTestimonials(): Promise<AdminTestimonialRow[]> {
  const { rows } = await getPool().query<AdminTestimonialRow>(
    `SELECT id, name, role, text, image_url, rating, sort_order, is_active
     FROM public.cw_testimonials ORDER BY sort_order ASC`,
  );
  return rows;
}

export async function createTestimonial(sortOrder: number): Promise<{ id: string }> {
  const { rows } = await getPool().query<{ id: string }>(
    `INSERT INTO public.cw_testimonials (name, role, text, rating, sort_order, is_active)
     VALUES ('Neuer Kunde', '', '', 5, $1, false)
     RETURNING id`,
    [sortOrder],
  );
  return rows[0]!;
}

export async function updateTestimonial(
  id: string,
  fields: { [K in keyof Omit<AdminTestimonialRow, "id">]?: AdminTestimonialRow[K] | undefined },
): Promise<void> {
  const entries = Object.entries(fields).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return;
  const setClause = entries.map(([key], i) => `${key} = $${i + 2}`).join(", ");
  const values = entries.map(([, v]) => v);
  await getPool().query(
    `UPDATE public.cw_testimonials SET ${setClause}, updated_at = now() WHERE id = $1`,
    [id, ...values],
  );
}

export async function deleteTestimonial(id: string): Promise<void> {
  await getPool().query(`DELETE FROM public.cw_testimonials WHERE id = $1`, [id]);
}

export interface AdminSeoRow {
  page_path: string;
  title: string;
  description: string;
  keywords: string;
  og_title: string;
  og_description: string;
}

export async function fetchSeoSettings(): Promise<AdminSeoRow[]> {
  const { rows } = await getPool().query<AdminSeoRow>(
    `SELECT page_path, title, description, keywords, og_title, og_description
     FROM public.cw_seo_settings ORDER BY page_path`,
  );
  return rows;
}

export async function upsertSeoSettings(row: AdminSeoRow): Promise<void> {
  await getPool().query(
    `INSERT INTO public.cw_seo_settings (page_path, title, description, keywords, og_title, og_description, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, now())
     ON CONFLICT (page_path) DO UPDATE SET
       title = excluded.title,
       description = excluded.description,
       keywords = excluded.keywords,
       og_title = excluded.og_title,
       og_description = excluded.og_description,
       updated_at = now()`,
    [row.page_path, row.title, row.description, row.keywords, row.og_title, row.og_description],
  );
}

const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Speichert ein Base64-kodiertes Bild unter public/uploads/<folder>/ und gibt den öffentlichen Pfad zurück. */
export async function saveUploadedImage(
  folder: string,
  filename: string,
  dataBase64: string,
): Promise<{ url: string }> {
  const buffer = Buffer.from(dataBase64, "base64");
  if (buffer.byteLength > MAX_UPLOAD_BYTES) {
    throw new Error("Datei ist zu groß (max. 5 MB).");
  }
  const ext = path.extname(filename).toLowerCase().replace(/[^a-z0-9.]/g, "") || ".jpg";
  const safeName = `${randomUUID()}${ext}`;
  const dir = path.join(UPLOAD_ROOT, folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, safeName), buffer);
  return { url: `/uploads/${folder}/${safeName}` };
}
