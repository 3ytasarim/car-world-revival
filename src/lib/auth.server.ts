// Server-side admin auth against the shared Neon Postgres database — same
// database public-content.server.ts already reads offers/jobs from, now
// also home to car-world-revival's own login (replacing Supabase Auth).
//
// Session mechanism mirrors german-auto-platform's proven pattern (a random
// token, only its SHA-256 hash ever stored in the DB, the raw token lives
// only in an httpOnly cookie) — framework-agnostic, just ported from
// Next's `cookies()` to TanStack Start's getCookie/setCookie.
import { randomBytes, createHash } from "node:crypto";
import { Pool } from "pg";
import { hash as argon2Hash, verify as argon2Verify } from "@node-rs/argon2";

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

const ARGON2_OPTIONS = { memoryCost: 19456, timeCost: 2, parallelism: 1 };
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 Tage

export interface AdminSession {
  id: string;
  email: string;
}

export async function hashPassword(password: string): Promise<string> {
  return argon2Hash(password, ARGON2_OPTIONS);
}

export async function verifyPassword(storedHash: string, password: string): Promise<boolean> {
  try {
    return await argon2Verify(storedHash, password);
  } catch {
    return false;
  }
}

function generateToken(): string {
  return randomBytes(32).toString("base64url");
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

async function createSession(userId: string, ipAddress: string | null, userAgent: string | null) {
  const token = generateToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await getPool().query(
    `INSERT INTO public.cw_admin_sessions (user_id, token_hash, expires_at, ip_address, user_agent)
     VALUES ($1, $2, $3, $4, $5)`,
    [userId, tokenHash, expiresAt, ipAddress, userAgent],
  );

  return { token, expiresAt };
}

/**
 * Verifies email/password against `cw_admin_users`. Returns `null` for both
 * "no such user" and "wrong password" — no account enumeration.
 */
export async function login(
  email: string,
  password: string,
  ipAddress: string | null = null,
  userAgent: string | null = null,
): Promise<{ token: string; expiresAt: Date } | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const { rows } = await getPool().query<{ id: string; password_hash: string }>(
    `SELECT id, password_hash FROM public.cw_admin_users WHERE email = $1`,
    [normalizedEmail],
  );
  const user = rows[0];
  if (!user) return null;

  const valid = await verifyPassword(user.password_hash, password);
  if (!valid) return null;

  const session = await createSession(user.id, ipAddress, userAgent);
  await getPool().query(`UPDATE public.cw_admin_users SET last_login_at = now() WHERE id = $1`, [user.id]);
  return session;
}

/** Looks up a session by its raw cookie token and returns the admin it belongs to, or `null`. */
export async function validateSessionToken(token: string): Promise<AdminSession | null> {
  const tokenHash = hashToken(token);
  const { rows } = await getPool().query<{ id: string; email: string }>(
    `SELECT u.id, u.email
     FROM public.cw_admin_sessions s
     JOIN public.cw_admin_users u ON u.id = s.user_id
     WHERE s.token_hash = $1 AND s.revoked_at IS NULL AND s.expires_at > now()`,
    [tokenHash],
  );
  return rows[0] ?? null;
}

export async function revokeSession(token: string): Promise<void> {
  const tokenHash = hashToken(token);
  await getPool().query(`UPDATE public.cw_admin_sessions SET revoked_at = now() WHERE token_hash = $1`, [tokenHash]);
}
