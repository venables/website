import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev"
import { withContentlayer } from "next-contentlayer2"

import type { NextConfig } from "next"
import "./env/client"
import "./env/server"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    mdxRs: true,
    turbo: {
      resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"]
    }
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"]
}

if (process.env.NODE_ENV === "development") {
  void setupDevPlatform()
}

export default withContentlayer(nextConfig)
