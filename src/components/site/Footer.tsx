import { Instagram, Mail } from "lucide-react";

import { EMAIL, WA_FRAGE } from "./site-data";
import logo from "@/assets/logo.png.asset.json";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { StarsCanvas } from "@/components/ui/stars-canvas";

const legal = [
  ["Impressum", "/impressum"],
  ["Datenschutz", "/datenschutz"],
];

const marqueeText = "CARWORLD-WERKSTATT.DE";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden rounded-t-[2.5rem] bg-[#1B3A63] text-white">
      <StarsCanvas />

      <div className="relative overflow-hidden border-b border-white/10 py-4">
        <style>{`
          @keyframes footer-marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .footer-marquee-track { animation: footer-marquee 42s linear infinite; }
          @media (prefers-reduced-motion: reduce) {
            .footer-marquee-track { animation: none; }
          }
        `}</style>
        <div className="footer-marquee-track flex w-max items-center whitespace-nowrap">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {marqueeText}
              </span>
              <span className="text-2xl text-white/30 sm:text-3xl">—</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={logo.url} alt="Car-World" className="h-16 w-auto object-contain" />
          <p className="mt-4 text-2xl leading-tight font-bold tracking-tight text-white">
            Ihre Nr. 1 Autowerkstatt in Bad Neuenahr-Ahrweiler.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-white/50 uppercase">Legal</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {legal.map(([label, href]) => (
              <li key={href}>
                <a className="opacity-80 transition-opacity hover:opacity-100" href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-white/50 uppercase">Kontakt</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li>
              <a
                className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
                href={`mailto:${EMAIL}`}
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
                href={WA_FRAGE}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="size-4 shrink-0" />
                Kostenlose Beratung per WhatsApp
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
                href="https://www.instagram.com/kfz_car_world"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="size-4 shrink-0" aria-hidden="true" />
                Auf Instagram folgen
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs opacity-60 sm:flex-row">
          <p>© {new Date().getFullYear()} Car-World Kfz-Werkstatt · Alle Rechte vorbehalten</p>
          <p>Kfz-Meisterbetrieb · Mitglied der Kfz-Innung Ahrweiler</p>
        </div>
      </div>
    </footer>
  );
}
