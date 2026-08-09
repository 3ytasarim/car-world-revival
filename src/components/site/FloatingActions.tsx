import { CalendarDays } from "lucide-react";

import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { WA_FRAGE } from "./site-data";

/** Sticky CTA-Buttons rechts – immer sichtbar, mitscrollend. */
export function FloatingActions() {
  return (
    <div className="fixed top-1/2 right-4 z-50 hidden -translate-y-1/2 flex-col items-end gap-3 md:right-6 md:flex">
      <a
        href={WA_FRAGE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center gap-3 rounded-xl bg-[#22C55E] px-5 text-sm font-semibold text-white shadow-[0_18px_35px_-14px_rgba(34,197,94,0.9)] transition-transform duration-300 hover:scale-[1.04]"
      >
        <WhatsAppIcon className="size-5" />
        WhatsApp
      </a>

      <a
        href="/termin"
        className="inline-flex h-12 items-center gap-3 rounded-xl bg-[#E11D2E] px-5 text-sm font-semibold text-white shadow-[0_18px_35px_-14px_rgba(225,29,46,0.9)] transition-transform duration-300 hover:scale-[1.04]"
      >
        <CalendarDays className="size-5" aria-hidden="true" />
        Termin anfragen
      </a>
    </div>
  );
}
