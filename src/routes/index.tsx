import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Phone } from "lucide-react";
import { motion } from "framer-motion";


import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";

import { LeistungenTabs } from "@/components/site/LeistungenTabs";
import { FloatingActions } from "@/components/site/FloatingActions";
import { HeroScreen } from "@/components/site/HeroScreen";
import { PhoneScreen } from "@/components/site/PhoneScreen";
import IPhoneMockup from "@/components/ui/iphone-mockup";
import { ClientOnly } from "@tanstack/react-router";
import { MeshyBackground } from "@/components/ui/meshy-background";
import { FloatingIcons } from "@/components/site/FloatingIcons";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";



import heroBg from "@/assets/hero-bg.jpg";
import { FotoAngebot } from "@/components/site/FotoAngebot";
import { RundumSorglosSection } from "@/components/site/RundumSorglosSection";
import { VideoSection } from "@/components/site/VideoSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { PartnerSection } from "@/components/site/PartnerSection";

import { PHONE_HREF } from "@/components/site/site-data";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button3D } from "@/components/ui/button-3d";
import { TextGradient } from "@/components/ui/text-gradient";



import kernAbschleppen from "@/assets/kern-abschleppen.png";
import kernWerkstatt from "@/assets/kern-werkstatt.png";
import kernSteinschlag from "@/assets/kern-steinschlag.png";

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

