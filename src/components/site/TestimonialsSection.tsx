import { Play, Quote, Star } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";
import { WA_FRAGE } from "./site-data";

const reviews = [
  {
    name: "Michael K.",
    text: "Nach meinem Unfall haben die alles übernommen — Abschleppen, Versicherung, Ersatzwagen. Ich musste nichts machen.",
  },
  { name: "Sandra B.", text: "Steinschlag am Morgen gemeldet, mittags war die Scheibe repariert. Top Service!" },
  { name: "Tolga Y.", text: "Fotos per WhatsApp geschickt, am nächsten Tag hatte ich mein Angebot. Sehr unkompliziert." },
  { name: "Familie Weber", text: "Ehrliche Beratung, faire Preise und ein sehr freundliches Team. Klare Empfehlung." },
];

export function TestimonialsSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section aria-labelledby="reviews-title" className="bg-white">
      <div ref={ref} className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-surface px-4 py-1.5 text-xs font-semibold">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-4 fill-brand-orange text-brand-orange" aria-hidden="true" />
            ))}
            <span className="ml-2">4,9 / 5 bei Google</span>
          </span>
          <h2 id="reviews-title" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Das sagen unsere Kunden
          </h2>
        </div>

        {/* Video-Testimonials */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {["Unfallservice", "Frontscheibe", "Reparatur"].map((label, i) => (
            <div
              key={label}
              style={{ transitionDelay: `${i * 90}ms` }}
              className={`group relative aspect-video overflow-hidden rounded-2xl bg-brand-navy transition-all duration-700 hover:-translate-y-1 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(80,136,200,.5),transparent_65%)]" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-transform group-hover:scale-110">
                  <Play className="size-5" aria-hidden="true" />
                </span>
              </span>
              <span className="absolute bottom-0 left-0 p-4 text-xs font-semibold text-white">
                Kundenstimme: {label}
              </span>
            </div>
          ))}
        </div>

        {/* Google-Bewertungen */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {reviews.map((r, i) => (
            <blockquote
              key={r.name}
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`relative rounded-2xl border border-black/10 bg-brand-surface p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-lg ${
                inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <Quote className="size-6 text-brand-orange/40" aria-hidden="true" />
              <p className="mt-3 text-sm">{r.text}</p>
              <footer className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <span className="flex">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="size-3.5 fill-brand-orange text-brand-orange" aria-hidden="true" />
                  ))}
                </span>
                {r.name}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={WA_FRAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-navy px-7 text-sm font-semibold text-brand-navy-foreground transition-transform hover:scale-[1.03]"
          >
            Jetzt Frage per WhatsApp stellen
          </a>
        </div>
      </div>
    </section>
  );
}
