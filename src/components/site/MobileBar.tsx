import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Calendar, Phone } from "lucide-react";

import { PHONE_HREF, WA_FRAGE } from "./site-data";

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-brand-navy md:hidden">
      <a
        href={PHONE_HREF}
        className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium text-brand-navy-foreground"
      >
        <Phone className="size-4" aria-hidden="true" />
        Anrufen
      </a>
      <a
        href={WA_FRAGE}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 bg-brand-orange py-2.5 text-xs font-medium text-brand-orange-foreground"
      >
        <WhatsAppIcon className="size-4" />
        WhatsApp
      </a>
      <a
        href="/termin"
        className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium text-brand-navy-foreground"
      >
        <Calendar className="size-4" aria-hidden="true" />
        Termin
      </a>
    </div>
  );
}
