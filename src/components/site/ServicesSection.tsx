import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  CarFront,
  CircleDot,
  ClipboardCheck,
  FileCheck,
  Settings,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";

const services = [
  { icon: ShieldCheck, title: "Unfallservice", text: "Soforthilfe nach dem Unfall – vom Abschleppen bis zur Reparatur.", href: "/leistungen/unfallservice" },
  { icon: Truck, title: "Abschleppdienst", text: "Schnelle Bergung und Transport zu unserer Werkstatt.", href: "/leistungen/abschleppdienst" },
  { icon: Wrench, title: "Fahrzeugreparatur", text: "Professionelle Reparatur durch erfahrene Techniker.", href: "/leistungen/fahrzeugreparatur" },
  { icon: CarFront, title: "Ersatzwagen", text: "Mobil bleiben, während Ihr Fahrzeug repariert wird.", href: "/leistungen/ersatzwagen" },
  { icon: FileCheck, title: "Versicherungsabwicklung", text: "Wir übernehmen die komplette Kommunikation mit Ihrer Versicherung.", href: "/leistungen/versicherungsabwicklung" },
  { icon: CircleDot, title: "Reifenwechsel", text: "Saisonaler Reifenwechsel und Einlagerung.", href: "/leistungen/reifenwechsel" },
  { icon: Sparkles, title: "Windschutzscheiben", text: "Schnelle Windschutzscheiben-Reparatur und -Erneuerung.", href: "/leistungen/windschutzscheiben" },
  { icon: BadgeCheck, title: "TÜV", text: "Termingerechte Prüfung ohne lange Wartezeiten.", href: "/leistungen/tuev" },
  { icon: ClipboardCheck, title: "Inspektionen", text: "Regelmäßige Inspektion nach Herstellervorgabe.", href: "/leistungen/inspektionen" },
  { icon: Settings, title: "Wartung", text: "Vorsorge, die teure Reparaturen vermeidet.", href: "/leistungen/wartung" },
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
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function ServiceCard({ service, index, inView }: { service: (typeof services)[number]; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const Icon = service.icon;

  return (
    <a
      ref={cardRef}
      href={service.href}
      onMouseMove={handleMove}
      className={`group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-brand-navy/10 bg-white p-5 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-transparent hover:shadow-[0_24px_50px_-24px_var(--brand-orange)] ${
        inView ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
      }`}
      style={{ transitionDelay: inView ? `${index * 70}ms` : "0ms" }}
    >
      {/* rotating gradient frame */}
      <span
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from var(--cw-angle, 0deg), transparent 0deg, var(--brand-orange) 60deg, color-mix(in oklab, var(--brand-navy) 60%, transparent) 130deg, transparent 200deg, transparent 360deg)",
          padding: "1.5px",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          animation: "cw-svc-spin 4s linear infinite",
        }}
        aria-hidden="true"
      />
      {/* traveling frame highlight */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from var(--cw-angle, 0deg), transparent 0deg, color-mix(in oklab, var(--brand-orange) 70%, transparent) 20deg, transparent 45deg)",
          padding: "3px",
          filter: "blur(6px)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          animation: "cw-svc-spin 4s linear infinite",
        }}
        aria-hidden="true"
      />
      {/* idle breathing frame */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-brand-navy/10 transition-opacity duration-500 group-hover:opacity-0"
        style={{ animation: "cw-svc-breathe 3.5s ease-in-out infinite", animationDelay: `${index * 0.25}s` }}
        aria-hidden="true"
      />
      {/* cursor spotlight */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--brand-orange) 16%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* shine sweep */}
      <span
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-brand-orange/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%]"
        aria-hidden="true"
      />


      <span className="relative flex size-12 items-center justify-center rounded-xl bg-brand-navy/8 text-brand-navy transition-all duration-500 group-hover:rotate-6 group-hover:bg-brand-navy group-hover:text-brand-orange">
        <span
          className="pointer-events-none absolute inset-0 rounded-xl border border-brand-orange/50 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-0 group-hover:[animation:cw-svc-ring_1.4s_ease-out_infinite]"
          aria-hidden="true"
        />
        <Icon className="size-6 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.7} aria-hidden="true" />
      </span>

      <p className="relative font-semibold transition-colors duration-300 group-hover:text-brand-orange">{service.title}</p>
      <p className="relative text-sm text-muted-foreground">{service.text}</p>

      <span className="relative mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-brand-navy transition-colors duration-300 group-hover:text-brand-orange">
        Mehr erfahren
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-orange transition-all duration-500 group-hover:w-[7.5rem]" aria-hidden="true" />
      </span>
    </a>
  );
}

export function ServicesSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden py-16">
      <style>{`
        @keyframes cw-svc-ring { 0%{transform:scale(.9);opacity:.6} 100%{transform:scale(1.45);opacity:0} }
        @keyframes cw-svc-drift { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(-16px,14px,0)} }
      `}</style>
      <div
        className="pointer-events-none absolute -top-24 right-0 size-[34rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-orange), transparent 65%)", animation: "cw-svc-drift 20s ease-in-out infinite" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-sm font-semibold text-brand-orange">
            <Sparkles className="size-4 animate-pulse" aria-hidden="true" />
            Alles aus einer Hand
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Unsere Leistungen</h2>
          <p className="mt-3 text-lg text-muted-foreground">Ein Ansprechpartner für alles rund um Ihr Fahrzeug.</p>
          <span
            className={`mx-auto mt-5 block h-px bg-linear-to-r from-transparent via-brand-orange to-transparent transition-all duration-1000 ${inView ? "w-40 opacity-100" : "w-0 opacity-0"}`}
            aria-hidden="true"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
