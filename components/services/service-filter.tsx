"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Filter,
  ChevronDown,
  ChevronUp,
  Leaf,
  Truck,
  Building,
  Home,
  Scissors,
  TreesIcon as Tree,
  Shovel,
  Droplets,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

type ServiceCategory =
  | "all"
  | "residential"
  | "commercial"
  | "municipal"
  | "maintenance"
  | "landscaping"
  | "pruning"
  | "planting"
  | "irrigation"

interface ServiceFilterProps {
  onFilterChange: (category: ServiceCategory) => void
  activeFilter: ServiceCategory
  counts: Record<ServiceCategory, number>
}

const categoryIcons: Record<ServiceCategory, React.ReactNode> = {
  all: <Filter className="h-5 w-5" />,
  residential: <Home className="h-5 w-5" />,
  commercial: <Building className="h-5 w-5" />,
  municipal: <Truck className="h-5 w-5" />,
  maintenance: <Scissors className="h-5 w-5" />,
  landscaping: <Shovel className="h-5 w-5" />,
  pruning: <Tree className="h-5 w-5" />,
  planting: <Leaf className="h-5 w-5" />,
  irrigation: <Droplets className="h-5 w-5" />,
}

const categoryLabels: Record<ServiceCategory, string> = {
  all: "All Services",
  residential: "Residential",
  commercial: "Commercial",
  municipal: "Municipal",
  maintenance: "Maintenance",
  landscaping: "Landscaping",
  pruning: "Pruning",
  planting: "Planting",
  irrigation: "Irrigation",
}

export default function ServiceFilter({ onFilterChange, activeFilter, counts }: ServiceFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const category = searchParams.get("category") as ServiceCategory | null
    if (category && Object.keys(categoryLabels).includes(category)) {
      onFilterChange(category)
    }
  }, [searchParams, onFilterChange])

  const handleFilterClick = (category: ServiceCategory) => {
    onFilterChange(category)

    // Update URL parameters
    const params = new URLSearchParams(searchParams.toString())
    if (category === "all") {
      params.delete("category")
    } else {
      params.set("category", category)
    }

    router.replace(`${pathname}?${params.toString()}`)

    if (isMobile) {
      setIsExpanded(false)
    }
  }

  return (
    <div className="mb-8 w-full">
      <div className="flex flex-col gap-4">
        {/* Mobile filter dropdown */}
        <div className="relative md:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-left shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              {categoryIcons[activeFilter]}
              <span className="font-medium">{categoryLabels[activeFilter]}</span>
              <span className="ml-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {counts[activeFilter]}
              </span>
            </div>
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                {(Object.keys(categoryLabels) as ServiceCategory[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterClick(category)}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50",
                      category === activeFilter
                        ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        : "",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {categoryIcons[category]}
                      <span>{categoryLabels[category]}</span>
                    </div>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {counts[category]}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop filter tabs */}
        <div className="hidden md:block">
          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(categoryLabels) as ServiceCategory[]).map((category) => (
              <motion.button
                key={category}
                onClick={() => handleFilterClick(category)}
                className={cn(
                  "group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20",
                  category === activeFilter
                    ? "border-green-500 bg-green-50 text-green-700 dark:border-green-500/70 dark:bg-green-900/20 dark:text-green-400"
                    : "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300",
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className={cn(
                    "transition-colors",
                    category === activeFilter
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-500 group-hover:text-green-600 dark:text-gray-400 dark:group-hover:text-green-400",
                  )}
                >
                  {categoryIcons[category]}
                </span>
                <span>{categoryLabels[category]}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    category === activeFilter
                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
                  )}
                >
                  {counts[category]}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
