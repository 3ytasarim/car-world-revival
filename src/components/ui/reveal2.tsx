"use client";

import { GripVertical } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// From 21st.dev (ziegfiroyt/reveal2) — the source was already framework-
// agnostic (plain <img>, no next/image), so this is a near-direct port.
// Simplified to the before/after slider itself; the site's own heading/
// badge/highlight markup lives in RundumSorglosSection instead of this
// component's built-in layout, since the site already has its own
// conventions for those (AnimatedText, brand badge styling, etc.).
export function RevealSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Vorher",
  afterLabel = "Nachher",
  initialPosition = 50,
  dividerWidth = 4,
  className,
}: {
  beforeImage: { src: string; alt: string };
  afterImage: { src: string; alt: string };
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  dividerWidth?: number;
  className?: string;
}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      handleMove(e.clientX);
    },
    [handleMove],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      const touch = e.touches[0];
      if (touch) handleMove(touch.clientX);
    },
    [handleMove],
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => isDragging && handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      if (touch) handleMove(touch.clientX);
    };
    const onEnd = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("mouseup", onEnd);
      document.addEventListener("touchend", onEnd);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label="Vorher/Nachher Vergleich"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      className={cn(
        "relative aspect-[16/10] w-full cursor-ew-resize overflow-hidden rounded-3xl border border-[#5088C8]/20 shadow-[0_30px_60px_-30px_rgba(19,31,53,0.35)] select-none",
        className,
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="absolute inset-0">
        <img className="absolute inset-0 size-full object-cover" src={afterImage.src} alt={afterImage.alt} />
      </div>

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img className="absolute inset-0 size-full object-cover" src={beforeImage.src} alt={beforeImage.alt} />
      </div>

      <div
        className="absolute top-0 bottom-0 z-10 -translate-x-1/2 bg-white shadow-lg"
        style={{ left: `${position}%`, width: `${dividerWidth}px` }}
      >
        <div
          className={cn(
            "absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#1B3A63] bg-white shadow-xl transition-transform",
            isDragging && "scale-110",
          )}
        >
          <GripVertical className="size-5 text-[#1B3A63]" aria-hidden="true" />
        </div>
      </div>

      <div className="absolute top-4 left-4 z-20 rounded-full bg-[#131F35]/70 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 z-20 rounded-full bg-[#5088C8] px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  );
}

export default RevealSlider;
