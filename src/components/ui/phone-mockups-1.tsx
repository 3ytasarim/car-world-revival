import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

// Adapted from 21st.dev (solaceui/phone-mockups-1) — the original SVG
// frame + carousel logic used next/image and rendered one phone at a
// time. Ported off Next.js to a plain frame that takes real children
// (instead of a single background image) via foreignObject, so the site's
// existing PhoneScreen content can sit inside each phone. No wrapping
// background — it's meant to sit directly on the page's own gradient.
export function Iphone15ProFrame({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <svg
        className="h-auto w-full"
        viewBox="0 0 433 882"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer frame */}
        <path
          d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
          fill="#1B3A63"
        />
        {/* side nubs */}
        <path d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z" fill="#1B3A63" />
        <path d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z" fill="#1B3A63" />
        <path d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z" fill="#1B3A63" />
        <path d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z" fill="#1B3A63" />
        {/* inner body — also covers the "screen area" the foreignObject sits
            in (same #0B1626 fill), so there's no separate adjacent path
            fighting it for that region. Two same-colour shapes with edges
            only ~1 unit apart there used to show up as a hairline seam from
            SVG anti-aliasing, more visible the bigger the phones render. */}
        <path
          d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
          fill="#0B1626"
        />
        {children && (
          <foreignObject x="21.25" y="19.25" width="389.5" height="843.5" clipPath="url(#phone1-rounded-corners)">
            <div style={{ width: "100%", height: "100%", position: "relative" }}>{children}</div>
          </foreignObject>
        )}
        {/* notch */}
        <path
          d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
          fill="#0B1626"
        />
        <defs>
          <clipPath id="phone1-rounded-corners">
            <rect x="21.25" y="19.25" width="389.5" height="843.5" rx="55.75" ry="55.75" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

// The original component's "normal mode" carousel: all 3 phones stay
// mounted and visible, but the active one sits centered at full size
// while the other two fan out dimmed to either side — and which one is
// "active" auto-advances on an interval. Faithful port of that behavior,
// just driving arbitrary children per slide instead of a single image.
export function PhoneFanCarousel({
  items,
  interval = 3000,
  className = "",
}: {
  items: ReactNode[];
  interval?: number;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);

  return (
    <div className={cn("relative flex w-full items-center justify-center", className)}>
      {items.map((item, i) => {
        const isActive = i === active;
        const isPrev = i === (active - 1 + items.length) % items.length;
        const isNext = i === (active + 1) % items.length;

        return (
          <div
            key={i}
            className={cn(
              "absolute w-[62%] max-w-[240px] transition-all duration-700 ease-in-out [container-type:inline-size]",
              isActive && "z-20 translate-x-0 scale-100 opacity-100",
              isPrev && "z-10 -translate-x-[55%] scale-90 opacity-40",
              isNext && "z-10 translate-x-[55%] scale-90 opacity-40",
              !isActive && !isPrev && !isNext && "z-0 scale-90 opacity-0",
            )}
          >
            {item}
          </div>
        );
      })}
      {/* Spacer so the relative container reports a real height (matches the SVG frame's 433:882 ratio) */}
      <div className="invisible w-[62%] max-w-[240px] aspect-[433/882]" aria-hidden="true" />
    </div>
  );
}

export default Iphone15ProFrame;
