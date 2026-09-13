import { useRef } from "react";
import { AlertTriangle, FileCheck2, PhoneCall, ShieldCheck, Wrench } from "lucide-react";
import { motion, useInView } from "framer-motion";

import { AnimatedText } from "@/components/ui/animated-text";
import { Button3D } from "@/components/ui/button-3d";
import { GradientShimmer } from "@/components/ui/gradient-shimmer";
import { RevealSlider } from "@/components/ui/reveal2";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { VideoPlayer } from "@/components/ui/video-player";
import { PHONE_HREF, WA_UNFALL } from "@/components/site/site-data";
import { TowTruckIcon } from "@/components/site/TowTruckIcon";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import rundumBefore from "@/assets/rundum-before.jpg";
import rundumAfter from "@/assets/rundum-after.jpg";

// Der Ablauf nach einem Unfall — als Karten-Grid statt Orbit, mit
// ausführlichem Text statt nur Icon+Titel.
const processSteps = [
  {
    icon: PhoneCall,
    title: "Kontakt",
    text: "Sie rufen uns direkt an und nehmen Kontakt zu uns auf, sei es telefonisch, per WhatsApp oder über unser Kontaktformular, um Ihre Anfrage zu stellen. Wir sind jederzeit für Sie da!",
  },
  {
    icon: TowTruckIcon,
    title: "Abholung",
    text: "Wir schleppen Ihr Fahrzeug ab und kümmern uns um den sicheren Transport zu unserer Werkstatt.",
  },
  {
    icon: Wrench,
    title: "Reparatur",
    text: "Wir kalkulieren den Schaden fachgerecht und reparieren Ihr Fahrzeug professionell.",
  },
  {
    icon: FileCheck2,
    title: "Unfallabwicklung",
    text: "Wir übernehmen die komplette Kommunikation und Abwicklung mit der Versicherung.",
  },
];

export const insurancePartners = [
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

export function RundumSorglosSection({
  hideInsuranceMarquee = false,
  shimmerButton = false,
  videoSrc,
}: {
  hideInsuranceMarquee?: boolean;
  /** Shimmer-Textanimation im "Jetzt anrufen"-Button, wie in den Seiten-Hero-Titeln
   * (GradientShimmer). Nur auf der Startseite aktiviert. */
  shimmerButton?: boolean;
  /** Werkstatt-Video direkt unter Titel/Beschreibung — nur auf der Startseite gesetzt. */
  videoSrc?: string;
}) {
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

            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Wir kümmern uns um deinen Unfall von A-Z
            </p>
          </motion.div>

          {videoSrc && (
            <div className="mx-auto mt-10 max-w-5xl px-12">
              <VideoPlayer src={videoSrc} className="max-w-none" />
            </div>
          )}

          {/* Ablauf als Karten-Grid statt Orbit — responsive, auf Mobile
              gestapelt. */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="relative flex flex-col gap-3 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_-18px_rgba(19,31,53,0.3)]"
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#5088C8]/10 text-[#1B3A63]">
                    <step.icon className="size-6" aria-hidden="true" />
                    <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full border-2 border-white bg-brand-orange text-[11px] font-bold text-brand-orange-foreground shadow-sm">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="font-bold text-brand-navy">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{step.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Vorher/Nachher */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-10 max-w-2xl"
          >
            <RevealSlider
              beforeImage={{ src: rundumBefore, alt: "Unfallfahrzeug vor der Reparatur" }}
              afterImage={{ src: rundumAfter, alt: "Fahrzeug nach der Reparatur bei Car-World" }}
            />
          </motion.div>

          {/* Jetzt-anrufen + WhatsApp: mittig unter beiden Spalten, gleich
              wichtig nebeneinander. */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button3D href={PHONE_HREF}>
              <PhoneCall className="size-4" aria-hidden="true" />
              {shimmerButton ? (
                <GradientShimmer gradient="bay" duration={2}>
                  Jetzt anrufen
                </GradientShimmer>
              ) : (
                "Jetzt anrufen"
              )}
            </Button3D>
            <Button3D href={WA_UNFALL} target="_blank" rel="noopener noreferrer" variant="whatsapp">
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </Button3D>
          </div>

          {/* Versicherungspartner — Logo-Marquee statt Zahlen-Kacheln.
              Auf der Startseite ausgeblendet: dort steht dieselbe Marquee
              zusammen mit den Partner-Zertifizierungen in einem
              gemeinsamen 2-spaltigen Block (siehe index.tsx). */}
          {!hideInsuranceMarquee && (
            <div className="mt-16">
              <div className="mx-auto grid max-w-xs grid-cols-2 gap-3 sm:max-w-md sm:gap-5">
                {/* Links: unten nach oben. Rechts: oben nach unten. Die
                    Fade-Maske oben/unten sorgt dafür, dass rein/raus-scrollende
                    Karten weich ausblenden statt hart abgeschnitten zu wirken
                    ("iç içe" — als würden sie ineinander laufen). */}
                <div className="[mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)]">
                  <InfiniteSlider direction="vertical" gap={16} duration={28} durationOnHover={70} className="h-[340px] sm:h-[420px]">
                    {insurancePartners.map((p) => (
                      <PartnerLogoCard key={p.alt} partner={p} />
                    ))}
                  </InfiniteSlider>
                </div>
                <div className="[mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)]">
                  <InfiniteSlider direction="vertical" reverse gap={16} duration={28} durationOnHover={70} className="h-[340px] sm:h-[420px]">
                    {insurancePartners.map((p) => (
                      <PartnerLogoCard key={p.alt} partner={p} />
                    ))}
                  </InfiniteSlider>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function PartnerLogoCard({ partner }: { partner: { src: string; alt: string } }) {
  return (
    <div className="flex size-40 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-white p-4 shadow-md sm:size-48 sm:p-5">
      <img src={partner.src} alt={partner.alt} loading="lazy" className="max-h-full max-w-full object-contain" />
    </div>
  );
}

export default RundumSorglosSection;
