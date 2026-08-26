import { cn } from "@/lib/utils";
import { Button3D } from "@/components/ui/button-3d";

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

export default ProfileCard;
