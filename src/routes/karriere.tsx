import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, CheckCircle2, Mail, MessageCircle, Phone } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { supabase } from "@/integrations/supabase/client";
import { EMAIL_KARRIERE, PHONE_DISPLAY, PHONE_HREF, WA_KARRIERE } from "@/components/site/site-data";

export const Route = createFileRoute("/karriere")({
  head: () => ({
    meta: [
      { title: "Karriere bei Car-World — In 60 Sekunden bewerben" },
      {
        name: "description",
        content:
          "Offene Stellen bei Car-World in Bad Neuenahr-Ahrweiler: Kfz-Mechatroniker/in, Ausbildung und Bürokauffrau/-mann. Jetzt per WhatsApp bewerben.",
      },
      { property: "og:title", content: "Karriere bei Car-World" },
      { property: "og:description", content: "Kfz-Mechatroniker/in, Ausbildung und Bürokauffrau/-mann gesucht." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/karriere" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/karriere" }],
  }),
  component: KarrierePage,
});

const benefits = [
  "Pünktliche und faire Bezahlung",
  "Familienfreundliche Arbeitszeiten",
  "Bezahlte Weiterbildungen",
  "Aufstieg zum Servicetechniker / Geschäftsleiter",
  "Steuerfreie Sachbezüge (Fitnessstudio, Tankgutschein)",
  "Kostenlose Getränke",
  "Ein grandioses Team",
  "Ein sicherer Arbeitsplatz",
  "Regelmäßige Firmenfeiern",
  "Viel Platz für Deine Ideen",
];

function KarrierePage() {
  const { data } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_openings")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="flex min-h-screen flex-col bg-brand-surface">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <section className="bg-brand-navy py-14 text-brand-navy-foreground">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/15 px-4 py-1.5 text-xs font-semibold text-brand-orange">
              <Briefcase className="size-4" aria-hidden="true" />
              In 60 Sekunden bewerben
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Karriere bei Car-World</h1>
            <p className="mt-3 opacity-80">Kfz-Meisterbetrieb | Mitglied der Kfz-Innung Ahrweiler</p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {data?.map((job) => (
              <article
                key={job.id}
                className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-xl"
              >
                <span className="w-fit rounded-full bg-brand-surface px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                  {job.employment_type}
                </span>
                <h2 className="mt-3 text-lg font-semibold">{job.title}</h2>
                <p className="mt-1 text-sm font-medium text-brand-orange">{job.subtitle}</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{job.description}</p>
                {job.requirements && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    <strong>Voraussetzung:</strong> {job.requirements}
                  </p>
                )}
                <a
                  href={`https://wa.me/4926413969555?text=${encodeURIComponent(
                    `Hallo Car-World, ich bewerbe mich auf die Stelle: ${job.title}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Jetzt bewerben
                </a>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-6 rounded-3xl border border-black/10 bg-white p-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Warum Car-World?</h2>
              <ul className="mt-4 space-y-2">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-brand-surface p-6">
              <h3 className="text-lg font-semibold">Bewerbungen an Car-World</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Joun Hamsoro
                <br />
                Ehlinger Straße 45
                <br />
                53474 Bad Neuenahr-Ahrweiler (Heimersheim)
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={PHONE_HREF}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/10 bg-white text-sm font-semibold"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
                <a
                  href={`mailto:${EMAIL_KARRIERE}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/10 bg-white text-sm font-semibold"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {EMAIL_KARRIERE}
                </a>
                <a
                  href={WA_KARRIERE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-orange text-sm font-semibold text-brand-orange-foreground"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Per WhatsApp bewerben
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
