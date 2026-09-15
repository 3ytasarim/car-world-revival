import { ArrowRight, Sparkles } from "lucide-react";

import { AnimatedText } from "@/components/ui/animated-text";
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

interface Service {
  id: string;
  img: string;
  title: string;
  text: string;
  wa: string;
  /** Eigene Detailseite (/leistungen/<slug>) statt direktem WhatsApp-Link —
   * wird pro Leistung erst gesetzt, sobald die Seite existiert. */
  href?: string;
}

const services: Service[] = [
  {
    id: "unfall",
    img: unfall,
    title: "Unfallservice",
    text: "Soforthilfe rund um die Uhr.",
    wa: WA_UNFALL,
    href: "/leistungen/unfallservice",
  },
  {
    id: "abschlepp",
    img: abschlepp,
    title: "Abschleppdienst",
    text: "Schnelle Bergung und Transport.",
    wa: WA_ABSCHLEPP,
    href: "/leistungen/abschleppdienst",
  },
  {
    id: "reparatur",
    img: reparatur,
    title: "Fahrzeugreparatur",
    text: "Meisterhafte Instandsetzung.",
    wa: WA_REPARATUR,
    href: "/leistungen/fahrzeugreparatur",
  },
  {
    id: "ersatzwagen",
    img: ersatzwagen,
    title: "Ersatzwagen",
    text: "Mobil bleiben ohne Wartezeit.",
    wa: WA_ERSATZWAGEN,
    href: "/leistungen/ersatzwagen",
  },
  {
    id: "versicherung",
    img: versicherung,
    title: "Versicherungsabwicklung",
    text: "Papierkram? Übernehmen wir.",
    wa: WA_VERSICHERUNG,
    href: "/leistungen/versicherungsabwicklung",
  },
  {
    id: "reifen",
    img: reifen,
    title: "Reifenwechsel",
    text: "Wechsel und Einlagerung.",
    wa: WA_REIFEN,
    href: "/leistungen/reifenwechsel",
  },
  {
    id: "scheibe",
    img: scheibe,
    title: "Windschutzscheiben",
    text: "Steinschlag in Minuten repariert.",
    wa: WA_SCHEIBE,
    href: "/leistungen/windschutzscheiben",
  },
  {
    id: "tuev",
    img: tuev,
    title: "TÜV",
    text: "Prüfung ohne lange Wartezeit.",
    wa: WA_TUEV,
    href: "/leistungen/tuev",
  },
  {
    id: "wartung",
    img: wartung,
    title: "Inspektion & Wartung",
    text: "Nach Herstellervorgabe.",
    wa: WA_INSPEKTION,
    href: "/leistungen/inspektion-wartung",
  },
];

// Gleiche dunkle Bild-Overlay-Karte wie zuvor (Gallery4), aber jetzt in
// einer einzigen, automatisch von oben nach unten laufenden Spalte statt
// eines horizontalen Klick-Carousels mit Pfeilen/Punkten.
function ServiceCard({ img, title, text, wa, href }: Service) {
  const isInternal = Boolean(href);
  return (
    <a
      href={href ?? wa}
      target={isInternal ? undefined : "_blank"}
      rel={isInternal ? undefined : "noopener noreferrer"}
      className="group block overflow-hidden rounded-xl"
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
            {isInternal ? "Zum Service" : "Per WhatsApp anfragen"}
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

        {/* Statisches Karten-Grid statt Marquee — gleiche Darstellung wie
            "Unsere Leistungen" auf der Startseite: alle Karten gleichzeitig
            sichtbar, auf Mobile gestapelt. */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
