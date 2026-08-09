import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Phone } from "lucide-react";


import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { StatsSection } from "@/components/site/StatsSection";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProcessSection } from "@/components/site/ProcessSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { FloatingActions } from "@/components/site/FloatingActions";
import heroBg from "@/assets/hero-bg.jpg";
import unfallImg from "@/assets/unfall.jpg";
import { FotoAngebot } from "@/components/site/FotoAngebot";
import { VideoSection } from "@/components/site/VideoSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { PartnerSection } from "@/components/site/PartnerSection";

import { PHONE_DISPLAY, PHONE_HREF } from "@/components/site/site-data";
import tuv from "@/assets/tuv.png.asset.json";
import innung from "@/assets/innung.png.asset.json";
import autoglas from "@/assets/autoglas.png.asset.json";
import hwk from "@/assets/hwk.png.asset.json";
import steinschlag from "@/assets/steinschlag.png.asset.json";
import abschleppen from "@/assets/abschleppen.png.asset.json";
import werkstatt from "@/assets/werkstatt.png.asset.json";

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

const partners = [
  { src: tuv.url, alt: "TÜV Rheinland", w: 237, h: 62 },
  { src: innung.url, alt: "KFZ-Innung Ahrweiler", w: 132, h: 132 },
  { src: autoglas.url, alt: "Autoglas Spezialist", w: 209, h: 117 },
  { src: hwk.url, alt: "Handwerkskammer Koblenz", w: 237, h: 102 },
];

const stats = [
  ["15+", "Jahre Erfahrung"],
  ["4.800+", "Reparaturen abgeschlossen"],
  ["98%", "Kundenzufriedenheit"],
  ["12", "Versicherungspartner"],
];

const coreServices = [
  {
    title: "Steinschlag",
    img: steinschlag.url,
    text: "Wir wechseln Ihre Windschutzscheibe oder reparieren sie innerhalb Minuten! Rufen Sie uns an, wir helfen sofort!",
  },
  {
    title: "Unfall? Abschleppen!",
    img: abschleppen.url,
    text: "Wir schleppen Ihr Fahrzeug nach einem Unfall gerne ab! Rufen Sie uns an, wir helfen sofort!",
  },
  {
    title: "Werkstatt",
    img: werkstatt.url,
    text: "Als Kfz-Meisterwerkstatt führen wir alle Tätigkeiten und Reparaturen einer modernen Werkstatt durch.",
  },
];



