import type { ReactNode } from "react";

// A center logo with a ring of partner/certification logos orbiting around
// it — the classic "orbiting circles" pattern (as seen in 21st.dev's
// orbiting-skills / Magic UI's OrbitingCircles). Built from scratch: the
// exact 21st.dev registry file was rejected by their own security scanner
// ("script content detected"), so this is a from-scratch equivalent using
// plain CSS keyframe rotation — the orbiting items counter-rotate so their
// logos stay upright instead of spinning with the ring.
export interface OrbitingItem {
  key: string;
  content: ReactNode;
}

export function OrbitingLogos({
  center,
  items,
  radius = 140,
  duration = 22,
  reverse = false,
  className = "",
}: {
  center: ReactNode;
  items: OrbitingItem[];
  radius?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const animName = reverse ? "orbit-spin-reverse" : "orbit-spin";
  const counterAnimName = reverse ? "orbit-counter-reverse" : "orbit-counter";

  // Radius is read from the CSS custom property `--orbit-radius`, with the
  // `radius` prop only as its *fallback* inside var(--orbit-radius, Npx) —
  // never assigned via inline style. Inline style declarations always beat
  // class-based rules at every breakpoint (highest cascade priority,
  // regardless of media query), so if we set the variable inline here a
  // caller's `sm:[--orbit-radius:170px]` class could never override it. This
  // way callers can still widen the orbit responsively via arbitrary-value
  // classes; when they don't, the fallback quietly applies the plain prop.
  const fallback = `${radius}px`;

  return (
    <div
      className={`relative mx-auto flex items-center justify-center ${className}`}
      style={{
        width: `calc(var(--orbit-radius, ${fallback}) * 2 + 96px)`,
        height: `calc(var(--orbit-radius, ${fallback}) * 2 + 96px)`,
      }}
    >
      <style>{`
        @keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes orbit-counter { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes orbit-counter-reverse { from { transform: rotate(-360deg); } to { transform: rotate(0deg); } }
        @media (prefers-reduced-motion: reduce) {
          .orbit-ring, .orbit-counter-el { animation: none !important; }
        }
      `}</style>

      {/* Faint orbit path */}
      <div
        className="pointer-events-none absolute rounded-full border border-dashed border-[#5088C8]/20"
        style={{
          width: `calc(var(--orbit-radius, ${fallback}) * 2)`,
          height: `calc(var(--orbit-radius, ${fallback}) * 2)`,
        }}
      />

      {/* Center */}
      <div className="relative z-10">{center}</div>

      {/* Rotating ring: each item is placed at its angle, then counter-rotated to stay upright */}
      <div
        className="orbit-ring pointer-events-none absolute inset-0"
        style={{ animation: `${animName} ${duration}s linear infinite` }}
      >
        {items.map((item, i) => {
          const angle = (360 / items.length) * i;
          return (
            <div
              key={item.key}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${angle}deg) translate(var(--orbit-radius, ${fallback})) rotate(-${angle}deg)`,
              }}
            >
              <div
                className="orbit-counter-el pointer-events-auto -translate-x-1/2 -translate-y-1/2"
                style={{ animation: `${counterAnimName} ${duration}s linear infinite` }}
              >
                {item.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
