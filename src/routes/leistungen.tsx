import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { ServicesSection } from "@/components/site/ServicesSection";
import { RundumSorglosSection } from "@/components/site/RundumSorglosSection";
import { FotoAngebot } from "@/components/site/FotoAngebot";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export const Route = createFileRoute("/leistungen")({
  head: () => ({
    meta: [
      { title: "Leistungen — Alles aus einer Hand | Car-World" },
      {
        name: "description",
        content:
          "Unfallservice, Abschleppdienst, Lackschaden, Frontscheibe, Inspektion und Versicherungsabwicklung — Ihre Autowerkstatt in meiner Nähe in Bad Neuenahr-Ahrweiler.",
      },
      { property: "og:title", content: "Leistungen — Car-World" },
      { property: "og:description", content: "Unfallservice, Frontscheibe, Lackschaden und Reparatur aus einer Hand." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen" }],
  }),
  component: LeistungenPage,
});

function LeistungenPage() {
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
              <Wrench className="size-4" aria-hidden="true" />
              Leistungen
            </span>
          }
          title="Alles aus einer Hand"
          subtitle="Ihre Autowerkstatt in meiner Nähe — vom Unfallschaden bis zur Inspektion."
        />
        <ServicesSection />
        <RundumSorglosSection />
        <FotoAngebot />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
