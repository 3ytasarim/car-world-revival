import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { supabase } from "@/integrations/supabase/client";
import { WA_FRAGE } from "@/components/site/site-data";

export const Route = createFileRoute("/aktuelle-angebote")({
  head: () => ({
    meta: [
      { title: "Aktuelle Angebote — Car-World Autowerkstatt" },
      {
        name: "description",
        content:
          "Saisonale Angebote Ihrer Autowerkstatt in meiner Nähe: Reifenwechsel, Klimaservice, Inspektion, Frontscheibe und mehr.",
      },
      { property: "og:title", content: "Aktuelle Angebote — Car-World" },
      { property: "og:description", content: "Reifenwechsel, Klimaservice, Inspektion und mehr — jetzt anfragen." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/aktuelle-angebote" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/aktuelle-angebote" }],
  }),
  component: OffersPage,
});

function OffersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("offers")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="flex min-h-screen flex-col bg-brand-surface">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <section className="bg-brand-navy py-14 text-brand-navy-foreground">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/15 px-4 py-1.5 text-xs font-semibold text-brand-orange">
              <Tag className="size-4" aria-hidden="true" />
              Aktionen
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Aktuelle Angebote</h1>
            <p className="mt-3 opacity-80">Kurz anfragen, schnell erledigt — direkt per WhatsApp.</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-52 animate-pulse rounded-2xl bg-white" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data?.map((offer) => (
                <article
                  key={offer.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-xl"
                >
                  {offer.badge && (
                    <span className="absolute top-4 right-4 rounded-full bg-brand-orange px-3 py-1 text-[11px] font-bold text-brand-orange-foreground">
                      {offer.badge}
                    </span>
                  )}
                  <h2 className="pr-16 text-lg font-semibold">{offer.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{offer.description}</p>
                  {offer.price_label && (
                    <p className="mt-4 text-2xl font-bold text-brand-orange">{offer.price_label}</p>
                  )}
                  <a
                    href={`https://wa.me/4926413969555?text=${encodeURIComponent(
                      `Hallo Car-World, ich interessiere mich für das Angebot: ${offer.title}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-brand-navy-foreground transition-transform hover:scale-[1.02]"
                  >
                    {offer.cta_label}
                  </a>
                </article>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <a
              href={WA_FRAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand-orange px-7 text-sm font-semibold text-brand-orange-foreground"
            >
              Angebot nicht dabei? Schreiben Sie uns
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
