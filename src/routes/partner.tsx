import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PartnerSection } from "@/components/site/PartnerSection";

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
    <div className="flex min-h-screen flex-col bg-brand-surface">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <section className="bg-brand-navy py-14 text-brand-navy-foreground">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Partnerschaft mit Car-World</h1>
            <p className="mt-3 opacity-80">Ein starker Werkstattpartner für Versicherungen, Flotten und Firmen.</p>
          </div>
        </section>
        <PartnerSection />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
