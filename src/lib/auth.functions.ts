// Client-callable server functions — safe to import from route components.
// The actual DB/session logic lives in auth.server.ts and never ships to
// the browser; this file only exports thin createServerFn RPC wrappers.
import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie, deleteCookie, getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

const SESSION_COOKIE = "cw_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 Tage, in Sekunden

export const loginFn = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.string().email(), password: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { login } = await import("./auth.server");
    const ip = getRequestIP({ xForwardedFor: true }) ?? null;
    const userAgent = getRequestHeader("user-agent") ?? null;

    const session = await login(data.email, data.password, ip, userAgent);
    if (!session) {
      throw new Error("Ungültige Anmeldedaten.");
    }

    setCookie(SESSION_COOKIE, session.token, {
      httpOnly: true,
      secure: process.env["NODE_ENV"] === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });

    return { success: true as const };
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const token = getCookie(SESSION_COOKIE);
  if (token) {
    const { revokeSession } = await import("./auth.server");
    await revokeSession(token);
  }
  deleteCookie(SESSION_COOKIE, { path: "/" });
  return { success: true as const };
});

export const getCurrentAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  const token = getCookie(SESSION_COOKIE);
  if (!token) return null;
  const { validateSessionToken } = await import("./auth.server");
  return validateSessionToken(token);
});
