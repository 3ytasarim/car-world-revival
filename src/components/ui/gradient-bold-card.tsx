import type { ReactNode } from "react";

// Adapted from 21st.dev (ruixen.ui/gradient-bold-card) — the original ships
// a fixed-size empty demo card with no content slot. This takes real
// children instead, in the site's two-blue brand gradient.
//
// The colored blob has to show through a gap around the content panel (not
// sit fully behind it) or it's invisible — the outer wrapper's padding is
// that gap. It travels on a true circular `offset-path` (not a translate
// between 4 corners) so it reads as one smooth orbit, not a square with
// sharp direction changes at the corners.
export function GradientBoldCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative h-full overflow-hidden rounded-2xl p-[3px] shadow-[10px_10px_30px_rgba(19,31,53,0.1),-10px_-10px_30px_#ffffff] ${className}`}
    >
      <style>{`
        @keyframes gbc-orbit {
          from { offset-distance: 0%; }
          to   { offset-distance: 100%; }
        }
        .gbc-blob {
          offset-path: circle(50% at 50% 50%);
          offset-rotate: 0deg;
          animation: gbc-orbit 5s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .gbc-blob { animation: none; }
        }
      `}</style>

      <div
        className="gbc-blob absolute top-0 left-0 z-0 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90 blur-[16px]"
        style={{ background: "linear-gradient(135deg, #1B3A63, #8FB8E8)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col rounded-[13px] bg-white/95 p-6">{children}</div>
    </div>
  );
}
