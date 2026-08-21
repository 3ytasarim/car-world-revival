import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button3D } from "@/components/ui/button-3d";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// Adapted from 21st.dev (arunachalam/profile-card) — the original is a
// "team member" bio card (name/title/description + social icon row,
// next/image + next/link). Ported off Next.js to plain <img>/<a>, and the
// social icon row is swapped for a single "Termin anfragen" CTA to match
// the site's service-card use case.
export interface ProfileCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
}

export function ProfileCard(props: ProfileCardProps) {
  const {
    title = "",
    description = "",
    imageUrl = "",
    ctaHref = "/termin",
    ctaLabel = "Termin anfragen",
    className,
  } = props;

  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4", className)}>
      {/* Desktop */}
      <div className="relative hidden items-center justify-center md:flex">
        <div className="flex h-[400px] w-[400px] shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-brand-surface">
          <img src={imageUrl} alt="" draggable={false} className="size-full object-cover" loading="lazy" />
        </div>
        <div className="z-10 ml-[-56px] max-w-2xl flex-1 rounded-3xl bg-white p-9 shadow-2xl">
          <h3 className="mb-3 text-3xl font-bold text-brand-navy">{title}</h3>
          <p className="mb-7 text-lg leading-relaxed text-muted-foreground">{description}</p>
          <Button3D href={ctaHref}>{ctaLabel}</Button3D>
        </div>
      </div>

      {/* Mobile */}
      <div className="mx-auto max-w-sm text-center md:hidden">
        <div className="mb-6 aspect-square overflow-hidden rounded-3xl bg-brand-surface">
          <img src={imageUrl} alt="" draggable={false} className="size-full object-cover" loading="lazy" />
        </div>
        <div className="px-2">
          <h3 className="mb-2 text-lg font-bold text-brand-navy">{title}</h3>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{description}</p>
          <Button3D href={ctaHref} className="w-full">
            {ctaLabel}
          </Button3D>
        </div>
      </div>
    </div>
  );
}

// One slide visible at a time, auto-advancing. Built on the same
// embla-carousel-react primitives as Gallery4 (already proven working in
// this codebase) instead of a hand-rolled index/AnimatePresence state
// machine — an earlier version of that hand-rolled approach had a bug
// where the dot indicator advanced but the card content stayed frozen on
// the first slide; embla owns the actual slide position, so there's no
// separate index state that can drift out of sync with what's rendered.
export function ProfileCardCarousel({
  items,
  interval = 6000,
  className,
}: {
  items: ProfileCardProps[];
  interval?: number;
  className?: string;
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setCurrentSlide(carouselApi.selectedScrollSnap());
    onSelect();
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi || paused || items.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (carouselApi.canScrollNext()) carouselApi.scrollNext();
      else carouselApi.scrollTo(0);
    }, interval);
    return () => clearInterval(t);
  }, [carouselApi, paused, items.length, interval]);

  return (
    <div
      className={cn("mx-auto w-full max-w-7xl", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Carousel setApi={setCarouselApi} opts={{ loop: true }}>
        <CarouselContent className="ml-0">
          {items.map((item, i) => (
            <CarouselItem key={i} className="basis-full pl-0">
              <ProfileCard {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Vorherige Leistung"
          onClick={() => carouselApi?.scrollPrev()}
          className="flex size-10 items-center justify-center rounded-full border border-black/10 bg-white text-brand-navy shadow-md transition-transform hover:scale-105"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Leistung ${i + 1}`}
              aria-current={i === currentSlide}
              onClick={() => carouselApi?.scrollTo(i)}
              className={cn(
                "size-2 rounded-full transition-all",
                i === currentSlide ? "w-6 bg-brand-navy" : "bg-brand-navy/25 hover:bg-brand-navy/40",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Nächste Leistung"
          onClick={() => carouselApi?.scrollNext()}
          className="flex size-10 items-center justify-center rounded-full border border-black/10 bg-white text-brand-navy shadow-md transition-transform hover:scale-105"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
