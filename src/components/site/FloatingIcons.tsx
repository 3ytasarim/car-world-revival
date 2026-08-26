import carIcon from "@/assets/rail-car.png";
import breakdownIcon from "@/assets/rail-breakdown.png";
import towIcon from "@/assets/rail-tow-truck.png";
import accidentIcon from "@/assets/rail-car-accident.png";
import trafficIcon from "@/assets/rail-traffic.png";
import bumpIcon from "@/assets/rail-bump.png";

const ICONS = [carIcon, breakdownIcon, towIcon, accidentIcon, trafficIcon, bumpIcon];

type Item = {
  src: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

const ITEMS: Item[] = Array.from({ length: 14 }, (_, i) => {
  const src = ICONS[i % ICONS.length]!;
  return {
    src,
    left: 3 + ((i * 7.3) % 94),
    size: 34 + ((i * 13) % 30),
    duration: 16 + ((i * 5) % 12),
    delay: -(i * 2.4) % 22,
    drift: (i % 2 === 0 ? 1 : -1) * (20 + ((i * 9) % 40)),
  };
});

export function FloatingIcons({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <style>{`
        @keyframes hero-icon-rise {
          0%   { transform: translate3d(0, -20%, 0) rotate(-6deg); opacity: 0; }
          12%  { opacity: var(--icon-opacity, .35); }
          80%  { opacity: var(--icon-opacity, .35); }
          100% { transform: translate3d(var(--drift, 0px), 120vh, 0) rotate(6deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-icon { animation: none !important; opacity: .18; }
        }
      `}</style>
      {ITEMS.map((it, i) => (
        <img
          key={i}
          src={it.src}
          alt=""
          width={it.size}
          height={it.size}
          className="hero-icon absolute top-0"
          style={{
            left: `${it.left}%`,
            width: it.size,
            height: it.size,
            // @ts-expect-error custom props
            "--drift": `${it.drift}px`,
            "--icon-opacity": 0.28 + (i % 3) * 0.08,
            animation: `hero-icon-rise ${it.duration}s linear ${it.delay}s infinite`,
            filter: "brightness(0) saturate(100%) invert(48%) sepia(31%) saturate(900%) hue-rotate(174deg)",
          }}
        />
      ))}
    </div>
  );
}
