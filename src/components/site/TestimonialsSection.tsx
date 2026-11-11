import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Quote, Star } from "lucide-react";

import { getTestimonials } from "@/lib/public-content.functions";
import { WA_FRAGE } from "./site-data";
import { Button3D } from "@/components/ui/button-3d";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

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
    <div className="w-full rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_40px_-20px_rgba(19,31,53,.5)] sm:p-7">
      <Quote className="size-5 text-brand-orange/50" aria-hidden="true" />
      <p className="mt-3 min-h-24 text-base leading-relaxed whitespace-pre-line">{t.text}</p>
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

// Zwei Reihen Bewertungskarten, die in entgegengesetzte Richtungen laufen, mit
// ausblendenden Rändern (Muster: Testimonials Marquee, shadcnspace/marquee-01).
// Gezeigt werden nur die kurzen Bewertungen; lange sind im Admin-Panel
// (Kundenmeinungen) auf "inaktiv" gesetzt und dort wieder aktivierbar.
const EDGE_FADE =
  "[mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]";

function MarqueeRow({ items, reverse = false, duration }: { items: Testimonial[]; reverse?: boolean; duration: number }) {
  // Satz wird wiederholt, damit eine Reihe auch mit wenigen Bewertungen
  // breiter als jeder Bildschirm ist (sonst entsteht eine sichtbare Lücke).
  const row = [...items, ...items];
  return (
    <div className={EDGE_FADE}>
      <InfiniteSlider gap={20} duration={duration} durationOnHover={duration * 3} reverse={reverse}>
        {row.map((t, i) => (
          <div key={`${t.id}-${i}`} className="flex w-[300px] shrink-0 sm:w-[360px]">
            <TestimonialCard t={t} />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}

function TestimonialsMarquee({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-5 py-2">
      <MarqueeRow items={items} duration={45} />
      <MarqueeRow items={[...items].reverse()} reverse duration={55} />
    </div>
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
      <div className="mx-auto max-w-5xl px-4 pt-20 sm:px-6">
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
            Das sagen unsere Kunden
          </h2>
          <p className="mt-3 text-muted-foreground">
            Echte Bewertungen von Kundinnen und Kunden aus der Region — Unfallservice, Reparatur und mehr.
          </p>
        </motion.div>

      </div>

      {/* Gleiche Breite/Ausrichtung wie die Abschnitte darüber und darunter
          (max-w-7xl-Container) statt randlos über die ganze Seite. */}
      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6">
        <TestimonialsMarquee items={items} />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="mt-10 text-center">
          <Button3D href={WA_FRAGE} target="_blank" rel="noopener noreferrer" variant="whatsapp">
            Jetzt Frage per WhatsApp stellen
          </Button3D>
        </div>
      </div>
    </section>
  );
}
