import { rssSchema } from "@astrojs/rss"
import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: rssSchema,
})

export const collections = { posts }
