// Continuous left-to-right 3D rotation ("wie die Erde dreht sich") — a
// `perspective` wrapper plus `rotateY` on the image itself, so it
// foreshortens through the turn like a spinning globe instead of just
// flatly spinning in 2D.
export function SpinningLogo({
  src,
  alt,
  className = "",
  duration = 6,
}: {
  src: string;
  alt: string;
  className?: string;
  duration?: number;
}) {
  return (
    <span className={`inline-block [perspective:800px] ${className}`}>
      <style>{`
        /* A flat image rotated in 3D goes edge-on (and unreadable) near
           90°/270° — unlike a real globe, which always shows *some*
           texture because it's an actual sphere. So this rests flat and
           legible most of the cycle and only briefly flips through the
           unreadable angles, instead of spinning at constant speed. */
        @keyframes cw-logo-globe-spin {
          0%, 42%   { transform: rotateY(0deg); }
          50%       { transform: rotateY(180deg); }
          58%, 100% { transform: rotateY(360deg); }
        }
        .cw-logo-globe {
          animation: cw-logo-globe-spin ${duration}s ease-in-out infinite;
          transform-style: preserve-3d;
          backface-visibility: visible;
        }
        @media (prefers-reduced-motion: reduce) {
          .cw-logo-globe { animation: none; }
        }
      `}</style>
      <img src={src} alt={alt} className="cw-logo-globe h-full w-auto object-contain" />
    </span>
  );
}

export default SpinningLogo;
