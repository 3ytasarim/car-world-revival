import { Award, ShieldCheck, Star, Trophy } from "lucide-react";

import { TrustCard } from "@/components/ui/trust-card";

// 3 starke, belegbare Vertrauenspunkte statt vieler Zahlen — direkt nach dem
// Hero, damit der Nutzer schon in den ersten Scrolls genug Beweis sieht, um
// Car-World zu vertrauen. Die klassischen KPI-Zahlen (Reparaturen, Google-
// Bewertung, Versicherungspartner) bleiben weiter unten im Rundum-sorglos-
// Bereich — als vertiefender Beleg, nicht als erster Eindruck.
const points = [
  {
    icon: ShieldCheck,
    title: "TÜV Zertifiziert",
    text: "Geprüfte Qualität nach offiziellem Standard.",
  },
  {
    icon: Award,
    title: "12+ Jahre Erfahrung",
    text: "Meisterbetrieb mit langjähriger Praxis.",
  },
  {
    icon: Trophy,
    title: "Nr. 1 im Ahrtal",
    text: "Die meistgewählte Werkstatt der Region.",
  },
  {
    icon: Star,
    title: "1.500+ positive Bewertungen",
    text: "Die Meinung unser Kunden ist uns wichtig.",
  },
];

export function TrustArea() {
  return (
    <section aria-label="Vertrauenspunkte" className="relative bg-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 sm:py-12 lg:grid-cols-4">
        {points.map((p) => (
          <TrustCard
            key={p.title}
            title={p.title}
            description={p.text}
            icon={<p.icon className="size-6" aria-hidden="true" />}
          />
        ))}
      </div>
    </section>
  );
}

export default TrustArea;
