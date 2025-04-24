"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Maximize2, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import TiltCard from "@/components/animations/tilt-card"
import ServiceFilter from "@/components/portfolio/service-filter"

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
  services?: string[]
  location?: string
  description?: string
  width: number
  height: number
}

interface PortfolioGalleryProps {
  images: GalleryImage[]
  categories: { id: string; name: string }[]
  services?: { id: string; name: string }[]
  selectedServices?: string[]
  onServiceFilterChange?: (services: string[]) => void
  className?: string
}

export default function PortfolioGallery({
  images,
  categories,
  services,
  selectedServices = [],
  onServiceFilterChange,
  className = "",
}: PortfolioGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
  const [isFiltering, setIsFiltering] = useState(false)

  // Filter images when category or services change
  useEffect(() => {
    setIsFiltering(true)

    // Small delay to allow for animation
    const timer = setTimeout(() => {
      const filtered = images.filter((image) => {
        // Filter by category
        if (selectedCategory !== "all" && image.category !== selectedCategory) {
          return false
        }

        // Filter by services if any are selected
        if (selectedServices && selectedServices.length > 0) {
          // If the image has no services or none of the selected services match
          if (!image.services || !image.services.some((service) => selectedServices.includes(service))) {
            return false
          }
        }

        return true
      })

      setFilteredImages(filtered)
      setIsFiltering(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [images, selectedCategory, selectedServices])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className={className}>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-wrap justify-center gap-2"
          >
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="rounded-full"
            >
              Alle Projecten
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Service Filter */}
      {services && services.length > 0 && (
        <ServiceFilter
          services={services}
          selectedServices={selectedServices}
          onChange={onServiceFilterChange || (() => {})}
          className="mb-8"
        />
      )}

      {/* Gallery Grid */}
      <AnimatePresence mode="wait">
        {isFiltering ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-20"
          >
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute top-2 left-2 w-12 h-12 border-4 border-primary/30 border-t-transparent rounded-full animate-spin-slow"></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`${selectedCategory}-${selectedServices.join("-")}`}
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                variants={item}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <TiltCard className="overflow-hidden rounded-lg shadow-lg cursor-pointer h-full bg-white dark:bg-gray-800">
                  <div className="relative aspect-[4/3] overflow-hidden group">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary hover:bg-primary/90">
                        {categories.find((c) => c.id === image.category)?.name || image.category}
                      </Badge>
                    </div>

                    {/* Expand button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/40"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImage(image)
                      }}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>

                    {/* Image info */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      onClick={() => setSelectedImage(image)}
                    >
                      <h3 className="text-white font-medium mb-1">{image.alt}</h3>
                      {image.location && <p className="text-white/80 text-sm">{image.location}</p>}

                      {/* Service tags */}
                      {image.services && image.services.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          <div className="flex items-center text-white/70 text-xs mr-1">
                            <Tag className="h-3 w-3 mr-1" />
                            <span>Diensten:</span>
                          </div>
                          {image.services.slice(0, 2).map((serviceId) => {
                            const serviceInfo = services?.find((s) => s.id === serviceId)
                            return serviceInfo ? (
                              <span
                                key={serviceId}
                                className={`text-xs px-1.5 py-0.5 rounded-sm ${
                                  selectedServices.includes(serviceId)
                                    ? "bg-primary/80 text-white"
                                    : "bg-white/20 text-white"
                                }`}
                              >
                                {serviceInfo.name}
                              </span>
                            ) : null
                          })}
                          {image.services.length > 2 && (
                            <span className="text-xs bg-white/20 text-white px-1.5 py-0.5 rounded-sm">
                              +{image.services.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!isFiltering && filteredImages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <X className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Geen projecten gevonden</h3>
          <p className="text-gray-500 mb-6">Er zijn geen projecten die overeenkomen met de geselecteerde filters.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory("all")
              if (onServiceFilterChange) onServiceFilterChange([])
            }}
          >
            Wis alle filters
          </Button>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>

              <motion.div
                className="relative w-full h-full max-h-[70vh] overflow-hidden rounded-lg"
                layoutId={`image-${selectedImage.id}`}
              >
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  width={selectedImage.width}
                  height={selectedImage.height}
                  className="object-contain w-full h-full rounded-lg"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 bg-white/10 backdrop-blur-md p-6 rounded-lg"
              >
                <h3 className="text-white text-xl font-medium mb-2">{selectedImage.alt}</h3>
                <div className="flex items-center mb-3">
                  <Badge className="mr-2 bg-primary">
                    {categories.find((c) => c.id === selectedImage.category)?.name || selectedImage.category}
                  </Badge>
                  {selectedImage.location && <span className="text-white/70 text-sm">{selectedImage.location}</span>}
                </div>

                {selectedImage.description && <p className="text-white/90 mb-4 text-sm">{selectedImage.description}</p>}

                {/* Display service tags in lightbox */}
                {selectedImage.services && selectedImage.services.length > 0 && (
                  <div>
                    <h4 className="text-white/70 text-sm mb-2 flex items-center">
                      <Tag className="h-4 w-4 mr-2" />
                      Diensten voor dit project:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.services.map((serviceId) => {
                        const serviceInfo = services?.find((s) => s.id === serviceId)
                        return serviceInfo ? (
                          <Badge
                            key={serviceId}
                            variant="outline"
                            className={`${
                              selectedServices.includes(serviceId)
                                ? "bg-primary/30 text-white border-primary/50"
                                : "bg-white/10 text-white border-white/20"
                            }`}
                          >
                            {serviceInfo.name}
                          </Badge>
                        ) : null
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
