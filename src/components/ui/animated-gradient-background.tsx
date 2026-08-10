import React, { useEffect, useRef } from "react";

interface AnimatedGradientBackgroundProps {
  startingGap?: number;
  Breathing?: boolean;
  gradientColors?: string[];
  gradientStops?: number[];
  animationSpeed?: number;
  breathingRange?: number;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  topOffset?: number;
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
  startingGap = 125,
  Breathing = false,
  gradientColors = ["#0A0A0A", "#2979FF", "#FF80AB", "#FF6D00", "#FFD600", "#00E676", "#3D5AFE"],
  gradientStops = [35, 50, 60, 70, 80, 90, 100],
  animationSpeed = 0.02,
  breathingRange = 5,
  containerStyle = {},
  topOffset = 0,
  containerClassName = "",
}) => {
  if (gradientColors.length !== gradientStops.length) {
    throw new Error("GradientColors and GradientStops must have the same length.");
  }

  const containerRef = useRef<HTMLDivElement>(null);

  // Computed up front (not just inside the RAF loop below) so the gradient is
  // already present in the very first paint/SSR markup — otherwise the div
  // renders with no background until the effect's first animation frame
  // runs, which reads as a white flash before it "turns" blue.
  const initialGradientStopsString = gradientStops
    .map((stop, index) => `${gradientColors[index]} ${stop}%`)
    .join(", ");
  const initialGradient = `radial-gradient(${startingGap}% ${startingGap + topOffset}% at 50% 20%, ${initialGradientStopsString})`;

  useEffect(() => {
    let animationFrame: number;
    let width = startingGap;
    let directionWidth = 1;

    const animateGradient = () => {
      if (width >= startingGap + breathingRange) directionWidth = -1;
      if (width <= startingGap - breathingRange) directionWidth = 1;
      if (!Breathing) directionWidth = 0;
      width += directionWidth * animationSpeed;

      const gradientStopsString = gradientStops
        .map((stop, index) => `${gradientColors[index]} ${stop}%`)
        .join(", ");

      const gradient = `radial-gradient(${width}% ${width + topOffset}% at 50% 20%, ${gradientStopsString})`;

      if (containerRef.current) {
        containerRef.current.style.background = gradient;
      }

      animationFrame = requestAnimationFrame(animateGradient);
    };

    animationFrame = requestAnimationFrame(animateGradient);
    return () => cancelAnimationFrame(animationFrame);
  }, [startingGap, Breathing, gradientColors, gradientStops, animationSpeed, breathingRange, topOffset]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${containerClassName}`}>
      <div
        ref={containerRef}
        style={{ background: initialGradient, ...containerStyle }}
        className="absolute inset-0"
      />
    </div>
  );
};

export default AnimatedGradientBackground;
