import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, fontProviders } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://venabl.es",
  trailingSlash: "never",
  build: {
    format: "file"
  },
  adapter: cloudflare({ imageService: "compile" }),
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-sans",
      weights: ["100 900"]
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      weights: ["100 900"]
    },
    {
      provider: fontProviders.local(),
      name: "Font Display",
      cssVariable: "--font-display",
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/display/Regular.woff2"]
          },
          {
            weight: 400,
            style: "italic",
            src: ["./src/assets/fonts/display/RegularItalic.woff2"]
          },
          {
            weight: 600,
            style: "normal",
            src: ["./src/assets/fonts/display/Semibold.woff2"]
          },
          {
            weight: 600,
            style: "italic",
            src: ["./src/assets/fonts/display/SemiboldItalic.woff2"]
          },
          {
            weight: 700,
            style: "normal",
            src: ["./src/assets/fonts/display/Bold.woff2"]
          },
          {
            weight: 700,
            style: "italic",
            src: ["./src/assets/fonts/display/BoldItalic.woff2"]
          },
          {
            weight: 800,
            style: "normal",
            src: ["./src/assets/fonts/display/Extrabold.woff2"]
          },
          {
            weight: 900,
            style: "normal",
            src: ["./src/assets/fonts/display/Black.woff2"]
          },
          {
            weight: 900,
            style: "italic",
            src: ["./src/assets/fonts/display/BlackItalic.woff2"]
          }
        ]
      }
    }
  ],
  markdown: {
    syntaxHighlight: "prism"
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap(), mdx()]
})
