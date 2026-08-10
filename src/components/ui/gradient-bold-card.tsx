import type { ReactNode } from "react";

// Adapted from 21st.dev (ruixen.ui/gradient-bold-card) — the original ships
// a fixed-size empty demo card with no content slot. This takes real
// children instead, in the site's two-blue brand gradient.
//
// The outer wrapper provides a permanent dark-blue frame. A much larger
// conic-gradient layer rotates behind the content, so the highlight travels
// continuously without the border ever disappearing.
export function GradientBoldCard({
  children,
  className = "",
  contentClassName = "rounded-[13px] bg-white/95 p-6",
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div
      className={`relative h-full overflow-hidden rounded-2xl bg-brand-navy p-[4px] shadow-[0_20px_55px_-24px_rgba(19,31,53,0.65)] ${className}`}
    >
      <style>{`
        @keyframes gbc-frame-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .gbc-frame-glow {
          animation: gbc-frame-rotate 14s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .gbc-frame-glow { animation: none; }
        }
      `}</style>

      <div
        className="gbc-frame-glow absolute -inset-[75%] z-0 opacity-100"
        style={{
          background:
            "conic-gradient(from 0deg, #131F35 0deg, #1B3A63 70deg, #8FB8E8 125deg, #5088C8 175deg, #1B3A63 235deg, #A9CCF2 285deg, #131F35 360deg)",
        }}
        aria-hidden="true"
      />

      <div className={`relative z-10 flex h-full flex-col ${contentClassName}`}>{children}</div>
    </div>
  );
}
