import { AnimatedText } from "@/components/ui/animated-text";

import imgMobilitaetsgarantie from "@/assets/vorteil-mobilitaetsgarantie.jpg";
import imgAbschleppservice from "@/assets/vorteil-abschleppservice.jpg";
import imgTerminvereinbarung from "@/assets/vorteil-terminvereinbarung.jpg";
import imgVersicherungsabwicklung from "@/assets/vorteil-versicherungsabwicklung.jpg";

// Echte Fotos statt generischer Icons — jede Karte zeigt ein Bild mit
// Bildunterschrift. Statisches Grid statt Marquee: eine kontinuierlich
// laufende Karten-Reihe hat NIE eine Karte exakt an der Container-Kante
// (die Karte ist ja immer irgendwo mitten in der Scroll-Bewegung) — darum
// liess sich "genau auf Höhe des Video-Grids darunter" mit einem Marquee
// nicht erreichen, egal wie eng die Fade-Maske gesetzt wurde. Dasselbe
// Grid wie in VideoSection (gap-4 sm:grid-cols-2 lg:grid-cols-4) garantiert
// die exakt gleiche linke/rechte Kante, weil es dieselbe Layout-Mechanik ist.
const vorteile = [
  { image: imgMobilitaetsgarantie, title: "Mobilitätsgarantie" },
  { image: imgAbschleppservice, title: "Abhol- & Abschleppservice" },
  { image: imgTerminvereinbarung, title: "Schnelle Terminvereinbarung" },
  { image: imgVersicherungsabwicklung, title: "Versicherungsabwicklung" },
];

function VorteilPhotoCard({ image, title }: (typeof vorteile)[number]) {
  return (
    <div className="flex flex-col items-center gap-2.5">
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

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {vorteile.map((v) => (
            <VorteilPhotoCard key={v.title} {...v} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default IhreVorteile;
