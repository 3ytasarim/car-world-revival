import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface VerticalTabItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href?: string;
}

interface VerticalTabsProps {
  items: VerticalTabItem[];
  eyebrow?: string;
  heading?: React.ReactNode;
  autoPlayDuration?: number;
  className?: string;
}

export function VerticalTabs({
  items,
  eyebrow = "Unsere Leistungen",
  heading,
  autoPlayDuration = 5000,
  className,
}: VerticalTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, autoPlayDuration);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext, autoPlayDuration]);

  const variants = {
    enter: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
    center: { zIndex: 1, y: 0, opacity: 1 },
    exit: (dir: number) => ({ zIndex: 0, y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  };

  const active = items[activeIndex]!;

  return (
    <div className={cn("mx-auto max-w-6xl px-4 sm:px-6", className)}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Links: Inhalt */}
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
              {heading ?? eyebrow}
            </h2>
            <span className="text-xs font-semibold tracking-widest text-muted-foreground">
              ({items.length})
            </span>
          </div>

          <div className="mt-6 max-h-[520px] overflow-y-auto pr-1">
            {items.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleTabClick(index)}
                  className={cn(
                    "group relative flex w-full items-start gap-4 border-t border-black/10 py-5 text-left transition-all duration-500 first:border-0",
                    isActive ? "text-foreground" : "text-muted-foreground/70 hover:text-foreground",
                  )}
                >
                  <span className="relative mt-2 block h-6 w-1 shrink-0 overflow-hidden rounded-full bg-black/5">
                    {isActive && (
                      <motion.span
                        layoutId="vt-indicator"
                        className="absolute inset-0 rounded-full bg-brand-orange"
                      />
                    )}
                  </span>

                  <span className="mt-1 shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                    /{service.id}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-xl font-semibold sm:text-2xl">{service.title}</span>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="block overflow-hidden"
                        >
                          <span className="mt-2 block max-w-md text-sm text-muted-foreground">
                            {service.description}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rechts: Bild */}
        <div
          className="relative h-[340px] overflow-hidden rounded-3xl border border-black/10 shadow-xl sm:h-[460px] lg:h-[560px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={active.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ y: { type: "spring", stiffness: 220, damping: 30 }, opacity: { duration: 0.3 } }}
              className="absolute inset-0"
            >
              <img
                src={active.image}
                alt={active.title}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <span className="absolute inset-0 bg-linear-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-2xl font-bold">{active.title}</p>
                <p className="mt-1 max-w-md text-sm text-white/85">{active.description}</p>
                {active.href && (
                  <a
                    href={active.href}
                    className="mt-4 inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-brand-navy transition-transform hover:scale-[1.03]"
                  >
                    Termin anfragen
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute right-4 top-4 z-10 flex gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Zurück"
              className="flex size-10 items-center justify-center rounded-full border border-white/40 bg-white/80 text-brand-navy backdrop-blur-md transition-all hover:bg-white active:scale-90 md:size-12"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Weiter"
              className="flex size-10 items-center justify-center rounded-full border border-white/40 bg-white/80 text-brand-navy backdrop-blur-md transition-all hover:bg-white active:scale-90 md:size-12"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerticalTabs;
