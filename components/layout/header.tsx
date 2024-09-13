import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils/cn"

import { Avatar } from "./avatar/avatar"

import type { HTMLProps } from "react"

type Props = HTMLProps<HTMLDivElement>

export function Header({ className, ...props }: Props) {
  return (
    <header className={cn("w-full", className)} {...props}>
      <div className="flex items-center justify-between gap-4">
        <Link className="flex items-center gap-2" href="/">
          <Avatar className="size-8" />
          {siteConfig.name}
        </Link>
      </div>
    </header>
  )
}
