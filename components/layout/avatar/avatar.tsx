"use client"

import Image from "next/image"
import { type HTMLAttributes, useState } from "react"

import { cn } from "@/lib/utils/cn"

import avatar from "./avatar.png"

export type AvatarProps = HTMLAttributes<HTMLDivElement>

export function Avatar({ className, ...props }: AvatarProps) {
  const [isSwinging, setIsSwinging] = useState(false)

  const handleMouseEnter = () => {
    setIsSwinging(true)
  }

  const handleAnimationEnd = () => {
    // setIsSwinging(false)
  }

  return (
    <span
      className={cn(
        "relative block aspect-square shrink-0 origin-top-left overflow-hidden rounded-xl",
        isSwinging && "animate-swing",
        className
      )}
      onAnimationEnd={handleAnimationEnd}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      <Image alt="Matt Venables" className="aspect-square" src={avatar} fill />
    </span>
  )
}
