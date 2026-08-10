import { useRef } from "react";
import {
  CarFront,
  Clock4,
  FileCheck2,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  UsersRound,
  Wrench,
} from "lucide-react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";

import { AnimatedText } from "@/components/ui/animated-text";
import { AnimatedBackgroundLines } from "@/components/animated-background-lines";
import { Button3D } from "@/components/ui/button-3d";
import { PHONE_HREF } from "@/components/site/site-data";
import werkstattFoto from "@/assets/svc-reparatur.jpg";

const services = [
  { icon: PhoneCall, title: "Ein Anruf genügt", position: "left" as const },
  { icon: Truck, title: "Abholung & Abschleppen", position: "left" as const },
  { icon: FileCheck2, title: "Versicherungsabwicklung", position: "left" as const },
  { icon: CarFront, title: "Ersatzwagen", position: "right" as const },
  { icon: ShieldCheck, title: "Reparatur mit Garantie", position: "right" as const },
  { icon: Sparkles, title: "Gereinigte Rückgabe", position: "right" as const },
];

const stats = [
  { icon: Wrench, value: 4800, suffix: "+", label: "Reparierte Fahrzeuge" },
  { icon: Clock4, value: 15, suffix: "+", label: "Jahre Erfahrung" },
  { icon: Star, value: 98, suffix: "%", label: "Kundenzufriedenheit" },
  { icon: UsersRound, value: 12, suffix: "", label: "Versicherungspartner" },
];

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function RundumSorglosSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="rundum-title"
      className="relative w-full overflow-hidden"
    >

      <div className="relative py-16 sm:py-24">
        <motion.div
          style={{ y: y1 }}
          className="pointer-events-none absolute -top-24 -left-24 size-[420px] rounded-full bg-[#5088C8]/10 blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="pointer-events-none absolute -right-24 -bottom-24 size-[420px] rounded-full bg-[#1B3A63]/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#5088C8]/30 bg-[#5088C8]/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#1B3A63] uppercase">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Nach dem Unfall – was passiert jetzt?
          </span>
          <h2 id="rundum-title" className="mt-4 text-3xl tracking-tight text-[#1B3A63] sm:text-5xl">
            <AnimatedText
              text="Rundum-sorglos-Paket"
              minWeight={300}
              maxWeight={800}
              delayMultiplier={0.06}
            />
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#1B3A63] to-[#5088C8]" />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.4fr_1fr]">
          <div className="flex flex-col gap-6">
            {services
              .filter((s) => s.position === "left")
              .map((s, i) => (
                <ServiceItem key={s.title} {...s} delay={i * 0.15} align="right" isInView={isInView} />
              ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="order-first lg:order-none"
          >
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-[#5088C8]/20 shadow-[0_30px_60px_-30px_rgba(19,31,53,0.55)] lg:max-w-md">
              <img
                src={werkstattFoto}
                alt="Kfz-Meisterwerkstatt Car-World bei der Arbeit"
                loading="lazy"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131F35]/60 via-transparent to-transparent" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -bottom-4 size-24 rounded-2xl bg-[#5088C8]/25 backdrop-blur"
              />
            </div>

            <div className="mt-8 flex justify-center">
              <Button3D href={PHONE_HREF}>
                <PhoneCall className="size-4" aria-hidden="true" />
                Jetzt anrufen
              </Button3D>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            {services
              .filter((s) => s.position === "right")
              .map((s, i) => (
                <ServiceItem key={s.title} {...s} delay={i * 0.15} align="left" isInView={isInView} />
              ))}
          </div>
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

function ServiceItem({
  icon: Icon,
  title,
  delay,
  align,
  isInView,
}: {
  icon: typeof PhoneCall;
  title: string;
  delay: number;
  align: "left" | "right";
  isInView: boolean;
}) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      whileHover={{ y: -4 }}
      className={`group flex items-center gap-4 rounded-2xl border border-[#5088C8]/15 bg-white/70 p-4 shadow-[0_20px_40px_-32px_rgba(19,31,53,0.7)] backdrop-blur transition-colors hover:border-[#5088C8]/50 ${
        align === "right" ? "lg:flex-row-reverse lg:text-right" : ""
      }`}
    >
      <motion.span
        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3, delay, ease: "easeInOut" }}
        className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1B3A63] to-[#5088C8] text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
      >
        <Icon className="size-6" aria-hidden="true" />
      </motion.span>
      <p className="text-sm font-semibold text-[#131F35] sm:text-base">{title}</p>
    </motion.div>
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
