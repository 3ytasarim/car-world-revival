import { VerticalTabs, type VerticalTabItem } from "@/components/ui/vertical-tabs";
import { AnimatedText } from "@/components/ui/animated-text";

import unfall from "@/assets/unfall.jpg";
import abschlepp from "@/assets/svc-abschlepp.jpg";
import reparatur from "@/assets/svc-reparatur.jpg";
import ersatzwagen from "@/assets/svc-ersatzwagen.jpg";
import versicherung from "@/assets/svc-versicherung.jpg";
import reifen from "@/assets/svc-reifen.jpg";
import scheibe from "@/assets/svc-scheibe.jpg";
import tuev from "@/assets/svc-tuev.jpg";
import wartung from "@/assets/svc-wartung.jpg";

const items: VerticalTabItem[] = [
  { title: "Unfallservice", description: "Soforthilfe rund um die Uhr — wir organisieren alles nach dem Unfall.", image: unfall },
  { title: "Abschleppdienst", description: "Schnelle Bergung und sicherer Transport in unsere Meisterwerkstatt.", image: abschlepp },
  { title: "Fahrzeugreparatur", description: "Meisterhafte Instandsetzung von Karosserie, Lack und Technik.", image: reparatur },
  { title: "Ersatzwagen", description: "Mobil bleiben ohne Wartezeit — Ersatzfahrzeug direkt vor Ort.", image: ersatzwagen },
  { title: "Versicherungsabwicklung", description: "Den Papierkram mit Ihrer Versicherung übernehmen wir komplett.", image: versicherung },
  { title: "Reifenwechsel", description: "Wechsel, Auswuchten und Einlagerung Ihrer Räder.", image: reifen },
  { title: "Windschutzscheiben", description: "Steinschlag in Minuten repariert oder Scheibe komplett getauscht.", image: scheibe },
  { title: "TÜV & AU", description: "Hauptuntersuchung ohne lange Wartezeit direkt bei uns.", image: tuev },
  { title: "Inspektion & Wartung", description: "Service nach Herstellervorgabe — mit Garantieerhalt.", image: wartung },
].map((s, i) => ({ ...s, id: String(i + 1).padStart(2, "0"), href: "/termin" }));

export function LeistungenTabs() {
  return (
    <section aria-labelledby="leistungen-title" className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto mb-10 max-w-3xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-sm font-semibold text-brand-orange">
          Alles aus einer Hand
        </span>
        <h2 id="leistungen-title" className="mt-4 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
          <AnimatedText text="Unsere Leistungen" minWeight={300} maxWeight={800} delayMultiplier={0.05} />
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">Ein Ansprechpartner für alles rund um Ihr Fahrzeug.</p>
      </div>

      <VerticalTabs items={items} heading="Wie wir Ihnen helfen" />
    </section>
  );
}

export default LeistungenTabs;
