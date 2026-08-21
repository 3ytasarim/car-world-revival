import * as React from "react";
import { Phone, AlertTriangle } from "lucide-react";

import unfall from "@/assets/unfall.jpg";
import { PHONE_HREF } from "@/components/site/site-data";

/** Smartphone-Inhalt: je Thema eigenes Bild/Badge/Titel — Anruf-CTA bleibt gleich. */
export function PhoneScreen({
  image = unfall,
  imageAlt = "Unfallfahrzeug mit Frontschaden",
  badge = "Notfall",
  title = "Unfall gehabt?",
  subtitle = "Wir kümmern uns um alles — sofort.",
}: {
  image?: string;
  imageAlt?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="relative flex size-full flex-col overflow-hidden bg-brand-navy">
      <div className="relative flex-1 overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className="animate-phone-kenburns absolute inset-0 size-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-transparent" />

        <span className="absolute left-[6%] top-[7%] inline-flex items-center gap-[4%] rounded-full bg-brand-orange px-[5%] py-[2.5%] text-[clamp(13px,4.2cqw,19px)] font-bold text-white shadow-lg">
          <span className="relative flex size-[1em] items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
            <AlertTriangle className="relative size-[1em]" aria-hidden="true" />
          </span>
          {badge}
        </span>

      </div>

      <div className="relative -mt-[20%] px-[7%] pb-[9%] text-white">
        <p className="text-[clamp(22px,9cqw,38px)] font-black leading-tight tracking-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
          {title}
        </p>
        <p className="mt-[2%] text-[clamp(15px,4.8cqw,21px)] font-semibold text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
          {subtitle}
        </p>

        <a
          href={PHONE_HREF}
          className="mt-[7%] flex items-center justify-center gap-[4%] rounded-full bg-brand-orange px-[5%] py-[5.5%] text-[clamp(17px,5.6cqw,24px)] font-black tracking-tight text-brand-orange-foreground [text-shadow:0_1px_4px_rgba(0,0,0,0.45)] shadow-[0_12px_34px_-8px_rgba(0,0,0,0.7)]"
        >
          <Phone className="animate-phone-ring size-[1.25em] shrink-0" aria-hidden="true" />
          <span className="whitespace-nowrap">Jetzt anrufen</span>
        </a>

        <div className="mt-[5%] flex items-center justify-center gap-[3%] text-[clamp(11px,3.6cqw,16px)] font-semibold text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
          <span className="size-[0.55em] animate-pulse rounded-full bg-emerald-400" />
          24/7 per WhatsApp erreichbar
        </div>
      </div>
    </div>
  );
}

export default PhoneScreen;
