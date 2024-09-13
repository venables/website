import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils/cn"

import { Avatar } from "./avatar"
import { Button } from "../ui/button"

import type { HTMLProps } from "react"

type Props = HTMLProps<HTMLDivElement>

export function Header({ className, ...props }: Props) {
  return (
    <header className={cn("w-full", className)} {...props}>
      <div className="flex items-center justify-start gap-4">
        <Button className="flex items-center gap-2" variant="link" asChild>
          <Link href="/">
            <Avatar className="size-8" />
            {siteConfig.name}
          </Link>
        </Button>
        <span>&ndash;</span>
        <Button variant="link" asChild>
          <Link href="/posts">blog</Link>
        </Button>
      </div>
    </header>
  )
}
