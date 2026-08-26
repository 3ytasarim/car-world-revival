import * as React from "react";
import { Wrench, ShieldCheck, Car, Camera } from "lucide-react";

import werkstatt from "@/assets/svc-reparatur.jpg";
import tuev from "@/assets/svc-tuev.jpg";
import scheibe from "@/assets/svc-scheibe.jpg";
import unfall from "@/assets/unfall.jpg";

type Slide = {
  src: string;
  title: string;
  sub: string;
  Icon: React.ElementType;
};

const slides: Slide[] = [
  { src: werkstatt, title: "Reparatur & Wartung", sub: "Alles aus einer Hand", Icon: Wrench },
  { src: unfall, title: "Unfallinstandsetzung", sub: "Rundum-sorglos-Paket", Icon: Camera },
  { src: scheibe, title: "Autoglas & Steinschlag", sub: "Schnelle Termine", Icon: Car },
  { src: tuev, title: "HU / AU – TÜV", sub: "Direkt im Haus", Icon: ShieldCheck },
];

const DURATION = 4000;

/** Animierter Bildschirm-Inhalt für den Laptop im Hero */
export function HeroScreen() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, DURATION);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative size-full overflow-hidden bg-brand-navy">
      {slides.map((s, i) => (
        <div
          key={s.title}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={s.src}
            alt={s.title}
            className={`size-full object-cover ${i === index ? "animate-hero-kenburns" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      ))}

      {/* Sheen / Glasreflex */}
      <div className="pointer-events-none absolute inset-0 animate-hero-sheen bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 p-[4%]">
        {slides.map((s, i) => {
          const Icon = s.Icon;
          return (
            <div
              key={s.title}
              className={`flex items-center gap-[2.5%] transition-all duration-700 ${
                i === index ? "translate-y-0 opacity-100" : "pointer-events-none absolute translate-y-3 opacity-0"
              }`}
            >
              <span className="flex aspect-square w-[8%] min-w-7 items-center justify-center rounded-lg bg-brand-orange/90 text-white shadow-lg">
                <Icon className="size-[55%]" aria-hidden="true" />
              </span>
              <span className="leading-tight text-white">
                <span className="block text-[clamp(11px,2.1cqw,20px)] font-semibold">{s.title}</span>
                <span className="block text-[clamp(9px,1.6cqw,15px)] text-white/70">{s.sub}</span>
              </span>
            </div>
          );
        })}

        {/* Fortschritts-Punkte */}
        <div className="mt-[3%] flex gap-1.5">
          {slides.map((s, i) => (
            <span key={s.title} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
              <span
                className={`block h-full rounded-full bg-brand-orange ${
                  i === index ? "animate-hero-progress" : i < index ? "w-full" : "w-0"
                }`}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroScreen;
