import { useEffect, useRef, useState } from "react";
import { Award, Car, Clock, Gauge, ShieldCheck, Star, Users, Wrench } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { WA_UNFALL } from "@/components/site/site-data";

type Stat = {
  icon: typeof Car;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  hint: string;
};

const stats: Stat[] = [
  { icon: Wrench, value: 4800, suffix: "+", label: "Reparierte Fahrzeuge", hint: "bis heute in unserer Meisterwerkstatt" },
  { icon: Clock, value: 15, suffix: "+", label: "Jahre Erfahrung", hint: "seit 2010 für Sie im Einsatz" },
  { icon: Star, value: 98, suffix: "%", label: "Kundenzufriedenheit", hint: "aus Bewertungen unserer Kunden" },
  { icon: Users, value: 12, label: "Versicherungspartner", hint: "direkte Abwicklung ohne Umwege" },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function Counter({ value, active }: { value: number; active: boolean }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);
  return <>{display.toLocaleString("de-DE")}</>;
}

export function StatsSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden border-y bg-brand-navy text-brand-navy-foreground">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-orange), transparent 65%)" }}
        aria-hidden="true"
      />
      <div ref={ref} className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase backdrop-blur">
            <Gauge className="size-4 text-brand-orange" aria-hidden="true" />
            Zahlen, die für uns sprechen
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Vertrauen, das man <span className="text-brand-orange">messen</span> kann
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-brand-orange/50 hover:bg-white/10 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange transition-transform duration-300 group-hover:scale-110">
                <s.icon className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-5 text-4xl font-bold tracking-tight tabular-nums">
                {s.prefix}
                <Counter value={s.value} active={inView} />
                {s.suffix}
              </p>
              <p className="mt-1 text-sm font-semibold">{s.label}</p>
              <p className="mt-1 text-xs opacity-70">{s.hint}</p>
              <span className="absolute inset-x-6 bottom-0 h-px bg-linear-to-r from-transparent via-brand-orange to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          <span className="flex items-center gap-1.5 opacity-80">
            <ShieldCheck className="size-4 text-brand-orange" aria-hidden="true" /> Meisterbetrieb
          </span>
          <span className="flex items-center gap-1.5 opacity-80">
            <Car className="size-4 text-brand-orange" aria-hidden="true" /> Ersatzwagen verfügbar
          </span>
          <span className="flex items-center gap-1.5 opacity-80">
            <Award className="size-4 text-brand-orange" aria-hidden="true" /> Versicherungspartner
          </span>
          <a
            href={WA_UNFALL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-4 py-2 text-sm font-medium text-brand-orange-foreground transition-transform hover:scale-[1.03]"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Unfall passiert? Per WhatsApp melden
          </a>
        </div>
      </div>
    </section>
  );
}
