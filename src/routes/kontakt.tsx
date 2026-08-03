import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FotoAngebot } from "@/components/site/FotoAngebot";
import { ADDRESS, EMAIL, PHONE_DISPLAY, PHONE_HREF, WA_FRAGE } from "@/components/site/site-data";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt & Anfahrt — Car-World Autowerkstatt" },
      {
        name: "description",
        content:
          "Car-World in Bad Neuenahr-Ahrweiler: Ehlinger Straße 45. Per WhatsApp 7/24 erreichbar — schnelle Hilfe bei Unfall, Frontscheibe und Reparatur.",
      },
      { property: "og:title", content: "Kontakt — Car-World" },
      { property: "og:description", content: "Per WhatsApp 7/24 erreichbar. Ehlinger Straße 45, Bad Neuenahr-Ahrweiler." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/kontakt" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-surface">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <section className="bg-brand-navy py-14 text-brand-navy-foreground">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Kontakt & Anfahrt</h1>
            <p className="mt-3 opacity-80">Per WhatsApp 7/24 erreichbar — wir antworten schnell.</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white p-8">
              <h2 className="text-xl font-semibold">Car-World Kfz-Meisterbetrieb</h2>
              <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-orange" aria-hidden="true" />
                {ADDRESS.street}, {ADDRESS.zip} {ADDRESS.city}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={WA_FRAGE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-white"
                >
                  <WhatsAppIcon className="size-5" />
                  WhatsApp schreiben (7/24)
                </a>
                <a
                  href={PHONE_HREF}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-orange text-sm font-semibold text-brand-orange-foreground"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 text-sm font-semibold"
                >
                  {EMAIL}
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10">
              <iframe
                title="Anfahrt zu Car-World"
                src="https://www.google.com/maps?q=Ehlinger%20Stra%C3%9Fe%2045,%2053474%20Bad%20Neuenahr-Ahrweiler&output=embed"
                loading="lazy"
                className="size-full min-h-[320px] w-full border-0"
              />
            </div>
          </div>
        </section>

        <FotoAngebot />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
