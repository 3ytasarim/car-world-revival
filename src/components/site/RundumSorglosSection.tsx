import { useRef } from "react";
import { CarFront, Clock4, FileCheck2, PhoneCall, ShieldCheck, Star, Truck, UsersRound, Wrench } from "lucide-react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

import { AnimatedText } from "@/components/ui/animated-text";
import { Button3D } from "@/components/ui/button-3d";
import { RevealSlider } from "@/components/ui/reveal2";
import { PHONE_HREF } from "@/components/site/site-data";
import rundumBefore from "@/assets/rundum-before.jpg";
import rundumAfter from "@/assets/rundum-after.jpg";

const highlights = [
  {
    icon: Truck,
    title: "Abholen & Abschleppen",
    description: "Wir holen Ihr Fahrzeug ab und bringen es sicher zu uns in die Werkstatt.",
  },
  {
    icon: CarFront,
    title: "Ersatzwagen",
    description: "Bleiben Sie mobil — mit einem kostenlosen Ersatzwagen.",
  },
  {
    icon: FileCheck2,
    title: "Versicherungsabwicklung",
    description: "Wir übernehmen die komplette Kommunikation mit Ihrer Versicherung.",
  },
];

const stats = [
  { icon: Wrench, value: 4800, suffix: "+", label: "Reparierte Fahrzeuge" },
  { icon: Clock4, value: 15, suffix: "+", label: "Jahre Erfahrung" },
  { icon: Star, value: 98, suffix: "%", label: "Kundenzufriedenheit" },
  { icon: UsersRound, value: 12, suffix: "", label: "Versicherungspartner" },
];

export function RundumSorglosSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section ref={sectionRef} aria-labelledby="rundum-title" className="relative w-full overflow-hidden">
      <div className="relative py-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Inhalt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#5088C8]/30 bg-[#5088C8]/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#1B3A63] uppercase">
                <ShieldCheck className="size-4" aria-hidden="true" />
                Rundum abgesichert
              </span>

              <h2 id="rundum-title" className="mt-4 text-4xl tracking-tight sm:text-5xl">
                <AnimatedText text="Rundum-" minWeight={300} maxWeight={800} delayMultiplier={0.06} className="text-[#131F35]" />
                <AnimatedText text="sorglos" minWeight={300} maxWeight={800} delayMultiplier={0.06} className="text-[#5088C8]" />
                <AnimatedText text="-Paket" minWeight={300} maxWeight={800} delayMultiplier={0.06} className="text-[#131F35]" />
              </h2>

              <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
                Wir kümmern uns um alles — von der Abholung bis zur kompletten Abwicklung mit Ihrer Versicherung. Sie
                lehnen sich zurück, wir machen den Rest.
              </p>

              <div className="mt-6 grid gap-3">
                {highlights.map((h, i) => (
                  <motion.div
                    key={h.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group flex items-center gap-4 rounded-2xl border border-[#5088C8]/15 bg-white p-4 shadow-[0_20px_40px_-34px_rgba(19,31,53,0.4)] transition-colors hover:border-[#5088C8]/40"
                  >
                    <motion.span
                      animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3, delay: i * 0.15, ease: "easeInOut" }}
                      className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#5088C8]/12 text-[#1B3A63]"
                    >
                      <h.icon className="size-5" aria-hidden="true" />
                    </motion.span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#131F35] sm:text-base">{h.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{h.description}</p>
                    </div>
                    <ShieldCheck className="size-5 shrink-0 text-[#5088C8]" aria-hidden="true" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Button3D href={PHONE_HREF}>
                  <PhoneCall className="size-4" aria-hidden="true" />
                  Jetzt anrufen
                </Button3D>
              </div>
            </motion.div>

            {/* Vorher/Nachher */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7 }}
            >
              <RevealSlider
                beforeImage={{ src: rundumBefore, alt: "Unfallfahrzeug vor der Reparatur" }}
                afterImage={{ src: rundumAfter, alt: "Fahrzeug nach der Reparatur bei Car-World" }}
              />
            </motion.div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((s, i) => (
              <StatCounter key={s.label} {...s} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCounter({
  icon: Icon,
  value,
  suffix,
  label,
  delay,
}: {
  icon: typeof Wrench;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const spring = useSpring(0, { stiffness: 50, damping: 12 });
  const display = useTransform(spring, (latest) => Math.floor(latest).toLocaleString("de-DE"));

  if (isInView) spring.set(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center rounded-2xl border border-[#5088C8]/15 bg-gradient-to-b from-white to-[#F4F7FB] p-5 text-center shadow-[0_20px_40px_-34px_rgba(19,31,53,0.8)]"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-[#5088C8]/12 text-[#1B3A63]">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <p className="mt-3 flex items-baseline text-2xl font-bold text-[#131F35] sm:text-3xl">
        <motion.span>{display}</motion.span>
        <span>{suffix}</span>
      </p>
      <p className="mt-1 text-xs font-medium text-[#1B3A63]/70 sm:text-sm">{label}</p>
    </motion.div>
  );
}

export default RundumSorglosSection;
