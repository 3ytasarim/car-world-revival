import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { ServiceDetailContent } from "@/components/site/ServiceDetailContent";
import { WA_ABSCHLEPP } from "@/components/site/site-data";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export const Route = createFileRoute("/leistungen/abschleppdienst")({
  head: () => ({
    meta: [
      { title: "Abschleppdienst in Bad Neuenahr-Ahrweiler | Car-World" },
      {
        name: "description",
        content:
          "Schnelle Bergung und sicherer Fahrzeugtransport nach Unfall oder Panne — Car-World bringt Ihr Auto direkt in die Meisterwerkstatt in Bad Neuenahr-Ahrweiler.",
      },
      { property: "og:title", content: "Abschleppdienst — Car-World" },
      {
        property: "og:description",
        content: "Schnelle Bergung und sicherer Fahrzeugtransport nach Unfall oder Panne.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/abschleppdienst" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/abschleppdienst" }],
  }),
  component: AbschleppdienstPage,
});

const sections = [
  {
    heading: "Hilfe für ein nicht fahrbereites Auto",
    text: "Nach einer Panne oder einem Unfall muss oft schnell entschieden werden, wie das Fahrzeug sicher von der Straße kommt. Der Abschleppdienst von Car-World unterstützt Sie in Bad Neuenahr-Ahrweiler und der näheren Umgebung bei der Bergung und beim Transport Ihres Autos. Wir bringen das Fahrzeug direkt in unsere Meisterwerkstatt in Heimersheim, damit Schadenaufnahme und Reparaturplanung ohne unnötige Umwege beginnen können.",
  },
  {
    heading: "Diese Angaben beschleunigen die Organisation",
    text: "Nennen Sie uns am Telefon oder per WhatsApp Ihren genauen Standort, das Kennzeichen, Fahrzeugmodell und eine kurze Beschreibung der Situation. Wichtig ist auch, ob das Auto noch roll- und lenkfähig ist, ob Flüssigkeit austritt oder ob es an einer schwer zugänglichen Stelle steht. Bei Elektro- und Hybridfahrzeugen sowie Fahrzeugen mit Automatikgetriebe können besondere Transportvorgaben gelten. Mit den richtigen Informationen lässt sich das passende Vorgehen gezielt abstimmen.",
  },
  {
    heading: "Abschleppen und Werkstattservice verbinden",
    text: "Nach der Ankunft bei Car-World sehen wir uns den Schaden an und besprechen mit Ihnen die nächsten Schritte. Bei einem Unfallschaden können Fahrzeugreparatur, Ersatzwagen und Versicherungsabwicklung direkt mitgedacht werden. Bei einer technischen Panne prüfen wir zunächst, welche Diagnose und Reparatur erforderlich sind. Sie behalten einen festen Ansprechpartner vom Abholort bis zur weiteren Betreuung in der Werkstatt.",
  },
];

const faq = {
  question: "Häufige Frage: Wohin wird mein Fahrzeug gebracht?",
  answer:
    "Auf Wunsch transportieren wir Ihr Fahrzeug zu Car-World in Bad Neuenahr-Ahrweiler. Bei einem Versicherungsfall sollten mögliche Vorgaben zur Werkstattwahl oder Kostenübernahme vorher berücksichtigt werden.",
};

function AbschleppdienstPage() {
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
              <Truck className="size-4" aria-hidden="true" />
              Abschleppdienst
            </span>
          }
          title="Abschleppdienst in Bad Neuenahr-Ahrweiler"
          subtitle="Schnelle Bergung und sicherer Fahrzeugtransport nach Unfall oder Panne."
          photoBackground
        />
        <ServiceDetailContent sections={sections} faq={faq} wa={WA_ABSCHLEPP} />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
