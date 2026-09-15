import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { ServiceDetailContent } from "@/components/site/ServiceDetailContent";
import { WA_REPARATUR } from "@/components/site/site-data";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export const Route = createFileRoute("/leistungen/fahrzeugreparatur")({
  head: () => ({
    meta: [
      { title: "Fahrzeugreparatur in Bad Neuenahr-Ahrweiler | Car-World" },
      {
        name: "description",
        content:
          "Fachgerechte Instandsetzung von Karosserie, Lack und Fahrzeugtechnik in der Kfz-Meisterwerkstatt Car-World in Bad Neuenahr-Ahrweiler.",
      },
      { property: "og:title", content: "Fahrzeugreparatur — Car-World" },
      {
        property: "og:description",
        content: "Fachgerechte Instandsetzung von Karosserie, Lack und Fahrzeugtechnik in der Kfz-Meisterwerkstatt.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/fahrzeugreparatur" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/fahrzeugreparatur" }],
  }),
  component: FahrzeugreparaturPage,
});

const sections = [
  {
    heading: "Reparatur passend zum tatsächlichen Schaden",
    text: "Ob Unfallschaden, Lackkratzer oder technischer Defekt: Eine gute Fahrzeugreparatur beginnt mit einer sauberen Prüfung. Car-World in Bad Neuenahr-Ahrweiler nimmt Ihr Fahrzeug in der Meisterwerkstatt auf, bewertet die betroffenen Bereiche und erklärt Ihnen verständlich, welche Arbeiten erforderlich sind. Ihre Beobachtungen, Warnmeldungen und vorhandene Schadenfotos helfen bei der ersten Einschätzung.",
  },
  {
    heading: "Karosserie, Lack und Technik aus einer Hand",
    text: "Bei einer Unfallinstandsetzung müssen mehrere Arbeitsschritte genau zusammenpassen. Wir planen Karosseriearbeiten, Lackreparatur und technische Instandsetzung entsprechend dem Schadensbild. Dabei wird geprüft, welche Bauteile repariert werden können und wo ein Austausch sinnvoll oder notwendig ist. Auch bei allgemeinen Kfz-Reparaturen steht die Ursache im Mittelpunkt, damit nicht nur ein Symptom behandelt wird.",
  },
  {
    heading: "Transparente Abstimmung vor Arbeitsbeginn",
    text: "Nach der Prüfung besprechen wir Reparaturumfang, benötigte Teile und den voraussichtlichen Werkstattaufenthalt mit Ihnen. Zusätzliche Arbeiten werden nicht einfach vorausgesetzt, sondern vorab abgestimmt. Bei einem Versicherungsfall können wir die reparaturbezogenen Unterlagen und Rückfragen koordinieren. Benötigen Sie währenddessen ein Ersatzfahrzeug, fragen Sie den Ersatzwagen am besten schon bei der Terminvereinbarung an.",
  },
];

const faqs = [
  {
    question: "Häufige Frage: Wie lange dauert eine Autoreparatur?",
    answer:
      "Die Dauer hängt vom Schaden, den notwendigen Arbeitsschritten und der Teileverfügbarkeit ab. Nach der Fahrzeugprüfung erhalten Sie eine realistische Einschätzung für Ihren konkreten Auftrag.",
  },
  {
    question: "Häufige Frage: Was kostet eine Fahrzeugreparatur?",
    answer:
      "Die Kosten lassen sich erst nach Diagnose oder Schadenaufnahme seriös bestimmen. Fahrzeugtyp, Arbeitsumfang, Ersatzteile und Lackierarbeiten beeinflussen den Preis. Wir erläutern den geplanten Umfang, bevor Sie den Reparaturauftrag freigeben.",
  },
];

function FahrzeugreparaturPage() {
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
              <Wrench className="size-4" aria-hidden="true" />
              Fahrzeugreparatur
            </span>
          }
          title="Fahrzeugreparatur in Bad Neuenahr-Ahrweiler"
          subtitle="Fachgerechte Instandsetzung von Karosserie, Lack und Fahrzeugtechnik in der Kfz-Meisterwerkstatt."
          photoBackground
        />
        <ServiceDetailContent sections={sections} faqs={faqs} wa={WA_REPARATUR} />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
