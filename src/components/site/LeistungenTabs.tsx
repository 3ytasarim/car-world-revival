import { useEffect, useState } from "react";

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

// Ersetzt den horizontalen Klick-Carousel (Pfeile + Punkte unten) durch
// einen automatisch von oben nach unten wechselnden Kartenstapel — Punkte
// jetzt als vertikale Spalte rechts neben der Karte statt als Zeile
// darunter, passend zur vertikalen Bewegungsrichtung.
export function LeistungenTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % features.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

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

      <div
        className="relative z-10 mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 sm:gap-6 sm:px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative h-[520px] w-full max-w-3xl overflow-hidden sm:h-[440px]">
          {features.map((f, i) => {
            const isActive = i === active;
            const isPrev = i < active;
            return (
              <div
                key={f.id}
                className={cn(
                  "absolute inset-0 transition-transform duration-700 ease-in-out",
                  isActive ? "translate-y-0" : isPrev ? "-translate-y-full" : "translate-y-full",
                )}
              >
                <ProfileCard imageUrl={f.image} title={f.label} description={f.description} />
              </div>
            );
          })}
        </div>

        {/* Vertikale Fortschritts-Punkte rechts neben der Karte */}
        <div className="flex shrink-0 flex-col items-center gap-2.5">
          {features.map((f, i) => (
            <button
              key={f.id}
              type="button"
              aria-label={f.label}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "w-1.5 rounded-full transition-all",
                i === active ? "h-6 bg-brand-orange" : "h-1.5 bg-brand-navy/20 hover:bg-brand-navy/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeistungenTabs;
