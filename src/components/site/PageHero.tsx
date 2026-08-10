import type { ReactNode } from "react";

import { FloatingIcons } from "@/components/site/FloatingIcons";
import { GLSLHills } from "@/components/glsl-hills";
import { GradientShimmer } from "@/components/ui/gradient-shimmer";

export function PageHero({
  badge,
  title,
  subtitle,
}: {
  badge: ReactNode;
  title: string;
  subtitle: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden text-brand-navy">
      {/* No own background here — the page-wide AnimatedGradientBackground
          (rendered once by the route's root wrapper) shows through behind
          this section, same as on the homepage. A second instance here
          would double up and create a visible seam where the hero ends. */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <GLSLHills />
      </div>
      <FloatingIcons />
      <div className="relative mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6">
        {badge}
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          <GradientShimmer gradient="bay" duration={2}>
            {title}
          </GradientShimmer>
        </h1>
        <p className="mt-3 text-brand-navy/70">{subtitle}</p>
      </div>
    </section>
  );
}
