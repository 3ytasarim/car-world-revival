import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TextAnimationProps = {
  words: string[];
  interval?: number;
  className?: string;
};

/**
 * Cycles through words with a per-character blur/slide transition.
 */
export function TextAnimation({ words, interval = 2800, className }: TextAnimationProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  const current = words[index] ?? "";
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={cn("relative inline-grid align-bottom", className)}>
      {/* invisible sizer keeps layout stable */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-pre-wrap">
        {longest}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          className="col-start-1 row-start-1 whitespace-pre-wrap"
          aria-label={current}
        >
          {current.split("").map((char, i) => (
            <motion.span
              key={`${current}-${i}`}
              className="inline-block"
              initial={{ opacity: 0, y: "0.35em", filter: "blur(6px)", rotateX: -60 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }}
              exit={{ opacity: 0, y: "-0.35em", filter: "blur(6px)", rotateX: 60 }}
              transition={{
                duration: 0.42,
                delay: i * 0.028,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default TextAnimation;
