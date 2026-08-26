import { useState } from "react";
import { Camera, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { submitQuoteRequest, uploadPublicImage } from "@/lib/public-content.functions";
import { cn } from "@/lib/utils";
import { Button3D } from "@/components/ui/button-3d";

const services = ["Unfallschaden", "Lackschaden", "Frontscheibe / Steinschlag", "Reparatur", "Sonstiges"];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Das Kurz-Formular aus FotoAngebot — ausgelagert, damit es sowohl inline
// auf der Startseite als auch im "Angebot erhalten"-Popup (überall auf der
// Seite erreichbar) dieselbe Logik nutzt statt sie zu duplizieren.
export function QuoteForm({ className }: { className?: string }) {
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
      const photoKeys: string[] = [];
      for (const file of files.slice(0, 6)) {
        const dataBase64 = await fileToBase64(file);
        const { url } = await uploadPublicImage({ data: { folder: "schaden-fotos", filename: file.name, dataBase64 } });
        photoKeys.push(url);
      }

      await submitQuoteRequest({
        data: {
          name,
          phone,
          email: String(data.get("email") ?? "").trim() || undefined,
          serviceType: String(data.get("service") ?? "Reparatur"),
          message: String(data.get("message") ?? "").slice(0, 1000) || undefined,
          photoKeys,
        },
      });

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

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle2 className="size-12 text-success" aria-hidden="true" />
        <p className="text-lg font-semibold">Anfrage erhalten!</p>
        <p className="text-sm text-muted-foreground">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
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
      <Button3D as="button" type="submit" disabled={sending} className="w-full">
        {sending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        Angebot anfordern
      </Button3D>
    </form>
  );
}

export default QuoteForm;
