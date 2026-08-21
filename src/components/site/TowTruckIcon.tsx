import type { SVGProps } from "react";

// Lucide hat kein eigenes "Abschleppwagen"-Icon (nur den generischen
// Lieferwagen `Truck`), daher als eigenes SVG im gleichen Stroke-Stil
// gebaut: Fahrerkabine + aufragender Kranarm mit Haken statt Kofferaufbau.
export function TowTruckIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M3 17V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v9" />
      <path d="M3 12h5" />
      <path d="M3 17h18" />
      <path d="M16 17v-5.5" />
      <path d="M16 11.5 21 8" />
      <path d="M21.4 7.6a1.4 1.4 0 1 1-2.3 1.6" />
      <circle cx="6.5" cy="18.2" r="1.3" />
      <circle cx="15.5" cy="18.2" r="1.3" />
    </svg>
  );
}

export default TowTruckIcon;
