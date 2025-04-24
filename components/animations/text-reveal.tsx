"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation, type Variant } from "framer-motion"

interface TextRevealProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  duration?: number
  threshold?: number
  variants?: {
    hidden: Variant
    visible: Variant
  }
}

export default function TextReveal({
  text,
  className = "",
  once = true,
  delay = 0.25,
  duration = 0.05,
  threshold = 0.1,
  variants,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, threshold })
  const controls = useAnimation()

  const defaultVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * duration + delay,
      },
    }),
  }

  const selectedVariants = variants || defaultVariants

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  return (
    <div ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-1.5">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              custom={(wordIndex + charIndex) * 0.5}
              variants={selectedVariants}
              initial="hidden"
              animate={controls}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  )
}
