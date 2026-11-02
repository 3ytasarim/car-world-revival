import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Button3D } from "@/components/ui/button-3d";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { insurancePartners, PartnerLogoCard } from "@/components/site/RundumSorglosSection";
import { certificationLogos, CertificationLogoCard } from "@/components/site/PartnerSection";
import { WA_PARTNER } from "@/components/site/site-data";

const FADE_MASK =
  "[mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)]";

/**
 * Fasst die Versicherungspartner-Marquee (aus RundumSorglosSection) und die
 * Partner-&-Zertifizierungen-Marquee (aus PartnerSection) unter einer
 * gemeinsamen Überschrift zusammen.
 *
 * Zwei Darstellungen:
 * - Standard (auf /leistungen, /partner): scrollende Marquee, 2-spaltig.
 * - `compact` (Startseite): Versicherungslogos als zentrierte Logo-Wolke
 *   (blass, beim Hover farbig), eigener Titel.
 */
export function PartnerLogosCombined({
  compact = false,
  title = "Unsere Partner & Zertifizierungen",
  hideWhatsAppButton = false,
}: {
  compact?: boolean;
  title?: string;
  hideWhatsAppButton?: boolean;
}) {
  if (compact) {
    return (
      <section aria-labelledby="partner-logos-title" className="relative bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="partner-logos-title" className="text-center text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            {title}
          </h2>

          {/* Nur Versicherungspartner (10), zentriertes Logo-Raster: zunächst blass
              schwarzweiß, beim Hover farbig — keine Zertifizierungs-Logos hier. */}
          <div className="mt-8">
            <LogoCloud logos={insurancePartners} />
          </div>

          {!hideWhatsAppButton && (
            <div className="mt-10 flex justify-center">
              <Button3D href={WA_PARTNER} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                <WhatsAppIcon className="size-5" />
                Per WhatsApp anfragen
              </Button3D>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="partner-logos-title" className="relative bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="partner-logos-title" className="text-center text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
          {title}
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

        {!hideWhatsAppButton && (
          <div className="mt-10 flex justify-center">
            <Button3D href={WA_PARTNER} target="_blank" rel="noopener noreferrer" variant="whatsapp">
              <WhatsAppIcon className="size-5" />
              Per WhatsApp anfragen
            </Button3D>
          </div>
        )}
      </div>
    </section>
  );
}

export default PartnerLogosCombined;
