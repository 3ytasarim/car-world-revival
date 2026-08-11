import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// From 21st.dev (shadcnblockscom/gallery4), fetched via the registry with
// an API key. Uses the project's own shadcn Button/Carousel primitives
// (already present, so the fetched duplicates of those two files were
// skipped). Autoplay isn't part of the original block — added here since
// this is meant to run hands-off on the services section.
export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
  autoplayInterval?: number;
}

export function Gallery4({ title, description, items, autoplayInterval = 4500 }: Gallery4Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (carouselApi.canScrollNext()) carouselApi.scrollNext();
      else carouselApi.scrollTo(0);
    }, autoplayInterval);
    return () => clearInterval(t);
  }, [carouselApi, paused, autoplayInterval]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {(title || description) && (
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4">
            {title && <h3 className="text-2xl font-medium md:text-3xl">{title}</h3>}
            {description && <p className="max-w-lg text-muted-foreground">{description}</p>}
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      )}

      <Carousel setApi={setCarouselApi} opts={{ loop: true, breakpoints: { "(max-width: 768px)": { dragFree: true } } }}>
        <CarouselContent className="ml-0">
          {items.map((item) => (
            <CarouselItem key={item.id} className="max-w-[320px] pl-[20px] lg:max-w-[360px]">
              <a href={item.href} className="group block rounded-xl">
                <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 h-full bg-gradient-to-t from-brand-navy from-10% via-brand-navy/60 via-60% to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
                    <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">{item.title}</div>
                    <div className="mb-8 line-clamp-2 text-white/80 md:mb-12 lg:mb-9">{item.description}</div>
                    <div className="flex items-center text-sm font-semibold">
                      Termin anfragen
                      <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-8 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`h-2 w-2 rounded-full transition-colors ${
              currentSlide === index ? "bg-brand-navy" : "bg-brand-navy/25 hover:bg-brand-navy/40"
            }`}
            onClick={() => carouselApi?.scrollTo(index)}
            aria-label={`Zu Leistung ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery4;
