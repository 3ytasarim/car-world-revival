import { useState } from "react";
import { FileText } from "lucide-react";

import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import supportImg from "@/assets/support-team.jpg";
import { PHONE_HREF, WA_FRAGE } from "./site-data";

/** Sticky CTA-Buttons rechts – immer sichtbar, mitscrollend. */
export function FloatingActions() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="fixed top-1/2 right-0 z-50 hidden -translate-y-1/2 flex-col items-end md:flex">
      <a
        href={WA_FRAGE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center gap-3 rounded-l-xl bg-[#22C55E] px-5 text-sm font-semibold text-white shadow-[0_18px_35px_-14px_rgba(34,197,94,0.9)] transition-transform duration-300 hover:-translate-x-1"
      >
        <WhatsAppIcon className="size-5" />
        WhatsApp
      </a>

      <button
        type="button"
        onClick={() => setQuoteOpen(true)}
        className="inline-flex h-12 items-center gap-3 rounded-l-xl bg-[#1B3A63] px-5 text-sm font-semibold text-white shadow-[0_18px_35px_-14px_rgba(27,58,99,0.9)] transition-transform duration-300 hover:-translate-x-1"
      >
        <FileText className="size-5" aria-hidden="true" />
        Angebot erhalten
      </button>

      <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
        <DialogContent className="max-h-[85vh] max-w-md overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Angebot anfordern</DialogTitle>
          </DialogHeader>
          <QuoteForm />
        </DialogContent>
      </Dialog>

      {/* Sarah aus dem Serviceteam — dasselbe Foto wie im Header, hier unter
          den Sticker-Buttons, anklickbar zum direkten Anrufen. */}
      <a
        href={PHONE_HREF}
        aria-label={`Sarah aus dem Serviceteam anrufen: ${PHONE_HREF.replace("tel:", "")}`}
        className="group mt-3 mr-2 inline-flex items-center justify-center rounded-full bg-[#1B3A63] p-1.5 shadow-[0_18px_35px_-14px_rgba(27,58,99,0.9)] transition-transform duration-300 hover:-translate-x-1"
      >
        <span className="relative inline-block">
          <img
            src={supportImg}
            alt=""
            aria-hidden="true"
            width={112}
            height={112}
            className="size-12 rounded-full border-2 border-white/40 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-[#1B3A63] bg-[#25D366]" />
        </span>
      </a>
    </div>

  );
}
