import { compareDesc, format, parseISO } from "date-fns"
import { type Metadata } from "next"
import Link from "next/link"

import { allPosts } from "contentlayer/generated"

export const metadata: Metadata = {
  description: "Sometimes I write about software, business, crypto, and AI.",
  title: "Things I think I think"
}

export default function WritingPage() {
  const posts = allPosts
    .filter((p) => !p.page)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <main className="flex grow flex-col items-start justify-start">
      <h1 className="font-mono text-lg tracking-tighter">blog</h1>
      <ol className="space-y-4 py-4">
        {posts.map((post) => (
          <li key={post.url} className="grid items-start gap-1">
            <Link
              className="flex items-center gap-1.5 no-underline"
              href={post.url}
            >
              <span className="font-medium underline underline-offset-4 ">
                {post.title}
              </span>
            </Link>
            <time className="text-sm text-foreground" dateTime={post.date}>
              {format(parseISO(post.date), "LLLL d, yyyy")}
            </time>
          </li>
        ))}
      </ol>
    </main>
  )
}
