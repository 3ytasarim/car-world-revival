import { CarFront, Clock, FileCheck2, PhoneCall, ShieldCheck, Truck } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";
import { PHONE_LABEL, PHONE_HREF, WA_UNFALL } from "./site-data";

const items = [
  { icon: PhoneCall, title: "Ein Anruf genügt", text: "Wir starten sofort." },
  { icon: Truck, title: "Abholung & Abschleppen", text: "Wir holen Ihr Auto." },
  { icon: FileCheck2, title: "Versicherung", text: "Papierkram machen wir." },
  { icon: CarFront, title: "Ersatzwagen", text: "Sie bleiben mobil." },
  { icon: ShieldCheck, title: "Reparatur mit Garantie", text: "Meisterbetrieb." },
  { icon: Clock, title: "Rückgabe", text: "Gereinigt & fertig." },
];

export function RundumSorglos() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section aria-labelledby="rundum-title" className="relative overflow-hidden bg-brand-navy text-brand-navy-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-brand-orange/20 blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-orange uppercase">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Alles aus einer Hand
          </span>
          <h2 id="rundum-title" className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Das <span className="text-brand-orange">Rundum-sorglos-Paket</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base opacity-85 sm:text-lg">
            Unfall, Schaden oder Wartung? Sie rufen an — wir übernehmen alles Weitere.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
          {items.map((item, i) => (
            <li
              key={item.title}
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 hover:border-brand-orange/50 hover:bg-white/10 ${
                inView ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
              }`}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <item.icon
                className="size-7 text-brand-orange transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                aria-hidden="true"
              />
              <p className="mt-3 text-sm font-semibold">{item.title}</p>
              <p className="mt-1 text-xs opacity-70">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={WA_UNFALL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-7 text-sm font-semibold text-brand-orange-foreground transition-transform hover:scale-[1.03] sm:w-auto"
          >
            Jetzt per WhatsApp melden
          </a>
          <a
            href={PHONE_HREF}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 text-sm font-semibold transition-colors hover:bg-white/10 sm:w-auto"
          >
            <PhoneCall className="size-4" aria-hidden="true" />
            {PHONE_LABEL}
          </a>
        </div>
        <p className="mt-4 text-center text-xs opacity-70">Per WhatsApp 7/24 erreichbar — auch am Wochenende.</p>
      </div>
    </section>
  );
}
