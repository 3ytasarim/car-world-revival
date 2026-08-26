import { createFileRoute } from "@tanstack/react-router";
import { Handshake } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { PartnerSection } from "@/components/site/PartnerSection";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner werden — Versicherungen, Flotten & Wartungsverträge | Car-World" },
      {
        name: "description",
        content:
          "Werden Sie Partner von Car-World: Versicherungen, Firmen mit eigener Flotte und Betriebe mit Wartungsverträgen. Anfrage per Formular oder WhatsApp.",
      },
      { property: "og:title", content: "Partner werden — Car-World" },
      { property: "og:description", content: "Versicherungen, Flotten und Wartungsverträge — jetzt Partner werden." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/partner" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/partner" }],
  }),
  component: PartnerPage,
});

function PartnerPage() {
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
              <Handshake className="size-4" aria-hidden="true" />
              Partnerschaft
            </span>
          }
          title="Partnerschaft mit Car-World"
          subtitle="Ein starker Werkstattpartner für Versicherungen, Flotten und Firmen."
        />
        <PartnerSection />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
