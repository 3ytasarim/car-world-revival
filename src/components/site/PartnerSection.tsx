import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Handshake } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button3D } from "@/components/ui/button-3d";
import { WA_PARTNER } from "./site-data";
import tuv from "@/assets/partner-tuv.png";
import innung from "@/assets/partner-innung.png";
import autoglas from "@/assets/partner-autoglas.png";
import hwk from "@/assets/partner-hwk.png";
import imgLeihwagen from "@/assets/grosskunde-leihwagen.jpg";
import imgFastlane from "@/assets/grosskunde-fastlane.jpg";
import imgRabatte from "@/assets/grosskunde-rabatte.jpg";

// Nur die im Kundengespräch verbindlich bestätigten Vorteile — bewusst
// noch nicht auf 5–6 aufgefüllt, bis weitere mit dem Kunden abgestimmt sind.
// Echte Fotos statt Icons, gleicher Kartenstil wie "Ihre Vorteile" auf der
// Startseite: statisches Grid (kein Marquee — eine kontinuierlich laufende
// Reihe hat nie eine Karte exakt an der Container-Kante).
const benefits = [
  { image: imgFastlane, title: "Fast-Lane Termin" },
  { image: imgRabatte, title: "Besondere Großkundenrabatte" },
  { image: imgLeihwagen, title: "Kostenlose Leihwagen" },
];

function GrosskundeCard({ image, title }: (typeof benefits)[number]) {
  return (
    <div className="flex w-[165px] shrink-0 flex-col items-center gap-2.5 sm:w-[195px]">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_20px_45px_-20px_rgba(19,31,53,0.4)]">
        <img src={image} alt={title} loading="lazy" className="size-full object-cover" />
      </div>
      <h4 className="w-full text-center text-[11px] font-bold tracking-tight whitespace-nowrap text-brand-navy sm:text-xs">{title}</h4>
    </div>
  );
}

export const certificationLogos = [
  { src: tuv, alt: "TÜV Rheinland" },
  { src: innung, alt: "KFZ-Innung Ahrweiler" },
  { src: autoglas, alt: "Autoglas Spezialist" },
  { src: hwk, alt: "Handwerkskammer Koblenz" },
];

export function CertificationLogoCard({ logo: l }: { logo: { src: string; alt: string } }) {
  return (
    <div className="flex size-40 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-white p-4 shadow-md sm:size-48 sm:p-5">
      <img src={l.src} alt={l.alt} loading="lazy" className="max-h-full max-w-full object-contain" />
    </div>
  );
}

export function PartnerSection({ hideCertificationBlock = false }: { hideCertificationBlock?: boolean }) {
  const { ref } = useInView<HTMLDivElement>(0.15);

  return (
    <section aria-labelledby="partner-title" className="relative">
      <div ref={ref} className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-4 py-1.5 text-xs font-semibold text-brand-navy-foreground">
            <Handshake className="size-4" aria-hidden="true" />
            Für Unternehmen & Flotten
          </span>
          <h2 id="partner-title" className="mt-4 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            <AnimatedText text="Werden Sie Großkunde" minWeight={300} maxWeight={800} delayMultiplier={0.05} />
          </h2>
          <p className="mt-2 text-sm font-semibold tracking-wide text-brand-orange uppercase">
            Werden Sie Car-World Partner
          </p>
          <p className="mt-3 text-muted-foreground">
            Für kleine und mittlere Unternehmen, Firmenflotten und Großkunden — ab ca. 5–10 Mitarbeitenden oder
            Fahrzeugen. Arbeiten Sie mit einem zuverlässigen Meisterbetrieb zusammen, statt sich um jedes Fahrzeug
            einzeln zu kümmern.
          </p>

          <div className="mt-6 flex justify-center">
            <Button3D href={WA_PARTNER} target="_blank" rel="noopener noreferrer" variant="whatsapp">
              <WhatsAppIcon className="size-5" />
              Per WhatsApp anfragen
            </Button3D>
          </div>
        </div>

        {/* Vorteile als Großkunde — nur die verbindlich bestätigten 3, keine
            erfundenen zusätzlichen Punkte. */}
        <div className="mt-10">
          <h3 className="text-center text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">
            Vorteile als Großkunde
          </h3>
          <div className="mt-6">
            <InfiniteSlider
              direction="horizontal"
              gap={20}
              duration={26}
              durationOnHover={70}
              className="w-full [mask-image:linear-gradient(to_right,transparent_0,#000_48px,#000_calc(100%-48px),transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0,#000_48px,#000_calc(100%-48px),transparent_100%)]"
            >
              {benefits.map((b) => (
                <GrosskundeCard key={b.title} {...b} />
              ))}
            </InfiniteSlider>
          </div>
        </div>

        {/* Unsere Partner & Zertifizierungen — dieselbe vertikale
            Karten-Marquee wie die Versicherungspartner im
            Rundum-sorglos-Bereich, statt einer rotierenden Ring-Animation.
            Auf der Startseite ausgeblendet: dort steht dieser Block
            zusammen mit den Versicherungspartnern in einem gemeinsamen
            2-spaltigen Block (siehe index.tsx). */}
        {!hideCertificationBlock && (
          <div className="mt-14">
            <h2 className="text-center text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
              <AnimatedText text="Unsere Partner & Zertifizierungen" minWeight={300} maxWeight={800} delayMultiplier={0.03} />
            </h2>
            <div className="mx-auto mt-8 grid max-w-xs grid-cols-2 gap-3 sm:max-w-md sm:gap-5">
              <div className="[mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)]">
                <InfiniteSlider direction="vertical" reverse gap={16} duration={22} durationOnHover={60} className="h-[340px] sm:h-[420px]">
                  {certificationLogos.map((l) => (
                    <CertificationLogoCard key={l.alt} logo={l} />
                  ))}
                </InfiniteSlider>
              </div>
              <div className="[mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)]">
                <InfiniteSlider direction="vertical" gap={16} duration={22} durationOnHover={60} className="h-[340px] sm:h-[420px]">
                  {certificationLogos.map((l) => (
                    <CertificationLogoCard key={l.alt} logo={l} />
                  ))}
                </InfiniteSlider>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
