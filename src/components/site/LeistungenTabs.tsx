import { useEffect, useRef, useState } from "react";

import { AnimatedText } from "@/components/ui/animated-text";
import { ProfileCard } from "@/components/ui/profile-card";
import { cn } from "@/lib/utils";

import unfall from "@/assets/unfall.jpg";
import abschlepp from "@/assets/svc-abschlepp.jpg";
import reparatur from "@/assets/svc-reparatur.jpg";
import ersatzwagen from "@/assets/svc-ersatzwagen.jpg";
import versicherung from "@/assets/svc-versicherung.jpg";
import reifen from "@/assets/svc-reifen.jpg";
import scheibe from "@/assets/svc-scheibe.jpg";
import tuev from "@/assets/svc-tuev.jpg";
import wartung from "@/assets/svc-wartung.jpg";

const features = [
  { id: "unfall", label: "Unfallservice", image: unfall, description: "Soforthilfe rund um die Uhr — wir organisieren alles nach dem Unfall." },
  { id: "abschlepp", label: "Abschleppdienst", image: abschlepp, description: "Schnelle Bergung und sicherer Transport in unsere Meisterwerkstatt." },
  { id: "reparatur", label: "Fahrzeugreparatur", image: reparatur, description: "Meisterhafte Instandsetzung von Karosserie, Lack und Technik." },
  { id: "ersatzwagen", label: "Ersatzwagen", image: ersatzwagen, description: "Mobil bleiben ohne Wartezeit — Ersatzfahrzeug direkt vor Ort." },
  { id: "versicherung", label: "Versicherungsabwicklung", image: versicherung, description: "Den Papierkram mit Ihrer Versicherung übernehmen wir komplett." },
  { id: "reifen", label: "Reifenwechsel", image: reifen, description: "Wechsel, Auswuchten und Einlagerung Ihrer Räder." },
  { id: "scheibe", label: "Windschutzscheiben", image: scheibe, description: "Steinschlag in Minuten repariert oder Scheibe komplett getauscht." },
  { id: "tuev", label: "TÜV & AU", image: tuev, description: "Hauptuntersuchung ohne lange Wartezeit direkt bei uns." },
  { id: "wartung", label: "Inspektion & Wartung", image: wartung, description: "Service nach Herstellervorgabe — mit Garantieerhalt." },
];

// Pro Leistung so viel Scroll-Strecke (in vh), bis zur nächsten weitergeblättert wird.
const STEP_VH = 65;

// Ersetzt den horizontalen Klick-Carousel (Pfeile + Punkte) durch einen
// scroll-gebundenen Ablauf: die Karte bleibt beim Scrollen sticky im
// Viewport stehen, "aktiv" wechselt allein anhand der Scrollposition
// innerhalb der Spur darunter — kein Links/Rechts, keine Klick-Navigation
// nötig, der Nutzer blättert einfach durch, indem er weiter scrollt.
export function LeistungenTabs() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const computeActive = () => {
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      const idx = Math.min(features.length - 1, Math.floor(progress * features.length));
      setActive(idx);
    };

    computeActive();
    window.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);
    return () => {
      window.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
    };
  }, []);

  return (
    <section aria-labelledby="leistungen-title" className="relative overflow-hidden py-20">
      <div className="relative z-10 mx-auto mb-10 max-w-3xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-sm font-semibold text-brand-orange">
          Alles aus einer Hand
        </span>
        <h2 id="leistungen-title" className="mt-4 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
          <AnimatedText text="Unsere Leistungen" minWeight={300} maxWeight={800} delayMultiplier={0.05} />
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">Ein Ansprechpartner für alles rund um Ihr Fahrzeug.</p>
      </div>

      <div ref={trackRef} className="relative z-10" style={{ height: `${features.length * STEP_VH}vh` }}>
        <div className="sticky top-24 flex flex-col items-center pt-4 sm:top-28">
          <div className="relative h-[520px] w-full max-w-7xl overflow-hidden sm:h-[440px]">
            {features.map((f, i) => {
              const isActive = i === active;
              const isPrev = i < active;
              return (
                <div
                  key={f.id}
                  className={cn(
                    "absolute inset-0 transition-transform duration-500 ease-out",
                    isActive ? "translate-y-0" : isPrev ? "-translate-y-full" : "translate-y-full",
                  )}
                >
                  <ProfileCard imageUrl={f.image} title={f.label} description={f.description} />
                </div>
              );
            })}
          </div>

          {/* Vertikaler Fortschritt statt Pfeile/Punkte-Navigation — rein
              informativ, klickbar zum direkten Anspringen einer Leistung. */}
          <div className="mt-6 flex items-center gap-2">
            {features.map((f, i) => (
              <button
                key={f.id}
                type="button"
                aria-label={f.label}
                aria-current={i === active}
                onClick={() => {
                  const track = trackRef.current;
                  if (!track) return;
                  const total = track.getBoundingClientRect().height - window.innerHeight;
                  const targetProgress = (i + 0.5) / features.length;
                  window.scrollTo({ top: window.scrollY + track.getBoundingClientRect().top + total * targetProgress, behavior: "smooth" });
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "w-6 bg-brand-orange" : "w-1.5 bg-brand-navy/20 hover:bg-brand-navy/40",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeistungenTabs;