function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-surface">
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
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/85 via-white/92 to-white" />
          <section className="relative z-1 mx-auto flex max-w-full items-center">
            <div className="z-10 mx-auto max-w-screen-xl gap-12 px-4 py-24 md:px-8">
              <div className="mx-auto max-w-3xl space-y-5 text-center">
                <span className="group mx-auto flex w-fit items-center rounded-3xl border-[2px] border-black/5 bg-gradient-to-tr from-zinc-300/20 via-gray-400/20 to-transparent px-5 py-2 text-sm text-gray-600">
                  Alles aus einer Hand
                  <ChevronRight className="ml-2 inline size-4 duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <h1 className="mx-auto bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] bg-clip-text text-4xl tracking-tighter text-transparent md:text-6xl">
                  Deine{" "}
                  <span className="bg-gradient-to-r from-brand-orange to-sky-400 bg-clip-text text-transparent">
                    Nr. 1 Autowerkstatt
                  </span>
                </h1>
                <p className="mx-auto max-w-2xl text-gray-600">
                  Von der Unfallhilfe bis zur Wartung: Wir übernehmen Reparatur, Versicherungsabwicklung
                  und Ersatzwagen — Sie müssen sich um nichts kümmern.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-8 py-4 text-sm font-semibold text-brand-orange-foreground shadow-lg transition-transform hover:scale-[1.03]"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    Jetzt anrufen
                  </a>
                  <a
                    href="/termin"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-black/10 bg-white px-8 py-4 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
                  >
                    Termin buchen
                  </a>
                </div>
              </div>

              {/* Laptop + Smartphone Mockup */}
              <div className="relative mx-auto mt-14 w-full max-w-4xl pb-16 sm:pb-6">
                <div className="relative mx-auto w-[88%] text-gray-950 sm:w-full">
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
                    className="absolute overflow-hidden rounded-[2%]"
                    style={{ left: "11.46%", top: "5.33%", width: "77.11%", height: "80.96%" }}
                  >
                    <video
                      className="size-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={werkstatt.url}
                      aria-label="Car-World Werkstatt Video"
                    >
                      <source src="/videos/werkstatt.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>

                {/* Smartphone – größer und im Vordergrund */}
                <div className="absolute -bottom-8 left-1/2 w-[190px] -translate-x-[135%] sm:-bottom-4 sm:left-auto sm:right-2 sm:translate-x-0 sm:w-[236px] lg:w-[268px]">
                  <div className="relative rounded-[2.2rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.65)] ring-1 ring-black/20">
                    <div className="absolute top-2 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-neutral-900" />
                    <div className="relative overflow-hidden rounded-[1.6rem] bg-black">
                      <img
                        src={unfallImg}
                        alt="Unfallfahrzeug"
                        width={1024}
                        height={1024}
                        className="aspect-9/16 w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/25" />
                      <div className="absolute inset-x-0 bottom-0 space-y-3 p-4 text-center text-white">
                        <p className="text-lg font-bold tracking-tight">Unfall gehabt?</p>
                        <p className="text-[11px] text-white/75">Wir kümmern uns um alles.</p>
                        <a
                          href={PHONE_HREF}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange py-3 text-sm font-semibold text-brand-orange-foreground shadow-lg transition-transform hover:scale-[1.03]"
                        >
                          <Phone className="size-4" aria-hidden="true" />
                          Jetzt anrufen
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partner marquee – mit deutlich mehr Abstand zum Hero */}
              <div className="z-10 mt-28 w-full overflow-hidden sm:mt-36">
                <p className="mb-6 text-center text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Partner &amp; Zertifizierungen
                </p>
                <div className="relative flex max-w-[90vw] overflow-hidden py-5">
                  <div
                    className="animate-marquee flex w-max hover:[animation-play-state:paused]"
                    style={{ "--duration": "28s" } as React.CSSProperties}
                  >
                    {[...partners, ...partners].map((p, i) => (
                      <div key={i} className="mx-8 flex h-12 w-fit shrink-0 items-center justify-center sm:mx-12">
                        <img
                          src={p.src}
                          alt={p.alt}
                          width={p.w}
                          height={p.h}
                          loading="lazy"
                          className="h-10 w-auto object-contain grayscale-[35%] sm:h-12"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Foto senden → Angebot in 24 Stunden */}
        <FotoAngebot />

        {/* Trust + Stats */}
        <StatsSection />


        {/* Videos */}
        <VideoSection />

        {/* Core services — sticky stack */}
        <section className="relative bg-white pt-8 pb-4">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <SectionHeading
              eyebrow="Autowerkstatt in meiner Nähe"
              title="Unsere Kernleistungen"
              subtitle="Schnelle Hilfe, wenn es darauf ankommt."
            />
          </div>
          <div className="mt-6">
            {coreServices.map((s, i) => (
              <div key={s.title} className="sticky top-0 flex h-[75vh] items-center justify-center sm:h-[80vh]">
                <div className="relative w-[92%] max-w-4xl" style={{ top: `calc(-2vh + ${i * 16}px)` }}>
                  <div className="absolute -inset-[3px] -z-10 rounded-[27px] bg-[conic-gradient(from_0deg,transparent_0deg,var(--brand-orange)_60deg,rgba(80,136,200,0.5)_120deg,transparent_180deg,rgba(80,136,200,0.35)_240deg,transparent_360deg)]" />
                  <div className="relative flex flex-col items-center gap-6 rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-xl sm:p-16">
                    <h3 className="text-3xl font-bold text-brand-orange sm:text-5xl">{s.title}</h3>
                    <div className="relative size-40 shrink-0 overflow-hidden rounded-full border-4 border-gray-100 shadow-lg sm:size-56">
                      <img src={s.img} alt={s.title} loading="lazy" className="absolute inset-0 size-full object-cover" />
                    </div>
                    <p className="max-w-xl text-lg text-gray-600 sm:text-xl">{s.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <ProcessSection />

        {/* Services grid */}
        <ServicesSection />

        {/* Kundenmeinungen */}
        <TestimonialsSection />

        {/* Partner */}
        <PartnerSection />




        {/* CTA */}
        <section className="bg-brand-navy text-brand-navy-foreground">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight">Bereit für einen Termin?</h2>
            <p className="mt-3 opacity-80">
              Vereinbaren Sie jetzt einen Termin oder fordern Sie ein unverbindliches Angebot an.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/termin"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-orange px-6 text-base font-medium text-brand-orange-foreground transition-colors hover:bg-brand-orange/90"
              >
                Termin buchen
              </a>
              <a
                href="/angebot"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 bg-white/5 px-6 text-base font-medium text-brand-navy-foreground transition-colors hover:bg-white/10"
              >
                Angebot anfordern
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBar />
    </div>
  );
}
