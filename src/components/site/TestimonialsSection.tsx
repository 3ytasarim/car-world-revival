import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Quote, Star } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { WA_FRAGE } from "./site-data";
import { Button3D } from "@/components/ui/button-3d";

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
    role: "Foto-Angebot",
    text: "Fotos per WhatsApp geschickt, am nächsten Tag hatte ich mein Angebot.",
    image_url: null,
    rating: 5,
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="mb-6 w-full max-w-xs rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_40px_-20px_rgba(19,31,53,.5)] transition-colors hover:border-brand-orange/50">
      <Quote className="size-5 text-brand-orange/50" aria-hidden="true" />
      <p className="mt-3 text-sm leading-relaxed">{t.text}</p>
      <div className="mt-4 flex" aria-label={`${t.rating} von 5 Sternen`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-brand-orange text-brand-orange" aria-hidden="true" />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        {t.image_url ? (
          <img
            src={t.image_url}
            alt={t.name}
            loading="lazy"
            className="size-10 rounded-full object-cover"
          />
        ) : (
          <span className="grid size-10 place-items-center rounded-full bg-brand-navy text-xs font-bold text-brand-navy-foreground">
            {initials(t.name)}
          </span>
        )}
        <div className="leading-tight">
          <div className="text-sm font-semibold">{t.name}</div>
          <div className="text-xs text-muted-foreground">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsColumn({
  items,
  duration = 18,
  className,
}: {
  items: Testimonial[];
  duration?: number;
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col items-center gap-0 pb-6"
      >
        {[0, 1].map((round) => (
          <div key={round} className="flex flex-col items-center">
            {items.map((t) => (
              <TestimonialCard key={`${round}-${t.id}`} t={t} />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TestimonialsSection() {
  const { data } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async (): Promise<Testimonial[]> => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id,name,role,text,image_url,rating")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  const items = data && data.length > 0 ? data : fallback;
  const per = Math.ceil(items.length / 3);
  const columns = [items.slice(0, per), items.slice(per, per * 2), items.slice(per * 2)].filter(
    (c) => c.length > 0,
  );

  return (
    <section aria-labelledby="reviews-title" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-semibold">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-4 fill-brand-orange text-brand-orange" aria-hidden="true" />
            ))}
            <span className="ml-2">4,9 / 5 bei Google</span>
          </span>
          <h2 id="reviews-title" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Das sagen unsere Kunden
          </h2>
          <p className="mt-3 text-muted-foreground">
            Echte Bewertungen von Kundinnen und Kunden aus der Region — Unfallservice, Reparatur und mehr.
          </p>
        </motion.div>

        <div className="relative mt-12 flex max-h-[640px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <TestimonialsColumn items={columns[0] ?? []} duration={22} />
          <TestimonialsColumn items={columns[1] ?? columns[0] ?? []} duration={28} className="hidden md:block" />
          <TestimonialsColumn items={columns[2] ?? columns[0] ?? []} duration={25} className="hidden lg:block" />
        </div>

        <div className="mt-10 text-center">
          <Button3D href={WA_FRAGE} target="_blank" rel="noopener noreferrer" variant="navy">
            Jetzt Frage per WhatsApp stellen
          </Button3D>
        </div>
      </div>
    </section>
  );
}
