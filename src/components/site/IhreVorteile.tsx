import { Car, CalendarClock, FileCheck2, ShieldCheck } from "lucide-react";

import { AnimatedText } from "@/components/ui/animated-text";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { TowTruckIcon } from "@/components/site/TowTruckIcon";
import { cn } from "@/lib/utils";

// Ersetzt die alte KPI-Kachelreihe (12 Jahre Erfahrung, Nr. 1 im Ahrtal, ...)
// direkt unter dem Hero. Statt Zahlen, die nur zeigen wie gut die Firma ist,
// beantwortet jede Karte direkt "Was habe ich davon?" — reiner Kundennutzen.
const vorteile = [
  { icon: Car, title: "Mobilitätsgarantie" },
  { icon: ShieldCheck, title: "TÜV-zertifiziert" },
  { icon: CalendarClock, title: "Schnelle Terminvereinbarung" },
  { icon: FileCheck2, title: "Komplette Versicherungsabwicklung" },
  // TowTruckIcon ist ein eingefärbtes PNG (kein currentColor-SVG wie die
  // anderen), braucht daher einen Filter statt einer Textfarbe für Weiß.
  { icon: TowTruckIcon, title: "Abhol- & Abschleppservice", iconClassName: "brightness-0 invert" },
];

function VorteilCard({ icon: Icon, title, iconClassName }: (typeof vorteile)[number]) {
  return (
    <div className="relative flex w-[min(88vw,420px)] shrink-0 items-center gap-5 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-orange to-[#3D6FA8] px-7 py-7 text-white shadow-[0_20px_45px_-20px_rgba(80,136,200,0.55)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "0.75rem 0.75rem",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-10 -top-24 h-40 -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/15 to-transparent"
      />
      <span className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
        <Icon className={cn("size-8", iconClassName)} aria-hidden="true" />
      </span>
      <h3 className="relative text-xl font-bold tracking-tight">{title}</h3>
    </div>
  );
}

export function IhreVorteile() {
  return (
    <section aria-labelledby="vorteile-title" className="relative bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="vorteile-title" className="text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            <AnimatedText text="Ihre " minWeight={300} maxWeight={800} delayMultiplier={0.06} className="text-[#131F35]" />
            <AnimatedText text="Vorteile" minWeight={300} maxWeight={800} delayMultiplier={0.06} className="text-brand-orange" />
          </h2>
          <p className="mt-3 text-muted-foreground">Das bekommen Sie, wenn Sie sich für Car-World entscheiden.</p>
        </div>

        <div className="mt-10 flex justify-center">
          <InfiniteSlider
            direction="vertical"
            reverse
            gap={20}
            duration={38}
            durationOnHover={90}
            className="h-[520px] w-full max-w-md [mask-image:linear-gradient(to_bottom,transparent_0%,#000_10%,#000_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_10%,#000_90%,transparent_100%)]"
          >
            {vorteile.map((v) => (
              <VorteilCard key={v.title} {...v} />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}

export default IhreVorteile;
