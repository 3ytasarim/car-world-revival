import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useState } from "react";
import { Camera, CheckCircle2, Clock4, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useInView } from "@/hooks/use-in-view";
import supportImg from "@/assets/support-team.jpg";
import { WA_FAHRZEUGSCHEIN, WA_FOTO } from "./site-data";

const services = ["Unfallschaden", "Lackschaden", "Frontscheibe / Steinschlag", "Reparatur", "Sonstiges"];

export function FotoAngebot() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    if (name.length < 2 || phone.length < 5) {
      toast.error("Bitte Name und Telefonnummer angeben.");
      return;
    }

    setSending(true);
    try {
      const urls: string[] = [];
      for (const file of files.slice(0, 6)) {
        const path = `${crypto.randomUUID()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
        const { error } = await supabase.storage.from("schaden-fotos").upload(path, file);
        if (error) throw error;
        urls.push(path);
      }

      const { error } = await supabase.from("quote_requests").insert({
        name,
        phone,
        email: String(data.get("email") ?? "").trim() || null,
        service_type: String(data.get("service") ?? "Reparatur"),
        message: String(data.get("message") ?? "").slice(0, 1000),
        photo_urls: urls,
      });
      if (error) throw error;

      setDone(true);
      form.reset();
      setFiles([]);
      toast.success("Danke! Sie erhalten Ihr Angebot innerhalb von 24 Stunden.");
    } catch {
      toast.error("Senden fehlgeschlagen. Bitte schicken Sie uns die Fotos per WhatsApp.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section aria-labelledby="foto-title">
      <div ref={ref} className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div
            className={`transition-all duration-700 ${inView ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"}`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-orange uppercase">
              <Clock4 className="size-4" aria-hidden="true" />
              Angebot in 24 Stunden
            </span>
            <h2 id="foto-title" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Foto schicken. Angebot erhalten.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Schreiben Sie uns per WhatsApp, senden Sie Fotos vom Schaden — wir erstellen Ihnen ein Reparatur- oder
              Frontscheiben-Angebot. Ganz ohne Anfahrt.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WA_FOTO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <WhatsAppIcon className="size-5" />
                Fotos per WhatsApp senden
              </a>
              <a
                href={WA_FAHRZEUGSCHEIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 px-6 text-sm font-semibold transition-colors hover:bg-black/5"
              >
                <Upload className="size-4" aria-hidden="true" />
                Fahrzeugschein senden
              </a>
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
            {done ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <CheckCircle2 className="size-12 text-success" aria-hidden="true" />
                <p className="text-lg font-semibold">Anfrage erhalten!</p>
                <p className="text-sm text-muted-foreground">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm font-semibold">Oder direkt hier hochladen:</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="name"
                    required
                    maxLength={100}
                    placeholder="Ihr Name"
                    className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-brand-orange"
                  />
                  <input
                    name="phone"
                    required
                    maxLength={40}
                    placeholder="Telefonnummer"
                    className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-brand-orange"
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  maxLength={255}
                  placeholder="E-Mail (optional)"
                  className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-brand-orange"
                />
                <select
                  name="service"
                  className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-brand-orange"
                >
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <textarea
                  name="message"
                  rows={3}
                  maxLength={1000}
                  placeholder="Kurze Beschreibung (optional)"
                  className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-brand-orange"
                />
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-black/20 bg-white px-3 py-4 text-sm text-muted-foreground transition-colors hover:border-brand-orange hover:text-brand-orange">
                  <Camera className="size-5" aria-hidden="true" />
                  {files.length > 0 ? `${files.length} Foto(s) ausgewählt` : "Fotos vom Schaden auswählen"}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 6))}
                  />
                </label>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-orange text-sm font-semibold text-brand-orange-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {sending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                  Angebot anfordern
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
