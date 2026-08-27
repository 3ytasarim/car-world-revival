import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Handshake, CarFront, Percent, Zap } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button3D } from "@/components/ui/button-3d";
import { WA_PARTNER } from "./site-data";
import tuv from "@/assets/partner-tuv.png";
import innung from "@/assets/partner-innung.png";
import autoglas from "@/assets/partner-autoglas.png";
import hwk from "@/assets/partner-hwk.png";

// Nur die im Kundengespräch verbindlich bestätigten Vorteile — bewusst
// noch nicht auf 5–6 aufgefüllt, bis weitere mit dem Kunden abgestimmt sind.
const benefits = [
  {
    icon: Zap,
    title: "Fast-Lane Termin",
    text: "Schnelle, bevorzugte Terminvergabe für Partner- und Großkunden.",
  },
  {
    icon: Percent,
    title: "Besondere Großkundenrabatte",
    text: "Spezielle Konditionen und Preise für große Kunden.",
  },
  {
    icon: CarFront,
    title: "Kostenlose Leihwagen",
    text: "Ersatzwagen ohne Aufpreis, wenn verfügbar.",
  },
];

function GrosskundeCard({ icon: Icon, title }: (typeof benefits)[number]) {
  return (
    <div className="relative flex w-[min(88vw,420px)] shrink-0 items-center gap-5 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-orange to-[#3D6FA8] px-7 py-7 text-white shadow-[0_20px_45px_-20px_rgba(80,136,200,0.55)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "0.75rem 0.75rem",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-10 -top-24 h-40 -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/15 to-transparent"
      />
      <span className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
        <Icon className="size-8" aria-hidden="true" />
      </span>
      <h4 className="relative text-xl font-bold tracking-tight">{title}</h4>
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
          <div className="mt-6 flex justify-center">
            <InfiniteSlider
              direction="vertical"
              reverse
              gap={20}
              duration={30}
              durationOnHover={80}
              className="h-[420px] w-full max-w-md [mask-image:linear-gradient(to_bottom,transparent_0%,#000_10%,#000_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_10%,#000_90%,transparent_100%)]"
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
