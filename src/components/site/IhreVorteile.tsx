import { CheckCircle2 } from "lucide-react";

import { AnimatedText } from "@/components/ui/animated-text";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { certificationLogos, CertificationLogoCard } from "@/components/site/PartnerSection";
import { insurancePartners, PartnerLogoCard } from "@/components/site/RundumSorglosSection";

import imgMobilitaetsgarantie from "@/assets/vorteil-mobilitaetsgarantie.jpg";
import imgAbschleppservice from "@/assets/vorteil-abschleppservice.jpg";
import imgTerminvereinbarung from "@/assets/vorteil-terminvereinbarung.jpg";
import imgVersicherungsabwicklung from "@/assets/vorteil-versicherungsabwicklung.jpg";
import imgVersicherung from "@/assets/vorteil-versicherung.jpg";

// Echte Fotos statt generischer Icons — jede Karte zeigt ein Bild mit
// Bildunterschrift, angelehnt an 21st.dev (ravikatiyar162/marquee-logo-scroller):
// horizontal scrollend wie das Original, aber ohne dessen eigenen
// Titel/Description-Header (die Sektion hat bereits ihre eigene Überschrift
// oben) und mit deutlich größeren Bildern + Bildunterschrift statt kleiner
// Logo-Kacheln.
//
// Die Fade-Maske hier ist bewusst in FESTEN Pixeln (nicht %) gesetzt: das
// macht die Stelle, an der die Karten voll sichtbar werden, zu einer festen
// Position relativ zur Container-Kante (MARQUEE_FADE_PX unten) — unabhängig
// davon, welche Karte gerade an dieser Stelle vorbeiscrollt. VideoSection
// bekommt exakt dasselbe Inset, damit die "sichtbare" Breite beider
// Abschnitte an derselben Stelle beginnt/endet.
export const MARQUEE_FADE_PX = 48;

// Bildunterschriften jetzt inhaltlich zum Foto passend (nicht mehr die
// ursprüngliche Datei-Reihenfolge) — vom Kunden nachträglich pro Bild
// korrigiert: TÜV-Logo→TÜV Zertifiziert, Schlüsselübergabe→Mobilitätsgarantie,
// Abschleppwagen→Abhol-&Abschleppservice, Bürotelefon→Terminvereinbarung.
// "Versicherungsabwicklung" hat jetzt ein eigenes, dediziertes 5. Foto
// (Schadensgutachten vor Ort) statt das Bürotelefon-Foto mitzunutzen.
const vorteile = [
  { image: imgMobilitaetsgarantie, title: "TÜV Zertifiziert" },
  { image: imgAbschleppservice, title: "Mobilitätsgarantie" },
  { image: imgTerminvereinbarung, title: "Abhol- & Abschleppservice" },
  { image: imgVersicherungsabwicklung, title: "Schnelle Terminvereinbarung" },
  { image: imgVersicherung, title: "Versicherungsabwicklung" },
];

// Kurze Checkmark-Kartenreihe direkt unter Titel/Untertitel, oberhalb der
// bestehenden Foto-Karten — 3 knappe Kernversprechen statt der ausführlichen
// Foto-Galerie darunter.
export const checkPoints = [
  { title: "Unfall - Rundum-Service", text: "Wir kümmern uns um ihren Unfall von A-Z" },
  { title: "Mobilitätsgarantie", text: "Wir verfügen über moderne Leihfahrzeuge" },
  { title: "Schnelle Terminvergabe", text: undefined },
];

export function CheckPointCard({ title, text }: (typeof checkPoints)[number]) {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(19,31,53,0.3)]">
      <div className="flex items-center gap-2.5">
        <CheckCircle2 className="size-5 shrink-0 text-brand-orange" aria-hidden="true" />
        <h3 className="font-bold text-brand-navy">{title}</h3>
      </div>
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}

function VorteilPhotoCard({ image, title }: (typeof vorteile)[number]) {
  return (
    <div className="flex w-[165px] shrink-0 flex-col items-center gap-2.5 sm:w-[195px]">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_20px_45px_-20px_rgba(19,31,53,0.4)]">
        <img src={image} alt={title} loading="lazy" className="size-full object-cover" />
      </div>
      <h3 className="w-full text-center text-[11px] font-bold tracking-tight whitespace-nowrap text-brand-navy sm:text-xs">{title}</h3>
    </div>
  );
}

export function IhreVorteile() {
  return (
    <section aria-labelledby="vorteile-title" className="relative bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="vorteile-title" className="text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            <AnimatedText text="Ihre " minWeight={300} maxWeight={800} delayMultiplier={0.06} className="text-[#131F35]" />
            <AnimatedText text="Vorteile" minWeight={300} maxWeight={800} delayMultiplier={0.06} className="text-brand-orange" />
          </h2>
          <p className="mt-3 text-muted-foreground">Das bekommen Sie, wenn Sie sich für Car-World entscheiden.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {checkPoints.map((c) => (
            <CheckPointCard key={c.title} {...c} />
          ))}
        </div>

        {/* Versicherungspartner- + Zertifizierungs-Logos direkt unter den
            Vorteilen — dieselben Logos/Karten wie im "Unsere Partner &
            Zertifizierungen"-Bereich weiter unten, hier als einzelne, nicht
            scrollende Reihe. */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {insurancePartners.map((p) => (
            <PartnerLogoCard key={p.alt} partner={p} />
          ))}
          {certificationLogos.map((l) => (
            <CertificationLogoCard key={l.alt} logo={l} />
          ))}
        </div>

        <div className="mt-10">
          <InfiniteSlider
            direction="horizontal"
            gap={24}
            duration={32}
            durationOnHover={80}
            className="w-full [mask-image:linear-gradient(to_right,transparent_0,#000_48px,#000_calc(100%-48px),transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0,#000_48px,#000_calc(100%-48px),transparent_100%)]"
          >
            {vorteile.map((v) => (
              <VorteilPhotoCard key={v.title} {...v} />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}

export default IhreVorteile;
