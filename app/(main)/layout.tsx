import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"

import type { PropsWithChildren } from "react"

export default function MainLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="container flex min-h-screen flex-col gap-8 py-8">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
