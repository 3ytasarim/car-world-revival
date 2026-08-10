// Adapted from 21st.dev (0xUrvish/feature-carousel). The original ships
// hardcoded demo content (Unsplash stock photos, Hugeicons) — this takes the
// real Leistungen data as props instead, uses the project's own
// framer-motion (not the separate `motion` package) and lucide-react icons
// (not @hugeicons) to match the rest of the codebase, and recolors the
// accent panel to the site's blue.
import { useState, useEffect, useCallback, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FeatureCarouselItem {
  id: string;
  label: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  image: string;
  description: string;
}

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel({
  features,
  accentColor = "#3A6DA8",
}: {
  features: FeatureCarouselItem[];
  accentColor?: string;
}) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = ((step % features.length) + features.length) % features.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = features.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="mx-auto w-full max-w-[100rem] md:p-8">
      <div className="border-border/40 relative flex min-h-[600px] flex-col overflow-hidden rounded-[2.5rem] border lg:aspect-video lg:flex-row lg:rounded-[4rem]">
        <div
          className="relative z-30 flex min-h-[350px] w-full flex-col items-start justify-center overflow-hidden px-8 md:min-h-[450px] md:px-16 lg:h-full lg:w-[40%] lg:pl-16"
          style={{ backgroundColor: accentColor }}
        >
          <div
            className="absolute inset-x-0 top-0 z-40 h-12 md:h-20 lg:h-16"
            style={{ background: `linear-gradient(to bottom, ${accentColor}, ${accentColor}CC, transparent)` }}
          />
          <div
            className="absolute inset-x-0 bottom-0 z-40 h-12 md:h-20 lg:h-16"
            style={{ background: `linear-gradient(to top, ${accentColor}, ${accentColor}CC, transparent)` }}
          />
          <div className="relative z-20 flex h-full w-full items-center justify-center lg:justify-start">
            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(-(features.length / 2), features.length / 2, distance);

              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: Math.max(0.55, 1 - Math.abs(wrappedDistance) * 0.15),
                  }}
                  transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "group relative flex items-center gap-4 rounded-full border px-6 py-3.5 text-left transition-all duration-700 md:px-10 md:py-5 lg:px-8 lg:py-4",
                      isActive
                        ? "z-10 border-white bg-white shadow-lg"
                        : "border-white/50 bg-white/10 text-white hover:border-white hover:bg-white/20",
                    )}
                    style={isActive ? { color: accentColor } : undefined}
                  >
                    <div
                      className={cn("flex items-center justify-center transition-colors duration-500", !isActive && "text-white")}
                      style={isActive ? { color: accentColor } : undefined}
                    >
                      <feature.icon size={18} strokeWidth={2} />
                    </div>

                    <span className="text-sm font-bold tracking-tight whitespace-nowrap uppercase drop-shadow-sm md:text-[15px]">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="bg-secondary/30 border-border/20 relative flex min-h-[500px] flex-1 items-center justify-center overflow-hidden border-t px-6 py-16 md:min-h-[600px] md:px-12 md:py-24 lg:h-full lg:border-t-0 lg:border-l lg:px-10 lg:py-16">
          <div className="relative flex aspect-[4/5] w-full max-w-[420px] items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                  className="border-background bg-background absolute inset-0 origin-center overflow-hidden rounded-[2rem] border-4 md:rounded-[2.8rem] md:border-8"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    loading="lazy"
                    className={cn(
                      "h-full w-full object-cover transition-all duration-700",
                      isActive ? "grayscale-0 blur-0" : "grayscale blur-[2px] brightness-75",
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 pt-32"
                      >
                        <div className="bg-background text-foreground border-border/50 mb-3 w-fit rounded-full border px-4 py-1.5 text-[11px] font-normal tracking-[0.2em] uppercase shadow-lg">
                          {String(index + 1).padStart(2, "0")} • {feature.label}
                        </div>
                        <p className="text-xl leading-tight font-semibold tracking-tight text-white drop-shadow-md md:text-2xl">
                          {feature.description}
                        </p>
                        <a
                          href="/termin"
                          className="pointer-events-auto mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold tracking-tight transition-transform hover:scale-[1.03]"
                          style={{ color: accentColor }}
                        >
                          Termin anfragen
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
