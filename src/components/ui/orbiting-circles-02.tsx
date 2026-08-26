import type { CSSProperties, ReactNode } from "react";

// Literal port of 21st.dev (shadcnspace/orbiting-circles-02), structure and
// classes unchanged: rings are anchored `bottom-0` + `translate-y-1/2` (their
// own center sits exactly on the container's bottom edge, so only the top
// half is visible inside `overflow-hidden` — that's what makes the "rising
// dome" composition), each ring's icons are doubled with a mirrored copy at
// `angle + 180` for the left/right symmetry, and the spoke/badge
// counter-rotation trick is untouched. Only two swaps: the 9000-particle
// canvas "globe" center is replaced with the real Car-World logo (a
// generative WebGL sphere has nothing to do with an auto workshop's
// partner-logo rings), and `orbit.icons` takes real `content` nodes instead
// of `{src, alt}` pairs so any of the site's existing logo assets can be
// dropped straight in.
export interface OrbitIcon {
  key: string;
  content: ReactNode;
  angle: number;
}

export interface OrbitRing {
  /** Tailwind size classes, e.g. "w-110 h-110 md:w-180 md:h-180" — same convention as the source. */
  sizeClassName: string;
  duration: number;
  icons: OrbitIcon[];
}

export function OrbitingCircles02({
  center,
  rings,
  heightClassName = "h-110 md:h-160",
  centerClassName = "w-75 md:w-145",
  className = "",
}: {
  center: ReactNode;
  rings: OrbitRing[];
  heightClassName?: string;
  centerClassName?: string;
  className?: string;
}) {
  return (
    <div className={`relative flex w-full justify-center overflow-hidden ${heightClassName} ${className}`}>
      <div className={`pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-square -translate-x-1/2 translate-y-1/2 ${centerClassName}`}>
        {center}
      </div>

      {/* Orbiting rings */}
      {rings.map((ring, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        const allIcons = [
          ...ring.icons,
          ...ring.icons.map((ic) => ({ ...ic, angle: ic.angle + 180, key: `${ic.key}-mirror` })),
        ];

        return (
          <div
            key={index}
            className={`border-border absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border ${ring.sizeClassName}`}
          >
            {allIcons.map((iconData) => (
              <div
                key={iconData.key}
                className="orbit-02-spoke absolute top-0 left-1/2 -ml-[46px] flex h-1/2 origin-bottom flex-col items-center justify-start md:-ml-[56px]"
                style={{ "--start-angle": `${iconData.angle}deg`, animation: `${orbitAnim} ${ring.duration}s linear infinite` } as CSSProperties}
              >
                <div
                  className="orbit-02-badge relative z-10 -mt-[46px] flex size-[92px] items-center justify-center rounded-full border border-black/10 bg-white shadow-md md:-mt-[56px] md:size-[112px]"
                  style={{ "--counter-offset": `${-iconData.angle}deg`, animation: `${counterAnim} ${ring.duration}s linear infinite` } as CSSProperties}
                >
                  {iconData.content}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default OrbitingCircles02;
