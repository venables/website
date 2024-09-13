"use client"

import Image from "next/image"
import { type HTMLAttributes, useState } from "react"

import { cn } from "@/lib/utils/cn"

export type AvatarProps = HTMLAttributes<HTMLDivElement>

export function Avatar({ className, ...props }: AvatarProps) {
  const [isSwinging, setIsSwinging] = useState(false)

  return (
    <span
      className={cn(
        "relative block aspect-square shrink-0 origin-top-left overflow-hidden rounded-xl",
        isSwinging && "animate-swing",
        className
      )}
      onMouseEnter={() => {
        setIsSwinging(true)
      }}
      {...props}
    >
      <Image
        alt="Matt Venables"
        className="aspect-square"
        src="/images/avatar.png"
        fill
      />
    </span>
  )
}
