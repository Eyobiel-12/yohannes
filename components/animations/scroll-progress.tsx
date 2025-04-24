"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

interface ScrollProgressProps {
  color?: string
  height?: number
  zIndex?: number
}

export default function ScrollProgress({ color = "#16a34a", height = 4, zIndex = 50 }: ScrollProgressProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar after scrolling down a bit
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0"
      style={{
        scaleX,
        height,
        backgroundColor: color,
        transformOrigin: "0%",
        zIndex,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    />
  )
}
