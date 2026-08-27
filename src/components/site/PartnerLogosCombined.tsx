import { AnimatedText } from "@/components/ui/animated-text";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { insurancePartners, PartnerLogoCard } from "@/components/site/RundumSorglosSection";
import { certificationLogos, CertificationLogoCard } from "@/components/site/PartnerSection";

const FADE_MASK =
  "[mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)]";

/**
 * Startseiten-exklusiver Block: fasst die Versicherungspartner-Marquee (aus
 * RundumSorglosSection) und die Partner-&-Zertifizierungen-Marquee (aus
 * PartnerSection) unter einer gemeinsamen, zentrierten Überschrift zusammen
 * — auf Desktop nebeneinander (links Versicherungen, rechts
 * Zertifizierungen), auf Mobile gestapelt (erst links, dann rechts), beide
 * exakt gleich hoch (h-[340px] sm:h-[420px], identisch mit den
 * Original-Blöcken). Auf /leistungen und /partner bleiben die Original-
 * Blöcke unverändert an ihrem jeweiligen Platz.
 */
export function PartnerLogosCombined() {
  return (
    <section aria-labelledby="partner-logos-title" className="relative bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="partner-logos-title" className="text-center text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
          <AnimatedText text="Unsere Partner & Zertifizierungen" minWeight={300} maxWeight={800} delayMultiplier={0.03} />
        </h2>

        <div className="mt-10 grid grid-cols-1 items-start justify-items-center gap-10 lg:grid-cols-2 lg:gap-8">
          {/* Links: Versicherungspartner */}
          <div className="grid w-full max-w-xs grid-cols-2 gap-3 sm:max-w-md sm:gap-5">
            <div className={FADE_MASK}>
              <InfiniteSlider direction="vertical" gap={16} duration={28} durationOnHover={70} className="h-[340px] sm:h-[420px]">
                {insurancePartners.map((p) => (
                  <PartnerLogoCard key={p.alt} partner={p} />
                ))}
              </InfiniteSlider>
            </div>
            <div className={FADE_MASK}>
              <InfiniteSlider direction="vertical" reverse gap={16} duration={28} durationOnHover={70} className="h-[340px] sm:h-[420px]">
                {insurancePartners.map((p) => (
                  <PartnerLogoCard key={p.alt} partner={p} />
                ))}
              </InfiniteSlider>
            </div>
          </div>

          {/* Rechts: Zertifizierungen */}
          <div className="grid w-full max-w-xs grid-cols-2 gap-3 sm:max-w-md sm:gap-5">
            <div className={FADE_MASK}>
              <InfiniteSlider direction="vertical" reverse gap={16} duration={22} durationOnHover={60} className="h-[340px] sm:h-[420px]">
                {certificationLogos.map((l) => (
                  <CertificationLogoCard key={l.alt} logo={l} />
                ))}
              </InfiniteSlider>
            </div>
            <div className={FADE_MASK}>
              <InfiniteSlider direction="vertical" gap={16} duration={22} durationOnHover={60} className="h-[340px] sm:h-[420px]">
                {certificationLogos.map((l) => (
                  <CertificationLogoCard key={l.alt} logo={l} />
                ))}
              </InfiniteSlider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartnerLogosCombined;
