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
  site: 'https://julienhoang.com',
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
  ],

  prefetch: {
    prefetchAll: true,
  },

  adapter: cloudflare(),
});