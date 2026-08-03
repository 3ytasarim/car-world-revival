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
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 2200);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section className="relative overflow-hidden bg-muted/40 py-16">
      <style>{`
        @keyframes cw-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes cw-beam { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }
        @keyframes cw-dot { 0%{left:-6%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{left:104%;opacity:0} }
        @keyframes cw-ring { 0%{transform:scale(0.85);opacity:.55} 100%{transform:scale(1.5);opacity:0} }
        @keyframes cw-drift { 0%{transform:translate3d(0,0,0)} 50%{transform:translate3d(12px,-14px,0)} 100%{transform:translate3d(0,0,0)} }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--brand-navy) 1px, transparent 1px), linear-gradient(to bottom, var(--brand-navy) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 78%)",
          animation: "cw-drift 18s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 size-[46rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-orange), transparent 65%)", animation: "cw-drift 22s ease-in-out infinite" }}
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
            className={`pointer-events-none absolute top-8 right-0 left-0 hidden h-px origin-left overflow-hidden bg-linear-to-r from-transparent via-brand-orange/40 to-transparent transition-transform duration-[1400ms] ease-out lg:block ${
              inView ? "scale-x-100" : "scale-x-0"
            }`}
            aria-hidden="true"
          >
            {inView ? (
              <span
                className="absolute top-0 h-px w-24 bg-linear-to-r from-transparent via-brand-orange to-transparent"
                style={{ animation: "cw-beam 3.6s linear infinite" }}
              />
            ) : null}
          </span>
          {inView ? (
            <span
              className="pointer-events-none absolute top-8 hidden size-2 -translate-y-1/2 rounded-full bg-brand-orange shadow-[0_0_12px_var(--brand-orange)] lg:block"
              style={{ animation: "cw-dot 5s linear infinite" }}
              aria-hidden="true"
            />
          ) : null}

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {steps.map((s, i) => {
              const isActive = inView && active === i;
              return (
                <div
                  key={s.title}
                  className={`group relative flex flex-col items-center text-center transition-all duration-700 ease-out ${
                    inView ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-95 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 130}ms` }}
                >
                  <span
                    className={`relative flex size-16 items-center justify-center rounded-2xl border bg-white shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-3 group-hover:border-brand-orange/40 group-hover:bg-brand-navy group-hover:text-brand-orange group-hover:shadow-[0_18px_38px_-16px_var(--brand-orange)] ${
                      isActive
                        ? "-translate-y-1.5 border-brand-orange/50 bg-brand-navy text-brand-orange shadow-lg"
                        : "border-brand-navy/10 text-brand-navy"
                    }`}
                    style={isActive ? undefined : { animation: `cw-float 4s ease-in-out ${i * 0.35}s infinite` }}
                  >
                    {isActive ? (
                      <span
                        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-brand-orange/60"
                        style={{ animation: "cw-ring 1.6s ease-out infinite" }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <s.icon
                      className={`size-7 transition-transform duration-500 group-hover:scale-115 ${isActive ? "scale-110" : ""}`}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <span
                      className={`absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-brand-orange text-[11px] font-bold text-brand-orange-foreground shadow ring-4 ring-muted/40 transition-all duration-500 group-hover:scale-115 ${
                        isActive ? "scale-115" : ""
                      }`}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <p className="mt-4 text-sm font-semibold transition-colors duration-300 group-hover:text-brand-orange">{s.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.text}</p>
                  <span
                    className={`mt-2 h-px w-10 bg-brand-orange transition-all duration-500 ${isActive ? "opacity-100" : "w-0 opacity-0"} group-hover:w-10 group-hover:opacity-100`}
                    aria-hidden="true"
                  />
                  {i < steps.length - 1 ? (
                    <ArrowRight
                      className={`absolute top-6 -right-4 hidden size-4 transition-all duration-500 lg:block ${
                        isActive ? "translate-x-1 text-brand-orange" : "text-brand-orange/40"
                      }`}
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <a
            href="/leistungen/unfallservice"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-orange-foreground shadow-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_14px_32px_-10px_var(--brand-orange)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
            Mehr zum Unfallservice
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
