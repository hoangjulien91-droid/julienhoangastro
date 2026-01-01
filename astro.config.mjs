// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
// import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  output: 'static',

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    sitemap(),
    // robotsTxt(),
  ],

  prefetch: {
    prefetchAll: true,
  },

  experimental: {
    clientPrerender: true,
  },

  build: {
    inlineStylesheets: 'auto',
  },

  adapter: cloudflare(),
});