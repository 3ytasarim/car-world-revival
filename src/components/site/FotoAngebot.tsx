import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Clock4, Upload } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";
import supportImg from "@/assets/support-team.jpg";
import { WA_FAHRZEUGSCHEIN, WA_FOTO } from "./site-data";
import { Button3D } from "@/components/ui/button-3d";
import { QuoteForm } from "@/components/site/QuoteForm";

export function FotoAngebot() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section aria-labelledby="foto-title" className="relative">
      <div ref={ref} className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div
            className={`transition-all duration-700 ${inView ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"}`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-orange uppercase">
              <Clock4 className="size-4" aria-hidden="true" />
              Angebot in 24 Stunden
            </span>
            <h2 id="foto-title" className="mt-4 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
              Foto schicken. Angebot erhalten.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Schreiben Sie uns per WhatsApp, senden Sie Fotos vom Schaden — wir erstellen Ihnen ein Reparatur- oder
              Frontscheiben-Angebot. Ganz ohne Anfahrt.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button3D href={WA_FOTO} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                <WhatsAppIcon className="size-5" />
                Fotos per WhatsApp senden
              </Button3D>
              <Button3D href={WA_FAHRZEUGSCHEIN} target="_blank" rel="noopener noreferrer" variant="primary">
                <Upload className="size-4" aria-hidden="true" />
                Fahrzeugschein senden
              </Button3D>
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-black/10 bg-brand-surface p-4">
              <img
                src={supportImg}
                alt="Kundenservice von Car-World"
                width={1024}
                height={1024}
                loading="lazy"
                className="size-16 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">Sarah aus unserem Serviceteam</p>
                <p className="text-xs text-muted-foreground">
                  Antwortet persönlich auf Ihre WhatsApp-Nachricht — 7/24 erreichbar.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-3xl border border-black/10 bg-brand-surface p-6 shadow-xl transition-all duration-700 sm:p-8 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
