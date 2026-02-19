import { rssSchema } from "@astrojs/rss"
import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: rssSchema.extend({
    ogImage: z.string().optional()
  })
})

export const collections = { posts }
