"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Service } from "@/lib/services"

interface ServiceCardProps {
  service: Service
  index: number
  isFiltered?: boolean
}

export default function ServiceCard({ service, index, isFiltered = true }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800/60 dark:hover:bg-gray-800/80",
        isFiltered ? "scale-100" : "scale-95 opacity-70",
      )}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={service.image || "/placeholder.svg?height=400&width=600"}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 p-6">
          <span className="inline-block rounded-full bg-green-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {service.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{service.name}</h3>
        <p className="mb-4 flex-1 text-gray-600 dark:text-gray-300">{service.shortDescription}</p>

        <div className="mb-4 space-y-2">
          {service.highlights?.slice(0, 3).map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Check size={16} className="text-green-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{highlight}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/services/${service.id}`}
          className="group mt-auto flex items-center justify-between rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40"
        >
          <span>Learn more</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  )
}
