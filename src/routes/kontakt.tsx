import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Navigation, Phone } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { FotoAngebot } from "@/components/site/FotoAngebot";
import { ADDRESS, EMAIL, PHONE_LABEL, PHONE_HREF, WA_FRAGE } from "@/components/site/site-data";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { Button3D } from "@/components/ui/button-3d";

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
              <Navigation className="size-4" aria-hidden="true" />
              Kontakt
            </span>
          }
          title="Kontakt & Anfahrt"
          subtitle="Per WhatsApp 7/24 erreichbar — wir antworten schnell."
        />

        <section className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative rounded-3xl border border-black/10 bg-white p-8">
              <h2 className="text-xl font-semibold">Car-World Kfz-Meisterbetrieb</h2>
              <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-orange" aria-hidden="true" />
                {ADDRESS.street}, {ADDRESS.zip} {ADDRESS.city}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button3D href={WA_FRAGE} target="_blank" rel="noopener noreferrer" variant="whatsapp" className="w-full">
                  <WhatsAppIcon className="size-5" />
                  WhatsApp schreiben (7/24)
                </Button3D>
                <Button3D href={PHONE_HREF} className="w-full">
                  <Phone className="size-4" aria-hidden="true" />
                  {PHONE_LABEL}
                </Button3D>
                <Button3D href={`mailto:${EMAIL}`} variant="secondary" className="w-full">
                  {EMAIL}
                </Button3D>
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
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
