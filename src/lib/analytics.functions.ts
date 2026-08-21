// Öffentliche Tracking-Endpunkte (kein Login nötig — jeder Website-Besucher
// ruft sie auf) + Admin-Endpunkte (Session-geschützt) für die Auswertung.
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

async function requireAdmin() {
  const token = getCookie("cw_session");
  if (!token) throw new Error("Nicht angemeldet.");
  const { validateSessionToken } = await import("./auth.server");
  const admin = await validateSessionToken(token);
  if (!admin) throw new Error("Sitzung abgelaufen. Bitte erneut anmelden.");
  return admin;
}

export const trackPageview = createServerFn({ method: "POST" })
  .validator(
    z.object({
      sessionId: z.string().uuid(),
      path: z.string().max(300),
      referrer: z.string().max(500).optional(),
      isNewSession: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    const ip = getRequestIP({ xForwardedFor: true });
    const userAgent = getRequestHeader("user-agent") ?? null;
    const { ensureSession, recordPageview } = await import("./analytics.server");
    if (data.isNewSession) {
      await ensureSession({
        sessionId: data.sessionId,
        ip,
        entryPage: data.path,
        referrer: data.referrer || null,
        userAgent,
      });
    }
    await recordPageview(data.sessionId, data.path);
    return { success: true as const };
  });

export const trackHeartbeat = createServerFn({ method: "POST" })
  .validator(z.object({ sessionId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { touchSession } = await import("./analytics.server");
    await touchSession(data.sessionId);
    return { success: true as const };
  });

export const trackClick = createServerFn({ method: "POST" })
  .validator(z.object({ sessionId: z.string().uuid(), path: z.string().max(300), label: z.string().max(120) }))
  .handler(async ({ data }) => {
    const { recordClick } = await import("./analytics.server");
    await recordClick(data.sessionId, data.path, data.label);
    return { success: true as const };
  });

export const getOnlineNow = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { fetchOnlineNow } = await import("./analytics.server");
  return fetchOnlineNow();
});

export const getAnalyticsSummary = createServerFn({ method: "GET" })
  .validator(z.object({ rangeDays: z.number().min(1).max(90) }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { fetchAnalyticsSummary } = await import("./analytics.server");
    return fetchAnalyticsSummary(data.rangeDays);
  });
