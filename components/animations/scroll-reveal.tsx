"use client"

import type { ReactNode } from "react"
import { useInView } from "react-intersection-observer"

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  threshold?: number
  triggerOnce?: boolean
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  })

  const getAnimationClass = () => {
    if (!inView) return "opacity-0"

    let animationClass = "opacity-100 transition-all duration-1000 "
    if (delay) animationClass += `delay-${delay} `

    switch (direction) {
      case "up":
        animationClass += "translate-y-0"
        break
      case "down":
        animationClass += "translate-y-0"
        break
      case "left":
        animationClass += "translate-x-0"
        break
      case "right":
        animationClass += "translate-x-0"
        break
      case "none":
        animationClass += ""
        break
    }

    return animationClass
  }

  const getInitialClass = () => {
    let initialClass = "transform transition-all duration-1000 "

    switch (direction) {
      case "up":
        initialClass += "translate-y-16"
        break
      case "down":
        initialClass += "translate-y-[-4rem]"
        break
      case "left":
        initialClass += "translate-x-16"
        break
      case "right":
        initialClass += "translate-x-[-4rem]"
        break
      case "none":
        initialClass += ""
        break
    }

    return initialClass
  }

  return (
    <div ref={ref} className={`${className} ${getInitialClass()} ${getAnimationClass()}`}>
      {children}
    </div>
  )
}
