import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BarChart3, Briefcase, Globe2, Handshake, Images, LogOut, MousePointerClick, Plus, Quote, Search, Tag, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logoutFn } from "@/lib/auth.functions";
import {
  getAdminOffers,
  createAdminOffer,
  updateAdminOffer,
  deleteAdminOffer,
  uploadAdminImage,
  getAdminJobOpenings,
  createAdminJobOpening,
  updateAdminJobOpening,
  deleteAdminJobOpening,
  getAdminQuoteRequests,
  updateAdminQuoteRequestStatus,
  getAdminPartnerRequests,
  getAdminTestimonials,
  createAdminTestimonial,
  updateAdminTestimonial,
  deleteAdminTestimonial,
  getAdminSeoSettings,
  upsertAdminSeoSettings,
} from "@/lib/admin-content.functions";
import { getOnlineNow, getAnalyticsSummary } from "@/lib/analytics.functions";
import type { AdminOfferRow, AdminJobOpeningRow, AdminTestimonialRow, AdminSeoRow } from "@/lib/admin-content.server";
import logoWhite from "@/assets/logo-white.png";
import badge10Jahre from "@/assets/badge-10jahre.png";

type Offer = AdminOfferRow;
type Seo = AdminSeoRow;
type Testimonial = AdminTestimonialRow;

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

