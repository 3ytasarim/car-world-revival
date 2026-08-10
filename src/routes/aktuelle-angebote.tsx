import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { getPublicOffers } from "@/lib/public-content.functions";
import { WA_FRAGE } from "@/components/site/site-data";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { Button3D } from "@/components/ui/button-3d";

export const Route = createFileRoute("/aktuelle-angebote")({
  head: () => ({
    meta: [
      { title: "Aktuelle Angebote — Car-World Autowerkstatt" },
      {
        name: "description",
        content:
          "Saisonale Angebote Ihrer Autowerkstatt in meiner Nähe: Reifenwechsel, Klimaservice, Inspektion, Frontscheibe und mehr.",
      },
      { property: "og:title", content: "Aktuelle Angebote — Car-World" },
      { property: "og:description", content: "Reifenwechsel, Klimaservice, Inspektion und mehr — jetzt anfragen." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/aktuelle-angebote" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/aktuelle-angebote" }],
  }),
  component: OffersPage,
});

function OffersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["offers"],
    queryFn: () => getPublicOffers(),
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
              <Tag className="size-4" aria-hidden="true" />
              Aktionen
            </span>
          }
          title="Aktuelle Angebote"
          subtitle="Kurz anfragen, schnell erledigt — direkt per WhatsApp."
        />

        <section className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-52 animate-pulse rounded-2xl bg-white" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data?.map((offer) => (
                <article
                  key={offer.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-xl"
                >
                  {offer.badge && (
                    <span className="absolute top-4 right-4 rounded-full bg-brand-orange px-3 py-1 text-[11px] font-bold text-brand-orange-foreground">
                      {offer.badge}
                    </span>
                  )}
                  <h2 className="pr-16 text-lg font-semibold">{offer.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{offer.description}</p>
                  {offer.price_label && (
                    <p className="mt-4 text-2xl font-bold text-brand-orange">{offer.price_label}</p>
                  )}
                  <Button3D
                    href={`https://wa.me/4926413969555?text=${encodeURIComponent(
                      `Hallo Car-World, ich interessiere mich für das Angebot: ${offer.title}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="navy"
                    className="mt-5 w-full"
                  >
                    {offer.cta_label}
                  </Button3D>
                </article>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button3D href={WA_FRAGE} target="_blank" rel="noopener noreferrer">
              Angebot nicht dabei? Schreiben Sie uns
            </Button3D>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
