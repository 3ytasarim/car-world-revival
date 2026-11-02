import { QuickContactBand } from "@/components/site/QuickContactBand";
import { checkPoints, CheckPointCard } from "@/components/site/IhreVorteile";
import { certificationLogos } from "@/components/site/PartnerSection";

export interface ServiceDetailSection {
  heading: string;
  text: string;
}

export interface ServiceDetailFaq {
  question: string;
  answer: string;
}

/**
 * Wiederverwendbarer Inhaltsblock für die einzelnen Leistungs-Detailseiten
 * (/leistungen/<slug>) — Textabschnitte, null/eine/mehrere FAQs, dann Anruf- +
 * "Schnell erreichbar"-Band (Anrufen + WhatsApp). Jede Seite bringt nur ihre eigenen Daten (sections/faqs/wa)
 * mit, das Layout bleibt für alle gleich.
 */
export function ServiceDetailContent({
  sections,
  faqs,
  wa,
}: {
  sections: ServiceDetailSection[];
  faqs?: ServiceDetailFaq[];
  wa: string;
}) {
  return (
    <>
      <section className="relative bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {sections.map((s) => (
            <div key={s.heading} className="mb-8 last:mb-0">
              <h2 className="text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
                {s.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}

          {faqs?.map((faq) => (
            <div
              key={faq.question}
              className="mt-6 rounded-2xl border border-black/5 bg-muted/40 p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">
                {faq.question}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p>
            </div>
          ))}

          {/* Vertrauenselemente am Ende der Seite — Kundenwunsch: mehr
            Vertrauen vor dem abschließenden CTA. Keine neu erfundenen
            Aussagen/Logos, sondern dieselben bereits bestätigten
            Trust-Badges wie im Hero (checkPoints/certificationLogos). */}
          <div className="mt-12 border-t border-black/5 pt-10">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {checkPoints.map((c) => (
                <CheckPointCard key={c.title} {...c} />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {certificationLogos.map((l) => (
                <img
                  key={l.alt}
                  src={l.src}
                  alt={l.alt}
                  loading="lazy"
                  className="h-10 w-auto object-contain opacity-80 sm:h-12"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <QuickContactBand wa={wa} />
    </>
  );
}

export default ServiceDetailContent;
