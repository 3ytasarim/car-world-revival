import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { ServiceDetailContent } from "@/components/site/ServiceDetailContent";
import { WA_TUEV } from "@/components/site/site-data";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export const Route = createFileRoute("/leistungen/tuev")({
  head: () => ({
    meta: [
      { title: "TÜV, HU und AU in Bad Neuenahr-Ahrweiler | Car-World" },
      {
        name: "description",
        content:
          "Hauptuntersuchung bequem über Car-World koordinieren und notwendige Werkstattarbeiten direkt abstimmen — Bad Neuenahr-Ahrweiler.",
      },
      { property: "og:title", content: "TÜV & AU — Car-World" },
      {
        property: "og:description",
        content: "Hauptuntersuchung bequem über Car-World koordinieren und notwendige Werkstattarbeiten direkt abstimmen.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/tuev" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/tuev" }],
  }),
  component: TuevPage,
});

const sections = [
  {
    heading: "Termin für Hauptuntersuchung und Abgasuntersuchung",
    text: "Ihre HU-Plakette wird fällig? Bei Car-World in Bad Neuenahr-Ahrweiler können Sie den Termin für Hauptuntersuchung und Abgasuntersuchung mit dem Werkstattbesuch verbinden. Die gesetzliche HU wird durch einen Prüfingenieur einer anerkannten Prüforganisation durchgeführt. Die AU ist bei den meisten Fahrzeugen Bestandteil der Hauptuntersuchung. Wir koordinieren den Ablauf und sind bei werkstattbezogenen Fragen Ihr Ansprechpartner.",
  },
  {
    heading: "Fahrzeug vor dem TÜV-Termin prüfen lassen",
    text: "Wenn Ihnen Warnleuchten, defekte Beleuchtung, ungewöhnliche Geräusche oder andere Mängel bekannt sind, teilen Sie uns das bei der Terminvereinbarung mit. Auf Wunsch prüfen wir relevante Fahrzeugbereiche vor dem eigentlichen HU-Termin. Festgestellte Reparaturen besprechen wir mit Ihnen und führen sie nur nach Abstimmung aus. Eine Vorprüfung kann Überraschungen reduzieren, ist jedoch keine Garantie für die Erteilung der Plakette; darüber entscheidet ausschließlich die Prüforganisation.",
  },
  {
    heading: "Welche Unterlagen werden benötigt?",
    text: "Bringen Sie die Zulassungsbescheinigung Teil I, früher Fahrzeugschein, mit. Bei technischen Änderungen können zusätzliche Nachweise erforderlich sein. Für eine Nachuntersuchung wird außerdem der vorherige Prüfbericht benötigt. Nach der HU erhalten Sie den Untersuchungsbericht mit dem festgestellten Ergebnis und gegebenenfalls Hinweisen zu erforderlichen Mängelbeseitigungen.",
  },
];

const faqs = [
  {
    question: "Häufige Frage: Ist TÜV dasselbe wie HU?",
    answer:
      "„TÜV“ wird umgangssprachlich für die Hauptuntersuchung verwendet. Die HU dürfen neben TÜV auch andere anerkannte Überwachungsorganisationen durchführen.",
  },
  {
    question: "Häufige Frage: Was passiert bei festgestellten Mängeln?",
    answer:
      "Der Prüfbericht nennt die Mängel und das weitere Vorgehen. Notwendige Reparaturen können Sie mit Car-World abstimmen. Bei erheblichen Mängeln ist nach der Beseitigung eine fristgerechte Nachuntersuchung erforderlich.",
  },
];

function TuevPage() {
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
              <ClipboardCheck className="size-4" aria-hidden="true" />
              TÜV & AU
            </span>
          }
          title="TÜV, HU und AU in Bad Neuenahr-Ahrweiler"
          subtitle="Hauptuntersuchung bequem über Car-World koordinieren und notwendige Werkstattarbeiten direkt abstimmen."
          photoBackground
        />
        <ServiceDetailContent sections={sections} faqs={faqs} wa={WA_TUEV} />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
