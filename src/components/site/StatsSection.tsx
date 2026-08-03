import { useEffect, useRef, useState } from "react";
import {
  Award,
  BadgeCheck,
  CarFront,
  CircleGauge,
  Clock4,
  ShieldCheck,
  Sparkles,
  Star,
  TriangleAlert,
  UsersRound,
  Wrench,
} from "lucide-react";
import { WA_UNFALL } from "@/components/site/site-data";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.17 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

type Stat = {
  icon: typeof CarFront;
  value: number;
  suffix?: string;
  label: string;
  hint: string;
};

const stats: Stat[] = [
  { icon: Wrench, value: 4800, suffix: "+", label: "Reparierte Fahrzeuge", hint: "bis heute in unserer Meisterwerkstatt" },
  { icon: Clock4, value: 15, suffix: "+", label: "Jahre Erfahrung", hint: "seit 2010 für Sie im Einsatz" },
  { icon: Star, value: 98, suffix: "%", label: "Kundenzufriedenheit", hint: "aus Bewertungen unserer Kunden" },
  { icon: UsersRound, value: 12, label: "Versicherungspartner", hint: "direkte Abwicklung ohne Umwege" },
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
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
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
        className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 animate-pulse rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-orange), transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <span className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase backdrop-blur">
            <CircleGauge className="size-4 animate-[spin_6s_linear_infinite] text-brand-orange" aria-hidden="true" />
            Zahlen, die für uns sprechen
            <Sparkles className="size-3.5 animate-pulse text-brand-orange" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Vertrauen, das man <span className="text-brand-orange">messen</span> kann
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-500 ease-out hover:-translate-y-2 hover:border-brand-orange/60 hover:bg-white/10 hover:shadow-[0_20px_45px_-20px_var(--brand-orange)] ${
                inView ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span
                className="pointer-events-none absolute -inset-x-10 -top-24 h-40 -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                aria-hidden="true"
              />
              <span className="relative flex size-12 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange ring-1 ring-brand-orange/25 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand-orange/25">
                <s.icon className="size-5.5" strokeWidth={1.75} aria-hidden="true" />
                <span className="absolute inset-0 rounded-xl ring-1 ring-brand-orange/40 opacity-0 transition-all duration-700 group-hover:scale-150 group-hover:opacity-0 group-hover:animate-none" aria-hidden="true" />
              </span>
              <p className="mt-5 text-4xl font-bold tracking-tight tabular-nums">
                <Counter value={s.value} active={inView} />
                {s.suffix}
              </p>
              <p className="mt-1 text-sm font-semibold">{s.label}</p>
              <p className="mt-1 text-xs opacity-70">{s.hint}</p>
              <span className="absolute inset-x-6 bottom-0 h-px bg-linear-to-r from-transparent via-brand-orange to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm transition-all duration-700 delay-500 ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <span className="flex items-center gap-1.5 opacity-80 transition-opacity hover:opacity-100">
            <ShieldCheck className="size-4 text-brand-orange" strokeWidth={1.75} aria-hidden="true" /> Meisterbetrieb
          </span>
          <span className="flex items-center gap-1.5 opacity-80 transition-opacity hover:opacity-100">
            <CarFront className="size-4 text-brand-orange" strokeWidth={1.75} aria-hidden="true" /> Ersatzwagen verfügbar
          </span>
          <span className="flex items-center gap-1.5 opacity-80 transition-opacity hover:opacity-100">
            <BadgeCheck className="size-4 text-brand-orange" strokeWidth={1.75} aria-hidden="true" /> Versicherungspartner
          </span>
          <span className="flex items-center gap-1.5 opacity-80 transition-opacity hover:opacity-100">
            <Award className="size-4 text-brand-orange" strokeWidth={1.75} aria-hidden="true" /> Zertifizierte Qualität
          </span>
          <a
            href={WA_UNFALL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-brand-orange-foreground shadow-lg transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_12px_30px_-8px_var(--brand-orange)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
            <TriangleAlert className="size-4 animate-pulse" strokeWidth={2.25} aria-hidden="true" />
            Unfall passiert?
            <span className="mx-0.5 h-4 w-px bg-white/40" aria-hidden="true" />
            <WhatsAppIcon className="size-4 transition-transform duration-300 group-hover:scale-110" />
            Per WhatsApp melden
          </a>
        </div>
      </div>
    </section>
  );
}
