"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltAmount?: number
  perspective?: number
  transitionSpeed?: number
}

export default function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  perspective = 1000,
  transitionSpeed = 0.15,
}: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isTilting, setIsTilting] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate mouse position relative to card
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate rotation based on mouse position
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -tiltAmount
    const rotateY = ((x - centerX) / centerX) * tiltAmount

    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseEnter = () => {
    setIsTilting(true)
  }

  const handleMouseLeave = () => {
    setIsTilting(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      transition={{
        type: "spring",
        duration: transitionSpeed,
      }}
    >
      {children}
    </motion.div>
  )
}
