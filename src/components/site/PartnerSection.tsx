import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { CheckCircle2, Handshake } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button3D } from "@/components/ui/button-3d";
import { WA_PARTNER } from "./site-data";
import tuv from "@/assets/partner-tuv.png";
import innung from "@/assets/partner-innung.png";
import autoglas from "@/assets/partner-autoglas.png";
import hwk from "@/assets/partner-hwk.png";

// Vom Kunden final bestätigte Vorteile als Großkunde.
const benefits = [
  { title: "Bevorzugte Terminvergabe" },
  { title: "Sammelabrechnung" },
  { title: "Hol- & Bringservice" },
  { title: "Mobilitätsgarantie" },
];

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
        {/* Badge + Überschrift bekommen einen breiteren Container als der
            Rest — sonst bricht "Partner werden – Fuhrpark- & Flottenservice"
            innerhalb der ersten Zeile selbst nochmal um (3 statt der
            gewünschten 2 Zeilen). */}
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-4 py-1.5 text-xs font-semibold text-brand-navy-foreground">
            <Handshake className="size-4" aria-hidden="true" />
            Für Unternehmen & Flotten
          </span>
          <h2 id="partner-title" className="mt-4 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            <span className="block">
              <AnimatedText text="Partner werden – Fuhrpark- & Flottenservice" minWeight={300} maxWeight={800} delayMultiplier={0.05} />
            </span>
            <span className="block">
              <AnimatedText text="für Gewerbekunden" minWeight={300} maxWeight={800} delayMultiplier={0.05} />
            </span>
          </h2>
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mt-2 text-sm font-semibold tracking-wide text-brand-orange uppercase">
            Werden Sie Car-World Partner
          </p>
          <p className="mt-3 text-muted-foreground">
            Für kleine und mittlere Unternehmen, Firmenflotten und Großkunden — ab ca. 5–10 Mitarbeitenden oder
            Fahrzeugen. Arbeiten Sie mit einem zuverlässigen Meisterbetrieb zusammen, statt sich um jedes Fahrzeug
            einzeln zu kümmern.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button3D href={WA_PARTNER} target="_blank" rel="noopener noreferrer" variant="whatsapp">
              <WhatsAppIcon className="size-5" />
              Flottenanfrage stellen
            </Button3D>
            <Button3D href={WA_PARTNER} target="_blank" rel="noopener noreferrer" variant="whatsapp">
              <WhatsAppIcon className="size-5" />
              Partner werden
            </Button3D>
          </div>
        </div>

        {/* Vorteile als Großkunde — senkrechte, gut lesbare Liste mit
            grünen Häkchen statt horizontalem Slider (Kundenwunsch). Nur
            die verbindlich bestätigten 4, keine erfundenen zusätzlichen
            Punkte. */}
        <div className="mt-10">
          <h3 className="text-center text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">
            Vorteile als Großkunde
          </h3>
          <div className="mx-auto mt-6 flex max-w-md flex-col gap-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex items-center justify-center gap-3 rounded-xl border border-black/5 bg-white px-5 py-4 text-center shadow-[0_10px_30px_-18px_rgba(19,31,53,0.3)]"
              >
                <CheckCircle2 className="size-5 shrink-0 text-green-600" aria-hidden="true" />
                <span className="font-semibold text-brand-navy">{b.title}</span>
              </div>
            ))}
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
