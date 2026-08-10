import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useState } from "react";
import { Building2, CheckCircle2, Handshake, Loader2, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useInView } from "@/hooks/use-in-view";
import { OrbitingLogos } from "@/components/ui/orbiting-logos";
import { GradientBoldCard } from "@/components/ui/gradient-bold-card";
import { AnimatedText } from "@/components/ui/animated-text";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { Button3D } from "@/components/ui/button-3d";
import { WA_PARTNER } from "./site-data";
import tuv from "@/assets/tuv.png.asset.json";
import innung from "@/assets/innung.png.asset.json";
import autoglas from "@/assets/autoglas.png.asset.json";
import hwk from "@/assets/hwk.png.asset.json";
import logo from "@/assets/logo.png.asset.json";

const types = [
  { icon: ShieldCheck, label: "Versicherungen", text: "Direkte Schadenabwicklung, feste Ansprechpartner." },
  { icon: Truck, label: "Firmen mit Flotte", text: "Wartung, Reparatur und Ersatzfahrzeuge für Ihren Fuhrpark." },
  { icon: Building2, label: "Wartungsverträge", text: "Planbare Kosten und feste Servicezyklen." },
];

const logos = [
  { src: tuv.url, alt: "TÜV Rheinland" },
  { src: innung.url, alt: "KFZ-Innung Ahrweiler" },
  { src: autoglas.url, alt: "Autoglas Spezialist" },
  { src: hwk.url, alt: "Handwerkskammer Koblenz" },
];

export function PartnerSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    try {
      const { error } = await supabase.from("partner_requests").insert({
        company: String(data.get("company") ?? "").trim(),
        contact_name: String(data.get("contact") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        phone: String(data.get("phone") ?? "").trim() || null,
        partner_type: String(data.get("type") ?? "Versicherung"),
        message: String(data.get("message") ?? "").slice(0, 1000),
      });
      if (error) throw error;
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
            Partnerschaft
          </span>
          <h2 id="partner-title" className="mt-4 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            <AnimatedText text="Werden Sie Car-World Partner" minWeight={300} maxWeight={800} delayMultiplier={0.05} />
          </h2>
          <p className="mt-3 text-muted-foreground">
            Versicherungen, Unternehmen mit eigener Flotte und Betriebe mit Wartungsverträgen — arbeiten Sie mit einem
            zuverlässigen Meisterbetrieb zusammen.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {types.map((t, i) => (
            <div
              key={t.label}
              style={{ transitionDelay: `${i * 90}ms` }}
              className={`group transition-all duration-700 hover:-translate-y-1 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <GradientBoldCard>
                <t.icon
                  className="size-8 text-brand-orange transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-lg font-semibold">{t.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
              </GradientBoldCard>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-lg sm:p-8">
            {done ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <CheckCircle2 className="size-12 text-success" aria-hidden="true" />
                <p className="text-lg font-semibold">Anfrage erhalten!</p>
                <p className="text-sm text-muted-foreground">Wir setzen uns zeitnah mit Ihnen in Verbindung.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm font-semibold">Partneranfrage senden</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="company"
                    required
                    maxLength={150}
                    placeholder="Firma"
                    className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-brand-orange"
                  />
                  <input
                    name="contact"
                    required
                    maxLength={100}
                    placeholder="Ansprechpartner"
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
                  <input
                    name="phone"
                    maxLength={40}
                    placeholder="Telefon (optional)"
                    className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-brand-orange"
                  />
                </div>
                <select
                  name="type"
                  className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-brand-orange"
                >
                  <option>Versicherung</option>
                  <option>Firmenflotte</option>
                  <option>Wartungsvertrag</option>
                  <option>Sonstiges</option>
                </select>
                <textarea
                  name="message"
                  rows={3}
                  maxLength={1000}
                  placeholder="Ihre Nachricht"
                  className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-orange"
                />
                <div className="flex flex-col gap-3 sm:flex-row [&>*]:flex-1">
                  <Button3D as="button" type="submit" disabled={sending}>
                    {sending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                    Partner werden
                  </Button3D>
                  <Button3D href={WA_PARTNER} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                    <WhatsAppIcon className="size-5" />
                    Per WhatsApp
                  </Button3D>
                </div>
              </form>
            )}
          </div>

          <div className="flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-black/10 bg-white p-5 sm:p-8">
            <TextShimmerWave
              as="p"
              duration={1.4}
              className="text-center text-xl sm:text-2xl font-bold [--base-color:#1B3A63] [--base-gradient-color:#8FB8E8] dark:[--base-color:#1B3A63] dark:[--base-gradient-color:#8FB8E8]"
            >
              Unsere Partner & Zertifizierungen
            </TextShimmerWave>
            <div className="mt-2 w-full origin-top scale-[0.52] sm:scale-[0.72] lg:scale-90 xl:scale-100 h-[270px] sm:h-[370px] lg:h-[460px] xl:h-[500px] flex justify-center">
              <OrbitingLogos
                radius={200}
                duration={24}
                center={
                  <div className="flex size-28 items-center justify-center rounded-full border border-black/10 bg-white shadow-md">
                    <img src={logo.url} alt="Car-World" className="size-20 object-contain" />
                  </div>
                }
                items={logos.map((l) => ({
                  key: l.alt,
                  content: (
                    <div className="flex size-24 items-center justify-center rounded-full border border-black/10 bg-white p-3 shadow-md">
                      <img src={l.src} alt={l.alt} loading="lazy" className="size-full object-contain" />
                    </div>
                  ),
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
