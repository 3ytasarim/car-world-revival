export const PHONE_DISPLAY = "02641 39 69 555";
export const PHONE_HREF = "tel:+4926413969555";
export const EMAIL = "info@kfz-car-world.de";
export const EMAIL_KARRIERE = "karriere@kfz-car-world.de";
export const WA_NUMBER = "4926413969555";

const wa = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export const WA_UNFALL = wa("Hallo Car-World, ich hatte einen Unfall und benötige sofort Hilfe.");
export const WA_FRAGE = wa("Hallo Car-World, ich habe eine Frage zu meinem Fahrzeug.");
export const WA_FOTO = wa(
  "Hallo Car-World, ich schicke Ihnen Fotos von meinem Schaden. Bitte erstellen Sie mir ein Angebot.",
);
export const WA_SCHEIBE = wa(
  "Hallo Car-World, ich habe einen Steinschlag / Frontscheibenschaden. Ich sende Ihnen gleich Fotos.",
);
export const WA_LACK = wa("Hallo Car-World, ich habe einen Lackschaden. Anbei Fotos für ein Angebot.");
export const WA_FAHRZEUGSCHEIN = wa(
  "Hallo Car-World, ich sende Ihnen hier meinen Fahrzeugschein für ein passendes Angebot.",
);
export const WA_PARTNER = wa(
  "Hallo Car-World, ich komme aus dem Partner-Bereich Ihrer Webseite und interessiere mich für eine Partnerschaft.",
);
export const WA_KARRIERE = wa("Hallo Car-World, ich interessiere mich für eine Stelle bei Ihnen.");
export const WA_TERMIN = wa("Hallo Car-World, ich möchte gerne einen Werkstatt-Termin vereinbaren.");

// Weitere Leistungen aus "Unsere Leistungen" / den Kernleistungen-Karten —
// jede CTA soll die vorausgefüllte Nachricht tragen, die zum jeweiligen
// Thema passt, statt überall auf eine generische Nachricht zu verlinken.
export const WA_ABSCHLEPP = wa("Hallo Car-World, ich benötige einen Abschleppdienst / eine Fahrzeugbergung.");
export const WA_REPARATUR = wa("Hallo Car-World, ich möchte eine Fahrzeugreparatur anfragen.");
export const WA_ERSATZWAGEN = wa("Hallo Car-World, ich hätte gerne einen Ersatzwagen.");
export const WA_VERSICHERUNG = wa(
  "Hallo Car-World, ich benötige Hilfe bei der Versicherungsabwicklung nach einem Schaden.",
);
export const WA_REIFEN = wa("Hallo Car-World, ich möchte einen Reifenwechsel / eine Reifeneinlagerung vereinbaren.");
export const WA_TUEV = wa("Hallo Car-World, ich möchte einen Termin für die TÜV-Prüfung vereinbaren.");
export const WA_INSPEKTION = wa("Hallo Car-World, ich benötige ein Angebot für eine Inspektion.");

/** Erreichbarkeit: bewusst ohne Öffnungszeiten – WhatsApp ist rund um die Uhr. */
export const AVAILABILITY = "Per WhatsApp 7/24 erreichbar";

export const ADDRESS = {
  street: "Ehlinger Straße 45",
  zip: "53474",
  city: "Bad Neuenahr-Ahrweiler (Heimersheim)",
};

/** Kurzes Label statt ausgeschriebener Rufnummer. */
export const PHONE_LABEL = "Jetzt anrufen";

export const NAV = [
  { label: "Start", href: "/", icon: "house" },
  { label: "Leistungen", href: "/leistungen", icon: "wrench" },
  { label: "Aktuelle Angebote", href: "/aktuelle-angebote", icon: "tag" },
  { label: "Partner", href: "/partner", icon: "handshake" },
  { label: "Karriere", href: "/karriere", icon: "briefcase" },
  { label: "Kontakt", href: "/kontakt", icon: "mail" },
] as const;
