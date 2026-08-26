import { Car, CalendarClock, FileCheck2, ShieldCheck } from "lucide-react";

import { AnimatedText } from "@/components/ui/animated-text";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { TowTruckIcon } from "@/components/site/TowTruckIcon";

// Ersetzt die alte KPI-Kachelreihe (12 Jahre Erfahrung, Nr. 1 im Ahrtal, ...)
// direkt unter dem Hero. Statt Zahlen, die nur zeigen wie gut die Firma ist,
// beantwortet jede Karte direkt "Was habe ich davon?" — reiner Kundennutzen.
const vorteile = [
  {
    icon: Car,
    title: "Mobilitätsgarantie",
    text: "Ersatzwagen und Mobilität, damit Sie ohne Unterbrechung unterwegs bleiben.",
  },
  {
    icon: ShieldCheck,
    title: "TÜV-zertifiziert",
    text: "Geprüfte Qualität nach offiziellem Standard, auf die Sie sich verlassen können.",
  },
  {
    icon: CalendarClock,
    title: "Schnelle Terminvereinbarung",
    text: "Ihr Termin in wenigen Minuten, unkompliziert per WhatsApp oder Anruf.",
  },
  {
    icon: FileCheck2,
    title: "Komplette Versicherungsabwicklung",
    text: "Wir kümmern uns um die Abwicklung mit Ihrer Versicherung.",
  },
  {
    icon: TowTruckIcon,
    title: "Abhol- & Abschleppservice",
    text: "Wir holen Ihr Fahrzeug nach einem Unfall ab und bringen es sicher in die Werkstatt.",
  },
];

function VorteilCard({ icon: Icon, title, text }: (typeof vorteile)[number]) {
  return (
    <div className="relative flex w-full shrink-0 items-start gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-orange to-[#3D6FA8] p-6 text-white shadow-[0_20px_45px_-20px_rgba(80,136,200,0.55)]">
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
      <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <div className="relative">
        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
        <p className="mt-1 text-sm text-white/85">{text}</p>
      </div>
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
