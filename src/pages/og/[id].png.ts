import type { APIRoute, GetStaticPaths } from "astro"

import { getCollection } from "astro:content"
import { readFile } from "node:fs/promises"
import { extname, join } from "node:path"

import type { OgFont } from "@/lib/og"

import { siteConfig } from "@/config/site"
import { generateOgImage } from "@/lib/og"

export const prerender = true

const FONTS_DIR = join(process.cwd(), "src/assets/fonts/og")
const AVATAR_PATH = join(
  process.cwd(),
  "src/assets/images/matt-venables/avatar-transparent.png"
)
const CONTENT_DIR = join(process.cwd(), "content")

let fontsCache: OgFont[] | null = null
let avatarCache: string | null = null

async function loadFonts(): Promise<OgFont[]> {
  if (fontsCache) return fontsCache

  const [regular, bold] = await Promise.all([
    readFile(join(FONTS_DIR, "JetBrainsMono-Regular.ttf")),
    readFile(join(FONTS_DIR, "JetBrainsMono-Bold.ttf"))
  ])

  fontsCache = [
    {
      name: "JetBrains Mono",
      data: new Uint8Array(regular).buffer,
      weight: 400,
      style: "normal"
    },
    {
      name: "JetBrains Mono",
      data: new Uint8Array(bold).buffer,
      weight: 700,
      style: "normal"
    }
  ]

  return fontsCache
}

async function loadAvatar(): Promise<string> {
  if (avatarCache) return avatarCache

  const buffer = await readFile(AVATAR_PATH)
  avatarCache = `data:image/png;base64,${buffer.toString("base64")}`

  return avatarCache
}

function toDataUri(buffer: Buffer, path: string): string {
  const ext = extname(path).slice(1) || "png"
  const mime = ext === "jpg" ? "jpeg" : ext
  return `data:image/${mime};base64,${buffer.toString("base64")}`
}

async function loadPostImage(
  postId: string,
  ogImagePath: string
): Promise<string> {
  const imagePath = join(CONTENT_DIR, postId, ogImagePath)
  const buffer = await readFile(imagePath)
  return toDataUri(buffer, ogImagePath)
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("posts")
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post }
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props

  const [fonts, avatarBase64] = await Promise.all([loadFonts(), loadAvatar()])

  const imageBase64 = post.data.ogImage
    ? await loadPostImage(post.id, post.data.ogImage)
    : undefined

  const png = await generateOgImage(
    {
      title: post.data.title ?? "Untitled",
      author: siteConfig.author.name,
      avatarBase64,
      imageBase64
    },
    fonts
  )

  return new Response(png, {
    headers: { "Content-Type": "image/png" }
  })
}
