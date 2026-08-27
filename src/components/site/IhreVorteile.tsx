import { AnimatedText } from "@/components/ui/animated-text";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

import imgMobilitaetsgarantie from "@/assets/vorteil-mobilitaetsgarantie.jpg";
import imgAbschleppservice from "@/assets/vorteil-abschleppservice.jpg";
import imgTerminvereinbarung from "@/assets/vorteil-terminvereinbarung.jpg";
import imgVersicherungsabwicklung from "@/assets/vorteil-versicherungsabwicklung.jpg";

// Echte Fotos statt generischer Icons — jede Karte zeigt ein Bild mit
// Bildunterschrift, angelehnt an 21st.dev (ravikatiyar162/marquee-logo-scroller),
// aber ohne dessen eigenen Titel/Description-Header (die Sektion hat bereits
// ihre eigene Überschrift oben) und vertikal statt horizontal scrollend,
// damit es zur Bewegungsrichtung aller anderen Marquees auf der Seite passt.
const vorteile = [
  { image: imgMobilitaetsgarantie, title: "Mobilitätsgarantie" },
  { image: imgAbschleppservice, title: "Abhol- & Abschleppservice" },
  { image: imgTerminvereinbarung, title: "Schnelle Terminvereinbarung" },
  { image: imgVersicherungsabwicklung, title: "Versicherungsabwicklung" },
];

function VorteilPhotoCard({ image, title }: (typeof vorteile)[number]) {
  return (
    <div className="mx-auto flex w-[min(90vw,460px)] shrink-0 flex-col items-center gap-4">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_20px_45px_-20px_rgba(19,31,53,0.4)]">
        <img src={image} alt={title} loading="lazy" className="size-full object-cover" />
      </div>
      <h3 className="text-center text-xl font-bold tracking-tight text-brand-navy">{title}</h3>
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

        <div className="mt-10 flex justify-center">
          <InfiniteSlider
            direction="vertical"
            reverse
            gap={32}
            duration={42}
            durationOnHover={100}
            className="h-[620px] w-full max-w-lg [mask-image:linear-gradient(to_bottom,transparent_0%,#000_8%,#000_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_8%,#000_92%,transparent_100%)]"
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
