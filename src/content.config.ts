import { rssSchema } from "@astrojs/rss"
import { glob } from "astro/loaders"
import { defineCollection } from "astro:content"

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: rssSchema
})

export const collections = { posts }
