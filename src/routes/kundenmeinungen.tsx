import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";

export const Route = createFileRoute("/kundenmeinungen")({
  head: () => ({
    meta: [
      { title: "Kundenmeinungen & Google-Bewertungen | Car-World" },
      {
        name: "description",
        content:
          "Echte Kundenstimmen zur Autowerkstatt in meiner Nähe: Unfallservice, Frontscheibe und Reparatur bei Car-World in Bad Neuenahr-Ahrweiler.",
      },
      { property: "og:title", content: "Kundenmeinungen — Car-World" },
      { property: "og:description", content: "4,9 von 5 Sternen: Das sagen unsere Kunden über Car-World." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/kundenmeinungen" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/kundenmeinungen" }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-surface">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <section className="bg-brand-navy py-14 text-brand-navy-foreground">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Kundenmeinungen</h1>
            <p className="mt-3 opacity-80">Vertrauen, das man sehen kann.</p>
          </div>
        </section>
        <TestimonialsSection />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
