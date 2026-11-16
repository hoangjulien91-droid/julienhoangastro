// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://julienhoang.com",
  output: "static",

  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 700,
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              { name: "pst-diagrams", test: /PstDiagrams/ },
              { name: "pst-schemas-data", test: /schemas-matrices/ },
              { name: "lucide-icons", test: /lucide-react/ },
            ],
          },
        },
      },
    },
  },

  integrations: [
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap({
      filter: (page) =>
        page === "https://julienhoang.com/" ||
        page === "https://julienhoang.com",
    }),
  ],

  prefetch: {
    prefetchAll: true,
  },

  adapter: cloudflare({
    imageService: "compile",
  }),
});
