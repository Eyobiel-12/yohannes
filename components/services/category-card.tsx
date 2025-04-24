"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CategoryCardProps {
  id: string
  name: string
  description: string
  image: string
  icon: React.ReactNode
  serviceCount: number
  className?: string
}

export default function CategoryCard({
  id,
  name,
  description,
  image,
  icon,
  serviceCount,
  className,
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-800 h-full flex flex-col",
        className,
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">{icon}</div>
            <h3 className="text-xl font-bold">{name}</h3>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{serviceCount} diensten</span>
          <Button asChild variant="outline" size="sm" className="group">
            <Link href={`/services/categories/${id}`} className="flex items-center gap-2">
              Bekijk
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
