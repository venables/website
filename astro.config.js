// @ts-check
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://venabl.es",
  adapter: vercel(),
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap(), mdx()],
})
