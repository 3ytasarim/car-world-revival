import { createFileRoute } from "@tanstack/react-router";
import { Disc } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { ServiceDetailContent } from "@/components/site/ServiceDetailContent";
import { WA_REIFEN } from "@/components/site/site-data";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export const Route = createFileRoute("/leistungen/reifenwechsel")({
  head: () => ({
    meta: [
      { title: "Reifenwechsel in Bad Neuenahr-Ahrweiler | Car-World" },
      {
        name: "description",
        content:
          "Räderwechsel, Auswuchten und Einlagerung für Sommer- und Winterräder — Car-World in Bad Neuenahr-Ahrweiler.",
      },
      { property: "og:title", content: "Reifenwechsel — Car-World" },
      {
        property: "og:description",
        content: "Räderwechsel, Auswuchten und Einlagerung für Sommer- und Winterräder.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/reifenwechsel" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/reifenwechsel" }],
  }),
  component: ReifenwechselPage,
});

const sections = [
  {
    heading: "Reifenservice für den Saisonwechsel",
    text: "Wenn die Temperaturen und Straßenbedingungen wechseln, sollte die Bereifung zum Einsatz passen. Car-World übernimmt Ihren Reifenwechsel in Bad Neuenahr-Ahrweiler und prüft beim Termin den sichtbaren Zustand der Räder. Auffälliger Verschleiß, erkennbare Schäden und der Luftdruck werden berücksichtigt. So lässt sich frühzeitig klären, ob der vorhandene Radsatz weiterverwendet werden kann oder zusätzlicher Handlungsbedarf besteht.",
  },
  {
    heading: "Radwechsel oder Reifenmontage?",
    text: "Beim Radwechsel wird das komplette Rad aus Reifen und Felge getauscht. Bei einer Reifenmontage wird der Reifen von der Felge abgezogen und ein neuer Reifen fachgerecht aufgezogen. Teilen Sie uns bei der Terminbuchung mit, welche Variante Sie benötigen und ob die Räder mitgebracht werden oder bereits bei uns lagern. Das hilft, Zeit und Arbeitsumfang passend einzuplanen.",
  },
  {
    heading: "Auswuchten und Einlagerung",
    text: "Vibrationen am Lenkrad können auf eine Unwucht hindeuten. Beim Auswuchten gleichen kleine Gewichte Unterschiede in der Gewichtsverteilung des Rades aus und unterstützen einen ruhigen Lauf. Auf Wunsch lagern wir Ihren zweiten Radsatz bis zur nächsten Saison ein. Damit sparen Sie Platz und müssen die Räder nicht selbst transportieren oder zu Hause unter geeigneten Bedingungen aufbewahren.",
  },
];

const faqs = [
  {
    question: "Häufige Frage: Wann sollte ich den Termin buchen?",
    answer:
      "In den typischen Wechselzeiten im Frühjahr und Herbst steigt die Nachfrage. Fragen Sie Ihren Wunschtermin möglichst früh an und nennen Sie Fahrzeugmodell, Reifengröße sowie gewünschte Zusatzleistungen.",
  },
  {
    question: "Häufige Frage: Muss jedes Rad ausgewuchtet werden?",
    answer:
      "Ob Auswuchten erforderlich ist, hängt vom Zustand und von der ausgeführten Arbeit ab. Nach einer Reifenmontage oder bei spürbaren Vibrationen ist eine Prüfung besonders sinnvoll.",
  },
];

function ReifenwechselPage() {
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
              <Disc className="size-4" aria-hidden="true" />
              Reifenwechsel
            </span>
          }
          title="Reifenwechsel in Bad Neuenahr-Ahrweiler"
          subtitle="Räderwechsel, Auswuchten und Einlagerung für Sommer- und Winterräder."
          photoBackground
        />
        <ServiceDetailContent sections={sections} faqs={faqs} wa={WA_REIFEN} />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
