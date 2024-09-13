import { format, parseISO } from "date-fns"
import { notFound } from "next/navigation"

import { allPosts } from "contentlayer/generated"

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post._raw.flattenedPath }))
}

export function generateMetadata({ params }: Props) {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug)
  if (!post) {
    notFound()
  }

  return {
    description: post.description,
    title: post.title
  }
}

export default function PostPage({ params }: Props) {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug)
  if (!post) {
    notFound()
  }

  return (
    <main className="flex grow flex-col items-start justify-start">
      <article className="flex flex-col gap-4">
        <h1 className="text-2xl tracking-tighter">{post.title}</h1>

        {post.showDate || !post.page ? (
          <div className="text-xs">
            <time dateTime={post.date}>
              {format(parseISO(post.date), "LLLL d, yyyy")}
            </time>
          </div>
        ) : null}

        <div
          className="prose  prose-lg text-justify dark:prose-invert lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
      </article>
    </main>
  )
}
