import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

import { GoogleIcon } from "@/components/site/GoogleIcon";
import { certificationLogos } from "@/components/site/PartnerSection";
import { HeroMarquee } from "@/components/ui/hero-marquee";
import heroWerkstattPhoto from "@/assets/hero-werkstatt-secondary.jpg";

/**
 * Hero für Leistungen und alle Leistungs-Unterseiten — nach shadcn space
 * "Hero 01" / 21st.dev "Agency Hero Section" (shadcnspace.com/r/hero-01, MIT):
 * große, mittige Headline mit kursivem Serif-Akzent, Untertitel, Sterne-
 * Bewertung und darunter Trennzeile + Logo-Marquee. Die Navigation der Vorlage
 * entfällt (die Seite hat ihren eigenen Header), der "Get Started"-Button
 * ebenfalls (Kundenwunsch). Das Werkstatt-Foto bleibt als Hintergrund.
 *
 * Der Akzent ist der Teil des Titels nach " in " (z. B. "in Bad Neuenahr-
 * Ahrweiler"), sonst die letzten zwei Wörter.
 */
function splitTitle(title: string): [string, string] {
  const i = title.indexOf(" in ");
  if (i > 0) return [title.slice(0, i), title.slice(i + 1)];
  const words = title.split(" ");
  if (words.length < 3) return [title, ""];
  return [words.slice(0, -2).join(" "), words.slice(-2).join(" ")];
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: "easeInOut" as const },
});

export function ServiceHero({
  badge,
  title,
  subtitle,
}: {
  badge: ReactNode;
  title: string;
  subtitle: ReactNode;
}) {
  const [lead, accent] = splitTitle(title);
  return (
    <section className="relative overflow-hidden text-brand-navy">
      <img
        src={heroWerkstattPhoto}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/85 via-white/70 to-white" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 pt-12 pb-6 text-center sm:px-6 md:pt-20 md:pb-10">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <motion.div {...fade(0)}>{badge}</motion.div>
          <motion.h1
            {...fade(0)}
            className="text-balance text-4xl leading-[1.1] font-medium tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {lead}
            {accent && (
              <>
                {" "}
                <span className="font-normal italic tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  {accent}
                </span>
              </>
            )}
          </motion.h1>
          <motion.p {...fade(0.1)} className="max-w-2xl text-balance text-base text-brand-navy/70 sm:text-lg">
            {subtitle}
          </motion.p>
        </div>

        {/* Google-Bewertung: Sterne + Wert (Vorlage: Avatare + Sterne + "Trusted by …"). */}
        <motion.div {...fade(0.2)} className="flex items-center gap-3 sm:gap-4">
          <GoogleIcon className="size-8 shrink-0" />
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-[#FBBC04] text-[#FBBC04]" aria-hidden="true" />
              ))}
              <span className="ml-1 text-sm font-semibold text-[#131F35]">5,0</span>
            </div>
            <p className="text-xs text-brand-navy/70 sm:text-sm">Bewertung bei Google</p>
          </div>
        </motion.div>
      </div>

      {/* Trennzeile + Logo-Marquee (Vorlage: BrandSlider). */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
        className="relative mx-auto flex max-w-6xl flex-col gap-3 px-4 pb-10 md:pb-14"
      >
        <div className="flex items-center justify-center gap-4 py-3 md:py-4">
          <div className="hidden h-0.5 w-40 bg-linear-to-l from-brand-navy to-transparent opacity-20 md:block" />
          <p className="px-2 text-center text-sm text-brand-navy/70">Zertifiziert und anerkannt in der Region</p>
          <div className="hidden h-0.5 w-40 bg-linear-to-r from-brand-navy to-transparent opacity-20 md:block" />
        </div>
        <div className="py-2 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <HeroMarquee pauseOnHover className="[--duration:24s] [--gap:3rem] p-0 lg:[--gap:5rem]">
            {certificationLogos.map((l) => (
              <img key={l.alt} src={l.src} alt={l.alt} loading="lazy" className="h-12 w-auto object-contain sm:h-14" />
            ))}
          </HeroMarquee>
        </div>
      </motion.div>
    </section>
  );
}

export default ServiceHero;
