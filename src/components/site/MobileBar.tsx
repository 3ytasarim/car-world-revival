import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Phone } from "lucide-react";

import { PHONE_HREF, WA_FRAGE } from "./site-data";

// Customer Journey ist site-weit auf zwei Wege reduziert: WhatsApp oder
// Anrufen — kein Formular/Angebot-CTA mehr, auch nicht hier.
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 bg-brand-navy md:hidden">
      <a
        href={PHONE_HREF}
        className="flex flex-col items-center gap-0.5 border-t border-white/10 py-2.5 text-xs font-medium text-brand-navy-foreground"
      >
        <Phone className="size-4" aria-hidden="true" />
        Anrufen
      </a>
      <a
        href={WA_FRAGE}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 border-t border-[#25D366] bg-[#25D366] py-2.5 text-xs font-medium text-white"
      >
        <WhatsAppIcon className="size-4" />
        WhatsApp
      </a>
    </div>
  );
}
