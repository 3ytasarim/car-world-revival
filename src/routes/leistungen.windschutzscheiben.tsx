import { createFileRoute } from "@tanstack/react-router";
import { Car } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { ServiceDetailContent } from "@/components/site/ServiceDetailContent";
import { WA_SCHEIBE } from "@/components/site/site-data";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export const Route = createFileRoute("/leistungen/windschutzscheiben")({
  head: () => ({
    meta: [
      { title: "Windschutzscheibe reparieren in Bad Neuenahr-Ahrweiler | Car-World" },
      {
        name: "description",
        content:
          "Steinschlag prüfen lassen, geeignete Schäden reparieren oder die Frontscheibe fachgerecht austauschen — Car-World in Bad Neuenahr-Ahrweiler.",
      },
      { property: "og:title", content: "Windschutzscheiben — Car-World" },
      {
        property: "og:description",
        content: "Steinschlag prüfen lassen, geeignete Schäden reparieren oder die Frontscheibe fachgerecht austauschen.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/leistungen/windschutzscheiben" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leistungen/windschutzscheiben" }],
  }),
  component: WindschutzscheibenPage,
});

const sections = [
  {
    heading: "Bei Steinschlag früh handeln",
    text: "Ein kleiner Steinschlag kann sich durch Erschütterung oder Temperaturwechsel zu einem Riss entwickeln. Lassen Sie den Schaden deshalb zeitnah bei Car-World in Bad Neuenahr-Ahrweiler prüfen. Ein Foto per WhatsApp hilft bei der ersten Einschätzung, ersetzt aber nicht die Begutachtung der Windschutzscheibe in der Werkstatt. Bis zum Termin sollte die Stelle möglichst sauber und trocken bleiben.",
  },
  {
    heading: "Reparatur oder Austausch der Windschutzscheibe",
    text: "Ob eine Steinschlagreparatur möglich ist, hängt unter anderem von Größe, Tiefe und Position des Schadens ab. Liegt die Beschädigung im Sichtfeld, nahe am Scheibenrand oder hat sich bereits ein Riss gebildet, kann ein Scheibentausch erforderlich sein. Wir erklären Ihnen nach der Prüfung, welche Lösung für Ihr Fahrzeug geeignet ist. Bei modernen Autos berücksichtigen wir außerdem Kameras und Sensoren im Bereich der Frontscheibe sowie mögliche Vorgaben für deren Kalibrierung.",
  },
  {
    heading: "Autoglas und Versicherungsabwicklung",
    text: "Glasschäden können je nach Vertrag über die Teilkaskoversicherung abgedeckt sein. Ob eine Selbstbeteiligung anfällt und welche Kosten übernommen werden, richtet sich nach Ihrem Tarif. Auf Wunsch unterstützt Car-World bei der reparaturbezogenen Abstimmung mit der Versicherung und stellt die benötigten Werkstattunterlagen zusammen.",
  },
];

const faqs = [
  {
    question: "Häufige Frage: Wie lange dauert die Reparatur?",
    answer:
      "Eine geeignete Steinschlagreparatur ist meist schneller als ein Austausch. Die konkrete Dauer hängt vom Schaden, Fahrzeug und Arbeitsumfang ab; beim Scheibentausch kommen zudem Aushärte- und Herstellervorgaben hinzu.",
  },
  {
    question: "Häufige Frage: Muss die Scheibe immer getauscht werden?",
    answer:
      "Nein. Kleine, günstig gelegene Schäden können häufig repariert werden. Erst die fachliche Prüfung zeigt, ob eine sichere Reparatur zulässig ist oder die Windschutzscheibe ersetzt werden muss.",
  },
];

function WindschutzscheibenPage() {
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
              <Car className="size-4" aria-hidden="true" />
              Windschutzscheiben
            </span>
          }
          title="Windschutzscheibe reparieren in Bad Neuenahr-Ahrweiler"
          subtitle="Steinschlag prüfen lassen, geeignete Schäden reparieren oder die Frontscheibe fachgerecht austauschen."
          photoBackground
        />
        <ServiceDetailContent sections={sections} faqs={faqs} wa={WA_SCHEIBE} />
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
