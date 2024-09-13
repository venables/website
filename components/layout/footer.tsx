import { CopyrightIcon } from "lucide-react"
import Link from "next/link"

import { GithubIcon } from "@/components/icons/social/github-icon"
import { XTwitterIcon } from "@/components/icons/social/x-twitter-icon"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils/cn"

import type { HTMLProps } from "react"

type Props = HTMLProps<HTMLDivElement>

export function Footer({ className, ...props }: Props) {
  return (
    <footer className={cn("w-full py-4", className)} {...props}>
      <div className="container flex flex-col flex-wrap items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col sm:flex-row"></div>

        <nav className="flex flex-row items-center space-x-2">
          <Button className="size-8 px-0" variant="ghost" asChild>
            <Link
              href={siteConfig.links.github}
              rel="noreferrer"
              target="_blank"
            >
              <span className="sr-only">Github</span>
              <GithubIcon className="size-4" />
            </Link>
          </Button>
          <Button className="size-8 px-0" variant="ghost" asChild>
            <Link
              href={siteConfig.links.twitter}
              rel="noreferrer"
              target="_blank"
            >
              <span className="sr-only">X (Twitter)</span>
              <XTwitterIcon className="size-4" />
            </Link>
          </Button>

          <ThemeToggle />
        </nav>
      </div>
    </footer>
  )
}
