import { Car, ShieldAlert } from "lucide-react";

import { BeamButton } from "@/components/ui/beam-button";
import { WA_SCHEIBE, WA_UNFALL } from "@/components/site/site-data";

/**
 * Blaues "Schnell erreichbar"-Band (Header-Farbe) mit den beiden Hero-CTAs als
 * Beam-Buttons (umlaufender Lichtstreifen) — beide öffnen WhatsApp mit
 * vorbefüllter Nachricht. Wird auf der Startseite (unter dem Rundum-sorglos-
 * Paket und vor den Versicherungspartnern) und auf allen Leistungsseiten
 * verwendet.
 */
export function QuickContactBand({ className = "" }: { className?: string }) {
  return (
    <section
      className={`relative flex min-h-[420px] items-center bg-brand-orange py-20 sm:min-h-[500px] sm:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Schnell erreichbar</h2>
        <p className="mt-3 text-white/85">Schreiben Sie uns direkt per WhatsApp – wir melden uns schnell zurück.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <BeamButton href={WA_UNFALL} target="_blank" rel="noopener noreferrer" variant="whatsapp">
            <ShieldAlert className="size-4" aria-hidden="true" />
            Unfallschaden melden
          </BeamButton>
          <BeamButton href={WA_SCHEIBE} target="_blank" rel="noopener noreferrer">
            <Car className="size-4" aria-hidden="true" />
            Steinschlag oder Glasschaden?
          </BeamButton>
        </div>
      </div>
    </section>
  );
}

export default QuickContactBand;
