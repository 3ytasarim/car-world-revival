import type { ReactNode } from "react";
import { Car, Phone, ShieldAlert, Star } from "lucide-react";

import { GoogleIcon } from "@/components/site/GoogleIcon";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { certificationLogos } from "@/components/site/PartnerSection";
import { PHONE_HREF, WA_SCHEIBE, WA_UNFALL } from "@/components/site/site-data";
import { Button3D } from "@/components/ui/button-3d";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import heroWerkstattPhoto from "@/assets/hero-werkstatt-secondary.jpg";

/**
 * Hero für Leistungen und alle Leistungs-Unterseiten — zentriertes Layout nach
 * dem 21st.dev-Muster "Hero 01" (shadcnspace/hero-01): Bewertungs-Pill, Badge,
 * große Headline, Untertitel, zwei CTAs und darunter ein Logo-Band. Die
 * Registry-Quelle verlangt Login (CLI nicht nutzbar), daher nach der
 * Beschreibung nachgebaut. Das Werkstatt-Foto bleibt als Hintergrund.
 *
 * `wa`: seitenspezifische WhatsApp-Nachricht für den Haupt-CTA. Ohne Angabe
 * (Übersichtsseite) die beiden Themen-CTAs der Startseite.
 */
export function ServiceHero({
  badge,
  title,
  subtitle,
  wa,
}: {
  badge: ReactNode;
  title: string;
  subtitle: ReactNode;
  wa?: string;
}) {
  return (
    <section className="relative overflow-hidden text-brand-navy">
      <img
        src={heroWerkstattPhoto}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/85 via-white/70 to-white" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-14 pb-10 text-center sm:px-6 sm:pt-20 sm:pb-12">
        {/* Google-Bewertung: Sterne + Wert, bewusst ohne Button daneben. */}
        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-4 py-2 shadow-sm">
          <GoogleIcon className="size-5 shrink-0" />
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-[#FBBC04] text-[#FBBC04]" aria-hidden="true" />
            ))}
          </div>
          <span className="text-sm font-semibold text-[#131F35]">5,0</span>
        </div>

        <div className="mt-6">{badge}</div>

        <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-balance text-brand-navy/70 sm:text-lg">{subtitle}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {wa ? (
            <>
              <Button3D href={wa} target="_blank" rel="noopener noreferrer" variant="whatsapp" shimmer>
                <WhatsAppIcon className="size-4" />
                Jetzt anfragen
              </Button3D>
              <Button3D href={PHONE_HREF} variant="secondary">
                <Phone className="size-4" aria-hidden="true" />
                Jetzt anrufen
              </Button3D>
            </>
          ) : (
            <>
              <Button3D href={WA_UNFALL} target="_blank" rel="noopener noreferrer" shimmer>
                <ShieldAlert className="size-4" aria-hidden="true" />
                Unfallschaden melden
              </Button3D>
              <Button3D href={WA_SCHEIBE} target="_blank" rel="noopener noreferrer">
                <Car className="size-4" aria-hidden="true" />
                Steinschlag oder Glasschaden?
              </Button3D>
            </>
          )}
        </div>

        {/* Zertifizierungs-Logos wie im Startseiten-Hero. */}
        <div className="mt-12 w-full max-w-3xl [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <InfiniteSlider gap={40} duration={18}>
            {certificationLogos.map((l) => (
              <img key={l.alt} src={l.src} alt={l.alt} loading="lazy" className="h-12 w-auto object-contain sm:h-14" />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}

export default ServiceHero;
