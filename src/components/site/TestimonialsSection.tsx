import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Quote, Star } from "lucide-react";

import { getTestimonials } from "@/lib/public-content.functions";
import { WA_FRAGE } from "./site-data";
import { Button3D } from "@/components/ui/button-3d";
import { AnimatedText } from "@/components/ui/animated-text";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  image_url: string | null;
  rating: number;
};

const fallback: Testimonial[] = [
  {
    id: "1",
    name: "Michael K.",
    role: "Unfallservice",
    text: "Nach meinem Unfall haben die alles übernommen — Abschleppen, Versicherung, Ersatzwagen.",
    image_url: null,
    rating: 5,
  },
  {
    id: "2",
    name: "Sandra B.",
    role: "Frontscheibe",
    text: "Steinschlag am Morgen gemeldet, mittags war die Scheibe repariert. Top Service!",
    image_url: null,
    rating: 5,
  },
  {
    id: "3",
    name: "Tolga Y.",
    role: "WhatsApp-Anfrage",
    text: "Fotos per WhatsApp geschickt, am nächsten Tag hatte ich mein Angebot.",
    image_url: null,
    rating: 5,
  },
];

// Nur der erste Buchstabe des Namens (nicht Initialen pro Wort) — "M W"
// wird zu "M", "Josef Lieber" zu "J", wie gewünscht.
function firstLetter(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

// Feste Avatar-Farbe pro (echtem) Kunden, vom Kunden selbst vorgegeben.
// Neue Bewertungen ohne Eintrag hier bekommen die Navy-Standardfarbe.
const AVATAR_COLORS: Record<string, string> = {
  "Josef Lieber": "#7B1E3A",
  "M W": "#1D4ED8",
  "Hugo Bert": "#16A34A",
  "Karlo Hamsoro": "#059669",
  "A R": "#0D9488",
  Saskia: "#14532D",
  "Andreas Herbst": "#7C3AED",
  "Eduardo S.": "#65A30D",
  "Max Pausr": "#DC2626",
};

function avatarColor(name: string) {
  return AVATAR_COLORS[name] ?? "#131F35";
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="mb-6 w-full max-w-xl rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_40px_-20px_rgba(19,31,53,.5)] transition-colors hover:border-brand-orange/50 sm:p-7">
      <Quote className="size-5 text-brand-orange/50" aria-hidden="true" />
      <p className="mt-3 text-base leading-relaxed whitespace-pre-line">{t.text}</p>
      <div className="mt-4 flex" aria-label={`${t.rating} von 5 Sternen`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="size-4 fill-[#FBBC04] text-[#FBBC04]" aria-hidden="true" />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-full text-base font-bold text-white"
          style={{ backgroundColor: avatarColor(t.name) }}
        >
          {firstLetter(t.name)}
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{t.name}</div>
          {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
        </div>
      </div>
    </div>
  );
}

// Eine einzige Spalte, kontinuierlich nach unten scrollend — kein Rechts/Links
// mehr, damit der Blick nur einem Weg nach unten folgt (statt zwischen
// mehreren Spalten hin- und herzuspringen).
//
// Die Scroll-Distanz wird per ResizeObserver direkt an der echten Höhe einer
// Runde gemessen (in Pixel, nicht in %). So bleibt der Loop immer exakt so
// lang wie der tatsächliche Inhalt — egal wie viele Bewertungen es gibt oder
// wie lang die Texte sind. Vorher war die Distanz auf die kurzen Platzhalter-
// Daten "eingefroren" und lief nach 1-2 Bewertungen bereits wieder von vorn.
function TestimonialsMarquee({ items, pxPerSecond = 55 }: { items: Testimonial[]; pxPerSecond?: number }) {
  const roundRef = useRef<HTMLDivElement>(null);
  const [roundHeight, setRoundHeight] = useState(0);

  useEffect(() => {
    const el = roundRef.current;
    if (!el) return;
    const measure = () => setRoundHeight(el.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const motionProps =
    roundHeight > 0
      ? {
          animate: { translateY: [0, -roundHeight] },
          transition: {
            duration: roundHeight / pxPerSecond,
            repeat: Infinity,
            ease: "linear" as const,
            repeatType: "loop" as const,
          },
        }
      : { animate: { translateY: 0 } };

  return (
    <motion.div {...motionProps} className="flex flex-col items-center gap-0">
      <div ref={roundRef} className="flex flex-col items-center">
        {items.map((t) => (
          <TestimonialCard key={`0-${t.id}`} t={t} />
        ))}
      </div>
      <div aria-hidden="true" className="flex flex-col items-center">
        {items.map((t) => (
          <TestimonialCard key={`1-${t.id}`} t={t} />
        ))}
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const { data } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => getTestimonials(),
  });

  const items = data && data.length > 0 ? data : fallback;

  return (
    <section aria-labelledby="reviews-title" className="relative overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-semibold">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-4 fill-[#FBBC04] text-[#FBBC04]" aria-hidden="true" />
            ))}
            <span className="ml-2">5,0 / 5 bei Google</span>
          </span>
          <h2 id="reviews-title" className="mt-4 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            <AnimatedText text="Das sagen unsere Kunden" minWeight={300} maxWeight={800} delayMultiplier={0.03} />
          </h2>
          <p className="mt-3 text-muted-foreground">
            Echte Bewertungen von Kundinnen und Kunden aus der Region — Unfallservice, Reparatur und mehr.
          </p>
        </motion.div>

        <div className="relative mt-12 flex max-h-[640px] justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <TestimonialsMarquee items={items} />
        </div>

        <div className="mt-10 text-center">
          <Button3D href={WA_FRAGE} target="_blank" rel="noopener noreferrer" variant="whatsapp">
            Jetzt Frage per WhatsApp stellen
          </Button3D>
        </div>
      </div>
    </section>
  );
}
