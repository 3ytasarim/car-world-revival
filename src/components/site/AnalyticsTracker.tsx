import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

import { getOrCreateSessionId } from "@/lib/analytics-client";

const HEARTBEAT_INTERVAL_MS = 20_000;

// Unsichtbar — feuert bei jedem Routenwechsel einen Pageview und hält per
// Herzschlag die Session "online", solange der Tab sichtbar ist. Einmal im
// Root gemountet, gilt für die ganze Seite.
export function AnalyticsTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    (async () => {
      try {
        const { id, isNew } = getOrCreateSessionId();
        if (!id) return;
        const { trackPageview } = await import("@/lib/analytics.functions");
        await trackPageview({
          data: { sessionId: id, path: pathname, referrer: document.referrer || undefined, isNewSession: isNew },
        });
      } catch {
        // Tracking-Fehler dürfen die eigentliche Seite nie beeinträchtigen.
      }
    })();
  }, [pathname]);

  useEffect(() => {
    let cancelled = false;

    const beat = async () => {
      if (cancelled || document.visibilityState !== "visible") return;
      try {
        const { id } = getOrCreateSessionId();
        if (!id) return;
        const { trackHeartbeat } = await import("@/lib/analytics.functions");
        await trackHeartbeat({ data: { sessionId: id } });
      } catch {
        // ignorieren — nächster Herzschlag versucht es erneut
      }
    };

    const interval = setInterval(beat, HEARTBEAT_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") beat();
    };
    document.addEventListener("visibilitychange", onVisible);
    beat();

    return () => {
      cancelled = true;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return null;
}

export default AnalyticsTracker;
