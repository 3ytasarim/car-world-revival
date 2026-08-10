import { Instagram, Mail, MessageCircle } from "lucide-react";

import { EMAIL, WA_FRAGE } from "./site-data";
import logo from "@/assets/logo.png.asset.json";

const legal = [
  ["Impressum", "/impressum"],
  ["Datenschutz", "/datenschutz"],
];

const marqueeText = "CARWORLD-WERKSTATT.DE";

export function Footer() {
  return (
    <footer className="mt-auto overflow-hidden rounded-t-[2.5rem] bg-[#1B3A63] text-white">
      {/* Scrolling marquee band — slow, dark-blue text on a light strip so it
          reads clearly above the dark footer body below it. */}
      <div className="overflow-hidden border-b border-white/10 bg-white py-4">
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
              <span className="px-6 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
                {marqueeText}
              </span>
              <span className="text-2xl text-brand-navy/30 sm:text-3xl">—</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="inline-flex items-center rounded-xl bg-white px-3 py-2 shadow-md">
            <img src={logo.url} alt="Car-World" className="h-10 w-auto object-contain" />
          </div>
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
                <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
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

      <div className="border-t border-white/10 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs opacity-60 sm:flex-row">
          <p>© {new Date().getFullYear()} Car-World Kfz-Werkstatt · Alle Rechte vorbehalten</p>
          <p>Kfz-Meisterbetrieb · Mitglied der Kfz-Innung Ahrweiler</p>
        </div>
      </div>
    </footer>
  );
}
