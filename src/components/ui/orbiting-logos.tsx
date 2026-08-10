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

  return (
    <div
      className={`relative mx-auto flex items-center justify-center ${className}`}
      style={{ width: radius * 2 + 96, height: radius * 2 + 96 }}
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
        style={{ width: radius * 2, height: radius * 2 }}
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
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
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
