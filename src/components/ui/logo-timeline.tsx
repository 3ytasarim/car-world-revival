import type React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export interface LogoItem {
  label: string;
  icon: React.ReactNode;
  animationDelay: number;
  animationDuration: number;
  row: number;
}

export interface LogoTimelineProps {
  items: LogoItem[];
  title?: React.ReactNode;
  height?: string;
  className?: string;
  showRowSeparator?: boolean;
  animateOnHover?: boolean;
}

export function LogoTimeline({
  items,
  title,
  height = "h-[420px] sm:h-[520px]",
  className,
  showRowSeparator = true,
  animateOnHover = false,
}: LogoTimelineProps) {
  const [isHovered, setIsHovered] = useState(false);

  const rowsMap = new Map<number, LogoItem[]>();
  items.forEach((item) => {
    if (!rowsMap.has(item.row)) rowsMap.set(item.row, []);
    rowsMap.get(item.row)!.push(item);
  });

  const rows = Array.from(rowsMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([, rowItems]) => rowItems);

  const animationPlayState = animateOnHover ? (isHovered ? "running" : "paused") : "running";

  return (
    <div
      className={cn("relative w-full overflow-hidden", height, className)}
      onMouseEnter={() => animateOnHover && setIsHovered(true)}
      onMouseLeave={() => animateOnHover && setIsHovered(false)}
    >
      {/* Zeilen mit laufenden Logos */}
      <div className="absolute inset-0 grid" style={{ gridTemplateRows: `repeat(${rows.length}, 1fr)` }}>
        {rows.map((rowItems, index) => (
          <div key={index} className="relative flex items-center">
            {showRowSeparator && <div className="absolute inset-x-0 top-0 h-px bg-black/5" />}
            {rowItems.map((logo) => (
              <div
                key={`${logo.label}-${logo.animationDelay}`}
                className="absolute flex items-center gap-2 rounded-full border border-black/5 bg-white/90 px-4 py-2 whitespace-nowrap shadow-[0_10px_30px_-20px_rgba(19,31,53,0.8)] backdrop-blur"
                style={{
                  // @ts-expect-error custom props
                  "--move-x-from": "-120%",
                  "--move-x-to": "calc(100vw + 20%)",
                  animation: `move-x ${logo.animationDuration}s linear ${logo.animationDelay}s infinite`,
                  animationPlayState,
                }}
              >
                {logo.icon}
                <span className="text-sm font-semibold text-[#1B3A63]">{logo.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Zentrales Logo */}
      {title && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-3xl bg-white/55 px-8 py-6 backdrop-blur-[2px]">{title}</div>
        </div>
      )}

      {/* Kanten weichzeichnen */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-brand-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-brand-surface to-transparent" />
    </div>
  );
}

export default LogoTimeline;
