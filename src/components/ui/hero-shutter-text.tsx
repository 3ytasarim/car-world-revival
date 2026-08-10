"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface HeroShutterTextProps {
  text: string;
  className?: string;
  /** delay before the shutter reveal starts */
  delay?: number;
}

/**
 * "Shutter" reveal: every character is composed of three horizontal slices
 * (top / middle / bottom) that snap into place from different directions,
 * like a camera shutter closing. After the animation the text stays solid.
 */
export default function HeroShutterText({
  text,
  className,
  delay = 0,
}: HeroShutterTextProps) {
  const characters = text.split("");

  const slices = [
    { clip: "inset(0 0 66.6% 0)", from: { y: "-60%", x: "-8%" } },
    { clip: "inset(33.3% 0 33.3% 0)", from: { y: "0%", x: "14%" } },
    { clip: "inset(66.6% 0 0 0)", from: { y: "60%", x: "-8%" } },
  ];

  return (
    <span className={cn("inline-flex whitespace-nowrap", className)}>
      {characters.map((char, i) => (
        <span key={`${char}-${i}`} className="relative inline-block">
          {/* invisible spacer keeps layout/metrics correct */}
          <span className="invisible">{char === " " ? "\u00A0" : char}</span>

          {slices.map((slice, s) => (
            <motion.span
              key={s}
              aria-hidden="true"
              className="absolute inset-0 inline-block bg-gradient-to-r from-[#0F2E52] via-[#2F5F9B] to-[#5088C8] bg-clip-text text-transparent"
              style={{ clipPath: slice.clip }}
              initial={{ opacity: 0, ...slice.from }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.55,
                delay: delay + i * 0.04 + s * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
