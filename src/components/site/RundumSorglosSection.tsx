import { useRef } from "react";
import { ChevronDown, ChevronRight, FileCheck2, PhoneCall, Wrench } from "lucide-react";
import { motion, useInView } from "framer-motion";

import { Button3D } from "@/components/ui/button-3d";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { VideoPlayer } from "@/components/ui/video-player";
import { PHONE_HREF, WA_UNFALL } from "@/components/site/site-data";
import { TowTruckIcon } from "@/components/site/TowTruckIcon";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { certificationLogos } from "@/components/site/PartnerSection";

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
            <h2 id="rundum-title" className="text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
              Rundum sorglos Paket
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

          {/* Ablauf als Karten-Grid statt Orbit — auf Mobile/Tablet gestapelt
              (Pfeil nach unten zwischen den Karten), ab Desktop 4 Spalten
              nebeneinander (Pfeil nach rechts) — Kundenwunsch: die Schritte
              sollen klar erkennbar durch Pfeile verbunden sein. */}
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-4 lg:gap-8">
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

                {i < processSteps.length - 1 && (
                  <>
                    {/* Mobile/Tablet: vertikaler Verbinder über die ganze
                        Lücke — Gradient-Linie + schwebender Pfeil-Kreis mit
                        sanftem Auf-ab-Nudge statt des alten schlichten
                        umrandeten Kreises. */}
                    <div
                      className="absolute top-full left-1/2 z-10 flex h-5 w-9 -translate-x-1/2 items-center justify-center lg:hidden"
                      aria-hidden="true"
                    >
                      <span className="absolute inset-x-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#5088C8]/10 via-[#5088C8]/70 to-[#5088C8]/10" />
                      <motion.span
                        animate={{ y: [-2, 3, -2] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        className="relative flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-[#5088C8] to-[#1B3A63] text-white shadow-[0_8px_18px_-6px_rgba(27,58,99,0.6)] ring-4 ring-white"
                      >
                        <ChevronDown className="size-3.5" aria-hidden="true" />
                      </motion.span>
                    </div>

                    {/* Desktop: horizontaler Verbinder, gleiche Bauart. */}
                    <div
                      className="absolute top-1/2 left-full z-10 hidden w-8 -translate-y-1/2 items-center justify-center lg:flex"
                      aria-hidden="true"
                    >
                      <span className="absolute inset-y-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-[#5088C8]/10 via-[#5088C8]/70 to-[#5088C8]/10" />
                      <motion.span
                        animate={{ x: [-2, 3, -2] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        className="relative flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#5088C8] to-[#1B3A63] text-white shadow-[0_8px_18px_-6px_rgba(27,58,99,0.6)] ring-4 ring-white"
                      >
                        <ChevronRight className="size-4" aria-hidden="true" />
                      </motion.span>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* Jetzt-anrufen + WhatsApp: mittig unter beiden Spalten, gleich
              wichtig nebeneinander. */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button3D href={PHONE_HREF} shimmer={shimmerButton}>
              <PhoneCall className="size-4" aria-hidden="true" />
              Jetzt anrufen
            </Button3D>
            <Button3D href={WA_UNFALL} target="_blank" rel="noopener noreferrer" variant="whatsapp">
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </Button3D>
          </div>

          {/* TÜV, HWK, Innung — als ruhiger, automatisch laufender Slider
              direkt unter den Buttons (seriös, nicht zu auffällig). */}
          <div className="mx-auto mt-10 max-w-md [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
            <InfiniteSlider gap={40} duration={18}>
              {certificationLogos.map((l) => (
                <img key={l.alt} src={l.src} alt={l.alt} loading="lazy" className="h-10 w-auto object-contain opacity-80 sm:h-12" />
              ))}
            </InfiniteSlider>
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
