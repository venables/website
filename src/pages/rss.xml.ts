import rss from "@astrojs/rss"
import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

export const GET: APIRoute = async (context) => {
  const allPosts = await getCollection("posts")
  const posts = allPosts.toSorted(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  )

  return rss({
    title: "Matt Venables",
    description: "A humble Astronaut’s guide to the stars",
    site: context.site ?? "https://venabl.es",
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title?.replaceAll("`", ""),
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/${post.id}`,
      content: post.body
    }))
  })
}
