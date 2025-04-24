"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface GalleryImage {
  src: string
  alt: string
  serviceId: string
}

interface ServiceGalleryProps {
  images: GalleryImage[]
  serviceId?: string
}

export default function ServiceGallery({ images, serviceId }: ServiceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  // Filter images by service if serviceId is provided
  const filteredImages = serviceId 
    ? images.filter(img => img.serviceId === serviceId)
    : images;
  
  // If no images for this service, don't render the component
  if (filteredImages.length === 0) return null;

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Our Work Gallery
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Browse through our portfolio of completed projects.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-md"
              onClick={() => openLightbox(image)}
            >
              <div className="relative h-64 w-full">
                \
\
