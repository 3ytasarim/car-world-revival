import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { IPhoneMockup } from "@/components/ui/iphone-mockup";

// Design-Maße von IPhoneMockup model="15-pro" bei scale=1: w=393, bezel=12
// -> outerWidth = 393 + 12*2 = 417. Wird per ResizeObserver auf die
// tatsächliche Wrapper-Breite herunterskaliert (per `zoom`, nicht CSS
// `transform: scale`, damit Text/Inhalt scharf bleibt statt hochskaliert
// verschwommen zu wirken).
const PHONE_DESIGN_WIDTH = 417;

/** Fester, responsiver Telefon-Rahmen in Markenblau — Inhalt kommt als children. */
export function ResponsivePhoneMockup({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.72);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setScale(w / PHONE_DESIGN_WIDTH);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={cn("mx-auto w-[78%] max-w-[300px]", className)}>
      <IPhoneMockup
        model="15-pro"
        color="#5088C8"
        scale={scale}
        screenBg="#131F35"
        shadow="0 25px 50px -12px rgba(27,58,99,0.45), 0 8px 20px -8px rgba(27,58,99,0.35)"
        innerShadow={false}
        safeArea={false}
      >
        {children}
      </IPhoneMockup>
    </div>
  );
}

// Der Telefon-Rahmen selbst bleibt komplett fest (kein Fan/Rotate mehr) —
// nur der Inhalt IN der Screen-Fläche wechselt, per vertikalem Slide von
// unten nach oben (nicht horizontal).
export function PhoneVerticalCarousel({
  items,
  interval = 3800,
  className = "",
}: {
  items: ReactNode[];
  interval?: number;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);

  return (
    <div className={cn("relative size-full overflow-hidden", className)}>
      {items.map((item, i) => {
        const isActive = i === active;
        const isPrev = i === (active - 1 + items.length) % items.length;
        const isNext = i === (active + 1) % items.length;

        return (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-transform duration-700 ease-in-out",
              isActive && "translate-y-0",
              isPrev && "-translate-y-full",
              isNext && "translate-y-full",
              !isActive && !isPrev && !isNext && "translate-y-full",
            )}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default PhoneVerticalCarousel;
