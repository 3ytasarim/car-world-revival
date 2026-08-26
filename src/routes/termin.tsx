import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PHONE_LABEL, PHONE_HREF, WA_TERMIN } from "@/components/site/site-data";
import { Button3D } from "@/components/ui/button-3d";

export const Route = createFileRoute("/termin")({
  head: () => ({
    meta: [
      { title: "Termin buchen — Car-World Autowerkstatt" },
      {
        name: "description",
        content: "Werkstatt-Termin bei Car-World buchen: per WhatsApp oder telefonisch — schnelle Antwort.",
      },
      { property: "og:title", content: "Termin buchen — Car-World" },
      { property: "og:description", content: "Termin per WhatsApp oder Telefon — schnelle Antwort." },
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
              <Button3D href={WA_TERMIN} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                <WhatsAppIcon className="size-5" />
                Termin per WhatsApp
              </Button3D>
              <Button3D href={PHONE_HREF}>
                <Phone className="size-4" aria-hidden="true" />
                {PHONE_LABEL}
              </Button3D>
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
