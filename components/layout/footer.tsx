import Link from "next/link"

import { GithubIcon } from "@/components/icons/social/github-icon"
import { LinkedInIcon } from "@/components/icons/social/linkedin-icon"
import { XTwitterIcon } from "@/components/icons/social/x-twitter-icon"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils/cn"

import type { HTMLProps } from "react"

const SOCIAL_LINKS = [
  {
    icon: GithubIcon,
    link: siteConfig.links.github,
    title: "Github"
  },
  {
    icon: XTwitterIcon,
    link: siteConfig.links.twitter,
    title: "Twitter"
  },
  {
    icon: LinkedInIcon,
    link: siteConfig.links.linkedin,
    title: "LinkedIn"
  }
]

type Props = HTMLProps<HTMLDivElement>

export function Footer({ className, ...props }: Props) {
  return (
    <footer className={cn("w-full py-4", className)} {...props}>
      <div className="container flex flex-col flex-wrap items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col sm:flex-row"></div>

        <nav className="flex flex-row items-center space-x-2">
          {SOCIAL_LINKS.map(({ icon: Icon, link, title }) => (
            <Button key={title} className="size-8 px-0" variant="ghost" asChild>
              <Link href={link} rel="noreferrer" target="_blank">
                <span className="sr-only">{title}</span>
                <Icon className="size-4" />
              </Link>
            </Button>
          ))}

          <ThemeToggle />
        </nav>
      </div>
    </footer>
  )
}
