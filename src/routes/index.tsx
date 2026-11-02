import { createFileRoute } from "@tanstack/react-router";
import { Car, Phone, ShieldAlert, Star } from "lucide-react";


import { Header } from "@/components/site/Header";
import { GoogleIcon } from "@/components/site/GoogleIcon";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";

import { LeistungenTabs } from "@/components/site/LeistungenTabs";
import { FloatingActions } from "@/components/site/FloatingActions";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";



import heroBg from "@/assets/hero-werkstatt.jpg";
import unfallImg from "@/assets/unfall.jpg";
import scheibeImg from "@/assets/svc-scheibe.jpg";
import abschleppImg from "@/assets/svc-abschlepp.jpg";
import reparaturImg from "@/assets/svc-reparatur.jpg";
import ersatzwagenImg from "@/assets/svc-ersatzwagen.jpg";
import versicherungImg from "@/assets/svc-versicherung.jpg";
import reifenImg from "@/assets/svc-reifen.jpg";
import tuevImg from "@/assets/svc-tuev.jpg";
import wartungImg from "@/assets/svc-wartung.jpg";
import { ShuffleGrid, type ShuffleItem } from "@/components/ui/shuffle-grid";
import { RundumSorglosSection } from "@/components/site/RundumSorglosSection";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { checkPoints, CheckPointCard } from "@/components/site/IhreVorteile";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { PartnerSection, certificationLogos } from "@/components/site/PartnerSection";
import { PartnerLogosCombined } from "@/components/site/PartnerLogosCombined";

import { PHONE_HREF, WA_FRAGE, WA_UNFALL, WA_SCHEIBE } from "@/components/site/site-data";
import { Button3D } from "@/components/ui/button-3d";
import { BeamButton } from "@/components/ui/beam-button";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";




export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Car-World — Deine Nr. 1 Autowerkstatt in Bad Neuenahr-Ahrweiler" },
      {
        name: "description",
        content:
          "Kfz-Meisterwerkstatt Car-World: Unfallservice, Abschleppdienst, Reparatur, Ersatzwagen und Versicherungsabwicklung — alles aus einer Hand.",
      },
      { property: "og:title", content: "Car-World — Deine Nr. 1 Autowerkstatt" },
      {
        property: "og:description",
        content:
          "Von der Unfallhilfe bis zur Wartung: Reparatur, Versicherungsabwicklung und Ersatzwagen aus einer Hand.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoRepair",
          name: "Car-World Kfz-Werkstatt",
          telephone: "+4926413969555",
          email: "info@kfz-car-world.de",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Ehlinger Straße 45",
            postalCode: "53474",
            addressLocality: "Bad Neuenahr-Ahrweiler",
            addressCountry: "DE",
          },
        }),
      },
    ],
  }),
  component: Home,
});



const stats = [
  ["15+", "Jahre Erfahrung"],
  ["4.800+", "Reparaturen abgeschlossen"],
  ["98%", "Kundenzufriedenheit"],
  ["12", "Versicherungspartner"],
];

// Hero-Raster: die 9 Leistungs-Titelbilder (gleiche Bilder wie in
// "Unsere Leistungen"), Unfallservice und Windschutzscheiben zuerst.
const heroShuffleItems: ShuffleItem[] = [
  { id: 1, src: unfallImg, alt: "Unfallservice", label: "Unfallservice" },
  { id: 2, src: scheibeImg, alt: "Windschutzscheiben", label: "Windschutzscheiben" },
  { id: 3, src: abschleppImg, alt: "Abschleppdienst", label: "Abschleppdienst" },
  { id: 4, src: reparaturImg, alt: "Fahrzeugreparatur", label: "Fahrzeugreparatur" },
  { id: 5, src: ersatzwagenImg, alt: "Ersatzwagen", label: "Ersatzwagen" },
  { id: 6, src: versicherungImg, alt: "Versicherungsabwicklung", label: "Versicherung" },
  { id: 7, src: reifenImg, alt: "Reifenwechsel", label: "Reifenwechsel" },
  { id: 8, src: tuevImg, alt: "TÜV & AU", label: "TÜV & AU" },
  { id: 9, src: wartungImg, alt: "Inspektion & Wartung", label: "Inspektion & Wartung" },
];

