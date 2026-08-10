// Client-callable server functions — safe to import from route components.
// The actual DB access lives in public-content.server.ts and never ships to
// the browser; this file only exports the thin createServerFn RPC wrappers.
import { createServerFn } from "@tanstack/react-start";

export const getPublicOffers = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchPublicOffers } = await import("./public-content.server");
  return fetchPublicOffers();
});

export const getJobOpenings = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchJobOpenings } = await import("./public-content.server");
  return fetchJobOpenings();
});
