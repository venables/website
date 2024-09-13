import { type MetadataRoute } from "next"

import { fullURL } from "@/lib/url-fns/full-url"
import { allPosts } from "contentlayer/generated"

const staticPages = ["/", "/writing"]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.map((post) => ({
    changeFrequency: "weekly" as const,
    lastModified: new Date(post.edited ? post.edited : post.date),
    priority: 0.8,
    url: fullURL(`/${post._raw.flattenedPath}`).toString()
  }))

  const staticPaths = staticPages.map((path) => ({
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
    priority: 0.8,
    url: fullURL(path).toString()
  }))

  return [...staticPaths, ...posts]
}
