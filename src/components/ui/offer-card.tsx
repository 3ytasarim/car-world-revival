// Offer card with a cursor-driven 3D tilt (rotateX/rotateY set via direct style
// updates, no React state) and per-element translateZ depth. The image slot uses
// object-contain so flyer text near the edges is not cropped.
// Based on 21st.dev (n38693842/3d-card).
import { useRef } from "react";

import { cn } from "@/lib/utils";
import { Button3D } from "@/components/ui/button-3d";

interface OfferCardProps {
  image?: string | null;
  imageAlt?: string;
  title: string;
  description: string;
  priceLabel?: string | null;
  whatsappHref: string;
  whatsappLabel: string;
  className?: string;
}

export function OfferCard({
  image,
  imageAlt = "",
  title,
  description,
  priceLabel,
  whatsappHref,
  whatsappLabel,
  className,
}: OfferCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y - height / 2) / height) * 10;
    const rotateY = ((x - width / 2) / width) * -10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div className="h-full w-full" style={{ perspective: "1200px" }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-lg transition-transform duration-300 ease-out hover:shadow-2xl",
          className,
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Bildbereich: groß und ungecropped, damit Angebots-Flyer komplett lesbar bleiben */}
        <div className="relative h-64 w-full bg-[#EAF2FA] px-4 pt-4 sm:h-72" style={{ transform: "translateZ(60px)" }}>
          <div className="relative size-full overflow-hidden rounded-2xl">
            {image ? (
              <img src={image} alt={imageAlt} loading="lazy" className="absolute inset-0 size-full object-contain" />
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(135deg,_#5088C8_0%,_#1B3A63_100%)]" />
            )}
          </div>
        </div>

        {/* Inhalt */}
        <div className="flex flex-1 flex-col gap-3 p-6 pt-5">
          <h3
            className="line-clamp-2 h-14 text-xl font-bold text-[#1B3A63]"
            style={{ transform: "translateZ(40px)" }}
          >
            {title}
          </h3>

          <p
            className="line-clamp-3 h-[4.3rem] text-sm leading-relaxed text-slate-600"
            style={{ transform: "translateZ(30px)" }}
          >
            {description}
          </p>

          <p
            className={cn(
              "h-7 text-center text-lg font-bold text-brand-orange",
              !priceLabel && "invisible",
            )}
            style={{ transform: "translateZ(45px)" }}
          >
            {priceLabel || "—"}
          </p>

          <Button3D
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            className="w-full"
            style={{ transform: "translateZ(50px)" }}
          >
            {whatsappLabel}
          </Button3D>
        </div>
      </div>
    </div>
  );
}

export default OfferCard;
