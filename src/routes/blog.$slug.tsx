import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Newspaper, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { FloatingActions } from "@/components/site/FloatingActions";
import { PageHero } from "@/components/site/PageHero";
import { Button3D } from "@/components/ui/button-3d";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { PHONE_HREF, WA_FRAGE } from "@/components/site/site-data";
import { getBlogPostBySlug } from "@/lib/public-content.functions";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [{ name: "robots", content: "index,follow" }],
  }),
  component: BlogPostPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

// URLs im freien Admin-Text automatisch verlinken — ermöglicht Backlinks und
// interne Links direkt im Beitrag, ohne eigenen Rich-Text-Editor.
// Split-Pattern (global) und Test-Pattern (nicht global) bewusst getrennt:
// ein globales Regex trägt zustandsbehafteten `lastIndex` zwischen
// `.test()`-Aufrufen weiter und würde bei mehreren URLs im selben Absatz
// abwechselnd falsche Treffer liefern.
const URL_SPLIT_PATTERN = /(https?:\/\/[^\s]+)/g;
const URL_TEST_PATTERN = /^https?:\/\//;

function linkifyParagraph(text: string): ReactNode[] {
  return text.split(URL_SPLIT_PATTERN).map((part, i) =>
    URL_TEST_PATTERN.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-orange underline underline-offset-2 hover:text-brand-orange/80"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function BlogContentBody({ content }: { content: string }) {
  const paragraphs = content.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  return (
    <div className="space-y-4 leading-relaxed text-muted-foreground">
      {paragraphs.map((p, i) => (
        <p key={i} className="whitespace-pre-line">
          {linkifyParagraph(p)}
        </p>
      ))}
    </div>
  );
}

function BlogPostPage() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => getBlogPostBySlug({ data: { slug } }),
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
        {data === null && !isLoading ? (
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
        ) : (
          <>
            <PageHero
              badge={
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/15 px-4 py-1.5 text-xs font-semibold text-brand-orange">
                  <Newspaper className="size-4" aria-hidden="true" />
                  Blog
                </span>
              }
              title={data?.title ?? "…"}
              subtitle={data ? formatDate(data.created_at) : ""}
              photoBackground
            />

            <section className="relative bg-white py-16 sm:py-20">
              <div className="mx-auto max-w-3xl px-4 sm:px-6">
                {data?.cover_image_url && (
                  <img
                    src={data.cover_image_url}
                    alt={data.title}
                    className="mb-8 aspect-16/9 w-full rounded-2xl object-cover"
                  />
                )}
                {data && <BlogContentBody content={data.content} />}

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
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
      <FloatingActions />
      <MobileBar />
    </div>
  );
}
