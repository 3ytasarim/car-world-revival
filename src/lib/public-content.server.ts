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
  image_url: string | null;
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
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export async function fetchPublicOffers(): Promise<PublicOfferRow[]> {
  const { rows } = await getPool().query<PublicOfferRow>(
    `SELECT id, title, description, price_label, badge, image_url, cta_label, sort_order, is_active
     FROM public.offers
     WHERE is_active = true
     ORDER BY sort_order ASC, title ASC`,
  );
  return rows;
}

export async function fetchJobOpenings(): Promise<JobOpeningRow[]> {
  const { rows } = await getPool().query<JobOpeningRow>(
    `SELECT id, title, subtitle, employment_type, description, requirements, image_url, sort_order, is_active
     FROM public.job_openings
     WHERE is_active = true
     ORDER BY sort_order ASC, title ASC`,
  );
  return rows;
}

export interface TestimonialRow {
  id: string;
  name: string;
  role: string;
  text: string;
  image_url: string | null;
  rating: number;
}

export async function fetchTestimonials(): Promise<TestimonialRow[]> {
  const { rows } = await getPool().query<TestimonialRow>(
    `SELECT id, name, role, text, image_url, rating
     FROM public.cw_testimonials
     WHERE is_active = true
     ORDER BY sort_order ASC`,
  );
  return rows;
}

export async function insertPartnerRequest(input: { name: string; email: string; message: string | null }) {
  await getPool().query(
    `INSERT INTO public.cw_partner_requests (name, email, message) VALUES ($1, $2, $3)`,
    [input.name, input.email, input.message],
  );
}

export async function insertQuoteRequest(input: {
  name: string;
  phone: string;
  email: string | null;
  serviceType: string;
  message: string | null;
  photoKeys: string[];
}) {
  await getPool().query(
    `INSERT INTO public.cw_quote_requests (name, phone, email, service_type, message, photo_keys)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [input.name, input.phone, input.email, input.serviceType, input.message ?? "", input.photoKeys],
  );
}

// Datei-Upload ohne Admin-Session (anonyme Kunden laden Schadenfotos hoch).
// Gleiche Größenbegrenzung/Zielordner-Logik wie admin-content.server.ts's
// saveUploadedImage, hier separat gehalten, damit dieses Modul (öffentlich
// erreichbar) keine Admin-Interna importiert.
export async function savePublicUpload(folder: string, filename: string, dataBase64: string): Promise<{ url: string }> {
  const { randomUUID } = await import("node:crypto");
  const { mkdir, writeFile } = await import("node:fs/promises");
  const path = await import("node:path");

  const buffer = Buffer.from(dataBase64, "base64");
  const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
  if (buffer.byteLength > MAX_UPLOAD_BYTES) {
    throw new Error("Datei ist zu groß (max. 5 MB).");
  }
  const ext = path.extname(filename).toLowerCase().replace(/[^a-z0-9.]/g, "") || ".jpg";
  if (![".jpg", ".jpeg", ".png", ".webp", ".heic"].includes(ext)) {
    throw new Error("Nur Bilddateien sind erlaubt.");
  }
  const safeName = `${randomUUID()}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, safeName), buffer);
  return { url: `/uploads/${folder}/${safeName}` };
}
