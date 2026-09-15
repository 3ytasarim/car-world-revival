import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { ServiceDetailContent } from "@/components/site/ServiceDetailContent";
import { WA_INSPEKTION } from "@/components/site/site-data";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export const Route = createFileRoute("/leistungen/inspektion-wartung")({
  head: () => ({
    meta: [
      { title: "Inspektion und Wartung in Bad Neuenahr-Ahrweiler | Car-World" },
      {
        name: "description",
        content:
          "Kfz-Service nach Herstellervorgaben – passend zu Fahrzeug, Kilometerstand und Wartungsintervall. Car-World in Bad Neuenahr-Ahrweiler.",
      },
      { property: "og:title", content: "Inspektion & Wartung — Car-World" },
      {
        property: "og:description",
        content: "Kfz-Service nach Herstellervorgaben – passend zu Fahrzeug, Kilometerstand und Wartungsintervall.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/inspektion-wartung" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/inspektion-wartung" }],
  }),
  component: InspektionWartungPage,
});

const sections = [
  {
    heading: "Der passende Wartungsumfang für Ihr Auto",
    text: "Regelmäßige Inspektion hilft, Verschleiß und technische Auffälligkeiten rechtzeitig zu erkennen. Car-World führt Inspektion und Wartung in Bad Neuenahr-Ahrweiler nach den Vorgaben des jeweiligen Fahrzeugherstellers durch. Welche Arbeiten anstehen, richtet sich unter anderem nach Modell, Alter, Laufleistung und Serviceanzeige. Deshalb prüfen wir vor dem Termin die Fahrzeugdaten und den vorgesehenen Wartungsplan.",
  },
  {
    heading: "Kontrollen, Betriebsstoffe und Verschleißteile",
    text: "Je nach Intervall umfasst der Kfz-Service Kontrollen wichtiger Bauteile sowie den Wechsel vorgesehener Filter und Betriebsstoffe. Dazu können beispielsweise Motoröl, Bremsen, Beleuchtung, Flüssigkeitsstände und weitere fahrzeugspezifische Prüfpunkte gehören. Entdecken wir zusätzlichen Reparaturbedarf, informieren wir Sie und stimmen Kosten und Arbeiten vor der Ausführung ab. So bleibt der Werkstattauftrag nachvollziehbar.",
  },
  {
    heading: "Inspektion nach Herstellervorgabe dokumentieren",
    text: "Die ausgeführten Wartungsarbeiten werden passend zu den Anforderungen dokumentiert. Eine freie Werkstatt kann eine Inspektion grundsätzlich durchführen, ohne dass allein dadurch die Herstellergarantie entfällt, sofern die maßgeblichen Vorgaben eingehalten werden. Besondere Garantie-, Kulanz-, Leasing- oder Servicebedingungen sollten Sie uns vorab mitteilen, damit sie beim Auftrag berücksichtigt werden können.",
  },
];

const faqs = [
  {
    question: "Häufige Frage: Wann ist die nächste Inspektion fällig?",
    answer:
      "Maßgeblich sind Serviceanzeige, Bedienungsanleitung und Wartungsplan des Herstellers. Manche Fahrzeuge nutzen feste Zeit- oder Kilometerintervalle, andere berechnen den Termin abhängig von Nutzung und Fahrprofil.",
  },
  {
    question: "Häufige Frage: Was soll ich zum Termin mitbringen?",
    answer:
      "Hilfreich sind Zulassungsbescheinigung, aktueller Kilometerstand und vorhandene Wartungsnachweise. Nennen Sie außerdem Warnmeldungen, Geräusche oder Veränderungen, die Ihnen im Alltag aufgefallen sind.",
  },
];

function InspektionWartungPage() {
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
              <Settings className="size-4" aria-hidden="true" />
              Inspektion & Wartung
            </span>
          }
          title="Inspektion und Wartung in Bad Neuenahr-Ahrweiler"
          subtitle="Kfz-Service nach Herstellervorgaben – passend zu Fahrzeug, Kilometerstand und Wartungsintervall."
          photoBackground
        />
        <ServiceDetailContent sections={sections} faqs={faqs} wa={WA_INSPEKTION} />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
