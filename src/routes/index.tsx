import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Phone, Star } from "lucide-react";


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
import { IhreVorteile } from "@/components/site/IhreVorteile";
import { VideoPlayer } from "@/components/ui/video-player";
import { VideoSection } from "@/components/site/VideoSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { PartnerSection } from "@/components/site/PartnerSection";
import { PartnerLogosCombined } from "@/components/site/PartnerLogosCombined";

import { PHONE_HREF } from "@/components/site/site-data";
import { Button3D } from "@/components/ui/button-3d";
import { GradientShimmer } from "@/components/ui/gradient-shimmer";




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
  },
  {
    image: heroPhoneSteinschlag,
    imageAlt: "Steinschlag in der Frontscheibe",
    badge: "Sofort-Termin",
    title: "Steinschlag?",
    subtitle: "In wenigen Minuten repariert.",
  },
  {
    image: heroPhoneReifenwechsel,
    imageAlt: "Reifenwechsel in der Werkstatt",
    badge: "Schnell & fair",
    title: "Reifenwechsel?",
    subtitle: "Wechsel und Einlagerung ohne Wartezeit.",
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


              <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-stretch lg:gap-8">
                {/* Text-Spalte */}
                <div className="max-w-4xl space-y-7 pt-6 text-left lg:flex lg:flex-col lg:pt-20">
                  <span className="group flex w-fit items-center rounded-3xl border-[2px] border-brand-orange/25 bg-gradient-to-tr from-brand-orange/15 via-sky-400/15 to-transparent px-6 py-2.5 text-base text-[#1B3A63] shadow-[0_10px_25px_-18px_rgba(80,136,200,0.9)]">
                    Alles aus einer Hand
                    <ChevronRight className="ml-2 inline size-4 text-brand-orange duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>

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
                      Nummer 1 Autowerkstatt
                    </span>

                  </h1>


                  <div className="flex flex-wrap items-center gap-4 lg:mt-auto lg:mb-[10rem]">
                    <Button3D href={PHONE_HREF}>
                      <Phone className="size-4" aria-hidden="true" />
                      <GradientShimmer gradient="bay" duration={2}>
                        Jetzt anrufen
                      </GradientShimmer>
                    </Button3D>
                  </div>

                </div>

                {/* Mockup-Spalte: 3 Smartphones im Fan-Carousel, automatisch
                    wechselnd — nur auf Desktop (ab lg), auf Mobile komplett
                    ausgeblendet statt verkleinert dargestellt. */}
                <div className="mx-auto hidden h-full w-full max-w-2xl items-center justify-center lg:flex">
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
                        />
                      </Iphone15ProFrame>
                    ))}
                  />
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Ihre Vorteile — Kundennutzen statt KPI-Zahlen, gleich nach dem Hero */}
        <IhreVorteile />

        {/* Werkstatt-Video — exakt dieselbe Breite wie die Ihre-Vorteile-Marquee
            darüber: gleicher max-w-6xl-Container plus dasselbe zusätzliche
            48px-Inset (px-12), das dort die Fade-Maske erzeugt. */}
        <section className="relative bg-white py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="px-12">
              <VideoPlayer src="/videos/werkstatt-video.mp4" className="max-w-none" />
            </div>
          </div>
        </section>

        {/* Rundum-sorglos-Paket */}
        <RundumSorglosSection hideInsuranceMarquee shimmerButton />

        {/* Unsere Leistungen — vertikale Tabs */}
        <LeistungenTabs />

        {/* Videos */}
        <VideoSection />






        {/* Kundenmeinungen */}
        <TestimonialsSection />

        {/* Partner */}
        <PartnerSection hideCertificationBlock />

        {/* Versicherungspartner + Partner & Zertifizierungen — auf der
            Startseite zu einem gemeinsamen 2-spaltigen Block kombiniert,
            direkt über dem Footer (wie auf /partner). */}
        <PartnerLogosCombined />

      </main>

      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
