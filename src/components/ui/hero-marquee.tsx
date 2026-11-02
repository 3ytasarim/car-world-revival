import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

// Marquee aus shadcn space "Hero 01" (shadcnspace.com/r/hero-01, MIT) — der
// Inhalt wird `repeat`-mal wiederholt und läuft per CSS-Keyframe. Klassen und
// Keyframe heißen bewusst "hero-marquee*", weil styles.css bereits eine
// eigene `animate-marquee`-Utility (translateX -50 %) besitzt.
interface HeroMarqueeProps extends ComponentPropsWithoutRef<"div"> {
  pauseOnHover?: boolean;
  repeat?: number;
  children: ReactNode;
}

export function HeroMarquee({ className, pauseOnHover = false, repeat = 4, children, ...props }: HeroMarqueeProps) {
  return (
    <>
      <style>
        {`
          @keyframes hero-marquee-x {
            from { transform: translateX(0); }
            to { transform: translateX(calc(-100% - var(--gap))); }
          }
          .hero-marquee-track { animation: hero-marquee-x var(--duration) linear infinite; }
          .hero-marquee-pause:hover .hero-marquee-track { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) {
            .hero-marquee-track { animation: none; }
          }
        `}
      </style>
      <div
        {...props}
        className={cn(
          "flex flex-row gap-(--gap) overflow-hidden p-2 [--duration:20s] [--gap:1rem]",
          pauseOnHover && "hero-marquee-pause",
          className,
        )}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} aria-hidden={i > 0 ? true : undefined} className="hero-marquee-track flex shrink-0 flex-row justify-around gap-(--gap)">
            {children}
          </div>
        ))}
      </div>
    </>
  );
}

export default HeroMarquee;