// Der Zugriffs-Check selbst passiert schon eine Ebene höher, im beforeLoad
// von _authenticated/route.tsx (redirect zu /auth ohne gültige Session) —
// wer bis hierhin kommt, ist eingeloggt. Kein separater Rollen-Check mehr
// nötig: eine Zeile in cw_admin_users, mit der man sich einloggen kann,
// *ist* die Admin-Rolle (kein Multi-Rollen-RBAC für diese Einzelzweck-Seite).
function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await logoutFn();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-brand-surface">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-brand-navy text-brand-navy-foreground">
        <div className="relative mx-auto flex h-24 max-w-6xl items-center justify-center px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={logoWhite} alt="Car-World Verwaltung" className="h-14 w-auto sm:h-16" />
            <img src={badge10Jahre} alt="" aria-hidden="true" className="h-12 w-auto sm:h-14" />
          </div>
          <Button onClick={signOut} variant="secondary" size="sm" className="absolute top-1/2 right-4 -translate-y-1/2 gap-2 sm:right-6">
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
            <TabsTrigger value="testimonials" className="gap-2">
              <Quote className="size-4" aria-hidden="true" /> Kundenmeinungen
            </TabsTrigger>
            <TabsTrigger value="quotes" className="gap-2">
              <Images className="size-4" aria-hidden="true" /> Anfragen
            </TabsTrigger>
            <TabsTrigger value="partners" className="gap-2">
              <Handshake className="size-4" aria-hidden="true" /> Partner
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="size-4" aria-hidden="true" /> Analytics
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
          <TabsContent value="testimonials" className="mt-6">
            <TestimonialsTab />
          </TabsContent>
          <TabsContent value="quotes" className="mt-6">
            <QuotesTab />
          </TabsContent>
          <TabsContent value="partners" className="mt-6">
            <PartnersTab />
          </TabsContent>
          <TabsContent value="analytics" className="mt-6">
            <AnalyticsTab />
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

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ImageField({
  folder,
  initialUrl,
}: {
  folder: string;
  initialUrl: string | null;
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const dataBase64 = await fileToBase64(file);
      const result = await uploadAdminImage({ data: { folder, filename: file.name, dataBase64 } });
      setUrl(result.url);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Bild-Upload fehlgeschlagen");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-1">
      <Label className="text-xs">Bild</Label>
      <div className="flex items-center gap-3">
        {url ? (
          <img src={url} alt="" className="size-16 shrink-0 rounded-lg border object-cover" />
        ) : (
          <div className="grid size-16 shrink-0 place-items-center rounded-lg border border-dashed text-muted-foreground">
            <Images className="size-5" aria-hidden="true" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="text-xs file:mr-2 file:rounded-md file:border-0 file:bg-brand-navy file:px-2 file:py-1 file:text-xs file:text-brand-navy-foreground"
        />
      </div>
      <input type="hidden" name="image_url" value={url} />
    </div>
  );
}

function OffersTab() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-offers"],
    queryFn: () => getAdminOffers(),
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-offers"] });
    qc.invalidateQueries({ queryKey: ["offers"] });
  };

  const save = useMutation({
    mutationFn: async (offer: Partial<Offer> & { id: string }) => {
      const { id, ...rest } = offer;
      await updateAdminOffer({ data: { id, ...rest } });
    },
    onSuccess: () => {
      toast.success("Angebot gespeichert");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const create = useMutation({
    mutationFn: async () => {
      await createAdminOffer({ data: { sortOrder: (data?.length ?? 0) + 1 } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-offers"] });
      toast.success("Angebot angelegt");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await deleteAdminOffer({ data: { id } });
    },
    onSuccess: () => {
      invalidate();
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
                  image_url: String(fd.get("image_url")) || null,
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
              <ImageField folder="offers" initialUrl={offer.image_url} />
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

/* ---------------- Kundenmeinungen ---------------- */

function TestimonialsTab() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: () => getAdminTestimonials(),
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
    qc.invalidateQueries({ queryKey: ["testimonials"] });
  };

  const save = useMutation({
    mutationFn: async (t: Partial<Testimonial> & { id: string }) => {
      const { id, ...rest } = t;
      await updateAdminTestimonial({ data: { id, ...rest } });
    },
    onSuccess: () => {
      toast.success("Kundenmeinung gespeichert");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const create = useMutation({
    mutationFn: async () => {
      await createAdminTestimonial({ data: { sortOrder: (data?.length ?? 0) + 1 } });
    },
    onSuccess: () => {
      toast.success("Kundenmeinung angelegt");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await deleteAdminTestimonial({ data: { id } });
    },
    onSuccess: () => {
      toast.success("Kundenmeinung gelöscht");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {data?.filter((t) => t.is_active).length ?? 0} aktive Kundenmeinungen auf der Website
        </p>
        <Button onClick={() => create.mutate()} className="gap-2">
          <Plus className="size-4" aria-hidden="true" /> Kundenmeinung hinzufügen
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {data?.map((t) => (
          <Card key={t.id}>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                save.mutate({
                  id: t.id,
                  name: String(fd.get("name")),
                  role: String(fd.get("role")),
                  text: String(fd.get("text")),
                  image_url: String(fd.get("image_url")) || null,
                  rating: Number(fd.get("rating")),
                  sort_order: Number(fd.get("sort_order")),
                  is_active: fd.get("is_active") === "on",
                });
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <Input name="name" defaultValue={t.name} className="font-semibold" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Kundenmeinung löschen"
                  onClick={() => remove.mutate(t.id)}
                >
                  <Trash2 className="size-4 text-destructive" aria-hidden="true" />
                </Button>
              </div>
              <Textarea name="text" defaultValue={t.text} rows={3} placeholder="Bewertungstext" />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Leistung / Rolle</Label>
                  <Input name="role" defaultValue={t.role} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Sterne (1–5)</Label>
                  <Input name="rating" type="number" min={1} max={5} defaultValue={t.rating} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Foto-URL (optional)</Label>
                  <Input name="image_url" defaultValue={t.image_url ?? ""} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Reihenfolge</Label>
                  <Input name="sort_order" type="number" defaultValue={t.sort_order} />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-sm">
                  <Switch name="is_active" defaultChecked={t.is_active} />
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
    queryFn: () => getAdminJobOpenings(),
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-jobs"] });
    qc.invalidateQueries({ queryKey: ["jobs"] });
  };

  const save = useMutation({
    mutationFn: async (job: Partial<AdminJobOpeningRow> & { id: string }) => {
      const { id, ...rest } = job;
      await updateAdminJobOpening({ data: { id, ...rest } });
    },
    onSuccess: () => {
      toast.success("Stelle gespeichert");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const create = useMutation({
    mutationFn: async () => {
      await createAdminJobOpening({ data: { sortOrder: (data?.length ?? 0) + 1 } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-jobs"] });
      toast.success("Stelle angelegt");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await deleteAdminJobOpening({ data: { id } });
    },
    onSuccess: () => {
      invalidate();
      toast.success("Stelle gelöscht");
    },
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
                  image_url: String(fd.get("image_url")) || null,
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
              <ImageField folder="jobs" initialUrl={job.image_url} />
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
    queryFn: () => getAdminSeoSettings(),
  });

  const upsert = useMutation({
    mutationFn: async (row: AdminSeoRow) => {
      await upsertAdminSeoSettings({ data: row });
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
    queryFn: () => getAdminQuoteRequests(),
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await updateAdminQuoteRequestStatus({ data: { id, status } });
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
              {q.photo_keys?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {q.photo_keys.map((url) => (
                    <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                      <img src={url} alt="Schadenfoto" className="size-16 rounded-lg border object-cover" />
                    </a>
                  ))}
                </div>
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
    queryFn: () => getAdminPartnerRequests(),
  });

  if (!data?.length) {
    return <p className="text-sm text-muted-foreground">Noch keine Partneranfragen.</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((p) => (
        <Card key={p.id}>
          <p className="font-semibold">{p.name}</p>
          <p className="text-sm text-muted-foreground">
            {p.email} · {new Date(p.created_at).toLocaleString("de-DE")}
          </p>
          {p.message && <p className="mt-2 text-sm">{p.message}</p>}
        </Card>
      ))}
    </div>
  );
}

/* ---------------- Analytics ---------------- */

function AnalyticsTab() {
  const [rangeDays, setRangeDays] = useState(7);

  const { data: online } = useQuery({
    queryKey: ["admin-analytics-online"],
    queryFn: () => getOnlineNow(),
    refetchInterval: 10_000,
  });

  const { data: summary } = useQuery({
    queryKey: ["admin-analytics-summary", rangeDays],
    queryFn: () => getAnalyticsSummary({ data: { rangeDays } }),
  });

  const onlineCountries = (online ?? []).reduce<Record<string, number>>((acc, v) => {
    const key = v.country ?? "Unbekannt";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const maxDailyPageviews = Math.max(1, ...(summary?.dailyVisits.map((d) => d.pageviews) ?? [1]));

  return (
    <div className="space-y-6">
      {/* Live: gerade online */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            <p className="text-sm font-semibold">Gerade online</p>
          </div>
          <p className="text-2xl font-bold">{online?.length ?? 0}</p>
        </div>
        {online && online.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(onlineCountries).map(([country, count]) => (
              <span
                key={country}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-surface px-3 py-1 text-xs font-medium"
              >
                <Globe2 className="size-3.5" aria-hidden="true" />
                {country} · {count}
              </span>
            ))}
          </div>
        )}
      </Card>

      {/* Zeitraum */}
      <div className="flex items-center gap-2">
        {[7, 30, 90].map((d) => (
          <Button
            key={d}
            size="sm"
            variant={rangeDays === d ? "default" : "outline"}
            onClick={() => setRangeDays(d)}
          >
            {d} Tage
          </Button>
        ))}
      </div>

      {/* Kennzahlen */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="size-4" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase">Besuche</p>
          </div>
          <p className="mt-2 text-2xl font-bold">{summary?.totalSessions ?? 0}</p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MousePointerClick className="size-4" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase">Seitenaufrufe</p>
          </div>
          <p className="mt-2 text-2xl font-bold">{summary?.totalPageviews ?? 0}</p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BarChart3 className="size-4" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase">Bounce Rate</p>
          </div>
          <p className="mt-2 text-2xl font-bold">{summary?.bounceRate ?? 0}%</p>
        </Card>
      </div>

      {/* Verlauf */}
      {summary && summary.dailyVisits.length > 0 && (
        <Card>
          <p className="mb-3 text-sm font-semibold">Seitenaufrufe pro Tag</p>
          <div className="flex h-32 items-end gap-1">
            {summary.dailyVisits.map((d) => (
              <div key={d.date} className="group relative flex-1" title={`${d.date}: ${d.pageviews}`}>
                <div
                  className="w-full rounded-t bg-brand-orange/70 transition-colors group-hover:bg-brand-orange"
                  style={{ height: `${Math.max(4, (d.pageviews / maxDailyPageviews) * 100)}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            <span>{summary.dailyVisits[0]?.date}</span>
            <span>{summary.dailyVisits[summary.dailyVisits.length - 1]?.date}</span>
          </div>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="mb-3 text-sm font-semibold">Meistbesuchte Seiten</p>
          {summary?.topPages.length ? (
            <ul className="space-y-2">
              {summary.topPages.map((p) => (
                <li key={p.path} className="flex items-center justify-between text-sm">
                  <span className="truncate text-muted-foreground">{p.path}</span>
                  <span className="font-semibold">{p.views}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Noch keine Daten.</p>
          )}
        </Card>

        <Card>
          <p className="mb-3 text-sm font-semibold">Klicks nach Button (Konversionen)</p>
          {summary?.topClicks.length ? (
            <ul className="space-y-2">
              {summary.topClicks.map((c) => (
                <li key={`${c.label}-${c.page}`} className="flex items-center justify-between text-sm">
                  <span className="truncate text-muted-foreground">
                    {c.label} <span className="text-xs">({c.page})</span>
                  </span>
                  <span className="font-semibold">{c.count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Noch keine Daten.</p>
          )}
        </Card>
      </div>

      <Card>
        <p className="mb-3 text-sm font-semibold">Länder</p>
        {summary?.countries.length ? (
          <ul className="space-y-2">
            {summary.countries.map((c) => (
              <li key={c.country} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{c.country}</span>
                <span className="font-semibold">{c.sessions}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Noch keine Daten.</p>
        )}
      </Card>
    </div>
  );
}
