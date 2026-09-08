import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, fontProviders } from "astro/config"

import rehypeCrosshairFrames from "./src/lib/rehype-crosshair-frames"
import rehypeGithubAlerts from "./src/lib/rehype-github-alerts"

const isDev = process.argv.includes("dev")

// https://astro.build/config
export default defineConfig({
  site: "https://venabl.es",
  trailingSlash: "never",
  redirects: {
    "/now": "/work",
    "/projects": "/work"
  },
  build: {
    format: "file"
  },
  adapter: cloudflare({
    // `compile` optimizes images with Sharp at build time. Its runtime endpoint
    // imports `cloudflare:workers`, which `astro dev` can't resolve, so fall back
    // to a no-op passthrough in dev (the site is fully static, so production is
    // unaffected).
    imageService: isDev ? "passthrough" : "compile",
    prerenderEnvironment: "node"
  }),
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: ["100 900"]
    }
  ],
  markdown: {
    syntaxHighlight: "prism",
    rehypePlugins: [rehypeCrosshairFrames, rehypeGithubAlerts]
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap(), mdx()]
})
