import { useEffect, useState } from "react";

import carIcon from "@/assets/car.png.asset.json";
import breakdownIcon from "@/assets/breakdown.png.asset.json";
import towIcon from "@/assets/tow-truck.png.asset.json";
import accidentIcon from "@/assets/car-accident.png.asset.json";
import trafficIcon from "@/assets/traffic.png.asset.json";
import bumpIcon from "@/assets/bump.png.asset.json";

const ICONS = [carIcon, breakdownIcon, towIcon, accidentIcon, trafficIcon, bumpIcon];

type Item = {
  src: string;
  offset: number; // % within the rail
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
};

function buildItems(seed: number): Item[] {
  return Array.from({ length: 7 }, (_, i) => {
    const n = i + seed;
    return {
      src: ICONS[(n * 2 + seed) % ICONS.length]!.url,
      offset: 12 + ((n * 23) % 60),
      size: 26 + ((n * 11) % 22),
      duration: 18 + ((n * 7) % 14),
      delay: -((n * 3.7) % 24),
      drift: (n % 2 === 0 ? 1 : -1) * (8 + ((n * 5) % 18)),
      opacity: 0.22 + ((n % 3) * 0.07),
    };
  });
}

const LEFT = buildItems(0);
const RIGHT = buildItems(3);

function Rail({ items, side }: { items: Item[]; side: "left" | "right" }) {
  return (
    <div
      className="absolute top-0 bottom-0 w-[clamp(40px,7vw,130px)] overflow-hidden"
      style={{
        [side]: 0,
        maskImage: "linear-gradient(to top, transparent 0%, #000 12%, #000 55%, transparent 92%)",
        WebkitMaskImage: "linear-gradient(to top, transparent 0%, #000 12%, #000 55%, transparent 92%)",
      }}
    >
      {items.map((it, i) => (
        <img
          key={`${side}-${i}`}
          src={it.src}
          alt=""
          width={it.size}
          height={it.size}
          className="rail-icon absolute bottom-0"
          style={{
            left: `${it.offset}%`,
            width: it.size,
            height: it.size,
            // @ts-expect-error custom property
            "--drift": `${it.drift}px`,
            "--rail-opacity": it.opacity,
            animation: `rail-icon-rise ${it.duration}s linear ${it.delay}s infinite`,
            filter:
              "brightness(0) saturate(100%) invert(48%) sepia(31%) saturate(900%) hue-rotate(174deg)",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Global decorative rails in the left/right page gutters: car icons drift
 * from the bottom of the viewport upwards and fade out near the top.
 * Hidden while the footer is on screen, and hidden on small screens where
 * there is no free gutter space.
 */
export function SideRailIcons() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      (entries) => setFooterVisible(entries.some((e) => e.isIntersecting)),
      { threshold: 0 },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 hidden overflow-hidden transition-opacity duration-500 md:block ${
        footerVisible ? "opacity-0" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes rail-icon-rise {
          0%   { transform: translate3d(0, 30%, 0) rotate(-8deg); opacity: 0; }
          10%  { opacity: var(--rail-opacity, .3); }
          78%  { opacity: var(--rail-opacity, .3); }
          100% { transform: translate3d(var(--drift, 0px), -110vh, 0) rotate(8deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rail-icon { animation: none !important; opacity: .15; }
        }
      `}</style>
      <Rail items={LEFT} side="left" />
      <Rail items={RIGHT} side="right" />
    </div>
  );
}
