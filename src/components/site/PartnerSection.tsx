import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { CarFront, CheckCircle2, Handshake, Loader2, Percent, Zap } from "lucide-react";
import { toast } from "sonner";

import { submitPartnerRequest } from "@/lib/public-content.functions";
import { useInView } from "@/hooks/use-in-view";
import { OrbitingCircles02 } from "@/components/ui/orbiting-circles-02";
import ParticleSphereAnimation from "@/components/ui/particle-sphere";
import { TrustCard } from "@/components/ui/trust-card";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button3D } from "@/components/ui/button-3d";
import { ScannerCardStream } from "@/components/ui/scanner-card-stream";
import { WA_PARTNER } from "./site-data";
import tuv from "@/assets/tuv.png.asset.json";
import innung from "@/assets/innung.png.asset.json";
import autoglas from "@/assets/autoglas.png.asset.json";
import hwk from "@/assets/hwk.png.asset.json";

// Nur die im Kundengespräch verbindlich bestätigten Vorteile — bewusst
// noch nicht auf 5–6 aufgefüllt, bis weitere mit dem Kunden abgestimmt sind.
const benefits = [
  {
    icon: Zap,
    title: "Fast-Lane Termin",
    text: "Schnelle, bevorzugte Terminvergabe für Partner- und Großkunden.",
  },
  {
    icon: Percent,
    title: "Besondere Großkundenrabatte",
    text: "Spezielle Konditionen und Preise für große Kunden.",
  },
  {
    icon: CarFront,
    title: "Kostenlose Leihwagen",
    text: "Ersatzwagen ohne Aufpreis, wenn verfügbar.",
  },
];

const logos = [
  { src: tuv.url, alt: "TÜV Rheinland" },
  { src: innung.url, alt: "KFZ-Innung Ahrweiler" },
  { src: autoglas.url, alt: "Autoglas Spezialist" },
  { src: hwk.url, alt: "Handwerkskammer Koblenz" },
];

function logoAt(i: number) {
  return logos[i % logos.length]!;
}

function RingLogo({ logo: l }: { logo: { src: string; alt: string } }) {
  return <img src={l.src} alt={l.alt} loading="lazy" className="size-14 object-contain md:size-18" />;
}

export function PartnerSection() {
  const { ref } = useInView<HTMLDivElement>(0.15);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    try {
      await submitPartnerRequest({
        data: {
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          message: String(data.get("message") ?? "").trim() || undefined,
        },
      });
      setDone(true);
      form.reset();
      toast.success("Danke! Wir melden uns kurzfristig bei Ihnen.");
    } catch {
      toast.error("Senden fehlgeschlagen. Bitte melden Sie sich per WhatsApp.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section aria-labelledby="partner-title" className="relative">
      <div ref={ref} className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-4 py-1.5 text-xs font-semibold text-brand-navy-foreground">
            <Handshake className="size-4" aria-hidden="true" />
            Für Unternehmen & Flotten
          </span>
          <h2 id="partner-title" className="mt-4 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            <AnimatedText text="Werden Sie Großkunde" minWeight={300} maxWeight={800} delayMultiplier={0.05} />
          </h2>
          <p className="mt-2 text-sm font-semibold tracking-wide text-brand-orange uppercase">
            Werden Sie Car-World Partner
          </p>
          <p className="mt-3 text-muted-foreground">
            Für kleine und mittlere Unternehmen, Firmenflotten und Großkunden — ab ca. 5–10 Mitarbeitenden oder
            Fahrzeugen. Arbeiten Sie mit einem zuverlässigen Meisterbetrieb zusammen, statt sich um jedes Fahrzeug
            einzeln zu kümmern.
          </p>
        </div>

        {/* Vorteile als Großkunde — nur die verbindlich bestätigten 3, keine
            erfundenen zusätzlichen Punkte. */}
        <div className="mt-10">
          <h3 className="text-center text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">
            Vorteile als Großkunde
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {benefits.map((b) => (
              <TrustCard
                key={b.title}
                title={b.title}
                description={b.text}
                icon={<b.icon className="size-6" aria-hidden="true" />}
              />
            ))}
          </div>
        </div>

        <div className="my-14">
          <ClientOnly fallback={<div className="h-[250px]" />}>
            <ScannerCardStream
              cardImages={["/cards/grosskunde-1.png", "/cards/business-1.png", "/cards/grosskunde-2.png", "/cards/business-2.png"]}
              repeat={3}
              cardWidth={340}
              cardHeight={213}
              className="h-[250px]"
            />
          </ClientOnly>
        </div>

        {/* Unsere Partner & Zertifizierungen — 1:1-Portierung von 21st.dev
            (shadcnspace/orbiting-circles-02): 3 Ringe in exakt denselben
            Größen/Positionen/Timings wie das Original, Logos zyklisch auf
            die 8 Original-Icon-Plätze verteilt (nur 4 eigene Logos
            vorhanden, das Original hat 8 verschiedene Tech-Icons). */}
        <div className="mt-14">
          <h2 className="text-center text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            <AnimatedText text="Unsere Partner & Zertifizierungen" minWeight={300} maxWeight={800} delayMultiplier={0.03} />
          </h2>
          <OrbitingCircles02
            className="mt-2"
            heightClassName="h-[440px] md:h-[600px]"
            centerClassName="w-[280px] md:w-[480px]"
            center={
              <ClientOnly fallback={<div className="size-full rounded-full bg-[#EAF2FA]" />}>
                <ParticleSphereAnimation />
              </ClientOnly>
            }
            rings={[
              {
                sizeClassName: "w-125 h-125 md:w-185 md:h-185",
                duration: 10,
                icons: [-30, 30].map((angle, i) => ({
                  key: `r1-${i}`,
                  angle,
                  content: <RingLogo logo={logoAt(i)} />,
                })),
              },
              {
                sizeClassName: "w-195 h-195 md:w-270 md:h-270",
                duration: 14,
                icons: [-30, 30].map((angle, i) => ({
                  key: `r2-${i}`,
                  angle,
                  content: <RingLogo logo={logoAt(i + 2)} />,
                })),
              },
            ]}
          />
        </div>

        <div className="mx-auto mt-14 max-w-xl rounded-3xl border border-black/10 bg-white p-6 shadow-lg sm:p-8">
          {done ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <CheckCircle2 className="size-12 text-success" aria-hidden="true" />
              <p className="text-lg font-semibold">Anfrage erhalten!</p>
              <p className="text-sm text-muted-foreground">Wir setzen uns zeitnah mit Ihnen in Verbindung.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm font-semibold">Großkundenanfrage senden</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="name"
                  required
                  maxLength={150}
                  placeholder="Name"
                  className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-brand-orange"
                />
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                  placeholder="E-Mail"
                  className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-brand-orange"
                />
              </div>
              <textarea
                name="message"
                rows={3}
                maxLength={1000}
                placeholder="Ihre Nachricht (optional)"
                className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-orange"
              />
              <div className="flex flex-col gap-3 sm:flex-row [&>*]:flex-1">
                <Button3D
                  href={WA_PARTNER}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  className="whitespace-nowrap"
                >
                  <WhatsAppIcon className="size-5" />
                  Per WhatsApp
                </Button3D>
                <Button3D as="button" type="submit" disabled={sending} className="whitespace-nowrap">
                  {sending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                  Anfrage senden
                </Button3D>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
