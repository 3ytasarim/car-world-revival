import { ArrowRight } from "lucide-react";

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
} from "@/components/site/site-data";

import unfall from "@/assets/unfall.jpg";
import abschlepp from "@/assets/svc-abschlepp.jpg";
import reparatur from "@/assets/svc-reparatur.jpg";
import ersatzwagen from "@/assets/svc-ersatzwagen.jpg";
import versicherung from "@/assets/svc-versicherung.jpg";
import reifen from "@/assets/svc-reifen.jpg";
import scheibe from "@/assets/svc-scheibe.jpg";
import tuev from "@/assets/svc-tuev.jpg";
import wartung from "@/assets/svc-wartung.jpg";

interface Feature {
  id: string;
  label: string;
  image: string;
  description: string;
  wa: string;
  /** Eigene Detailseite (/leistungen/<slug>) statt direktem WhatsApp-Link —
   * wird pro Leistung erst gesetzt, sobald die Seite existiert. */
  href?: string;
}

// Reihenfolge laut Revisionsliste (08.10.2026): Unfallservice zuerst,
// Windschutzscheiben direkt danach, Rest in bisheriger Reihenfolge.
// Texte direkter an den Besucher gerichtet ("Sie"/"Ihr") statt reiner
// Feature-Aufzählung.
const features: Feature[] = [
  {
    id: "unfall",
    label: "Unfallservice",
    image: unfall,
    description: "Jetzt einen Unfall gehabt? Wir sind sofort für Sie da — rund um die Uhr.",
    wa: WA_UNFALL,
    href: "/leistungen/unfallservice",
  },
  {
    id: "scheibe",
    label: "Windschutzscheiben",
    image: scheibe,
    description: "Steinschlag entdeckt? In Minuten repariert, bei Bedarf tauschen wir die Scheibe komplett.",
    wa: WA_SCHEIBE,
    href: "/leistungen/windschutzscheiben",
  },
  {
    id: "abschlepp",
    label: "Abschleppdienst",
    image: abschlepp,
    description: "Wir holen Ihr Fahrzeug schnell ab und bringen es sicher in unsere Meisterwerkstatt.",
    wa: WA_ABSCHLEPP,
    href: "/leistungen/abschleppdienst",
  },
  {
    id: "reparatur",
    label: "Fahrzeugreparatur",
    image: reparatur,
    description: "Karosserie, Lack oder Technik — wir bringen Ihr Fahrzeug meisterhaft wieder in Form.",
    wa: WA_REPARATUR,
    href: "/leistungen/fahrzeugreparatur",
  },
  {
    id: "ersatzwagen",
    label: "Ersatzwagen",
    image: ersatzwagen,
    description: "Bleiben Sie mobil, ohne Wartezeit — Ihr Ersatzfahrzeug steht direkt vor Ort bereit.",
    wa: WA_ERSATZWAGEN,
    href: "/leistungen/ersatzwagen",
  },
  {
    id: "versicherung",
    label: "Versicherungsabwicklung",
    image: versicherung,
    description: "Den kompletten Papierkram mit Ihrer Versicherung übernehmen wir für Sie.",
    wa: WA_VERSICHERUNG,
    href: "/leistungen/versicherungsabwicklung",
  },
  {
    id: "reifen",
    label: "Reifenwechsel",
    image: reifen,
    description: "Reifenwechsel, Auswuchten und Einlagerung — schnell und ohne Umwege erledigt.",
    wa: WA_REIFEN,
    href: "/leistungen/reifenwechsel",
  },
  {
    id: "tuev",
    label: "TÜV & AU",
    image: tuev,
    description: "Hauptuntersuchung fällig? Bei uns ohne lange Wartezeit, direkt vor Ort.",
    wa: WA_TUEV,
    href: "/leistungen/tuev",
  },
  {
    id: "wartung",
    label: "Inspektion & Wartung",
    image: wartung,
    description: "Service nach Herstellervorgabe — mit vollem Erhalt Ihrer Garantie.",
    wa: WA_INSPEKTION,
    href: "/leistungen/inspektion-wartung",
  },
];

// Statisches 3x3-Karten-Grid statt des automatisch wechselnden Kartenstapels
// — alle 9 Leistungen gleichzeitig sichtbar, auf Mobile gestapelt.
function LeistungCard({ image, label, description, wa, href }: Feature) {
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
          src={image}
          alt={label}
          loading="lazy"
          className="absolute h-full w-full object-cover object-center brightness-110 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 h-full bg-gradient-to-t from-black/70 from-5% via-black/15 via-55% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-5 text-white">
          <div className="text-lg font-semibold">{label}</div>
          <div className="mt-1.5 mb-3 text-sm text-white/80">{description}</div>
          <div className="flex items-center text-sm font-semibold">
            {isInternal ? "Zum Service" : "Per WhatsApp anfragen"}
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </div>
        </div>
      </div>
    </a>
  );
}

export function LeistungenTabs() {
  return (
    <section aria-labelledby="leistungen-title" className="relative overflow-hidden py-20">
      <div className="relative z-10 mx-auto mb-10 max-w-3xl px-4 text-center">
        <h2 id="leistungen-title" className="text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
          <AnimatedText text="Unsere Leistungen" minWeight={300} maxWeight={800} delayMultiplier={0.05} />
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">Ein Ansprechpartner für alles rund um Ihr Fahrzeug.</p>
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 sm:grid-cols-3 sm:px-6">
        {features.map((f) => (
          <LeistungCard key={f.id} {...f} />
        ))}
      </div>
    </section>
  );
}

export default LeistungenTabs;
