// Pill-Button mit umlaufendem Lichtstreifen im Rand ("Border-Beam") — Effekt
// wie im Referenz-Screenshot des Kunden (Anfrage-Banner). Gedacht für Buttons
// auf farbigem Grund: ein heller Bogen wandert dauerhaft um den feinen Rand.
// Trackt Klicks wie Button3D, damit die Auswertung im Admin-Panel weiterläuft.
import * as React from "react";
import { cn } from "@/lib/utils";
import { trackClickEvent } from "@/lib/analytics-client";

type BeamButtonProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
  variant?: "light" | "whatsapp";
  children: React.ReactNode;
  trackLabel?: string;
};

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join(" ").trim();
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return extractText(node.props.children);
  return "";
}

const faceStyles = {
  light: "bg-white text-brand-navy",
  whatsapp: "bg-[#25D366] text-white",
} as const;

export function BeamButton({ variant = "light", children, trackLabel, onClick, ...props }: BeamButtonProps) {
  const label = trackLabel || extractText(children).slice(0, 120) || variant;
  return (
    <a
      {...props}
      onClick={(e) => {
        void trackClickEvent(label);
        onClick?.(e);
      }}
      className="group relative inline-flex overflow-hidden rounded-full bg-white/30 p-[2px] shadow-lg transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 animate-spin bg-[conic-gradient(from_0deg,transparent_0_62%,rgba(255,255,255,0.15)_75%,#fff_100%)] [animation-duration:3s] motion-reduce:animate-none"
      />
      <span
        className={cn(
          "relative flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold",
          faceStyles[variant],
        )}
      >
        {children}
      </span>
    </a>
  );
}

export default BeamButton;
