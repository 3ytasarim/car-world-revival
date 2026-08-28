import { AnimatedText } from "@/components/ui/animated-text";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

import imgMobilitaetsgarantie from "@/assets/vorteil-mobilitaetsgarantie.jpg";
import imgAbschleppservice from "@/assets/vorteil-abschleppservice.jpg";
import imgTerminvereinbarung from "@/assets/vorteil-terminvereinbarung.jpg";
import imgVersicherungsabwicklung from "@/assets/vorteil-versicherungsabwicklung.jpg";

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

const vorteile = [
  { image: imgMobilitaetsgarantie, title: "Mobilitätsgarantie" },
  { image: imgAbschleppservice, title: "Abhol- & Abschleppservice" },
  { image: imgTerminvereinbarung, title: "Schnelle Terminvereinbarung" },
  { image: imgVersicherungsabwicklung, title: "Versicherungsabwicklung" },
];

function VorteilPhotoCard({ image, title }: (typeof vorteile)[number]) {
  return (
    <div className="flex w-[165px] shrink-0 flex-col items-center gap-2.5 sm:w-[195px]">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_20px_45px_-20px_rgba(19,31,53,0.4)]">
        <img src={image} alt={title} loading="lazy" className="size-full object-cover" />
      </div>
      <h3 className="text-center text-sm font-bold tracking-tight text-brand-navy sm:text-base">{title}</h3>
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
