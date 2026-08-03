import { useEffect, useRef, useState } from "react";
import { CarFront, ClipboardCheck, FileCheck2, PhoneCall, Truck, Wrench, ArrowRight } from "lucide-react";

const steps = [
  { icon: PhoneCall, title: "Anrufen", text: "Sie melden sich telefonisch oder per WhatsApp bei uns." },
  { icon: Truck, title: "Fahrzeugabholung", text: "Wir holen Ihr Fahrzeug ab oder organisieren den Abschleppdienst." },
  { icon: ClipboardCheck, title: "Schadensaufnahme", text: "Unsere Meister begutachten den Schaden transparent und dokumentiert." },
  { icon: FileCheck2, title: "Versicherungsabwicklung", text: "Wir übernehmen die komplette Kommunikation mit Ihrer Versicherung." },
  { icon: Wrench, title: "Reparatur", text: "Fachgerechte Instandsetzung mit laufenden Status-Updates." },
  { icon: CarFront, title: "Fahrzeugübergabe", text: "Sie erhalten Ihr Fahrzeug sauber und einsatzbereit zurück." },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

export function ProcessSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-muted/40 py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--brand-navy) 1px, transparent 1px), linear-gradient(to bottom, var(--brand-navy) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 78%)",
        }}
        aria-hidden="true"
      />
      <div ref={ref} className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-sm font-semibold text-brand-orange">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-brand-orange opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-orange" />
            </span>
            Rundum-Sorglos-Paket
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Nach dem Unfall: So läuft es ab</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Unser Rundum-Sorglos-Paket nimmt Ihnen jeden Schritt ab.
          </p>
        </div>

        <div className="relative mt-12">
          <span
            className={`pointer-events-none absolute top-8 right-0 left-0 hidden h-px origin-left bg-linear-to-r from-transparent via-brand-orange/50 to-transparent transition-transform duration-[1400ms] ease-out lg:block ${
              inView ? "scale-x-100" : "scale-x-0"
            }`}
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className={`group relative flex flex-col items-center text-center transition-all duration-700 ease-out ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 130}ms` }}
              >
                <span className="relative flex size-16 items-center justify-center rounded-2xl border border-brand-navy/10 bg-white text-brand-navy shadow-sm transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-brand-orange/40 group-hover:bg-brand-navy group-hover:text-brand-orange group-hover:shadow-lg">
                  <s.icon className="size-7 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.6} aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-brand-orange text-[11px] font-bold text-brand-orange-foreground shadow ring-4 ring-muted/40 transition-transform duration-500 group-hover:scale-110">
                    {i + 1}
                  </span>
                </span>
                <p className="mt-4 text-sm font-semibold">{s.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.text}</p>
                {i < steps.length - 1 ? (
                  <ArrowRight
                    className="absolute top-6 -right-4 hidden size-4 text-brand-orange/50 lg:block"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <a
            href="/leistungen/unfallservice"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-orange-foreground shadow-lg transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_14px_32px_-10px_var(--brand-orange)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
            Mehr zum Unfallservice
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
