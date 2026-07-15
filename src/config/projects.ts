export type ProjectType = "product" | "open-source"

export interface Project {
  id: string
  name: string
  description: string
  href: string
  type: ProjectType
  /** Company where this was built, when it was work rather than a side project. */
  company?: string
}

export const projectTypes: { value: ProjectType; label: string }[] = [
  { value: "product", label: "Product" },
  { value: "open-source", label: "Open Source" }
]

export const projects: Project[] = [
  {
    id: "usdc-cool",
    name: "usdc.cool",
    description: "The USDC stablecoin supply tracker",
    href: "https://usdc.cool",
    type: "product"
  },
  {
    id: "stables-cool",
    name: "stables.cool",
    description: "Cross-chain stablecoin analytics",
    href: "https://stables.cool",
    type: "product"
  },
  {
    id: "songbpm",
    name: "songbpm",
    description: "Song metadata for over half a million visitors every month",
    href: "https://songbpm.com",
    type: "product"
  },
  {
    id: "jog-fm",
    name: "jog.fm",
    description:
      "The best music for your workout, with hundreds of thousands of monthly uniques",
    href: "https://jog.fm",
    type: "product"
  },
  {
    id: "instamint",
    name: "Instamint",
    description: "The easiest way to mint an NFT on Solana",
    href: "https://nft.m2.xyz",
    type: "product"
  },
  {
    id: "wt",
    name: "wt",
    description: "A git worktree helper for running coding agents in parallel",
    href: "https://github.com/venables/wt",
    type: "open-source"
  },
  {
    id: "typed-route-handler",
    name: "typed-route-handler",
    description: "Type-safe API routes for Next.js",
    href: "https://github.com/venables/typed-route-handler",
    type: "open-source"
  },
  {
    id: "startkit",
    name: "startkit",
    description: "Robust starter kits for building apps that scale",
    href: "https://github.com/startkit-dev",
    type: "open-source"
  },
  {
    id: "npx-hello",
    name: "npx hello",
    description: "Browse GitHub profiles from the command line",
    href: "https://github.com/hello-js/hello",
    type: "open-source"
  },
  {
    id: "koa-helmet",
    name: "koa-helmet",
    description: "Important security headers for the Koa framework",
    href: "https://github.com/venables/koa-helmet",
    type: "open-source"
  }
]

export function getProject(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}
