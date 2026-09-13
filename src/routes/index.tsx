import { createFileRoute } from "@tanstack/react-router";
import { Phone, Star } from "lucide-react";


import { Header } from "@/components/site/Header";
import { GoogleIcon } from "@/components/site/GoogleIcon";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";

import { LeistungenTabs } from "@/components/site/LeistungenTabs";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PhoneScreen } from "@/components/site/PhoneScreen";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";



import heroBg from "@/assets/hero-werkstatt.jpg";
import heroPhoneUnfall from "@/assets/unfall-1.jpg";
import heroPhoneSteinschlag from "@/assets/hero-steinschlag.jpg";
import heroPhoneReifenwechsel from "@/assets/hero-reifenwechsel.jpg";
import { Iphone15ProFrame, PhoneFanCarousel } from "@/components/ui/phone-mockups-1";
import { RundumSorglosSection } from "@/components/site/RundumSorglosSection";
import { checkPoints, CheckPointCard } from "@/components/site/IhreVorteile";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { PartnerSection, certificationLogos } from "@/components/site/PartnerSection";
import { PartnerLogosCombined } from "@/components/site/PartnerLogosCombined";

import { PHONE_HREF, WA_FRAGE, WA_UNFALL, WA_SCHEIBE, WA_REIFEN } from "@/components/site/site-data";
import { Button3D } from "@/components/ui/button-3d";
import { GradientShimmer } from "@/components/ui/gradient-shimmer";
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

// Hero-Phones: 3 verschiedene Themen statt 3x derselbe "Unfall gehabt?"-Karte.
const heroPhones = [
  {
    image: heroPhoneUnfall,
    imageAlt: "Unfallfahrzeug mit Frontschaden",
    badge: "Notfall",
    title: "Unfall gehabt?",
    subtitle: "Wir kümmern uns um alles — sofort.",
    wa: WA_UNFALL,
  },
  {
    image: heroPhoneSteinschlag,
    imageAlt: "Steinschlag in der Frontscheibe",
    badge: "Sofort-Termin",
    title: "Steinschlag?",
    subtitle: "In wenigen Minuten repariert.",
    wa: WA_SCHEIBE,
  },
  {
    image: heroPhoneReifenwechsel,
    imageAlt: "Reifenwechsel in der Werkstatt",
    badge: "Schnell & fair",
    title: "Reifenwechsel?",
    subtitle: "Wechsel und Einlagerung ohne Wartezeit.",
    wa: WA_REIFEN,
  },
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

            <div className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center px-4 pt-24 pb-10 md:px-10 md:pt-28 md:pb-12 lg:min-h-[620px] lg:px-14 lg:pt-28 lg:pb-12">


              <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-stretch lg:gap-8">
                {/* Text-Spalte */}
                <div className="max-w-4xl space-y-7 pt-6 text-left lg:flex lg:flex-col lg:pt-20">
                  {/* Google + 5 Sterne Trust-Badge — Vertrauenssignal noch
                      vor dem ersten Scroll, gleicher 4,9-Wert wie im
                      Kundenmeinungen-Bereich (keine zweite, abweichende Zahl). */}
                  <div className="flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/90 px-4 py-2 shadow-sm">
                    <GoogleIcon className="size-5 shrink-0" />
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-brand-orange text-brand-orange" aria-hidden="true" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-[#131F35]">4,9 / 5 bei Google</span>
                  </div>

                  <h1 className="text-left text-[2.5rem] leading-[0.95] tracking-tighter sm:text-[3.5rem] md:text-[4.75rem] lg:text-[4.75rem] xl:text-[5.5rem]">
                    <span
                      className="block bg-[linear-gradient(180deg,_#0B1626_0%,_rgba(11,_22,_38,_0.8)_100%)] bg-clip-text text-transparent"
                    >
                      Deine
                    </span>
                    <span
                      className="block bg-[linear-gradient(135deg,_#0B1626,_#1B3A63,_#2F6FB5,_#5088C8,_#8FB8E8)] bg-clip-text font-extrabold text-transparent"
                    >
                      Nr. 1 Autowerkstatt in Bad Neuenahr-Ahrweiler
                    </span>

                  </h1>


                  <div className="flex flex-wrap items-center gap-4 lg:mt-auto">
                    <Button3D href={PHONE_HREF}>
                      <Phone className="size-4" aria-hidden="true" />
                      Jetzt anrufen
                    </Button3D>
                    <Button3D href={WA_FRAGE} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                      <WhatsAppIcon className="size-4" />
                      <GradientShimmer gradient="bay" duration={2}>
                        WhatsApp
                      </GradientShimmer>
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

                  {/* Zertifizierungs-Logos — bewusst transparent/ohne
                      Karten-Box, direkt nebeneinander. */}
                  <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-start lg:mb-[4rem]">
                    {certificationLogos.map((l) => (
                      <img
                        key={l.alt}
                        src={l.src}
                        alt={l.alt}
                        loading="lazy"
                        className="h-12 w-auto object-contain sm:h-14"
                      />
                    ))}
                  </div>

                </div>

                {/* Mockup-Spalte: 3 Smartphones im Fan-Carousel, automatisch
                    wechselnd — nur auf Desktop (ab lg), auf Mobile komplett
                    ausgeblendet statt verkleinert dargestellt. */}
                <div className="mx-auto hidden h-full w-full max-w-2xl items-center justify-center lg:flex lg:translate-x-10 xl:translate-x-10">
                  <PhoneFanCarousel
                    className="drop-shadow-2xl"
                    items={heroPhones.map((p, i) => (
                      <Iphone15ProFrame key={i}>
                        <PhoneScreen
                          image={p.image}
                          imageAlt={p.imageAlt}
                          badge={p.badge}
                          title={p.title}
                          subtitle={p.subtitle}
                          wa={p.wa}
                        />
                      </Iphone15ProFrame>
                    ))}
                  />
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

        {/* Schnell erreichbar: Jetzt-anrufen + WhatsApp, direkt vor den
            Versicherungspartner-Logos. */}
        <section className="relative bg-brand-navy py-14">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Schnell erreichbar</h2>
            <p className="mt-2 text-white/70">Rufen Sie uns direkt an oder schreiben Sie uns per WhatsApp.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button3D href={PHONE_HREF}>
                <Phone className="size-4" aria-hidden="true" />
                Jetzt anrufen
              </Button3D>
              <Button3D href={WA_FRAGE} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </Button3D>
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
