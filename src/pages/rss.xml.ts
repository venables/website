import rss from "@astrojs/rss"
import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

export const GET: APIRoute = async (context) => {
  const allPosts = await getCollection("posts")
  const posts = allPosts.toSorted((a, b) => {
    const dateA = new Date(a.data.pubDate ?? Date.now()).getTime()
    const dateB = new Date(b.data.pubDate ?? Date.now()).getTime()
    return dateB - dateA
  })

  return rss({
    title: "Matt Venables",
    description: "A humble Astronaut’s guide to the stars",
    site: context.site ?? "https://venabl.es",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/${post.id}`,
      content: post.body
    }))
  })
}
