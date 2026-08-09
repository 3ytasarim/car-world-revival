import { CarFront, ClipboardCheck, FileCheck2, Phone, PhoneCall, Truck, Wrench } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";
import { PHONE_HREF } from "./site-data";
import unfall from "@/assets/unfall.jpg";

const steps = [
  { icon: PhoneCall, title: "Anrufen" },
  { icon: Truck, title: "Fahrzeugaufnahme" },
  { icon: ClipboardCheck, title: "Schadensaufnahme" },
  { icon: FileCheck2, title: "Versicherungsabwicklung" },
  { icon: Wrench, title: "Reparatur" },
  { icon: CarFront, title: "Fahrzeugübergabe" },
];

export function ProcessSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section aria-labelledby="unfall-title" className="relative overflow-hidden bg-muted/40 py-20">
      <style>{`
        @keyframes cw-step-pulse { 0%,100%{transform:scale(1);opacity:.35} 50%{transform:scale(1.25);opacity:0} }
      `}</style>

      <div ref={ref} className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div
            className={`transition-all duration-700 ease-out ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-sm font-semibold text-brand-orange">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-2 animate-ping rounded-full bg-brand-orange opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-orange" />
              </span>
              Rundum-sorglos-Paket
            </span>
            <h2 id="unfall-title" className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Nach dem Unfall – was passiert jetzt?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ein Anruf genügt. Wir übernehmen alles Weitere – Abholung, Gutachten, Versicherung und Reparatur.
            </p>
            <a
              href={PHONE_HREF}
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-4 text-base font-semibold text-brand-orange-foreground shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_18px_40px_-14px_var(--brand-orange)]"
            >
              <Phone className="size-5 transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
              Jetzt anrufen
            </a>
          </div>

          <div
            className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-1000 ease-out ${
              inView ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
            }`}
          >
            <img
              src={unfall}
              alt="Unfallfahrzeug am Straßenrand"
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-4/3 w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-navy/60 via-transparent to-transparent" />
          </div>
        </div>

        <ol className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`group flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 text-center shadow-sm transition-all duration-700 ease-out hover:-translate-y-1.5 hover:border-brand-orange/40 hover:shadow-lg ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + i * 110}ms` }}
            >
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-brand-navy/6 text-brand-navy transition-colors duration-500 group-hover:bg-brand-navy group-hover:text-brand-orange">
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-brand-orange"
                  style={{ animation: `cw-step-pulse 3.2s ease-out ${i * 0.4}s infinite` }}
                  aria-hidden="true"
                />
                <s.icon className="relative size-6" strokeWidth={1.7} aria-hidden="true" />
                <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-brand-orange text-[11px] font-bold text-brand-orange-foreground shadow">
                  {i + 1}
                </span>
              </span>
              <span className="text-sm font-semibold">{s.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
