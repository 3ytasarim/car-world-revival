import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { ServiceDetailContent } from "@/components/site/ServiceDetailContent";
import { WA_VERSICHERUNG } from "@/components/site/site-data";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export const Route = createFileRoute("/leistungen/versicherungsabwicklung")({
  head: () => ({
    meta: [
      { title: "Versicherungsabwicklung nach einem Kfz-Schaden | Car-World" },
      {
        name: "description",
        content:
          "Car-World übernimmt auf Ihren Auftrag die reparaturbezogene Abstimmung mit Ihrer Versicherung nach einem Kfz-Schaden in Bad Neuenahr-Ahrweiler.",
      },
      { property: "og:title", content: "Versicherungsabwicklung — Car-World" },
      {
        property: "og:description",
        content: "Wir übernehmen auf Ihren Auftrag die reparaturbezogene Abstimmung mit Ihrer Versicherung.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/versicherungsabwicklung" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/versicherungsabwicklung" }],
  }),
  component: VersicherungsabwicklungPage,
});

const sections = [
  {
    heading: "Weniger Aufwand nach dem Autounfall",
    text: "Nach einem Unfall müssen Schadenaufnahme, Reparatur und Versicherungsfragen aufeinander abgestimmt werden. Car-World in Bad Neuenahr-Ahrweiler unterstützt Sie bei der Kfz-Versicherungsabwicklung und bündelt die werkstattbezogene Kommunikation. Dadurch haben Sie für die Reparatur Ihres Fahrzeugs einen festen Ansprechpartner, statt Unterlagen und Rückfragen zwischen mehreren Stellen selbst zu koordinieren.",
  },
  {
    heading: "Diese Unterlagen helfen bei der Schadensabwicklung",
    text: "Für einen zügigen Start benötigen wir je nach Fall Ihre Fahrzeugdaten, Kontaktdaten, Kennzeichen, Schadennummer und Angaben zum Versicherer. Hilfreich sind außerdem Unfallbericht, Schadenfotos, Gutachten oder Kostenvoranschlag sowie bereits erhaltene Schreiben. Wir prüfen gemeinsam, welche Dokumente für die Reparaturabwicklung vorhanden sind und welche Informationen noch benötigt werden.",
  },
  {
    heading: "Reparatur und Versicherung sinnvoll koordinieren",
    text: "Auf Ihren Auftrag stimmen wir reparaturbezogene Fragen und Unterlagen mit der Versicherung ab. Dabei berücksichtigen wir, ob es sich um einen Haftpflicht- oder Kaskoschaden handelt und ob beispielsweise Selbstbeteiligung oder Werkstattbindung vereinbart wurden. Welche Kosten tatsächlich übernommen werden, hängt von Haftung, Vertrag und Freigabe ab. Unsere organisatorische Unterstützung ersetzt keine Rechtsberatung bei strittigen Ansprüchen.",
  },
];

const faqs = [
  {
    question: "Häufige Frage: Rechnet Car-World direkt ab?",
    answer:
      "Eine direkte Abrechnung kann je nach Schadenfall und Freigabe möglich sein. Dafür werden gegebenenfalls eine Kostenübernahme oder Abtretungserklärung benötigt. Wir erklären Ihnen vorab, wie die Abwicklung in Ihrem Fall vorgesehen ist.",
  },
  {
    question: "Häufige Frage: Welche Versicherung ist zuständig?",
    answer:
      "Das richtet sich nach Unfallhergang, Haftung und Versicherungsschutz. Wir koordinieren die Werkstattunterlagen; bei ungeklärter Schuld oder gekürzten Ansprüchen kann zusätzlich unabhängige rechtliche Beratung sinnvoll sein.",
  },
];

function VersicherungsabwicklungPage() {
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
              <FileCheck2 className="size-4" aria-hidden="true" />
              Versicherungsabwicklung
            </span>
          }
          title="Versicherungsabwicklung nach einem Kfz-Schaden"
          subtitle="Wir übernehmen auf Ihren Auftrag die reparaturbezogene Abstimmung mit Ihrer Versicherung."
          photoBackground
        />
        <ServiceDetailContent sections={sections} faqs={faqs} wa={WA_VERSICHERUNG} />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
