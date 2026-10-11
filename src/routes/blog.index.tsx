import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Newspaper } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { getBlogPosts } from "@/lib/public-content.functions";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog | Car-World" },
      {
        name: "description",
        content: "Neuigkeiten, Tipps und Hintergründe von Car-World — Ihrer Kfz-Meisterwerkstatt in Bad Neuenahr-Ahrweiler.",
      },
      { property: "og:title", content: "Blog — Car-World" },
      { property: "og:description", content: "Neuigkeiten, Tipps und Hintergründe von Car-World." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndexPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

function BlogIndexPage() {
  const { data } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => getBlogPosts(),
  });

  return (
    <div className="relative flex min-h-screen flex-col">
      <AnimatedGradientBackground
        Breathing
        startingGap={120}
        breathingRange={12}
        animationSpeed={0.03}
        topOffset={20}
        gradientColors={["#FFFFFF", "#F7FBFE", "#EAF4FC", "#DCEDFA", "#C9E2F7", "#B4D5F1", "#9FC8EA"]}
        gradientStops={[20, 40, 55, 68, 80, 90, 100]}
        containerClassName="opacity-70"
      />
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <PageHero
          badge={
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/15 px-4 py-1.5 text-xs font-semibold text-brand-orange">
              <Newspaper className="size-4" aria-hidden="true" />
              Blog
            </span>
          }
          title="Car-World Blog"
          subtitle="Neuigkeiten, Tipps und Hintergründe rund um Ihre Autowerkstatt."
          photoBackground
        />

        <section className="relative bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            {data && data.length === 0 && (
              <p className="text-center text-muted-foreground">Demnächst finden Sie hier unsere ersten Beiträge.</p>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data?.map((post) => (
                <Link
                  key={post.id}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_-18px_rgba(19,31,53,0.3)] transition-shadow hover:shadow-[0_20px_45px_-20px_rgba(19,31,53,0.4)]"
                >
                  {post.cover_image_url && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <time dateTime={post.created_at} className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {formatDate(post.created_at)}
                    </time>
                    <h2 className="mt-2 text-lg font-bold text-brand-navy">{post.title}</h2>
                    {post.excerpt && <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>}
                    <span className="mt-4 flex items-center text-sm font-semibold text-brand-orange">
                      Weiterlesen
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
