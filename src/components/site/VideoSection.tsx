import { useState } from "react";
import { Car, Droplets, Play, ShieldAlert, Wrench } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";
import { WA_FOTO } from "./site-data";
import { Button3D } from "@/components/ui/button-3d";
import { AnimatedText } from "@/components/ui/animated-text";

type Clip = {
  title: string;
  text: string;
  icon: typeof Car;
  /** YouTube/Vimeo embed URL – vom Admin austauschbar */
  src?: string;
};

const clips: Clip[] = [
  { title: "Nach dem Unfall", text: "So läuft der Unfallservice ab.", icon: ShieldAlert },
  { title: "Lackschaden", text: "Vom Kratzer zum Neuzustand.", icon: Droplets },
  { title: "Frontscheibe", text: "Steinschlag in Minuten repariert.", icon: Car },
  { title: "Reparatur", text: "Ein Blick in unsere Meisterwerkstatt.", icon: Wrench },
];

export function VideoSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section aria-labelledby="video-title" className="scroll-mt-28">
      <div ref={ref} className="mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="video-title" className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            <AnimatedText text="Sehen statt lesen" minWeight={300} maxWeight={800} delayMultiplier={0.05} />
          </h2>
          <p className="mt-3 text-muted-foreground">Kurze Videos zeigen, wie wir Ihnen helfen.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clips.map((clip, i) => (
            <button
              key={clip.title}
              type="button"
              onClick={() => setActive(active === i ? null : i)}
              style={{ transitionDelay: `${i * 90}ms` }}
              className={`group relative aspect-[3/4] overflow-hidden rounded-2xl border border-black/10 bg-brand-navy text-left transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {active === i && clip.src ? (
                <iframe
                  src={clip.src}
                  title={clip.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 size-full"
                />
              ) : (
                <>
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(80,136,200,.55),transparent_60%)]" />
                  <clip.icon
                    className="absolute top-6 left-6 size-8 text-white/70 transition-transform duration-500 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex size-16 items-center justify-center rounded-full bg-brand-orange text-brand-orange-foreground transition-transform duration-300 group-hover:scale-110">
                      <span className="absolute inset-0 animate-ping rounded-full bg-brand-orange/40" />
                      <Play className="relative size-6" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
                    <span className="block text-base font-semibold">{clip.title}</span>
                    <span className="block text-xs opacity-80">{clip.text}</span>
                    {!clip.src && <span className="mt-1 block text-[10px] opacity-60">Video folgt in Kürze</span>}
                  </span>
                </>
              )}
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button3D href={WA_FOTO} target="_blank" rel="noopener noreferrer">
            Fotos senden & Angebot erhalten
          </Button3D>
        </div>
      </div>
    </section>
  );
}
