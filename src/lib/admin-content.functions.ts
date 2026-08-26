// Client-callable server functions for the admin panel — every mutation
// requires a valid admin session (checked from the cw_session cookie)
// before touching the database. Actual DB/file logic lives in
// admin-content.server.ts and never ships to the browser.
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { z } from "zod";

async function requireAdmin() {
  const token = getCookie("cw_session");
  if (!token) throw new Error("Nicht angemeldet.");
  const { validateSessionToken } = await import("./auth.server");
  const admin = await validateSessionToken(token);
  if (!admin) throw new Error("Sitzung abgelaufen. Bitte erneut anmelden.");
  return admin;
}

export const getAdminOffers = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { fetchAllOffers } = await import("./admin-content.server");
  return fetchAllOffers();
});

export const createAdminOffer = createServerFn({ method: "POST" })
  .validator(z.object({ sortOrder: z.number() }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { createOffer } = await import("./admin-content.server");
    return createOffer(data.sortOrder);
  });

export const updateAdminOffer = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      title: z.string().max(150).optional(),
      description: z.string().max(2000).optional(),
      price_label: z.string().max(60).nullable().optional(),
      badge: z.string().max(40).nullable().optional(),
      image_url: z.string().max(500).nullable().optional(),
      cta_label: z.string().max(60).optional(),
      sort_order: z.number().optional(),
      is_active: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { id, ...fields } = data;
    const { updateOffer } = await import("./admin-content.server");
    await updateOffer(id, fields);
    return { success: true as const };
  });

export const deleteAdminOffer = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { deleteOffer } = await import("./admin-content.server");
    await deleteOffer(data.id);
    return { success: true as const };
  });

export const uploadAdminImage = createServerFn({ method: "POST" })
  .validator(z.object({ folder: z.string().max(40), filename: z.string().max(255), dataBase64: z.string() }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { saveUploadedImage } = await import("./admin-content.server");
    return saveUploadedImage(data.folder, data.filename, data.dataBase64);
  });

/* ---------------- Stellen ---------------- */

export const getAdminJobOpenings = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { fetchAllJobOpenings } = await import("./admin-content.server");
  return fetchAllJobOpenings();
});

export const createAdminJobOpening = createServerFn({ method: "POST" })
  .validator(z.object({ sortOrder: z.number() }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { createJobOpening } = await import("./admin-content.server");
    return createJobOpening(data.sortOrder);
  });

export const updateAdminJobOpening = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      title: z.string().max(150).optional(),
      subtitle: z.string().max(200).optional(),
      employment_type: z.string().max(60).optional(),
      description: z.string().max(2000).optional(),
      requirements: z.string().max(1000).optional(),
      image_url: z.string().max(500).nullable().optional(),
      sort_order: z.number().optional(),
      is_active: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { id, ...fields } = data;
    const { updateJobOpening } = await import("./admin-content.server");
    await updateJobOpening(id, fields);
    return { success: true as const };
  });

export const deleteAdminJobOpening = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { deleteJobOpening } = await import("./admin-content.server");
    await deleteJobOpening(data.id);
    return { success: true as const };
  });

/* ---------------- Anfragen ---------------- */

export const getAdminQuoteRequests = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { fetchQuoteRequests } = await import("./admin-content.server");
  return fetchQuoteRequests();
});

export const updateAdminQuoteRequestStatus = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string(), status: z.string().max(30) }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { updateQuoteRequestStatus } = await import("./admin-content.server");
    await updateQuoteRequestStatus(data.id, data.status);
    return { success: true as const };
  });

/* ---------------- Partner ---------------- */

export const getAdminPartnerRequests = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { fetchPartnerRequests } = await import("./admin-content.server");
  return fetchPartnerRequests();
});

export const updateAdminPartnerRequestStatus = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string(), status: z.string().max(30) }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { updatePartnerRequestStatus } = await import("./admin-content.server");
    await updatePartnerRequestStatus(data.id, data.status);
    return { success: true as const };
  });

/* ---------------- Kundenmeinungen ---------------- */

export const getAdminTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { fetchAllTestimonials } = await import("./admin-content.server");
  return fetchAllTestimonials();
});

export const createAdminTestimonial = createServerFn({ method: "POST" })
  .validator(z.object({ sortOrder: z.number() }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { createTestimonial } = await import("./admin-content.server");
    return createTestimonial(data.sortOrder);
  });

export const updateAdminTestimonial = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      name: z.string().max(150).optional(),
      role: z.string().max(150).optional(),
      text: z.string().max(2000).optional(),
      image_url: z.string().max(500).nullable().optional(),
      rating: z.number().min(1).max(5).optional(),
      sort_order: z.number().optional(),
      is_active: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { id, ...fields } = data;
    const { updateTestimonial } = await import("./admin-content.server");
    await updateTestimonial(id, fields);
    return { success: true as const };
  });

export const deleteAdminTestimonial = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { deleteTestimonial } = await import("./admin-content.server");
    await deleteTestimonial(data.id);
    return { success: true as const };
  });

/* ---------------- SEO ---------------- */

export const getAdminSeoSettings = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { fetchSeoSettings } = await import("./admin-content.server");
  return fetchSeoSettings();
});

export const upsertAdminSeoSettings = createServerFn({ method: "POST" })
  .validator(
    z.object({
      page_path: z.string().max(200),
      title: z.string().max(60),
      description: z.string().max(160),
      keywords: z.string().max(300),
      og_title: z.string().max(60),
      og_description: z.string().max(160),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { upsertSeoSettings } = await import("./admin-content.server");
    await upsertSeoSettings(data);
    return { success: true as const };
  });
