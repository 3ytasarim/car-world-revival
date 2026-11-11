import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

// Marquee from shadcn space Hero 01 (MIT): the children repeat `repeat` times and
// scroll via a CSS keyframe. Class and keyframe names are prefixed "hero-marquee"
// because styles.css already defines an `animate-marquee` utility.
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
