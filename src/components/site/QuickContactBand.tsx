import { Phone } from "lucide-react";

import { BeamButton } from "@/components/ui/beam-button";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { PHONE_HREF, WA_FRAGE } from "@/components/site/site-data";

/**
 * Blaues "Schnell erreichbar"-Band (Header-Farbe) mit Anrufen + WhatsApp als
 * Beam-Buttons (umlaufender Lichtstreifen). Wird auf der Startseite an zwei
 * Stellen verwendet: unter dem Rundum-sorglos-Paket und vor den
 * Versicherungspartnern.
 */
export function QuickContactBand({ className = "" }: { className?: string }) {
  return (
    <section
      className={`relative flex min-h-[420px] items-center bg-brand-orange py-20 sm:min-h-[500px] sm:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Schnell erreichbar</h2>
        <p className="mt-3 text-white/85">Rufen Sie uns direkt an oder schreiben Sie uns per WhatsApp.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <BeamButton href={PHONE_HREF}>
            <Phone className="size-4" aria-hidden="true" />
            Jetzt anrufen
          </BeamButton>
          <BeamButton href={WA_FRAGE} target="_blank" rel="noopener noreferrer" variant="whatsapp">
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </BeamButton>
        </div>
      </div>
    </section>
  );
}

export default QuickContactBand;
