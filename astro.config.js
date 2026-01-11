// @ts-check
import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://venabl.es",
  adapter: cloudflare(),
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap(), mdx()]
})
