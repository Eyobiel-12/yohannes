"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxProps {
  children: React.ReactNode
  offset?: number
  className?: string
}

export default function ParallaxEffect({ children, offset = 50, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const { scrollY } = useScroll()

  // Store the scroll position
  const initial = elementTop - clientHeight
  const final = elementTop + offset

  // Transform the scroll into a percentage
  const yRange = useTransform(scrollY, [initial, final], [offset, -offset])
  const y = useTransform(yRange, (value) => `${value}px`)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const onResize = () => {
      setElementTop(element.getBoundingClientRect().top + window.scrollY || window.pageYOffset)
      setClientHeight(window.innerHeight)
    }

    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [ref])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
