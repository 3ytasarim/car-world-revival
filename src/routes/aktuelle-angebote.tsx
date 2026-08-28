import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { getPublicOffers } from "@/lib/public-content.functions";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { OfferCard } from "@/components/ui/offer-card";

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
        gradientColors={["#FFFFFF", "#F7FBFE", "#EAF4FC", "#DCEDFA", "#C9E2F7", "#B4D5F1", "#9FC8EA"]}
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
          photoBackground
        />

        <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
          {isLoading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-[430px] animate-pulse rounded-3xl bg-white" />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data?.map((offer) => (
                <OfferCard
                  key={offer.id}
                  title={offer.title}
                  description={offer.description}
                  priceLabel={offer.price_label}
                  image={offer.image_url}
                  imageAlt={offer.title}
                  whatsappHref={`https://wa.me/4926413969555?text=${encodeURIComponent(
                    `Hallo Car-World, ich interessiere mich für das Angebot: ${offer.title}`,
                  )}`}
                  whatsappLabel={offer.cta_label}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
