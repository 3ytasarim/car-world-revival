import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { FotoAngebot } from "@/components/site/FotoAngebot";
import { PHONE_LABEL, PHONE_HREF, WA_TERMIN } from "@/components/site/site-data";

export const Route = createFileRoute("/termin")({
  head: () => ({
    meta: [
      { title: "Termin buchen — Car-World Autowerkstatt" },
      {
        name: "description",
        content:
          "Werkstatt-Termin bei Car-World buchen: per WhatsApp, telefonisch oder direkt online mit Fotos vom Schaden.",
      },
      { property: "og:title", content: "Termin buchen — Car-World" },
      { property: "og:description", content: "Termin per WhatsApp, Telefon oder Formular — Antwort in 24 Stunden." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/termin" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/termin" }],
  }),
  component: TerminPage,
});

function TerminPage() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-surface">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <section className="bg-brand-navy py-16 text-brand-navy-foreground">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Termin buchen</h1>
            <p className="mt-3 opacity-80">In unter einer Minute — wählen Sie einfach Ihren Weg.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={WA_TERMIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <WhatsAppIcon className="size-5" />
                Termin per WhatsApp
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-orange px-7 text-sm font-semibold text-brand-orange-foreground transition-transform hover:scale-[1.03]"
              >
                <Phone className="size-4" aria-hidden="true" />
                {PHONE_LABEL}
              </a>
            </div>
          </div>
        </section>
        <FotoAngebot />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
