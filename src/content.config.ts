import { rssSchema } from "@astrojs/rss"
import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const posts = defineCollection({
  loader: glob({
    pattern: "**/post.md",
    base: "./content",
    generateId: ({ entry }) => entry.split("/")[0]
  }),
  schema: rssSchema.extend({
    pubDate: z.coerce.date(),
    ogImage: z.string().optional()
  })
})

export const collections = { posts }
