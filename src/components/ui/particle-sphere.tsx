"use client";

import { useEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

// Rotating particle sphere with depth/rim shading in the site's navy/blue palette.
// Based on ParticleSphereAnimation from 21st.dev (shadcnspace/orbiting-circles-02).
// The particle count is kept low to limit per-frame canvas work.
const PARTICLE_COUNT = 1800;
const RADIUS = 275;

const COLORS = ["#0B1626", "#1B3A63", "#2F6FB5", "#5088C8", "#8FB8E8", "#DCEDFA", "#3B6FA0", "#A9CCEC", "#F4F7FB"];

function generateSpherePoints(count: number) {
  const points = [];

  for (let i = 0; i < count; i++) {
    const z = Math.random() * 2 - 1;
    const theta = Math.random() * 2 * Math.PI;
    const r_at_z = Math.sqrt(1 - z * z);
    const r = RADIUS * (0.97 + Math.random() * 0.06);

    const x = r * r_at_z * Math.cos(theta);
    const y = r * r_at_z * Math.sin(theta);
    const point_z = r * z;

    let colorIndex;
    const yFactor = (y + RADIUS) / (2 * RADIUS);

    if (Math.random() > 0.9) {
      colorIndex = 7;
    } else if (yFactor > 0.6) {
      colorIndex = Math.floor(Math.random() * 3);
    } else if (yFactor < 0.4) {
      colorIndex = 3 + Math.floor(Math.random() * 3);
    } else {
      colorIndex = Math.floor(Math.random() * COLORS.length);
    }

    points.push({ x, y, z: point_z, color: COLORS[colorIndex] });
  }

  return points;
}

export default function ParticleSphereAnimation({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useMemo(() => generateSpherePoints(PARTICLE_COUNT), []);
  const rotationRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: false });
    if (!ctx) return;

    const size = 575;
    canvas.width = size;
    canvas.height = size;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      rotationRef.current += 0.003;

      ctx.save();
      ctx.translate(size / 2, size / 2);

      const rotatedPoints = points.map((p) => {
        const cos = Math.cos(rotationRef.current);
        const sin = Math.sin(rotationRef.current);

        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;

        const scale = (z + RADIUS) / (2 * RADIUS);

        const distFromCenter = Math.sqrt(x * x + p.y * p.y);
        const rimFactor = Math.min(distFromCenter / RADIUS, 1);

        const opacity = Math.max(0.35, Math.pow(rimFactor, 3) * 0.95) * (0.6 + 0.4 * scale);
        const pointSize = (0.6 + 0.9 * scale) * 2.4;

        return { x, y: p.y, z, color: p.color, opacity, size: pointSize };
      });

      rotatedPoints.sort((a, b) => a.z - b.z);

      rotatedPoints.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color as string;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [points]);

  return (
    <div className={cn("mx-auto w-full", className)}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none mx-auto h-auto w-full max-w-[575px] rounded-full select-none"
        width={575}
        height={575}
      />
    </div>
  );
}
