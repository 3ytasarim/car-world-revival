// Vertical sweeping-gradient lines as a standalone background layer.
// Based on 21st.dev (minhxthanh/animated-background-lines).

// Lines are spaced evenly across the container width.
const LINE_COUNT = 11;
const LINE_POSITIONS = Array.from(
  { length: LINE_COUNT },
  (_, i) => `${((i + 1) / (LINE_COUNT + 1)) * 100}%`,
);

export function AnimatedBackgroundLines({
  className = "absolute inset-0",
  color = "#5088C8",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={className}>
      <style>{`
        @keyframes cw-line-move {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
      {LINE_POSITIONS.map((left, index) => (
        <div key={index} className="absolute h-full w-[60px] -translate-x-1/2" style={{ left }}>
          {/* Static faint track so the line reads as present even mid-fade */}
          <div className="absolute left-1/2 h-full w-px -translate-x-1/2" style={{ backgroundColor: `${color}33` }} />
          <div className="relative h-full w-1 overflow-hidden">
            <div
              className="absolute left-0 h-full w-full"
              style={{
                background: `linear-gradient(180deg, transparent 0%, ${color} 30%, ${color} 70%, transparent 100%)`,
                boxShadow: `0 0 12px 2px ${color}99`,
                animation: `cw-line-move 4s linear infinite ${index % 2 !== 0 ? "reverse" : "normal"}`,
                animationDelay: index % 2 !== 0 ? "2s" : "0s",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
