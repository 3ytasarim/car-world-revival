import { Mail, MapPin, Phone } from "lucide-react";

import { EMAIL, PHONE_LABEL, PHONE_HREF } from "./site-data";

const leistungen = [
  ["Unfallservice", "/leistungen/unfallservice"],
  ["Abschleppdienst", "/leistungen/abschleppdienst"],
  ["Fahrzeugreparatur", "/leistungen/fahrzeugreparatur"],
  ["Ersatzwagen", "/leistungen/ersatzwagen"],
  ["Versicherungsabwicklung", "/leistungen/versicherungsabwicklung"],
];

const unternehmen = [
  ["Kundenmeinungen", "/kundenmeinungen"],
  ["Karriere", "/karriere"],
  ["FAQ", "/faq"],
  ["Kontakt & Anfahrt", "/kontakt"],
  ["Impressum", "/impressum"],
  ["Datenschutz", "/datenschutz"],
];

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-navy text-brand-navy-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold">Car-World</p>
          <p className="mt-2 text-sm opacity-75">
            Ihr zuverlässiger Partner für Unfallhilfe, Reparatur und Wartung.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold opacity-90">Leistungen</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm opacity-75">
            {leistungen.map(([label, href]) => (
              <li key={href}>
                <a className="hover:opacity-100" href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold opacity-90">Unternehmen</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm opacity-75">
            {unternehmen.map(([label, href]) => (
              <li key={href}>
                <a className="hover:opacity-100" href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold opacity-90">Kontakt</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm opacity-75">
            <li className="flex items-center gap-2">
              <Phone className="size-3.5 shrink-0" aria-hidden="true" />
              <a className="hover:opacity-100" href={PHONE_HREF}>
                {PHONE_LABEL}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-3.5 shrink-0" aria-hidden="true" />
              <a className="hover:opacity-100" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              <span>
                Ehlinger Straße 45
                <br />
                53474 Bad Neuenahr-Ahrweiler
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs opacity-60 sm:px-6">
        © 2026 Car-World Kfz-Werkstatt. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
