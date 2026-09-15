import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { ServiceDetailContent } from "@/components/site/ServiceDetailContent";
import { WA_UNFALL } from "@/components/site/site-data";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export const Route = createFileRoute("/leistungen/unfallservice")({
  head: () => ({
    meta: [
      { title: "Unfallservice in Bad Neuenahr-Ahrweiler | Car-World" },
      {
        name: "description",
        content:
          "Soforthilfe rund um die Uhr nach Ihrem Autounfall: Abschleppen, Schadenaufnahme, Reparatur und Versicherungsabwicklung aus einer Hand — Car-World in Bad Neuenahr-Ahrweiler.",
      },
      { property: "og:title", content: "Unfallservice — Car-World" },
      {
        property: "og:description",
        content: "Soforthilfe rund um die Uhr – wir koordinieren die nächsten Schritte nach Ihrem Autounfall.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/unfallservice" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/unfallservice" }],
  }),
  component: UnfallservicePage,
});

const sections = [
  {
    heading: "Schnelle Unfallhilfe, wenn es darauf ankommt",
    text: "Ein Verkehrsunfall kommt unerwartet. Sobald die Unfallstelle gesichert und bei Verletzten der Notruf verständigt ist, hilft Car-World in Bad Neuenahr-Ahrweiler bei allem, was Ihr Fahrzeug betrifft. Unser Unfallservice ist rund um die Uhr erreichbar. Teilen Sie uns Ihren Standort, das Fahrzeugmodell und kurz den entstandenen Schaden mit. Ist Ihr Auto nicht mehr fahrbereit, organisieren wir den Abschleppdienst und den sicheren Transport in unsere Meisterwerkstatt in Heimersheim.",
  },
  {
    heading: "Von der Schadenaufnahme bis zur Reparatur",
    text: "In der Werkstatt prüfen wir den Unfallschaden und stimmen das weitere Vorgehen verständlich mit Ihnen ab. Karosserie-, Lack- und Technikarbeiten werden passend zum Schaden geplant. Auf Wunsch unterstützen wir außerdem bei einem Ersatzwagen und übernehmen die reparaturbezogene Kommunikation mit der Versicherung. So greifen Schadenaufnahme, Unfallinstandsetzung und Versicherungsabwicklung sinnvoll ineinander, ohne dass Sie mehrere Ansprechpartner koordinieren müssen.",
  },
  {
    heading: "Was wir für den ersten Kontakt benötigen",
    text: "Hilfreich sind das Kennzeichen, Ihre Fahrzeugdaten, der genaue Standort sowie Fotos vom Fahrzeug und von der Unfallstelle. Falls vorhanden, halten Sie auch Unfallbericht, Schadennummer und Versicherungsdaten bereit. Noch nicht alle Informationen vorhanden? Melden Sie sich trotzdem – wir klären gemeinsam, welche Unterlagen für den nächsten Schritt wichtig sind.",
  },
];

const faq = {
  question: "Häufige Frage: Kann Car-World alles organisieren?",
  answer:
    "Wir bündeln Abschleppen, Werkstattplanung, Reparatur, Mobilität und die werkstattbezogene Schadenabwicklung. Welche Kosten eine Versicherung übernimmt, hängt vom Einzelfall, der Haftung und Ihrem Vertrag ab.",
};

function UnfallservicePage() {
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
              <ShieldAlert className="size-4" aria-hidden="true" />
              Unfallservice
            </span>
          }
          title="Unfallservice in Bad Neuenahr-Ahrweiler"
          subtitle="Soforthilfe rund um die Uhr – wir koordinieren die nächsten Schritte nach Ihrem Autounfall."
          photoBackground
        />
        <ServiceDetailContent sections={sections} faq={faq} wa={WA_UNFALL} />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
