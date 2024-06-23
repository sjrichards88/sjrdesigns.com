import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: "https://sjrdesigns.com",
  integrations: [react(), sitemap(), tailwind()],
  output: "hybrid",
  adapter: cloudflare()
});