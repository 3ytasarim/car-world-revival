// Browser-seitige Session-ID + Klick-Tracking-Helfer. Session-ID lebt in
// sessionStorage (pro Tab, überlebt Seitennavigation, endet mit dem Tab —
// damit "aktuell online" echte gleichzeitige Besucher zeigt statt derselben
// Person über Wochen als eine Dauer-Session zu zählen).
const SESSION_KEY = "cw_analytics_sid";

export function getOrCreateSessionId(): { id: string; isNew: boolean } {
  if (typeof window === "undefined") return { id: "", isNew: false };
  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) return { id: existing, isNew: false };
  const id = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_KEY, id);
  return { id, isNew: true };
}

export async function trackClickEvent(label: string) {
  try {
    const { id } = getOrCreateSessionId();
    if (!id) return;
    const { trackClick } = await import("@/lib/analytics.functions");
    await trackClick({ data: { sessionId: id, path: window.location.pathname, label } });
  } catch {
    // Tracking darf nie eine echte Nutzeraktion (Button-Klick) blockieren.
  }
}
