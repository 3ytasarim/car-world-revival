import { createFileRoute } from "@tanstack/react-router";
import { CarFront } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { ServiceDetailContent } from "@/components/site/ServiceDetailContent";
import { WA_ERSATZWAGEN } from "@/components/site/site-data";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export const Route = createFileRoute("/leistungen/ersatzwagen")({
  head: () => ({
    meta: [
      { title: "Ersatzwagen in Bad Neuenahr-Ahrweiler | Car-World" },
      {
        name: "description",
        content:
          "Während der Reparatur mobil bleiben – Ersatzfahrzeug direkt bei Car-World in Bad Neuenahr-Ahrweiler anfragen.",
      },
      { property: "og:title", content: "Ersatzwagen — Car-World" },
      {
        property: "og:description",
        content: "Während der Reparatur mobil bleiben – Ersatzfahrzeug direkt bei Car-World anfragen.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/ersatzwagen" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/ersatzwagen" }],
  }),
  component: ErsatzwagenPage,
});

const sections = [
  {
    heading: "Mobil während des Werkstattaufenthalts",
    text: "Ihr Auto wird repariert, doch Arbeit, Familie und Termine laufen weiter. Mit einem Ersatzwagen von Car-World bleiben Sie in Bad Neuenahr-Ahrweiler und Umgebung mobil. Das Ersatzfahrzeug übernehmen Sie direkt bei unserer Meisterwerkstatt in Heimersheim. Die Bereitstellung erfolgt nach Verfügbarkeit und vorheriger Abstimmung, damit Fahrzeugklasse und Nutzungszeitraum zu Ihrem Werkstatttermin passen.",
  },
  {
    heading: "Werkstattersatzwagen frühzeitig reservieren",
    text: "Teilen Sie uns bereits bei der Terminvereinbarung mit, dass Sie einen Leihwagen benötigen. Nennen Sie den geplanten Abgabe- und Rückgabetag sowie besondere Anforderungen an das Fahrzeug. Vor der Übergabe klären wir Laufzeit, Kosten, Versicherung, mögliche Selbstbeteiligung und Rückgabebedingungen transparent mit Ihnen. Ändert sich die Reparaturdauer, stimmen wir die weitere Nutzung gemeinsam ab.",
  },
  {
    heading: "Unfallersatzwagen und Versicherung",
    text: "Nach einem unverschuldeten Unfall können Mietwagenkosten unter bestimmten Voraussetzungen zum ersatzfähigen Schaden gehören. Eine automatische oder vollständige Kostenübernahme lässt sich daraus jedoch nicht ableiten. Entscheidend sind unter anderem Haftung, tatsächlicher Mobilitätsbedarf, Fahrzeugklasse und Tarif. Car-World unterstützt Sie bei der werkstattbezogenen Abstimmung mit der Versicherung, damit offene Fragen möglichst vor der Anmietung geklärt werden.",
  },
];

const faqs = [
  {
    question: "Häufige Frage: Ist der Ersatzwagen kostenlos?",
    answer:
      "Ein Ersatzwagen ist nicht grundsätzlich kostenlos. Ob Sie selbst zahlen oder eine Versicherung Kosten übernimmt, hängt vom konkreten Schadenfall und den vereinbarten Konditionen ab.",
  },
  {
    question: "Häufige Frage: Wann sollte ich reservieren?",
    answer:
      "Fragen Sie den Werkstattersatzwagen möglichst zusammen mit Ihrem Reparaturtermin an. Bei einem unerwarteten Unfall prüfen wir kurzfristig, welches Ersatzfahrzeug im benötigten Zeitraum verfügbar ist.",
  },
];

function ErsatzwagenPage() {
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
              <CarFront className="size-4" aria-hidden="true" />
              Ersatzwagen
            </span>
          }
          title="Ersatzwagen in Bad Neuenahr-Ahrweiler"
          subtitle="Während der Reparatur mobil bleiben – Ersatzfahrzeug direkt bei Car-World anfragen."
          photoBackground
        />
        <ServiceDetailContent sections={sections} faqs={faqs} wa={WA_ERSATZWAGEN} />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
