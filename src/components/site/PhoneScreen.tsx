import * as React from "react";
import { Phone, AlertTriangle } from "lucide-react";

import unfall from "@/assets/unfall.jpg";
import reparatur from "@/assets/svc-reparatur.jpg";
import scheibe from "@/assets/svc-scheibe.jpg";
import { PHONE_HREF } from "@/components/site/site-data";

const SLIDES = [
  { src: unfall, label: "Unfallschaden" },
  { src: reparatur, label: "Reparatur" },
  { src: scheibe, label: "Scheibenschaden" },
];

/** Smartphone-Inhalt: Unfall gehabt? → direkt anrufen */
export function PhoneScreen() {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex size-full flex-col overflow-hidden bg-brand-navy">
      <div className="relative flex-1 overflow-hidden">
        {SLIDES.map((s, idx) => (
          <img
            key={s.label}
            src={s.src}
            alt={s.label}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
              idx === i ? "animate-phone-kenburns opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-transparent" />

        <span className="absolute left-[6%] top-[7%] inline-flex items-center gap-[4%] rounded-full bg-red-600 px-[5%] py-[2.5%] text-[clamp(9px,3.4cqw,17px)] font-bold text-white shadow-lg">
          <span className="relative flex size-[1em] items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
            <AlertTriangle className="relative size-[1em]" aria-hidden="true" />
          </span>
          Notfall
        </span>

        {/* Slide-Indikatoren */}
        <div className="absolute bottom-[6%] left-[6%] flex gap-[2%]">
          {SLIDES.map((s, idx) => (
            <span
              key={s.label}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                idx === i ? "w-[26px] bg-brand-orange" : "w-[10px] bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative -mt-[20%] px-[7%] pb-[9%] text-white">
        <p className="text-[clamp(14px,6.4cqw,32px)] font-extrabold leading-tight tracking-tight drop-shadow">
          Unfall gehabt?
        </p>
        <p className="mt-[2%] text-[clamp(9px,3.1cqw,17px)] font-medium text-white/80">
          Wir kümmern uns um alles — sofort.
        </p>

        <a
          href={PHONE_HREF}
          className="animate-phone-cta mt-[7%] flex items-center justify-center gap-[4%] rounded-full bg-brand-orange px-[5%] py-[5.5%] text-[clamp(11px,4.2cqw,21px)] font-extrabold tracking-tight text-brand-orange-foreground shadow-[0_12px_34px_-8px_rgba(0,0,0,0.7)]"
        >
          <Phone className="animate-phone-ring size-[1.25em] shrink-0" aria-hidden="true" />
          <span className="whitespace-nowrap">Jetzt anrufen</span>
        </a>

        <div className="mt-[5%] flex items-center justify-center gap-[3%] text-[clamp(8px,2.7cqw,14px)] font-medium text-white/70">
          <span className="size-[0.55em] animate-pulse rounded-full bg-emerald-400" />
          24/7 per WhatsApp erreichbar
        </div>
      </div>
    </div>
  );
}

export default PhoneScreen;
