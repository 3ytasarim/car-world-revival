import { useRef } from "react";
import { AlertTriangle, FileCheck2, PhoneCall, ShieldCheck, Wrench } from "lucide-react";
import { motion, useInView } from "framer-motion";

import { AnimatedText } from "@/components/ui/animated-text";
import { Button3D } from "@/components/ui/button-3d";
import { RevealSlider } from "@/components/ui/reveal2";
import { OrbitingLogos } from "@/components/ui/orbiting-logos";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { PHONE_HREF } from "@/components/site/site-data";
import { TowTruckIcon } from "@/components/site/TowTruckIcon";
import rundumBefore from "@/assets/rundum-before.jpg";
import rundumAfter from "@/assets/rundum-after.jpg";

// Der Ablauf nach einem Unfall — als Orbit um "UNFALL?" statt als Liste,
// damit er möglichst über Icons erzählt wird statt über Fließtext.
const processSteps = [
  { icon: PhoneCall, title: "Kontakt" },
  { icon: TowTruckIcon, title: "Abholung" },
  { icon: Wrench, title: "Reparatur" },
  { icon: FileCheck2, title: "Abwicklung" },
];

const insurancePartners = [
  { src: "/logos/axa.png", alt: "AXA" },
  { src: "/logos/ergo.png", alt: "ERGO" },
  { src: "/logos/allianz.png", alt: "Allianz" },
  { src: "/logos/debeka.png", alt: "Debeka" },
  { src: "/logos/rv.png", alt: "R+V Versicherung" },
  { src: "/logos/devk.png", alt: "DEVK" },
  { src: "/logos/huk.png", alt: "HUK-COBURG" },
  { src: "/logos/signal-iduna.png", alt: "Signal Iduna" },
  { src: "/logos/gothaer.png", alt: "Gothaer" },
  { src: "/logos/wuerttembergische.png", alt: "Württembergische" },
];

export function RundumSorglosSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section ref={sectionRef} aria-labelledby="rundum-title" className="relative w-full overflow-hidden">
      <div className="relative py-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Intro: oben, zentriert, über der gesamten Breite */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#5088C8]/30 bg-[#5088C8]/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#1B3A63] uppercase">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Rundum abgesichert
            </span>

            <h2 id="rundum-title" className="mt-4 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
              <AnimatedText text="Rundum-" minWeight={300} maxWeight={800} delayMultiplier={0.06} className="text-[#131F35]" />
              <AnimatedText text="sorglos" minWeight={300} maxWeight={800} delayMultiplier={0.06} className="text-[#5088C8]" />
              <AnimatedText text="-Paket" minWeight={300} maxWeight={800} delayMultiplier={0.06} className="text-[#131F35]" />
            </h2>

            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Wir kümmern uns um alles — von der Abholung bis zur kompletten Abwicklung mit Ihrer Versicherung. Sie
              lehnen sich zurück, wir machen den Rest.
            </p>
          </motion.div>

          {/* Darunter: links der Orbit, rechts Vorher/Nachher — auf gleicher
              Höhe, der Orbit darf breit atmen (Kreise überlappen nicht). */}
          <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative flex justify-center [--orbit-radius:145px] sm:[--orbit-radius:168px] lg:[--orbit-radius:162px] xl:[--orbit-radius:190px]"
            >
              {/* Konzentrische Glow-Kreise hinter dem Orbit, wie in der
                  Referenz — aber in den Blautönen der Seite statt Lila. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                style={{
                  width: "calc(var(--orbit-radius) * 2.7)",
                  height: "calc(var(--orbit-radius) * 2.7)",
                  background:
                    "radial-gradient(circle, rgba(80,136,200,0.30) 0%, rgba(80,136,200,0.14) 45%, rgba(80,136,200,0) 72%)",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
                style={{
                  width: "calc(var(--orbit-radius) * 1.75)",
                  height: "calc(var(--orbit-radius) * 1.75)",
                  background:
                    "radial-gradient(circle, rgba(143,184,232,0.55) 0%, rgba(143,184,232,0.22) 55%, rgba(143,184,232,0) 78%)",
                }}
              />

              <OrbitingLogos
                radius={145}
                duration={26}
                className="relative [--orbit-radius:145px] sm:[--orbit-radius:168px] lg:[--orbit-radius:162px] xl:[--orbit-radius:190px]"
                center={
                  <div className="flex size-24 flex-col items-center justify-center gap-1 rounded-full border-2 border-brand-orange/40 bg-white text-center shadow-lg sm:size-28 lg:size-28 xl:size-32">
                    <AlertTriangle
                      className="size-6 animate-pulse text-yellow-400 sm:size-7"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-none font-extrabold tracking-tight text-[#131F35] sm:text-base">
                      UNFALL?
                    </span>
                  </div>
                }
                items={processSteps.map((step, i) => ({
                  key: step.title,
                  content: (
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="relative flex size-14 items-center justify-center rounded-full border border-[#5088C8]/20 bg-white shadow-md sm:size-16">
                        <step.icon className="size-5 text-[#1B3A63] sm:size-6" aria-hidden="true" />
                        <span
                          className="animate-step-badge absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-brand-orange text-[10px] font-bold text-brand-orange-foreground shadow-sm sm:size-6 sm:text-xs"
                          style={{ animationDelay: `${i * 0.3}s` }}
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold whitespace-nowrap text-[#131F35] sm:text-xs">
                        {step.title}
                      </span>
                    </div>
                  ),
                }))}
              />
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

          {/* Jetzt-anrufen-Button: mittig unter beiden Spalten */}
          <div className="mt-10 flex justify-center">
            <Button3D href={PHONE_HREF}>
              <PhoneCall className="size-4" aria-hidden="true" />
              Jetzt anrufen
            </Button3D>
          </div>

          {/* Versicherungspartner — Logo-Marquee statt Zahlen-Kacheln */}
          <div className="mt-16">
            <div className="mx-auto grid max-w-xs grid-cols-2 gap-3 sm:max-w-md sm:gap-5">
              {/* Links: unten nach oben. Rechts: oben nach unten. */}
              <InfiniteSlider direction="vertical" gap={16} duration={28} durationOnHover={70} className="h-[340px] sm:h-[420px]">
                {insurancePartners.map((p) => (
                  <PartnerLogoCard key={p.alt} partner={p} />
                ))}
              </InfiniteSlider>
              <InfiniteSlider direction="vertical" reverse gap={16} duration={28} durationOnHover={70} className="h-[340px] sm:h-[420px]">
                {insurancePartners.map((p) => (
                  <PartnerLogoCard key={p.alt} partner={p} />
                ))}
              </InfiniteSlider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerLogoCard({ partner }: { partner: { src: string; alt: string } }) {
  return (
    <div className="flex size-40 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-white p-4 shadow-md sm:size-48 sm:p-5">
      <img src={partner.src} alt={partner.alt} loading="lazy" className="max-h-full max-w-full object-contain" />
    </div>
  );
}

export default RundumSorglosSection;
