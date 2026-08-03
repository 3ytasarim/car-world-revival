import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  CarFront,
  Check,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  FileCheck,
  Phone,
  Settings,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  X,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { StatsSection } from "@/components/site/StatsSection";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProcessSection } from "@/components/site/ProcessSection";
import { ServicesSection } from "@/components/site/ServicesSection";

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


const services = [
  { icon: ShieldCheck, title: "Unfallservice", text: "Soforthilfe nach dem Unfall – vom Abschleppen bis zur Reparatur.", href: "/leistungen/unfallservice" },
  { icon: Truck, title: "Abschleppdienst", text: "Schnelle Bergung und Transport zu unserer Werkstatt.", href: "/leistungen/abschleppdienst" },
  { icon: Wrench, title: "Fahrzeugreparatur", text: "Professionelle Reparatur durch erfahrene Techniker.", href: "/leistungen/fahrzeugreparatur" },
  { icon: CarFront, title: "Ersatzwagen", text: "Mobil bleiben, während Ihr Fahrzeug repariert wird.", href: "/leistungen/ersatzwagen" },
  { icon: FileCheck, title: "Versicherungsabwicklung", text: "Wir übernehmen die komplette Kommunikation mit Ihrer Versicherung.", href: "/leistungen/versicherungsabwicklung" },
  { icon: CircleDot, title: "Reifenwechsel", text: "Saisonaler Reifenwechsel und Einlagerung.", href: "/leistungen/reifenwechsel" },
  { icon: Sparkles, title: "Windschutzscheiben", text: "Schnelle Windschutzscheiben-Reparatur und -Erneuerung.", href: "/leistungen/windschutzscheiben" },
  { icon: BadgeCheck, title: "TÜV", text: "Termingerechte Prüfung ohne lange Wartezeiten.", href: "/leistungen/tuev" },
  { icon: ClipboardCheck, title: "Inspektionen", text: "Regelmäßige Inspektion nach Herstellervorgabe.", href: "/leistungen/inspektionen" },
  { icon: Settings, title: "Wartung", text: "Vorsorge, die teure Reparaturen vermeidet.", href: "/leistungen/wartung" },
];

const comparison: Array<[string, boolean, boolean]> = [
  ["Digitale Statusupdates", true, false],
  ["Transparente Kommunikation", true, false],
  ["Direkte Versicherungsabwicklung", true, false],
  ["Ersatzwagen verfügbar", true, false],
  ["Garantie auf Reparaturen", true, true],
];

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-surface">
      <Header />

      <main className="flex-1 pb-16 md:pb-0">
        {/* Hero */}
        <div className="relative overflow-hidden bg-white">
          <section className="relative z-1 mx-auto flex max-w-full items-center">
            <div className="z-10 mx-auto max-w-screen-xl gap-12 px-4 py-28 md:px-8">
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
                  <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#BFDBFE_0%,#1D4ED8_50%,#BFDBFE_100%)]" />
                    <div className="inline-flex h-full cursor-pointer items-center justify-center rounded-full bg-white text-xs font-medium backdrop-blur-3xl">
                      <a
                        href="/termin"
                        className="group inline-flex items-center justify-center rounded-full border-[1px] border-input bg-gradient-to-tr from-zinc-300/20 via-brand-orange/30 to-transparent px-6 py-3.5 text-center text-gray-900 transition-all hover:via-brand-orange/40 sm:px-10 sm:py-4"
                      >
                        Termin buchen
                      </a>
                    </div>
                  </span>
                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-black/10 bg-white px-6 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {PHONE_DISPLAY}
                  </a>
                </div>

                {/* Laptop mockup */}
                <div className="pt-8">
                  <div className="relative mx-auto w-full max-w-3xl text-gray-950">
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
                      <div className="flex size-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-950 text-xs text-gray-500 sm:text-sm">
                        Video folgt in Kürze
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partner marquee */}
              <div className="z-10 mt-10 w-full overflow-hidden sm:mt-16">
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

        {/* Trust + Stats */}
        <StatsSection />

        {/* Core services — sticky stack */}
        <section className="relative bg-white pt-8 pb-4">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <SectionHeading
              eyebrow="Meisterwerkstatt in Ihrer Nähe"
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


        {/* Comparison */}
        <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Warum <span className="text-brand-orange">Car-World</span>?
            </h2>
            <p className="mt-3 text-muted-foreground">Der Unterschied zu einer klassischen Werkstatt.</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-xl border">
            <div className="grid grid-cols-3 items-center border-b bg-muted/40 text-sm font-semibold">
              <div className="p-4" />
              <div className="p-4 text-center text-brand-orange">Car-World</div>
              <div className="p-4 text-center text-muted-foreground">Typische Werkstatt</div>
            </div>
            {comparison.map(([label, a, b], i) => (
              <div
                key={label}
                className={`grid grid-cols-3 items-center text-sm ${i % 2 === 1 ? "bg-muted/20" : ""}`}
              >
                <div className="p-4">{label}</div>
                <div className="flex justify-center p-4">
                  {a ? <Check className="size-5 text-success" /> : <X className="size-5 text-muted-foreground" />}
                </div>
                <div className="flex justify-center p-4">
                  {b ? <Check className="size-5 text-success" /> : <X className="size-5 text-muted-foreground" />}
                </div>
              </div>
            ))}
          </div>
        </section>

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
