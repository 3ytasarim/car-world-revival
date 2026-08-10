import { ArrowUpRight, Sparkles } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";
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

const services = [
  { img: unfall, title: "Unfallservice", text: "Soforthilfe rund um die Uhr.", href: "/leistungen" },
  { img: abschlepp, title: "Abschleppdienst", text: "Schnelle Bergung und Transport.", href: "/leistungen" },
  { img: reparatur, title: "Fahrzeugreparatur", text: "Meisterhafte Instandsetzung.", href: "/leistungen" },
  { img: ersatzwagen, title: "Ersatzwagen", text: "Mobil bleiben ohne Wartezeit.", href: "/leistungen" },
  { img: versicherung, title: "Versicherungsabwicklung", text: "Papierkram? Übernehmen wir.", href: "/leistungen" },
  { img: reifen, title: "Reifenwechsel", text: "Wechsel und Einlagerung.", href: "/leistungen" },
  { img: scheibe, title: "Windschutzscheiben", text: "Steinschlag in Minuten repariert.", href: "/leistungen" },
  { img: tuev, title: "TÜV", text: "Prüfung ohne lange Wartezeit.", href: "/leistungen" },
  { img: wartung, title: "Inspektion & Wartung", text: "Nach Herstellervorgabe.", href: "/leistungen" },
];

export function ServicesSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section aria-labelledby="leistungen-title" className="relative overflow-hidden py-20">
      <div ref={ref} className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-sm font-semibold text-brand-orange">
            <Sparkles className="size-4" aria-hidden="true" />
            Alles aus einer Hand
          </span>
          <h2 id="leistungen-title" className="mt-4 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            <AnimatedText text="Unsere Leistungen" minWeight={300} maxWeight={800} delayMultiplier={0.05} />
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">Ein Ansprechpartner für alles rund um Ihr Fahrzeug.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <a
              key={s.title}
              href={s.href}
              className={`group relative flex h-72 flex-col justify-end overflow-hidden rounded-3xl shadow-md transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
            >
              <img
                src={s.img}
                alt={s.title}
                width={1024}
                height={768}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-linear-to-t from-brand-navy via-brand-navy/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
              <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 transition-all duration-500 group-hover:ring-2 group-hover:ring-brand-orange/60" />

              <div className="relative p-6 text-white">
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-white/80">{s.text}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange">
                  Termin anfragen
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
