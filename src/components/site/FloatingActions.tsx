import { useEffect, useState } from "react";
import { CalendarCheck, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { PHONE_HREF, WA_FRAGE } from "./site-data";

/** Sticky, mitscrollende Aktionsbuttons (WhatsApp + Termin) – Desktop rechts, mobil über der Leiste. */
export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed right-4 bottom-24 z-50 hidden flex-col items-end gap-3 transition-all duration-500 md:right-6 md:bottom-8 md:flex ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <a
        href={WA_FRAGE}
        target="_blank"
        rel="noopener noreferrer"
        className="group pointer-events-auto inline-flex h-14 items-center gap-3 rounded-full bg-[#25D366] pr-5 pl-4 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_rgba(37,211,102,0.9)] transition-all duration-300 hover:scale-[1.04]"
      >
        <span className="relative flex size-7 items-center justify-center">
          <span className="absolute inline-flex size-7 animate-ping rounded-full bg-white/40" aria-hidden="true" />
          <WhatsAppIcon className="relative size-6" />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100">
          WhatsApp schreiben
        </span>
      </a>

      <a
        href="/termin"
        className="group pointer-events-auto inline-flex h-14 items-center gap-3 rounded-full bg-brand-orange pr-5 pl-4 text-sm font-semibold text-brand-orange-foreground shadow-[0_18px_40px_-16px_var(--brand-orange)] transition-all duration-300 hover:scale-[1.04]"
      >
        <CalendarCheck className="size-6" aria-hidden="true" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100">
          Termin buchen
        </span>
      </a>

      <a
        href={PHONE_HREF}
        aria-label="Jetzt anrufen"
        className="pointer-events-auto inline-flex size-12 items-center justify-center rounded-full bg-brand-navy text-brand-navy-foreground shadow-lg transition-all duration-300 hover:scale-[1.06]"
      >
        <Phone className="size-5" aria-hidden="true" />
      </a>
    </div>
  );
}
