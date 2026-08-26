import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { CarFront, CheckCircle2, Handshake, Loader2, Percent, Zap } from "lucide-react";
import { toast } from "sonner";

import { submitPartnerRequest } from "@/lib/public-content.functions";
import { useInView } from "@/hooks/use-in-view";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button3D } from "@/components/ui/button-3d";
import { ScannerCardStream } from "@/components/ui/scanner-card-stream";
import { WA_PARTNER } from "./site-data";
import tuv from "@/assets/partner-tuv.png";
import innung from "@/assets/partner-innung.png";
import autoglas from "@/assets/partner-autoglas.png";
import hwk from "@/assets/partner-hwk.png";

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

function GrosskundeCard({ icon: Icon, title, text }: (typeof benefits)[number]) {
  return (
    <div className="relative flex flex-col gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-orange to-[#3D6FA8] p-6 text-white shadow-[0_20px_45px_-20px_rgba(80,136,200,0.55)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "0.75rem 0.75rem",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-10 -top-24 h-40 -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/15 to-transparent"
      />
      <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <div className="relative">
        <h4 className="text-lg font-bold tracking-tight">{title}</h4>
        <p className="mt-1 text-sm text-white/85">{text}</p>
      </div>
    </div>
  );
}

const logos = [
  { src: tuv, alt: "TÜV Rheinland" },
  { src: innung, alt: "KFZ-Innung Ahrweiler" },
  { src: autoglas, alt: "Autoglas Spezialist" },
  { src: hwk, alt: "Handwerkskammer Koblenz" },
];

function PartnerLogoCard({ logo: l }: { logo: { src: string; alt: string } }) {
  return (
    <div className="flex size-40 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-white p-4 shadow-md sm:size-48 sm:p-5">
      <img src={l.src} alt={l.alt} loading="lazy" className="max-h-full max-w-full object-contain" />
    </div>
  );
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
              <GrosskundeCard key={b.title} {...b} />
            ))}
          </div>
        </div>

        <div className="my-14 flex justify-center">
          <ClientOnly fallback={<div className="h-[420px] w-[340px]" />}>
            <ScannerCardStream
              orientation="vertical"
              cardImages={["/cards/grosskunde-1.png", "/cards/business-1.png", "/cards/grosskunde-2.png", "/cards/business-2.png"]}
              repeat={3}
              cardWidth={340}
              cardHeight={213}
              className="h-[420px]"
            />
          </ClientOnly>
        </div>

        {/* Unsere Partner & Zertifizierungen — dieselbe vertikale
            Karten-Marquee wie die Versicherungspartner im
            Rundum-sorglos-Bereich, statt einer rotierenden Ring-Animation. */}
        <div className="mt-14">
          <h2 className="text-center text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            <AnimatedText text="Unsere Partner & Zertifizierungen" minWeight={300} maxWeight={800} delayMultiplier={0.03} />
          </h2>
          <div className="mx-auto mt-8 grid max-w-xs grid-cols-2 gap-3 sm:max-w-md sm:gap-5">
            <div className="[mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)]">
              <InfiniteSlider direction="vertical" reverse gap={16} duration={22} durationOnHover={60} className="h-[340px] sm:h-[420px]">
                {logos.map((l) => (
                  <PartnerLogoCard key={l.alt} logo={l} />
                ))}
              </InfiniteSlider>
            </div>
            <div className="[mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_88%,transparent_100%)]">
              <InfiniteSlider direction="vertical" gap={16} duration={22} durationOnHover={60} className="h-[340px] sm:h-[420px]">
                {logos.map((l) => (
                  <PartnerLogoCard key={l.alt} logo={l} />
                ))}
              </InfiniteSlider>
            </div>
          </div>
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
