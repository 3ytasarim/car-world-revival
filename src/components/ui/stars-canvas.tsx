import { useEffect, useRef } from "react";

// Scattered twinkling stars, drawn on a <canvas> sized to its parent.
// Built from scratch — 21st.dev's designali-in/stars-canvas needed an API
// key this session doesn't have. Lightweight (no react-three-fiber): plain
// 2D canvas dots that fade in and out at random offsets/speeds.
export function StarsCanvas({ count = 90, className = "" }: { count?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let stars: { x: number; y: number; r: number; speed: number; phase: number }[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        speed: Math.random() * 0.015 + 0.005,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let frame: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const twinkle = reduceMotion ? 0.7 : 0.5 + 0.5 * Math.sin(t * star.speed * 10 + star.phase);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(0.15 + twinkle * 0.55).toFixed(3)})`;
        ctx.fill();
      }
      if (!reduceMotion) t += 1;
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [count]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />;
}
