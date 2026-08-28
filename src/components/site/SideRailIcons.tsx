import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

import carIcon from "@/assets/rail-car.png";
import breakdownIcon from "@/assets/rail-breakdown.png";
import towIcon from "@/assets/rail-tow-truck.png";
import accidentIcon from "@/assets/rail-car-accident.png";
import trafficIcon from "@/assets/rail-traffic.png";
import bumpIcon from "@/assets/rail-bump.png";

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
  return Array.from({ length: 20 }, (_, i) => {
    const n = i + seed;
    return {
      src: ICONS[(n * 2 + seed) % ICONS.length]!,
      offset: 12 + ((n * 23) % 60),
      size: 38 + ((n * 11) % 30),
      duration: 18 + ((n * 7) % 14),
      delay: -((n * 2.1) % 24),
      drift: (n % 2 === 0 ? 1 : -1) * (8 + ((n * 5) % 18)),
      opacity: 0.5 + ((n % 3) * 0.15),
    };
  });
}

const LEFT = buildItems(0);
const RIGHT = buildItems(3);
const LEFT2 = buildItems(6);
const RIGHT2 = buildItems(9);

function Rail({
  items,
  side,
  inset = 0,
  className = "",
}: {
  items: Item[];
  side: "left" | "right";
  inset?: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute top-0 bottom-0 w-[clamp(56px,8vw,150px)] overflow-hidden ${className}`}
      style={{
        [side]: inset,
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
          className="rail-icon absolute top-0"
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
 * from the top of the viewport downwards and fade out near the bottom.
 * Hidden while the hero (top of the homepage, id="hero") or the footer is
 * on screen, hidden on small screens where there is no free gutter space,
 * and — per Kundenwunsch — nur auf der Startseite, auf allen anderen Seiten
 * komplett ausgeblendet.
 */
export function SideRailIcons() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const [footerVisible, setFooterVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    if (!isHome) return;
    const footer = document.querySelector("footer");
    const hero = document.getElementById("hero");
    const observers: IntersectionObserver[] = [];

    if (footer) {
      const io = new IntersectionObserver(
        (entries) => setFooterVisible(entries.some((e) => e.isIntersecting)),
        { threshold: 0 },
      );
      io.observe(footer);
      observers.push(io);
    }
    if (hero) {
      const io = new IntersectionObserver(
        (entries) => setHeroVisible(entries.some((e) => e.isIntersecting)),
        { threshold: 0 },
      );
      io.observe(hero);
      observers.push(io);
    } else {
      setHeroVisible(false);
    }

    return () => observers.forEach((io) => io.disconnect());
  }, [isHome]);

  if (!isHome) return null;

  const hidden = footerVisible || heroVisible;

  return (
    <div
      aria-hidden="true"
      // z-20: über allen normalen Seiteninhalten (Sections liegen bei
      // z-10 oder z-auto, deshalb haben undurchsichtige bg-white-Sections
      // die Icons bisher komplett verdeckt), aber unter Header/MobileBar
      // (z-40) und FloatingActions (z-50).
      className={`pointer-events-none fixed inset-0 z-20 hidden overflow-hidden transition-opacity duration-500 md:block ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes rail-icon-rise {
          0%   { transform: translate3d(0, -30%, 0) rotate(-8deg); opacity: 0; }
          10%  { opacity: var(--rail-opacity, .3); }
          78%  { opacity: var(--rail-opacity, .3); }
          100% { transform: translate3d(var(--drift, 0px), 110vh, 0) rotate(8deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rail-icon { animation: none !important; opacity: .3; }
        }
      `}</style>
      <Rail items={LEFT} side="left" />
      <Rail items={RIGHT} side="right" />
      <Rail items={LEFT2} side="left" inset={140} className="hidden lg:block" />
      <Rail items={RIGHT2} side="right" inset={140} className="hidden lg:block" />
    </div>
  );
}
