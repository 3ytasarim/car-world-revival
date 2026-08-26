// Client-callable server functions — safe to import from route components.
// The actual DB access lives in public-content.server.ts and never ships to
// the browser; this file only exports the thin createServerFn RPC wrappers.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getPublicOffers = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchPublicOffers } = await import("./public-content.server");
  return fetchPublicOffers();
});

export const getJobOpenings = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchJobOpenings } = await import("./public-content.server");
  return fetchJobOpenings();
});

export const getTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchTestimonials } = await import("./public-content.server");
  return fetchTestimonials();
});

export const submitPartnerRequest = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().trim().min(1).max(150),
      email: z.string().trim().email().max(255),
      message: z.string().trim().max(1000).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { insertPartnerRequest } = await import("./public-content.server");
    await insertPartnerRequest({ name: data.name, email: data.email, message: data.message || null });
    return { success: true as const };
  });

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().trim().min(2).max(150),
      phone: z.string().trim().min(5).max(40),
      email: z.string().trim().email().max(255).optional(),
      serviceType: z.string().trim().max(60),
      message: z.string().trim().max(1000).optional(),
      photoKeys: z.array(z.string().max(500)).max(6),
    }),
  )
  .handler(async ({ data }) => {
    const { insertQuoteRequest } = await import("./public-content.server");
    await insertQuoteRequest({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      serviceType: data.serviceType,
      message: data.message || null,
      photoKeys: data.photoKeys,
    });
    return { success: true as const };
  });

export const uploadPublicImage = createServerFn({ method: "POST" })
  .validator(z.object({ folder: z.string().max(40), filename: z.string().max(255), dataBase64: z.string() }))
  .handler(async ({ data }) => {
    const { savePublicUpload } = await import("./public-content.server");
    return savePublicUpload(data.folder, data.filename, data.dataBase64);
  });
