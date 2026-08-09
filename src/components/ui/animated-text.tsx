import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  fontSize?: number;
  minWeight?: number;
  maxWeight?: number;
  animationDuration?: number;
  delayMultiplier?: number;
  className?: string;
}

/**
 * "Breathing" variable-font text: each letter animates its weight
 * with a delay based on its distance from the center of the word.
 */
export function AnimatedText({
  text,
  fontSize,
  minWeight = 200,
  maxWeight = 840,
  animationDuration = 1.5,
  delayMultiplier = 0.25,
  className,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const spans = containerRef.current.querySelectorAll<HTMLSpanElement>("span[data-letter]");
    const numLetters = spans.length;
    spans.forEach((span, i) => {
      const mappedIndex = i - numLetters / 2;
      span.style.animationDelay = `${mappedIndex * delayMultiplier}s`;
    });
  }, [text, delayMultiplier]);

  const uid = `breath-${minWeight}-${maxWeight}`;

  return (
    <span
      ref={containerRef}
      className={cn("inline-block", className)}
      style={fontSize ? { fontSize } : undefined}
      aria-label={text}
    >
      <style>{`
        @keyframes ${uid} {
          0% { font-variation-settings: "wght" ${minWeight}; }
          100% { font-variation-settings: "wght" ${maxWeight}; }
        }
      `}</style>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          data-letter
          aria-hidden="true"
          className="inline-block whitespace-pre"
          style={{
            animation: `${uid} ${animationDuration}s ease-in-out infinite alternate`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default AnimatedText;
