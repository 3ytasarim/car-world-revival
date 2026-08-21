import { useState } from "react";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { FileText, Phone } from "lucide-react";

import { PHONE_HREF, WA_FRAGE } from "./site-data";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function MobileBar() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 bg-brand-navy md:hidden">
      <a
        href={PHONE_HREF}
        className="flex flex-col items-center gap-0.5 border-t border-white/10 py-2.5 text-xs font-medium text-brand-navy-foreground"
      >
        <Phone className="size-4" aria-hidden="true" />
        Anrufen
      </a>
      <a
        href={WA_FRAGE}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 border-t border-[#25D366] bg-[#25D366] py-2.5 text-xs font-medium text-white"
      >
        <WhatsAppIcon className="size-4" />
        WhatsApp
      </a>
      <button
        type="button"
        onClick={() => setQuoteOpen(true)}
        className="flex flex-col items-center gap-0.5 border-t border-white/10 py-2.5 text-xs font-medium text-brand-navy-foreground"
      >
        <FileText className="size-4" aria-hidden="true" />
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
    </div>
  );
}
