import * as React from "react";
import { GrainGradient } from "@paper-design/shaders-react";

interface GrainHeroBgProps {
  height?: number;
  className?: string;
}

/**
 * Animierter Grain-Gradient-Verlauf am unteren Rand des Heros – in Markenfarben
 * (Navy → Blau → Orange-Akzent).
 */
export function GrainHeroBg({ height = 320, className }: GrainHeroBgProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden ${className ?? ""}`}
      style={{ height }}
    >
      {mounted ? (
        <GrainGradient
          style={{ width: "100%", height: "100%" }}
          colorBack="#ffffff"
          softness={0.85}
          intensity={0.4}
          noise={0.28}
          shape="corners"
          offsetX={0}
          offsetY={0}
          scale={1}
          rotation={0}
          speed={1}
          colors={["#131f35", "#5088c8", "#7fb0e0", "#f08a24"]}
        />
      ) : null}
      {/* Weicher Übergang zum weißen Hero-Hintergrund */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white to-transparent" />
    </div>
  );
}

export default GrainHeroBg;
