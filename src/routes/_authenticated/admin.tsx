import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Briefcase, Handshake, Images, LogOut, Plus, Search, Tag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Offer = Database["public"]["Tables"]["offers"]["Row"];
type Job = Database["public"]["Tables"]["job_openings"]["Row"];
type Seo = Database["public"]["Tables"]["seo_settings"]["Row"];

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Adminbereich — Car-World Verwaltung" },
      { name: "description", content: "Angebote, Stellenanzeigen, SEO und Anfragen von Car-World verwalten." },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Adminbereich — Car-World" },
      { property: "og:description", content: "Interne Verwaltung von Angeboten, Stellen und SEO." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return setIsAdmin(false);
      const { data } = await supabase.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
      setIsAdmin(Boolean(data));
    })();
  }, []);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isAdmin === null) {
    return <div className="grid min-h-screen place-items-center bg-brand-surface text-sm">Wird geladen…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-brand-surface px-4 text-center">
        <div className="max-w-md rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="text-xl font-bold">Kein Zugriff</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ihr Konto hat keine Adminrechte. Bitte wenden Sie sich an die Geschäftsleitung.
          </p>
          <Button onClick={signOut} variant="outline" className="mt-6">
            Abmelden
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-surface">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-brand-navy text-brand-navy-foreground">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-orange">Car-World</p>
            <h1 className="text-lg font-bold">Verwaltung</h1>
          </div>
          <Button onClick={signOut} variant="secondary" size="sm" className="gap-2">
            <LogOut className="size-4" aria-hidden="true" />
            Abmelden
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Tabs defaultValue="offers">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
            <TabsTrigger value="offers" className="gap-2">
              <Tag className="size-4" aria-hidden="true" /> Angebote
            </TabsTrigger>
            <TabsTrigger value="jobs" className="gap-2">
              <Briefcase className="size-4" aria-hidden="true" /> Stellen
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2">
              <Search className="size-4" aria-hidden="true" /> SEO
            </TabsTrigger>
            <TabsTrigger value="quotes" className="gap-2">
              <Images className="size-4" aria-hidden="true" /> Anfragen
            </TabsTrigger>
            <TabsTrigger value="partners" className="gap-2">
              <Handshake className="size-4" aria-hidden="true" /> Partner
            </TabsTrigger>
          </TabsList>

          <TabsContent value="offers" className="mt-6">
            <OffersTab />
          </TabsContent>
          <TabsContent value="jobs" className="mt-6">
            <JobsTab />
          </TabsContent>
          <TabsContent value="seo" className="mt-6">
            <SeoTab />
          </TabsContent>
          <TabsContent value="quotes" className="mt-6">
            <QuotesTab />
          </TabsContent>
          <TabsContent value="partners" className="mt-6">
            <PartnersTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">{children}</div>;
}

/* ---------------- Angebote ---------------- */

