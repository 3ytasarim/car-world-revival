import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Newspaper, Phone, Tag as TagIcon } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { Button3D } from "@/components/ui/button-3d";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { PHONE_HREF, WA_FRAGE } from "@/components/site/site-data";
import { getBlogPostBySlug, getLatestBlogPosts } from "@/lib/public-content.functions";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

const SITE_NAME = "Car-World";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getBlogPostBySlug({ data: { slug: params.slug } });
    const latest = post
      ? await getLatestBlogPosts({ data: { limit: 5, excludeSlug: params.slug } })
      : [];
    return { post, latest };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return { meta: [{ title: `Beitrag nicht gefunden | ${SITE_NAME}` }, { name: "robots", content: "noindex" }] };
    }
    const title = post.seo_title || post.title;
    const description = post.seo_description || post.excerpt || undefined;
    return {
      meta: [
        { title: `${title} | ${SITE_NAME}` },
        ...(description ? [{ name: "description", content: description }] : []),
        { property: "og:title", content: title },
        ...(description ? [{ property: "og:description", content: description }] : []),
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${post.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        ...(post.cover_image_url ? [{ property: "og:image", content: post.cover_image_url }] : []),
        { name: "robots", content: "index,follow" },
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
    };
  },
  component: BlogPostPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

function LatestPostsSidebar({
  latest,
}: {
  latest: { id: string; slug: string; title: string; cover_image_url: string | null; created_at: string }[];
}) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(19,31,53,0.3)]">
        <h2 className="flex items-center gap-2 text-base font-bold text-brand-navy">
          <Newspaper className="size-4 text-brand-orange" aria-hidden="true" />
          Neueste Beiträge
        </h2>
        {latest.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Weitere Beiträge folgen in Kürze.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {latest.map((p) => (
              <li key={p.id}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="group flex items-start gap-3">
                  {p.cover_image_url ? (
                    <img
                      src={p.cover_image_url}
                      alt=""
                      aria-hidden="true"
                      className="size-14 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-brand-orange/10 text-brand-orange">
                      <Newspaper className="size-5" aria-hidden="true" />
                    </span>
                  )}
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold text-brand-navy group-hover:text-brand-orange">
                      {p.title}
                    </span>
                    <time dateTime={p.created_at} className="mt-1 block text-xs text-muted-foreground">
                      {formatDate(p.created_at)}
                    </time>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl bg-brand-navy p-5 text-center text-brand-navy-foreground">
        <h2 className="text-base font-bold">Fragen zu Ihrem Fahrzeug?</h2>
        <p className="mt-1 text-sm opacity-80">Wir sind schnell für Sie erreichbar.</p>
        <div className="mt-4 flex flex-col gap-2.5">
          <Button3D href={PHONE_HREF} className="w-full justify-center">
            <Phone className="size-4" aria-hidden="true" />
            Jetzt anrufen
          </Button3D>
          <Button3D href={WA_FRAGE} target="_blank" rel="noopener noreferrer" variant="whatsapp" className="w-full justify-center">
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </Button3D>
        </div>
      </div>
    </aside>
  );
}

function BlogPostPage() {
  const { post, latest } = Route.useLoaderData();

  if (!post) {
    return (
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          <section className="relative bg-white py-24 text-center">
            <div className="mx-auto max-w-xl px-4 sm:px-6">
              <h1 className="text-3xl font-bold tracking-tight text-brand-navy">Beitrag nicht gefunden</h1>
              <p className="mt-3 text-muted-foreground">
                Dieser Blogbeitrag existiert nicht oder ist nicht mehr verfügbar.
              </p>
              <Link
                to="/blog"
                className="mt-6 inline-flex items-center font-semibold text-brand-orange hover:text-brand-orange/80"
              >
                Zurück zum Blog
              </Link>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingActions />
        <MobileBar />
      </div>
    );
  }

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
          title={post.title}
          subtitle={formatDate(post.created_at)}
          photoBackground
        />

        <section className="relative bg-white py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_320px]">
            <div className="min-w-0 max-w-3xl">
              {post.cover_image_url && (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="mb-8 aspect-16/9 w-full rounded-2xl object-cover"
                />
              )}

              {post.tags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange"
                    >
                      <TagIcon className="size-3" aria-hidden="true" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Inhalt kommt aus dem Rich-Text-Editor im Admin-Panel (nur
                  Admins mit gültiger Session können ihn schreiben — gleiches
                  Vertrauensmodell wie bei Testimonials/Angeboten) und wird
                  hier direkt als HTML gerendert, mit Tailwind Typography
                  ("prose") für Überschriften/Listen/Zitate/Links. */}
              <div
                className="prose prose-slate max-w-none prose-headings:text-brand-navy prose-a:text-brand-orange"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-12 text-center">
                <h3 className="text-lg font-semibold text-brand-navy">Jetzt Kontakt aufnehmen</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  <Button3D href={PHONE_HREF}>
                    <Phone className="size-4" aria-hidden="true" />
                    Jetzt anrufen
                  </Button3D>
                  <Button3D href={WA_FRAGE} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                    <WhatsAppIcon className="size-4" />
                    WhatsApp
                  </Button3D>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-orange"
                >
                  <ArrowRight className="size-4 rotate-180" aria-hidden="true" />
                  Zurück zum Blog
                </Link>
              </div>
            </div>

            <LatestPostsSidebar latest={latest} />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
