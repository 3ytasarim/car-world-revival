import { useEffect, useState } from "react";
import { Car, ShieldAlert } from "lucide-react";

import heroPhoneUnfall from "@/assets/unfall-1.jpg";
import heroPhoneSteinschlag from "@/assets/hero-steinschlag.jpg";

type Slide = { src: string; title: string; Icon: React.ElementType };

const slides: Slide[] = [
  { src: heroPhoneUnfall, title: "Unfallservice", Icon: ShieldAlert },
  { src: heroPhoneSteinschlag, title: "Windschutzscheiben", Icon: Car },
];

const DURATION = 3200;

/**
 * Kleiner, sich automatisch weiterschaltender Bild-Slider direkt unter der
 * H1 — zeigt in ca. 3 Sekunden pro Bild abwechselnd Unfallschaden und
 * Steinschlag, mit Ken-Burns-Zoom, Sheen und Fortschrittspunkten (gleiche
 * Bauart wie HeroScreen.tsx). Kundenwunsch: "direkt anlaufen sehen, dass wir
 * uns um Autounfälle und Windschutzscheiben kümmern" — als echter Slider,
 * nicht als statisches Nebeneinander.
 */
export function HeroServiceSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, DURATION);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl shadow-[0_20px_45px_-20px_rgba(19,31,53,0.4)]">
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
            loading="eager"
            className={`size-full object-cover ${i === index ? "animate-hero-kenburns" : ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        </div>
      ))}

      <div
        className="pointer-events-none absolute inset-0 animate-hero-sheen bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
        {slides.map((s, i) => {
          const Icon = s.Icon;
          return (
            <div
              key={s.title}
              className={`flex items-center gap-2 transition-all duration-700 ${
                i === index ? "translate-y-0 opacity-100" : "pointer-events-none absolute translate-y-2 opacity-0"
              }`}
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-orange/90 text-white shadow-lg">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-white">{s.title}</span>
            </div>
          );
        })}

        <div className="mt-2.5 flex gap-1.5">
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

export default HeroServiceSlider;
