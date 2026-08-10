import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, CheckCircle2, IdCard, Mail, Phone } from "lucide-react";
import werkstattFoto from "@/assets/svc-reparatur.jpg";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { getJobOpenings } from "@/lib/public-content.functions";
import { EMAIL_KARRIERE, PHONE_LABEL, PHONE_HREF, WA_KARRIERE } from "@/components/site/site-data";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { Button3D } from "@/components/ui/button-3d";

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
    queryFn: () => getJobOpenings(),
  });

  return (
    <div className="relative flex min-h-screen flex-col">
      <AnimatedGradientBackground
        Breathing
        startingGap={120}
        breathingRange={12}
        animationSpeed={0.03}
        topOffset={20}
        gradientColors={["#F4F7FB", "#DCEAF8", "#A9CCEC", "#7FB3E0", "#5088C8", "#2F5F9B", "#1B3A63"]}
        gradientStops={[20, 40, 55, 68, 80, 90, 100]}
        containerClassName="opacity-70"
      />
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <PageHero
          badge={
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/15 px-4 py-1.5 text-xs font-semibold text-brand-orange">
              <Briefcase className="size-4" aria-hidden="true" />
              In 60 Sekunden bewerben
            </span>
          }
          title="Karriere bei Car-World"
          subtitle="Kfz-Meisterbetrieb | Mitglied der Kfz-Innung Ahrweiler"
        />

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {data?.map((job) => (
              <article
                key={job.id}
                className="flex flex-col items-center rounded-2xl border border-black/10 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-xl"
              >
                <div className="size-28 shrink-0 overflow-hidden rounded-full border-4 border-brand-surface shadow-md">
                  <img src={werkstattFoto} alt="" loading="lazy" className="size-full object-cover" />
                </div>
                <span className="mt-4 w-fit rounded-full bg-brand-surface px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                  {job.employment_type}
                </span>
                <h2 className="mt-3 text-lg font-semibold">{job.title}</h2>
                {job.subtitle && <p className="mt-1 text-sm font-medium text-brand-orange">{job.subtitle}</p>}
                <p className="mt-3 text-sm text-muted-foreground">{job.description}</p>

                {job.requirements && (
                  <dl className="mt-4 w-full rounded-xl bg-brand-surface p-4 text-left text-sm">
                    <div className="flex items-start gap-2">
                      <IdCard className="mt-0.5 size-4 shrink-0 text-brand-orange" aria-hidden="true" />
                      <div>
                        <dt className="font-semibold">Voraussetzung</dt>
                        <dd className="text-muted-foreground">{job.requirements}</dd>
                      </div>
                    </div>
                  </dl>
                )}

                <Button3D
                  href={`https://wa.me/4926413969555?text=${encodeURIComponent(
                    `Hallo Car-World, ich bewerbe mich auf die Stelle: ${job.title}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  className="mt-5 w-full"
                >
                  <WhatsAppIcon className="size-4" />
                  Jetzt in 60 Sekunden bewerben
                </Button3D>
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
                <Button3D href={PHONE_HREF} variant="secondary" className="w-full">
                  <Phone className="size-4" aria-hidden="true" />
                  {PHONE_LABEL}
                </Button3D>
                <Button3D href={`mailto:${EMAIL_KARRIERE}`} variant="secondary" className="w-full">
                  <Mail className="size-4" aria-hidden="true" />
                  {EMAIL_KARRIERE}
                </Button3D>
                <Button3D href={WA_KARRIERE} target="_blank" rel="noopener noreferrer" className="w-full">
                  <WhatsAppIcon className="size-4" />
                  Per WhatsApp bewerben
                </Button3D>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