function OffersTab() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-offers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("offers").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async (offer: Partial<Offer> & { id: string }) => {
      const { id, ...rest } = offer;
      const { error } = await supabase.from("offers").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Angebot gespeichert");
      qc.invalidateQueries({ queryKey: ["admin-offers"] });
      qc.invalidateQueries({ queryKey: ["offers"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("offers")
        .insert({ title: "Neues Angebot", sort_order: (data?.length ?? 0) + 1, is_active: false });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-offers"] });
      toast.success("Angebot angelegt");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("offers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-offers"] });
      toast.success("Angebot gelöscht");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const activeCount = data?.filter((o) => o.is_active).length ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {activeCount} aktive Angebote (empfohlen: 6–9 gleichzeitig)
        </p>
        <Button onClick={() => create.mutate()} className="gap-2">
          <Plus className="size-4" aria-hidden="true" /> Angebot hinzufügen
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {data?.map((offer) => (
          <Card key={offer.id}>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                save.mutate({
                  id: offer.id,
                  title: String(fd.get("title")),
                  description: String(fd.get("description")),
                  price_label: String(fd.get("price_label")),
                  badge: String(fd.get("badge")),
                  cta_label: String(fd.get("cta_label")),
                  sort_order: Number(fd.get("sort_order")),
                  is_active: fd.get("is_active") === "on",
                });
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <Input name="title" defaultValue={offer.title} className="font-semibold" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Angebot löschen"
                  onClick={() => remove.mutate(offer.id)}
                >
                  <Trash2 className="size-4 text-destructive" aria-hidden="true" />
                </Button>
              </div>
              <Textarea name="description" defaultValue={offer.description} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Preis</Label>
                  <Input name="price_label" defaultValue={offer.price_label ?? ""} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Badge</Label>
                  <Input name="badge" defaultValue={offer.badge ?? ""} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Button-Text</Label>
                  <Input name="cta_label" defaultValue={offer.cta_label} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Reihenfolge</Label>
                  <Input name="sort_order" type="number" defaultValue={offer.sort_order} />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-sm">
                  <Switch name="is_active" defaultChecked={offer.is_active} />
                  Aktiv
                </label>
                <Button type="submit" size="sm">
                  Speichern
                </Button>
              </div>
            </form>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Stellen ---------------- */

function JobsTab() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-jobs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("job_openings").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async (job: Partial<Job> & { id: string }) => {
      const { id, ...rest } = job;
      const { error } = await supabase.from("job_openings").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Stelle gespeichert");
      qc.invalidateQueries({ queryKey: ["admin-jobs"] });
      qc.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("job_openings")
        .insert({ title: "Neue Stelle", sort_order: (data?.length ?? 0) + 1, is_active: false });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-jobs"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("job_openings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-jobs"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => create.mutate()} className="gap-2">
          <Plus className="size-4" aria-hidden="true" /> Stelle hinzufügen
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {data?.map((job) => (
          <Card key={job.id}>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                save.mutate({
                  id: job.id,
                  title: String(fd.get("title")),
                  subtitle: String(fd.get("subtitle")),
                  employment_type: String(fd.get("employment_type")),
                  description: String(fd.get("description")),
                  requirements: String(fd.get("requirements")),
                  sort_order: Number(fd.get("sort_order")),
                  is_active: fd.get("is_active") === "on",
                });
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <Input name="title" defaultValue={job.title} className="font-semibold" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Stelle löschen"
                  onClick={() => remove.mutate(job.id)}
                >
                  <Trash2 className="size-4 text-destructive" aria-hidden="true" />
                </Button>
              </div>
              <Input name="subtitle" defaultValue={job.subtitle} placeholder="Untertitel" />
              <Input name="employment_type" defaultValue={job.employment_type} placeholder="Anstellungsart" />
              <Textarea name="description" defaultValue={job.description} rows={3} />
              <Textarea name="requirements" defaultValue={job.requirements} rows={2} placeholder="Voraussetzungen" />
              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <Switch name="is_active" defaultChecked={job.is_active} />
                  Aktiv
                </label>
                <div className="flex items-center gap-2">
                  <Input name="sort_order" type="number" defaultValue={job.sort_order} className="w-20" />
                  <Button type="submit" size="sm">
                    Speichern
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------------- SEO ---------------- */

const SEO_PAGES = [
  "/",
  "/leistungen",
  "/aktuelle-angebote",
  "/partner",
  "/kundenmeinungen",
  "/karriere",
  "/kontakt",
];

function SeoTab() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-seo"],
    queryFn: async () => {
      const { data, error } = await supabase.from("seo_settings").select("*").order("page_path");
      if (error) throw error;
      return data;
    },
  });

  const upsert = useMutation({
    mutationFn: async (row: Database["public"]["Tables"]["seo_settings"]["Insert"]) => {
      const { error } = await supabase.from("seo_settings").upsert(row, { onConflict: "page_path" });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("SEO gespeichert");
      qc.invalidateQueries({ queryKey: ["admin-seo"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const byPath = new Map((data ?? []).map((r) => [r.page_path, r]));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {SEO_PAGES.map((path) => {
        const row = byPath.get(path) as Seo | undefined;
        return (
          <Card key={path}>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                upsert.mutate({
                  page_path: path,
                  title: String(fd.get("title")),
                  description: String(fd.get("description")),
                  keywords: String(fd.get("keywords")),
                  og_title: String(fd.get("og_title")),
                  og_description: String(fd.get("og_description")),
                });
              }}
            >
              <p className="font-mono text-xs text-brand-orange">{path}</p>
              <div className="space-y-1">
                <Label className="text-xs">Meta-Titel</Label>
                <Input name="title" defaultValue={row?.title ?? ""} maxLength={60} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Meta-Beschreibung</Label>
                <Textarea name="description" defaultValue={row?.description ?? ""} rows={2} maxLength={160} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Keywords (Komma getrennt)</Label>
                <Textarea
                  name="keywords"
                  defaultValue={row?.keywords ?? ""}
                  rows={2}
                  placeholder="Autowerkstatt in meiner Nähe, Unfallservice, Unfallschaden"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input name="og_title" defaultValue={row?.og_title ?? ""} placeholder="OG-Titel" />
                <Input name="og_description" defaultValue={row?.og_description ?? ""} placeholder="OG-Beschreibung" />
              </div>
              <div className="flex justify-end">
                <Button type="submit" size="sm">
                  Speichern
                </Button>
              </div>
            </form>
          </Card>
        );
      })}
    </div>
  );
}

/* ---------------- Anfragen ---------------- */

function QuotesTab() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-quotes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-quotes"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  if (!data?.length) {
    return <p className="text-sm text-muted-foreground">Noch keine Anfragen.</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((q) => (
        <Card key={q.id}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold">
                {q.name} · {q.service_type}
              </p>
              <p className="text-sm text-muted-foreground">
                {q.phone}
                {q.email ? ` · ${q.email}` : ""} · {new Date(q.created_at).toLocaleString("de-DE")}
              </p>
              {q.message && <p className="mt-2 text-sm">{q.message}</p>}
              {q.photo_urls?.length > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">{q.photo_urls.length} Foto(s) hochgeladen</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-surface px-3 py-1 text-xs font-semibold">{q.status}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setStatus.mutate({ id: q.id, status: q.status === "neu" ? "erledigt" : "neu" })}
              >
                {q.status === "neu" ? "Als erledigt markieren" : "Wieder öffnen"}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ---------------- Partner ---------------- */

function PartnersTab() {
  const { data } = useQuery({
    queryKey: ["admin-partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partner_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (!data?.length) {
    return <p className="text-sm text-muted-foreground">Noch keine Partneranfragen.</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((p) => (
        <Card key={p.id}>
          <p className="font-semibold">
            {p.company} · {p.partner_type}
          </p>
          <p className="text-sm text-muted-foreground">
            {p.contact_name} · {p.email}
            {p.phone ? ` · ${p.phone}` : ""} · {new Date(p.created_at).toLocaleString("de-DE")}
          </p>
          {p.message && <p className="mt-2 text-sm">{p.message}</p>}
        </Card>
      ))}
    </div>
  );
}
