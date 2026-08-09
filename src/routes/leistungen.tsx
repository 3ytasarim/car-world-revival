import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { ServicesSection } from "@/components/site/ServicesSection";
import { RundumSorglos } from "@/components/site/RundumSorglos";
import { FotoAngebot } from "@/components/site/FotoAngebot";
import { ProcessSection } from "@/components/site/ProcessSection";

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
    <div className="flex min-h-screen flex-col bg-brand-surface">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <section className="bg-brand-navy py-14 text-brand-navy-foreground">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Alles aus <span className="text-brand-orange">einer Hand</span>
            </h1>
            <p className="mt-3 opacity-80">Ihre Autowerkstatt in meiner Nähe — vom Unfallschaden bis zur Inspektion.</p>
          </div>
        </section>
        <ServicesSection />
        <RundumSorglos />
        <ProcessSection />
        <FotoAngebot />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