function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Shared page background — same soft blue gradient as the Partner &
          Zertifizierungen strip, now spanning the full height of the
          homepage behind every section (absolute inset-0 against this
          `relative` root, so it covers the whole scrollable page, not just
          one viewport). */}
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
        {/* Hero */}
        <div id="hero" className="relative overflow-hidden bg-white">
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            width={1920}
            height={1080}
            className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.52]"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/80 via-white/70 to-white" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white to-transparent" />

          <section className="relative z-1 mx-auto flex max-w-full items-center">

            <div className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center px-4 pt-6 pb-10 md:px-10 md:pt-10 md:pb-12 lg:min-h-[620px] lg:px-14 lg:pt-10 lg:pb-12">


              <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-stretch lg:gap-8">
                {/* Text-Spalte */}
                <div className="max-w-4xl space-y-7 pt-6 text-left lg:flex lg:flex-col lg:pt-4">
                  {/* Google + 5 Sterne Trust-Badge — Vertrauenssignal noch
                      vor dem ersten Scroll, gleicher 5,0-Wert wie im
                      Kundenmeinungen-Bereich (keine zweite, abweichende Zahl). */}
                  <div className="flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/90 px-4 py-2 shadow-sm">
                    <GoogleIcon className="size-5 shrink-0" />
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-[#FBBC04] text-[#FBBC04]" aria-hidden="true" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-[#131F35]">5,0 / 5 bei Google</span>
                  </div>

                  <h1 className="text-left text-[2rem] leading-[1.05] tracking-tight sm:text-[2.5rem] md:text-[3rem] lg:text-[3rem] xl:text-[3.25rem]">
                    <span
                      className="block bg-[linear-gradient(180deg,_#0B1626_0%,_rgba(11,_22,_38,_0.8)_100%)] bg-clip-text text-transparent"
                    >
                      Deine
                    </span>
                    <span
                      className="block bg-[linear-gradient(135deg,_#0B1626,_#1B3A63,_#2F6FB5,_#5088C8,_#8FB8E8)] bg-clip-text font-extrabold text-transparent"
                    >
                      Nr. 1 Autowerkstatt in Bad Neuenahr
                    </span>

                  </h1>

                  {/* Zwei direkt sichtbare Themen-CTAs statt Anrufen/WhatsApp —
                      jeder öffnet WhatsApp mit passend vorbefüllter Nachricht.
                      Shimmer sitzt auf der Button-Fläche (shimmer-Prop). */}
                  <div className="flex flex-wrap items-center gap-4 lg:mt-auto">
                    <Button3D href={WA_UNFALL} target="_blank" rel="noopener noreferrer" shimmer>
                      <ShieldAlert className="size-4" aria-hidden="true" />
                      Unfallschaden melden
                    </Button3D>
                    <Button3D href={WA_SCHEIBE} target="_blank" rel="noopener noreferrer">
                      <Car className="size-4" aria-hidden="true" />
                      Steinschlag oder Glasschaden?
                    </Button3D>
                  </div>

                  {/* 3 Checkmark-Kernversprechen direkt unter den Buttons —
                      aus IhreVorteile.tsx wiederverwendet (die Sektion
                      selbst ist aktuell ausgeblendet, siehe unten). */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:mb-4">
                    {checkPoints.map((c) => (
                      <CheckPointCard key={c.title} {...c} />
                    ))}
                  </div>

                  {/* Zertifizierungs-Logos — als automatisch laufender
                      Slider statt statischer Reihe (Kundenwunsch). */}
                  <div className="w-full lg:mb-[4rem] [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
                    <InfiniteSlider gap={40} duration={18}>
                      {certificationLogos.map((l) => (
                        <img
                          key={l.alt}
                          src={l.src}
                          alt={l.alt}
                          loading="lazy"
                          className="h-12 w-auto object-contain sm:h-14"
                        />
                      ))}
                    </InfiniteSlider>
                  </div>

                </div>

                {/* Bild-Spalte: karışan 3x3-Raster mit den Leistungs-
                    Titelbildern (statt der früheren Smartphone-Mockups) —
                    nur auf Desktop (ab lg), auf Mobile ausgeblendet. */}
                <div className="mx-auto hidden h-full w-full max-w-xl items-center justify-center lg:flex">
                  <ShuffleGrid items={heroShuffleItems} />
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Rundum-sorglos-Paket — direkt nach dem Hero, inkl. Werkstatt-Video
            und Vorher/Nachher. */}
        <RundumSorglosSection hideInsuranceMarquee shimmerButton videoSrc="/videos/werkstatt-video.mp4" />

        {/* Ihre Vorteile ist aktuell deaktiviert (Kundenwunsch) — Checkmark-
            Karten + Zertifizierungs-Logos werden stattdessen im Hero
            wiederverwendet (siehe oben). Bei Bedarf hier einfach
            <IhreVorteile /> wieder einfügen. */}

        {/* Kundenmeinungen (Google-Bewertungen) */}
        <TestimonialsSection />

        {/* Schnell erreichbar: blaues Band (Header-Farbe) mit Anrufen + WhatsApp
            als Beam-Buttons, direkt vor den Versicherungspartner-Logos. */}
        <section className="relative flex min-h-[420px] items-center bg-brand-orange py-20 sm:min-h-[500px] sm:py-28">
          <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Schnell erreichbar</h2>
            <p className="mt-3 text-white/85">Rufen Sie uns direkt an oder schreiben Sie uns per WhatsApp.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <BeamButton href={PHONE_HREF}>
                <Phone className="size-4" aria-hidden="true" />
                Jetzt anrufen
              </BeamButton>
              <BeamButton href={WA_FRAGE} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </BeamButton>
            </div>
          </div>
        </section>

        {/* Versicherungspartner + Zertifizierungen — kompakt, statisch, klein */}
        <PartnerLogosCombined compact title="Partner mit allen Versicherungen" hideWhatsAppButton />

        {/* Unsere Leistungen — 3x3 Karten-Grid */}
        <LeistungenTabs />

        {/* Partner / Großkunden — letzter Abschnitt vor dem Footer */}
        <PartnerSection hideCertificationBlock />

      </main>

      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
