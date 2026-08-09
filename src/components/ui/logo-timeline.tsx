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
      {/* Zeilen als gleichmäßige Marquee-Spuren */}
      <div className="absolute inset-0 grid" style={{ gridTemplateRows: `repeat(${rows.length}, 1fr)` }}>
        {rows.map((rowItems, index) => {
          const duration = rowItems[0]?.animationDuration ?? 50;
          const reverse = index % 2 === 1;
          return (
            <div key={index} className="relative flex items-center overflow-hidden">
              {showRowSeparator && <div className="absolute inset-x-0 top-0 h-px bg-black/[0.03]" />}
              <div
                className="flex w-max shrink-0 items-center gap-16 sm:gap-24"
                style={{
                  animation: `marquee ${duration}s linear infinite`,
                  animationDirection: reverse ? "reverse" : "normal",
                  animationPlayState,
                }}
              >
                {[0, 1].map((copy) =>
                  rowItems.map((logo, i) => (
                    <div
                      key={`${index}-${copy}-${logo.label}-${i}`}
                      className={cn(
                        "flex shrink-0 items-center whitespace-nowrap",
                        logo.label
                          ? "gap-2 rounded-full border border-black/5 bg-white/90 px-4 py-2 shadow-[0_10px_30px_-20px_rgba(19,31,53,0.8)] backdrop-blur"
                          : "",
                      )}
                    >
                      {logo.icon}
                      {logo.label ? (
                        <span className="text-sm font-semibold text-[#1B3A63]">{logo.label}</span>
                      ) : null}
                    </div>
                  )),
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Zentrales Logo */}
      {title && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="px-8 py-6">{title}</div>
        </div>
      )}
    </div>
  );
}


export default LogoTimeline;
