import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FotoAngebot } from "@/components/site/FotoAngebot";

export const Route = createFileRoute("/angebot")({
  head: () => ({
    meta: [
      { title: "Angebot anfordern — Foto senden, Angebot in 24 Stunden | Car-World" },
      {
        name: "description",
        content:
          "Schicken Sie Fotos von Unfallschaden, Lackschaden oder Frontscheibe — Car-World erstellt Ihr Angebot innerhalb von 24 Stunden.",
      },
      { property: "og:title", content: "Angebot anfordern — Car-World" },
      { property: "og:description", content: "Foto senden, Angebot in 24 Stunden erhalten." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/angebot" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/angebot" }],
  }),
  component: AngebotPage,
});

function AngebotPage() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-surface">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <section className="bg-brand-navy py-14 text-brand-navy-foreground">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Angebot anfordern</h1>
            <p className="mt-3 opacity-80">Foto schicken — Angebot innerhalb von 24 Stunden.</p>
          </div>
        </section>
        <FotoAngebot />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
