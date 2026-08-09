import * as React from "react";
import { Phone, AlertTriangle } from "lucide-react";

import unfall from "@/assets/unfall.jpg";
import { PHONE_HREF } from "@/components/site/site-data";

/** Smartphone-Inhalt: Unfall gehabt? → direkt anrufen */
export function PhoneScreen() {
  return (
    <div className="relative flex size-full flex-col overflow-hidden bg-brand-navy">
      <div className="relative flex-1 overflow-hidden">
        <img
          src={unfall}
          alt="Unfallfahrzeug"
          className="size-full animate-hero-kenburns object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />

        <span className="absolute left-[6%] top-[8%] inline-flex items-center gap-[3%] rounded-full bg-red-600/90 px-[4%] py-[2%] text-[clamp(8px,3cqw,15px)] font-semibold text-white shadow-lg">
          <AlertTriangle className="size-[1.1em] animate-pulse" aria-hidden="true" />
          Notfall
        </span>
      </div>

      <div className="relative -mt-[22%] px-[7%] pb-[9%] text-white">
        <p className="text-[clamp(13px,6cqw,30px)] font-bold leading-tight tracking-tight">
          Unfall gehabt?
        </p>
        <p className="mt-[1.5%] text-[clamp(9px,3cqw,16px)] text-white/70">
          Wir kümmern uns um alles — sofort.
        </p>

        <a
          href={PHONE_HREF}
          className="mt-[6%] flex items-center justify-center gap-[3%] rounded-full bg-brand-orange px-[5%] py-[4.5%] text-[clamp(10px,3.6cqw,18px)] font-semibold text-brand-orange-foreground shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform hover:scale-[1.03]"
        >
          <span className="relative flex">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
            <Phone className="relative size-[1.15em]" aria-hidden="true" />
          </span>
          Jetzt anrufen
        </a>

        <div className="mt-[5%] flex items-center justify-center gap-[2%] text-[clamp(7px,2.4cqw,12px)] text-white/50">
          <span className="size-[0.5em] rounded-full bg-emerald-400" />
          24/7 per WhatsApp erreichbar
        </div>
      </div>
    </div>
  );
}

export default PhoneScreen;
