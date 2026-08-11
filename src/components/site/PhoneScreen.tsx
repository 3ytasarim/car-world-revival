import * as React from "react";
import { Phone, AlertTriangle } from "lucide-react";

import unfall from "@/assets/unfall.jpg";
import { PHONE_HREF } from "@/components/site/site-data";

/** Smartphone-Inhalt: Unfall gehabt? → direkt anrufen */
export function PhoneScreen({ image = unfall }: { image?: string }) {
  return (
    <div className="relative flex size-full flex-col overflow-hidden bg-brand-navy">
      <div className="relative flex-1 overflow-hidden">
        <img
          src={image}
          alt="Unfallfahrzeug mit Frontschaden"
          className="animate-phone-kenburns absolute inset-0 size-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-transparent" />

        <span className="absolute left-[6%] top-[7%] inline-flex items-center gap-[4%] rounded-full bg-brand-orange px-[5%] py-[2.5%] text-[clamp(9px,3.4cqw,17px)] font-bold text-white shadow-lg">
          <span className="relative flex size-[1em] items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
            <AlertTriangle className="relative size-[1em]" aria-hidden="true" />
          </span>
          Notfall
        </span>

      </div>

      <div className="relative -mt-[20%] px-[7%] pb-[9%] text-white">
        <p className="text-[clamp(14px,6.4cqw,32px)] font-black leading-tight tracking-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
          Unfall gehabt?
        </p>
        <p className="mt-[2%] text-[clamp(10px,3.4cqw,18px)] font-semibold text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
          Wir kümmern uns um alles — sofort.
        </p>

        <a
          href={PHONE_HREF}
          className="animate-phone-cta mt-[7%] flex items-center justify-center gap-[4%] rounded-full bg-brand-orange px-[5%] py-[5.5%] text-[clamp(11px,4.2cqw,21px)] font-black tracking-tight text-brand-orange-foreground [text-shadow:0_1px_4px_rgba(0,0,0,0.45)] shadow-[0_12px_34px_-8px_rgba(0,0,0,0.7)]"
        >
          <Phone className="animate-phone-ring size-[1.25em] shrink-0" aria-hidden="true" />
          <span className="whitespace-nowrap">Jetzt anrufen</span>
        </a>

        <div className="mt-[5%] flex items-center justify-center gap-[3%] text-[clamp(9px,3cqw,15px)] font-semibold text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
          <span className="size-[0.55em] animate-pulse rounded-full bg-emerald-400" />
          24/7 per WhatsApp erreichbar
        </div>
      </div>
    </div>
  );
}

export default PhoneScreen;
