import { ArrowRight, Sparkles } from "lucide-react";

import { AnimatedText } from "@/components/ui/animated-text";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import {
  WA_UNFALL,
  WA_ABSCHLEPP,
  WA_REPARATUR,
  WA_ERSATZWAGEN,
  WA_VERSICHERUNG,
  WA_REIFEN,
  WA_SCHEIBE,
  WA_TUEV,
  WA_INSPEKTION,
} from "./site-data";
import unfall from "@/assets/unfall.jpg";
import abschlepp from "@/assets/svc-abschlepp.jpg";
import reparatur from "@/assets/svc-reparatur.jpg";
import ersatzwagen from "@/assets/svc-ersatzwagen.jpg";
import versicherung from "@/assets/svc-versicherung.jpg";
import reifen from "@/assets/svc-reifen.jpg";
import scheibe from "@/assets/svc-scheibe.jpg";
import tuev from "@/assets/svc-tuev.jpg";
import wartung from "@/assets/svc-wartung.jpg";

const services = [
  { id: "unfall", img: unfall, title: "Unfallservice", text: "Soforthilfe rund um die Uhr.", wa: WA_UNFALL },
  { id: "abschlepp", img: abschlepp, title: "Abschleppdienst", text: "Schnelle Bergung und Transport.", wa: WA_ABSCHLEPP },
  { id: "reparatur", img: reparatur, title: "Fahrzeugreparatur", text: "Meisterhafte Instandsetzung.", wa: WA_REPARATUR },
  { id: "ersatzwagen", img: ersatzwagen, title: "Ersatzwagen", text: "Mobil bleiben ohne Wartezeit.", wa: WA_ERSATZWAGEN },
  {
    id: "versicherung",
    img: versicherung,
    title: "Versicherungsabwicklung",
    text: "Papierkram? Übernehmen wir.",
    wa: WA_VERSICHERUNG,
  },
  { id: "reifen", img: reifen, title: "Reifenwechsel", text: "Wechsel und Einlagerung.", wa: WA_REIFEN },
  { id: "scheibe", img: scheibe, title: "Windschutzscheiben", text: "Steinschlag in Minuten repariert.", wa: WA_SCHEIBE },
  { id: "tuev", img: tuev, title: "TÜV", text: "Prüfung ohne lange Wartezeit.", wa: WA_TUEV },
  { id: "wartung", img: wartung, title: "Inspektion & Wartung", text: "Nach Herstellervorgabe.", wa: WA_INSPEKTION },
];

// Gleiche dunkle Bild-Overlay-Karte wie zuvor (Gallery4), aber jetzt in
// einer einzigen, automatisch von oben nach unten laufenden Spalte statt
// eines horizontalen Klick-Carousels mit Pfeilen/Punkten.
function ServiceCard({ img, title, text, wa }: (typeof services)[number]) {
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-[min(90vw,420px)] shrink-0 overflow-hidden rounded-xl"
    >
      <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 h-full bg-gradient-to-t from-brand-navy from-10% via-brand-navy/60 via-60% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white">
          <div className="text-xl font-semibold">{title}</div>
          <div className="mt-2 mb-4 text-white/80">{text}</div>
          <div className="flex items-center text-sm font-semibold">
            Per WhatsApp anfragen
            <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </div>
        </div>
      </div>
    </a>
  );
}

export function ServicesSection() {
  return (
    <section aria-labelledby="leistungen-title" className="relative overflow-hidden py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-sm font-semibold text-brand-orange">
            <Sparkles className="size-4" aria-hidden="true" />
            Alles aus einer Hand
          </span>
          <h2 id="leistungen-title" className="mt-4 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            <AnimatedText text="Unsere Leistungen" minWeight={300} maxWeight={800} delayMultiplier={0.05} />
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">Ein Ansprechpartner für alles rund um Ihr Fahrzeug.</p>
        </div>

        {/* Desktop/Tablet: horizontal, wie ursprünglich auf dieser Seite.
            Mobile: vertikal (kein Platz für eine breite horizontale Reihe). */}
        <div className="mt-12 hidden sm:block">
          <InfiniteSlider
            direction="horizontal"
            gap={24}
            duration={40}
            durationOnHover={100}
            className="w-full [mask-image:linear-gradient(to_right,transparent_0%,#000_1.5%,#000_98.5%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_1.5%,#000_98.5%,transparent_100%)]"
          >
            {services.map((s) => (
              <ServiceCard key={s.id} {...s} />
            ))}
          </InfiniteSlider>
        </div>
        <div className="mt-12 flex justify-center sm:hidden">
          <InfiniteSlider
            direction="vertical"
            reverse
            gap={24}
            duration={34}
            durationOnHover={90}
            className="h-[600px] w-full max-w-md [mask-image:linear-gradient(to_bottom,transparent_0%,#000_10%,#000_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_10%,#000_90%,transparent_100%)]"
          >
            {services.map((s) => (
              <ServiceCard key={s.id} {...s} />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
