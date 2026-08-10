// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    server: {
      proxy: {
        // Lovable-hosted asset CDN paths (src/assets/*.asset.json -> /__l5e/assets-v1/...)
        // only resolve on Lovable's own servers. Proxy them to the live preview deployment
        // so images render in this local mirror too.
        "/__l5e": {
          target: "https://id-preview--60bd9a49-9d21-464b-88e0-54ddd072e1d2.lovable.app",
          changeOrigin: true,
        },
      },
    },
  },
});
