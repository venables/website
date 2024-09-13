import "./globals.css"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "next-themes"

import { TailwindIndicator } from "@/components/layout/tailwind-indicator"
import { siteConfig } from "@/config/site"
import { fullURL } from "@/lib/url-fns/full-url"
import { cn } from "@/lib/utils/cn"

import type { Metadata, Viewport } from "next"
import type { PropsWithChildren } from "react"

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  description: siteConfig.description,
  metadataBase: fullURL(),
  openGraph: {
    description: siteConfig.description,
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: "website",
    url: fullURL()
  },
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.author.twitter,
    description: siteConfig.description,
    site: siteConfig.handles.twitter,
    title: siteConfig.name
  }
}

export const viewport: Viewport = {
  themeColor: "var(--background)"
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "font-mono antialiased"
        )}
      >
        <ThemeProvider attribute="class">
          {children}
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
