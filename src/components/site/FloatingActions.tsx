import { CalendarDays } from "lucide-react";

import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { WA_FRAGE } from "./site-data";

/** Sticky CTA-Buttons rechts – immer sichtbar, mitscrollend. */
export function FloatingActions() {
  return (
    <div className="fixed top-1/2 right-0 z-50 hidden -translate-y-1/2 flex-col items-end md:flex">
      <a
        href={WA_FRAGE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center gap-3 rounded-l-xl bg-[#22C55E] px-5 text-sm font-semibold text-white shadow-[0_18px_35px_-14px_rgba(34,197,94,0.9)] transition-transform duration-300 hover:-translate-x-1"
      >
        <WhatsAppIcon className="size-5" />
        WhatsApp
      </a>

      <a
        href="/termin"
        className="inline-flex h-12 items-center gap-3 rounded-l-xl bg-[#1B3A63] px-5 text-sm font-semibold text-white shadow-[0_18px_35px_-14px_rgba(27,58,99,0.9)] transition-transform duration-300 hover:-translate-x-1"
      >
        <CalendarDays className="size-5" aria-hidden="true" />
        Termin anfragen
      </a>
    </div>

  );
}