const coreServices = [
  {
    title: "Steinschlag",
    img: kernSteinschlag,
    text: "Wir wechseln Ihre Windschutzscheibe oder reparieren sie innerhalb Minuten! Rufen Sie uns an, wir helfen sofort!",
  },
  {
    title: "Unfall? Abschleppen!",
    img: kernAbschleppen,
    text: "Wir schleppen Ihr Fahrzeug nach einem Unfall gerne ab! Rufen Sie uns an, wir helfen sofort!",
  },
  {
    title: "Werkstatt",
    img: kernWerkstatt,
    text: "Als Kfz-Meisterwerkstatt führen wir alle Tätigkeiten und Reparaturen einer modernen Werkstatt durch.",
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
        <div className="relative overflow-hidden bg-white">
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            width={1920}
            height={1080}
            className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.14]"
          />
          <ClientOnly fallback={null}>
            <MeshyBackground className="opacity-40" />
          </ClientOnly>
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/80 via-white/70 to-white" />
          <FloatingIcons />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white to-transparent" />

          <section className="relative z-1 mx-auto flex max-w-full items-center">

            <div className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center px-4 pt-24 pb-24 md:px-10 md:pt-28 md:pb-32 lg:min-h-[720px] lg:px-14 lg:pt-28 lg:pb-32">


              <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-stretch lg:gap-8">
                {/* Text-Spalte */}
                <div className="max-w-4xl space-y-7 pt-6 text-center lg:flex lg:flex-col lg:pt-20 lg:text-center">
                  <span className="group mx-auto flex w-fit items-center rounded-3xl border-[2px] border-brand-orange/25 bg-gradient-to-tr from-brand-orange/15 via-sky-400/15 to-transparent px-6 py-2.5 text-base text-[#1B3A63] shadow-[0_10px_25px_-18px_rgba(80,136,200,0.9)]">
                    <AnimatedText text="Alles aus einer Hand" minWeight={300} maxWeight={700} delayMultiplier={0.12} />
                    <ChevronRight className="ml-2 inline size-4 text-brand-orange duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <h1 className="origin-center -rotate-[5deg] text-center text-[3.9rem] leading-[0.95] tracking-tighter md:text-[5.25rem] lg:text-[5.25rem] xl:text-[6.25rem]">
                    <span className="block">
                      <AnimatedText
                        text="Deine"
                        className="bg-[linear-gradient(180deg,_#0B1626_0%,_rgba(11,_22,_38,_0.8)_100%)] bg-clip-text text-transparent"
                      />
                    </span>
                    <span className="block whitespace-nowrap font-extrabold">
                      <TextGradient as="span" duration={5}>Nr. 1 Autowerkstatt</TextGradient>
                    </span>

                  </h1>


                  <div className="flex flex-wrap items-center justify-center gap-4 lg:mt-auto lg:mb-[17rem] lg:justify-center">
                    <Button3D href={PHONE_HREF}>
                      <Phone className="size-4" aria-hidden="true" />
                      Jetzt anrufen
                    </Button3D>
                    <Button3D href="/termin" variant="secondary">
                      Termin buchen
                    </Button3D>
                  </div>

                </div>

                {/* Mockup-Spalte: Laptop und Smartphone nebeneinander */}
                <div className="relative mx-auto w-full max-w-5xl sm:min-h-[600px] lg:min-h-[780px]">
                  {/* Laptop – ab Tablet, im Hintergrund */}
                  <div className="relative z-10 w-full text-gray-950 opacity-95 sm:block hidden sm:mt-10 lg:w-[104%]">


                    <svg className="h-auto w-full" fill="none" height="400" viewBox="0 0 650 400" width="650" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M79.56,13.18h491.32c7.23,0,13.1,5.87,13.1,13.1v336.61H66.46V26.28c0-7.23,5.87-13.1,13.1-13.1Z" fill="#a4a5a7" />
                      <path d="M79.96,14.24h490.45c6.83,0,12.37,5.54,12.37,12.37v336.28H67.59V26.6c0-6.83,5.54-12.37,12.37-12.37Z" fill="#222" />
                      <path d="M570.25,15.74H80.34c-6.12,0-11.08,4.96-11.08,11.08v336.07h512.08V26.82c0-6.12-4.96-11.08-11.08-11.08ZM575.74,345.17H74.52V27.31c0-3.31,2.68-5.99,5.99-5.99h489.24c3.31,0,5.99,2.68,5.99,5.99v317.86Z" fill="#000" />
                      <rect fill="currentColor" height="323.85" rx="5" ry="5" width="501.22" x="74.52" y="21.32" />
                      <rect fill="#1d1d1d" height="12.48" width="512.11" x="69.09" y="350.51" />
                      <path d="M298.14,21.02h54.07v6.5c0,1.56-1.27,2.82-2.82,2.82h-48.42c-1.56,0-2.82-1.27-2.82-2.82v-6.5h0Z" fill="#000" />
                      <path d="M19.04,362.77h611.92v10.39c0,5.95-4.83,10.79-10.79,10.79H29.83c-5.95,0-10.79-4.83-10.79-10.79v-10.39h0Z" fill="#acadaf" />
                      <path d="M325.11,25.14c-1.99.03-1.99-3.09,0-3.06,1.99-.03,1.99,3.09,0,3.06Z" fill="#080d4c" />
                      <polygon fill="#b9b9bb" points="600.06 385.39 567.29 385.39 565.84 383.95 601.82 383.95 600.06 385.39" />
                      <polygon fill="#292929" points="598.73 386.82 568.64 386.82 567.32 385.39 600.35 385.39 598.73 386.82" />
                      <polygon fill="#b9b9bb" points="82.64 385.39 49.87 385.39 48.43 383.95 84.41 383.95 82.64 385.39" />
                      <polygon fill="#292929" points="81.31 386.82 51.23 386.82 49.9 385.39 82.93 385.39 81.31 386.82" />
                      <path d="M278.11,362.6h94.05c0,3.63-2.95,6.58-6.58,6.58h-80.89c-3.63,0-6.58-2.95-6.58-6.58h0Z" fill="#8f9091" />
                    </svg>
                    <div
                      className="absolute overflow-hidden rounded-[2%] [container-type:inline-size]"
                      style={{ left: "11.46%", top: "5.33%", width: "77.11%", height: "80.96%" }}
                    >
                      <HeroScreen />
                    </div>
                  </div>

                  {/* Smartphone – im Vordergrund, größer */}
                  <div className="animate-fade-in relative z-30 mx-auto h-[580px] w-[280px] drop-shadow-2xl [container-type:inline-size] sm:absolute sm:right-[-4%] sm:bottom-0 sm:mx-0 sm:h-[660px] sm:w-[320px] sm:rotate-[-5deg] lg:h-[800px] lg:w-[386px]">
                    <IPhoneMockup
                      model="15-pro"
                      color="natural-titanium"
                      safeArea={false}
                      scale={0.48}

                      screenStyle={{ containerType: "inline-size" } as React.CSSProperties}
                    >
                      <PhoneScreen />
                    </IPhoneMockup>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Rundum-sorglos-Paket */}
        <RundumSorglosSection />

        {/* Unsere Leistungen — vertikale Tabs */}
        <LeistungenTabs />

        {/* Unsere Kernleistungen — image/title/text cards, adapted from
            21st.dev prebuiltui/feature-sections. Each card wiggles
            periodically (staggered) instead of the old sticky-scroll stack. */}
        <section className="relative py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-sm font-semibold text-brand-orange">
              Autowerkstatt in meiner Nähe
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
              <AnimatedText text="Unsere Kernleistungen" minWeight={300} maxWeight={800} delayMultiplier={0.05} />
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">Schnelle Hilfe, wenn es darauf ankommt.</p>
          </div>
          <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-start justify-center gap-10 px-4">
            {coreServices.map((s, i) => (
              <motion.div
                key={s.title}
                animate={{ rotate: [0, -3, 3, -3, 3, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 4, delay: i * 0.6, ease: "easeInOut" }}
                whileHover={{ y: -4 }}
                className="w-full max-w-80"
              >
                <div className="aspect-[969/669] overflow-hidden rounded-xl shadow-[0_20px_40px_-30px_rgba(19,31,53,0.35)]">
                  <img src={s.img} alt={s.title} loading="lazy" className="size-full object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-navy">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Foto senden → Angebot in 24 Stunden */}
        <FotoAngebot />



        {/* Videos */}
        <VideoSection />






        {/* Kundenmeinungen */}
        <TestimonialsSection />

        {/* Partner */}
        <PartnerSection />


      </main>

      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
