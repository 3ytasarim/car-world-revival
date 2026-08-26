import { useMemo } from "react";

// Adapted from 21st.dev (larsen66/admit-one-ticket) — kept only the actual
// ticket silhouette (the SVG clip-path with rounded corners + a perforated
// notch dividing a stub on the right, `ticketClipPath`/`TICKET_GEOMETRY`
// below are a near-direct port of that math). Dropped entirely: the ~2000
// lines of custom WebGL "paper shaders" dithering engine that generated the
// ticket's decorative texture, the audio "tear" effect, and the random
// palette remixer — none of that is needed here since the ticket's face is
// a real offer photo, not a generated texture.
export const TICKET_GEOMETRY = {
  aspect: 741 / 425,
  cornerRadius: 25 / 741,
  notchRadius: 21 / 741,
  perforation: 562 / 741,
};

export function ticketClipPath(width: number, height: number, geometry = TICKET_GEOMETRY) {
  const r = geometry.cornerRadius * width;
  const n = geometry.notchRadius * width;
  const p = geometry.perforation * width;
  return [
    `M ${r} 0`,
    `L ${p - n} 0`,
    `A ${n} ${n} 0 0 0 ${p + n} 0`,
    `L ${width - r} 0`,
    `A ${r} ${r} 0 0 0 ${width} ${r}`,
    `L ${width} ${height - r}`,
    `A ${r} ${r} 0 0 0 ${width - r} ${height}`,
    `L ${p + n} ${height}`,
    `A ${n} ${n} 0 0 0 ${p - n} ${height}`,
    `L ${r} ${height}`,
    `A ${r} ${r} 0 0 0 0 ${height - r}`,
    `L 0 ${r}`,
    `A ${r} ${r} 0 0 0 ${r} 0`,
    "Z",
  ].join(" ");
}

// `clip-path: path(...)` uses a fixed pixel coordinate space (the 741x425
// values above), which does NOT rescale to the element's actual rendered
// size — at real card widths the shape only shows a tiny sliver of that
// path, i.e. it looks like a plain rectangle. An SVG <clipPath> with
// `clipPathUnits="objectBoundingBox"` uses 0..1 fractions of the element's
// own box instead, so it scales correctly at any size. Since the box's
// aspect ratio is locked (see TICKET_GEOMETRY.aspect), corner/notch radii
// need separate x/y fractions (rx, ry) so the arcs stay circular instead of
// turning into ellipses once the non-uniform 0..1 space is scaled back up.
export function ticketClipPathObjectBoundingBox(geometry = TICKET_GEOMETRY) {
  const rx = geometry.cornerRadius;
  const ry = rx * geometry.aspect;
  const nx = geometry.notchRadius;
  const ny = nx * geometry.aspect;
  const p = geometry.perforation;
  return [
    `M ${rx} 0`,
    `L ${p - nx} 0`,
    `A ${nx} ${ny} 0 0 0 ${p + nx} 0`,
    `L ${1 - rx} 0`,
    `A ${rx} ${ry} 0 0 0 1 ${ry}`,
    `L 1 ${1 - ry}`,
    `A ${rx} ${ry} 0 0 0 ${1 - rx} 1`,
    `L ${p + nx} 1`,
    `A ${nx} ${ny} 0 0 0 ${p - nx} 1`,
    `L ${rx} 1`,
    `A ${rx} ${ry} 0 0 0 0 ${1 - ry}`,
    `L 0 ${ry}`,
    `A ${rx} ${ry} 0 0 0 ${rx} 0`,
    "Z",
  ].join(" ");
}

export interface TicketCardProps {
  /** Kleines Label oben links, wo im Original "ADMIT ONE" stand. */
  label: string;
  /** Großer Titel — der eigentliche Angebotsname. */
  title: string;
  /** Fußzeile unten links, klein. */
  footer?: string;
  /** Vertikaler Text im rechten Stub-Streifen. */
  stubText?: string | undefined;
  image?: string | null | undefined;
  imageAlt?: string | undefined;
  className?: string | undefined;
}

let ticketCardIdCounter = 0;

export function TicketCard({ label, title, footer, stubText, image, imageAlt = "", className }: TicketCardProps) {
  const width = 741;
  const perfX = TICKET_GEOMETRY.perforation * width;
  const clipId = useMemo(() => `ticket-clip-${++ticketCardIdCounter}`, []);

  return (
    <div
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{ aspectRatio: `${TICKET_GEOMETRY.aspect}`, clipPath: `url(#${clipId})` }}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={ticketClipPathObjectBoundingBox()} />
          </clipPath>
        </defs>
      </svg>
      {/* Fläche: das Angebotsfoto statt generierter Textur */}
      {image ? (
        <img src={image} alt={imageAlt} loading="lazy" className="absolute inset-0 size-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_#5088C8_0%,_#1B3A63_100%)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1626]/85 via-[#0B1626]/25 to-transparent" />

      {/* Perforationslinie zwischen Hauptteil und Stub */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: `${(perfX / width) * 100}%`,
          width: 2,
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.55) 0 6px, transparent 6px 12px)",
        }}
      />

      {/* Textinhalt */}
      <div className="absolute inset-0 text-white">
        <p
          className="absolute font-bold tracking-[0.2em] uppercase"
          style={{ left: "7.7%", top: "13.6%", fontSize: "clamp(9px, 2.4cqw, 13px)" }}
        >
          {label}
        </p>
        <p
          className="absolute pr-4 font-black tracking-tight"
          style={{
            left: "7.7%",
            top: "38%",
            right: `${100 - (perfX / width) * 100}%`,
            fontSize: "clamp(15px, 4.4cqw, 26px)",
            lineHeight: 1.1,
          }}
        >
          {title}
        </p>
        {footer && (
          <p
            className="absolute pr-4 text-white/80 uppercase"
            style={{
              left: "7.7%",
              top: "81%",
              right: `${100 - (perfX / width) * 100}%`,
              fontSize: "clamp(8px, 2cqw, 11px)",
              letterSpacing: "0.05em",
            }}
          >
            {footer}
          </p>
        )}
        {stubText && (
          <div
            className="absolute grid place-items-center font-bold uppercase opacity-90"
            style={{ left: `${(perfX / width) * 100}%`, top: 0, right: 0, bottom: 0 }}
          >
            <span style={{ writingMode: "vertical-rl", fontSize: "clamp(10px, 2.6cqw, 15px)" }}>{stubText}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketCard;
