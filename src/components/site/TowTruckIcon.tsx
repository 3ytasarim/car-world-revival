import type { ImgHTMLAttributes } from "react";

import towTruckIcon from "@/assets/tow-truck-icon.png";

// Vom Kunden bereitgestelltes Icon, auf die Site-Icon-Farbe (#1B3A63)
// eingefärbt — ersetzt die vorherige selbstgebaute SVG-Variante. Behält
// dieselbe Aufruf-Signatur (className/aria-hidden) bei, damit die
// processSteps-Liste in RundumSorglosSection unverändert bleiben kann.
export function TowTruckIcon({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={towTruckIcon} alt="" className={className} {...props} />;
}

export default TowTruckIcon;
