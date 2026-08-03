import { useEffect, useRef, useState, type ReactNode } from "react";
import { Sparkles, Wrench } from "lucide-react";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const words = title.split(" ");

  return (
    <div ref={ref} className="relative">
      <span
        className="pointer-events-none absolute -top-16 left-1/2 size-72 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-orange), transparent 70%)" }}
        aria-hidden="true"
      />

      {eyebrow ? (
        <span
          className={`relative inline-flex items-center gap-2 rounded-full border border-brand-orange/25 bg-brand-orange/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-orange uppercase transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <Wrench className="size-3.5 animate-pulse" strokeWidth={2} aria-hidden="true" />
          {eyebrow}
          <Sparkles className="size-3.5" strokeWidth={2} aria-hidden="true" />
        </span>
      ) : null}

      <h2 className="relative mx-auto mt-4 w-fit text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        <span className="sr-only">{title}</span>
        <span aria-hidden="true" className="flex flex-wrap justify-center gap-x-3">
          {words.map((w, i) => (
            <span
              key={`${w}-${i}`}
              className={`inline-block bg-linear-to-b from-brand-navy to-brand-navy/75 bg-clip-text text-transparent transition-all duration-700 ease-out ${
                inView ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-sm"
              }`}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              {w}
            </span>
          ))}
        </span>
        <span
          className={`mx-auto mt-3 block h-[3px] rounded-full bg-linear-to-r from-transparent via-brand-orange to-transparent transition-all duration-1000 ease-out ${
            inView ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
          style={{ transitionDelay: `${words.length * 110}ms` }}
          aria-hidden="true"
        />
      </h2>

      {subtitle ? (
        <p
          className={`relative mt-3 text-xl font-semibold text-gray-700 transition-all duration-700 ease-out sm:text-2xl ${
            inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: `${words.length * 110 + 150}ms` }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
