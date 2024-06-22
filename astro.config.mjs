import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://sjrdesigns.com",
  integrations: [react(), sitemap(), tailwind()],
  output: "hybrid",
  experimental: {
    actions: true
  },
  adapter: cloudflare(),
  ssr: {
    noExternal: [
      'astro', // include other packages if necessary
      'node:async_hooks'
    ]
  }
});