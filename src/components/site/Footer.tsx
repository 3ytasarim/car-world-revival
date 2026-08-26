import { Mail } from "lucide-react";

import { EMAIL, WA_FRAGE } from "./site-data";
import carWorldLogo from "@/assets/car-world-logo.png";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { GoogleIcon } from "@/components/site/GoogleIcon";
import { FacebookIcon } from "@/components/site/FacebookIcon";
import { InstagramIcon } from "@/components/site/InstagramIcon";
import { StarsCanvas } from "@/components/ui/stars-canvas";

// Echte Profil-URLs noch nicht vorhanden — Platzhalter, bis der Kunde sie liefert.
const socialLinks = [
  { icon: GoogleIcon, label: "Google Bewertungen", href: "#" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/kfz_car_world" },
];

const legal = [
  ["Impressum", "/impressum"],
  ["Datenschutz", "/datenschutz"],
];

const marqueeText = "CARWORLD-WERKSTATT.DE";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden rounded-t-[2.5rem] bg-brand-orange text-white">
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

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-4 py-16 md:px-10 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-14">
        <div>
          <div className="flex items-center gap-3 sm:gap-4">
            <img src={carWorldLogo} alt="Car-World Kfz-Meisterbetrieb" className="h-14 w-auto sm:h-20" />
          </div>
          <p className="mt-4 text-sm leading-relaxed font-medium text-white/70">
            Ihre Nr. 1 Autowerkstatt
            <br />
            in Bad Neuenahr-Ahrweiler.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex size-10 items-center justify-center rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110"
              >
                <s.icon className="size-full" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-widest text-white uppercase">Legal</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {legal.map(([label, href]) => (
              <li key={href}>
                <a className="font-semibold text-white opacity-90 transition-opacity hover:opacity-100" href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold tracking-widest text-white uppercase">Kontakt</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li>
              <a
                className="flex items-center gap-2 font-semibold text-white opacity-90 transition-opacity hover:opacity-100"
                href={`mailto:${EMAIL}`}
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-2 font-semibold text-white opacity-90 transition-opacity hover:opacity-100"
                href={WA_FRAGE}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="size-4 shrink-0" />
                Kostenlose Beratung per WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-2 px-4 py-4 text-xs opacity-60 sm:flex-row md:px-10 lg:px-14">
          <p>© {new Date().getFullYear()} Car-World Kfz-Werkstatt · Alle Rechte vorbehalten</p>
          <p>Kfz-Meisterbetrieb · Mitglied der Kfz-Innung Ahrweiler</p>
        </div>
      </div>
    </footer>
  );
}
