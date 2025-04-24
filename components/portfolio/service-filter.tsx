"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Filter, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceFilterProps {
  services: { id: string; name: string; icon?: React.ReactNode }[]
  selectedServices: string[]
  onChange: (services: string[]) => void
  className?: string
}

export default function ServiceFilter({ services, selectedServices, onChange, className }: ServiceFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      onChange(selectedServices.filter((id) => id !== serviceId))
    } else {
      onChange([...selectedServices, serviceId])
    }
  }

  const clearFilters = () => {
    onChange([])
  }

  // Close filter panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node) && isExpanded) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded])

  return (
    <div className={cn("relative", className)} ref={filterRef}>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant={isExpanded ? "default" : "outline"}
          className={cn(
            "flex items-center gap-2 transition-all duration-300",
            selectedServices.length > 0 && !isExpanded && "border-primary text-primary",
          )}
        >
          <Filter className={cn("h-4 w-4", isExpanded && "animate-pulse")} />
          Filter op diensten
          {selectedServices.length > 0 && (
            <Badge className="ml-1 bg-primary text-white">{selectedServices.length}</Badge>
          )}
        </Button>

        {selectedServices.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs flex items-center gap-1 hover:bg-destructive/10 hover:text-destructive"
            onClick={clearFilters}
          >
            <X className="h-3 w-3" />
            Wis filters
          </Button>
        )}
      </div>

      {/* Selected service badges */}
      <AnimatePresence>
        {selectedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap justify-center gap-2 mb-6"
          >
            {selectedServices.map((serviceId) => {
              const service = services.find((s) => s.id === serviceId)
              return service ? (
                <motion.div
                  key={serviceId}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1 px-3 py-1 cursor-pointer"
                    onClick={() => toggleService(serviceId)}
                  >
                    {service.name}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                </motion.div>
              ) : null
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
              <h4 className="font-medium mb-4 text-center">Selecteer diensten om te filteren</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleService(service.id)}
                    className={cn(
                      "p-3 rounded-lg cursor-pointer transition-all duration-200 flex flex-col items-center text-center",
                      selectedServices.includes(service.id)
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600",
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                        selectedServices.includes(service.id)
                          ? "bg-primary text-white"
                          : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300",
                      )}
                    >
                      {selectedServices.includes(service.id) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        service.icon || <div className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{service.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
