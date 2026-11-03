// Karışan görsel ızgarası — 21st.dev "Suffle Hero" (uniquesonu) davranışına
// göre: kareler her 3 sn'de rastgele yeniden dizilir, Framer Motion `layout`
// ile yaylı geçiş. (Registry kaynağı kimlik doğrulaması istediği için CLI ile
// kurulamadı; açıklamadaki davranıştan yeniden yazıldı. Başlık/CTA kısmı
// burada yok — Hero'nun kendi metin sütunu var.)
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export type ShuffleItem = { id: number; src: string; alt: string; label?: string };

function shuffle<T>(input: T[]): T[] {
  const array = [...input];
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex]!, array[currentIndex]!];
  }
  return array;
}

export function ShuffleGrid({
  items,
  intervalMs = 3000,
  columns = 3,
  fill = false,
}: {
  items: ShuffleItem[];
  intervalMs?: number;
  columns?: 3 | 4;
  /** true: füllt die Höhe des Elternelements statt quadratisch zu sein. */
  fill?: boolean;
}) {
  const [squares, setSquares] = useState(items);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = () => {
      setSquares((prev) => shuffle(prev));
      timeoutRef.current = setTimeout(tick, intervalMs);
    };
    timeoutRef.current = setTimeout(tick, intervalMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [intervalMs]);

  return (
    <div
      className={`grid w-full gap-2 ${fill ? "h-full" : "aspect-square"} ${columns === 4 ? "grid-cols-4 grid-rows-4" : "grid-cols-3 grid-rows-3"}`}
    >
      {squares.map((s) => (
        <motion.div
          key={s.id}
          layout
          transition={{ duration: 1.5, type: "spring" }}
          className="relative overflow-hidden rounded-xl shadow-[0_12px_30px_-16px_rgba(19,31,53,0.5)]"
        >
          <img src={s.src} alt={s.alt} loading="lazy" className="absolute inset-0 size-full object-cover" />
          {s.label && (
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pt-6 pb-1.5 text-[11px] font-semibold text-white xl:text-xs">
              {s.label}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default ShuffleGrid;
