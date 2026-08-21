import { Sparkles } from "lucide-react";

import { AnimatedText } from "@/components/ui/animated-text";
import { Gallery4 } from "@/components/ui/gallery4";
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

        <div className="mt-12">
          <Gallery4
            items={services.map((s) => ({ id: s.id, title: s.title, description: s.text, image: s.img, href: s.wa }))}
          />
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
