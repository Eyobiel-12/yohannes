"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/animations/scroll-reveal"
import PortfolioGallery from "@/components/portfolio/portfolio-gallery"
import TextReveal from "@/components/animations/text-reveal"
import ScrollProgress from "@/components/animations/scroll-progress"
import {
  Scissors,
  Leaf,
  Shovel,
  Sprout,
  Droplets,
  Sun,
  TreePine,
  Lightbulb,
  Hammer,
  PenTool,
  Layers,
} from "lucide-react"

// Project categories
const categories = [
  { id: "all", name: "Alle Projecten" },
  { id: "particuliere-tuinen", name: "Particuliere Tuinen" },
  { id: "bedrijfstuinen", name: "Bedrijfstuinen" },
  { id: "openbare-ruimtes", name: "Openbare Ruimtes" },
  { id: "civiele-projecten", name: "Civiele Projecten" },
]

// Services for filtering with icons
const services = [
  { id: "tuinontwerp", name: "Tuinontwerp", icon: <PenTool className="h-4 w-4" /> },
  { id: "tuinaanleg", name: "Tuinaanleg", icon: <Shovel className="h-4 w-4" /> },
  { id: "tuinonderhoud", name: "Tuinonderhoud", icon: <Leaf className="h-4 w-4" /> },
  { id: "snoeien", name: "Snoeien", icon: <Scissors className="h-4 w-4" /> },
  { id: "grasverzorging", name: "Grasverzorging", icon: <Sun className="h-4 w-4" /> },
  { id: "bestrating", name: "Bestrating", icon: <Layers className="h-4 w-4" /> },
  { id: "vijveraanleg", name: "Vijveraanleg", icon: <Droplets className="h-4 w-4" /> },
  { id: "beplanting", name: "Beplanting", icon: <Sprout className="h-4 w-4" /> },
  { id: "verlichting", name: "Tuinverlichting", icon: <Lightbulb className="h-4 w-4" /> },
  { id: "irrigatie", name: "Irrigatiesystemen", icon: <Droplets className="h-4 w-4" /> },
  { id: "civiele-werken", name: "Civiele Werken", icon: <Hammer className="h-4 w-4" /> },
  { id: "groenvoorziening", name: "Groenvoorziening", icon: <TreePine className="h-4 w-4" /> },
]

// Portfolio gallery images
const galleryImages = [
  {
    id: "hedge-trimming-1",
    src: "/images/portfolio/jo15.jpg",
    alt: "Professioneel snoeien van hagen bij een woning",
    category: "particuliere-tuinen",
    location: "Apeldoorn",
    description:
      "Onderhoud van hagen bij een particuliere woning, waarbij we zorgen voor strakke lijnen en gezonde planten.",
    width: 800,
    height: 1067,
  },
  {
    id: "lawn-maintenance-1",
    src: "/images/portfolio/lat1.jpeg",
    alt: "Gazononderhoud met professionele apparatuur",
    category: "particuliere-tuinen",
    location: "Epe",
    description: "Verticuteren van een gazon om mos te verwijderen en de gezondheid van het gras te bevorderen.",
    width: 800,
    height: 1067,
  },
  {
    id: "turf-installation",
    src: "/images/portfolio/lat2.jpeg",
    alt: "Aanleg van nieuw gazon met graszoden",
    category: "particuliere-tuinen",
    location: "Deventer",
    description: "Installatie van nieuwe graszoden voor een perfect gazon direct na aanleg.",
    width: 800,
    height: 1067,
  },
  {
    id: "hedge-maintenance-2",
    src: "/images/portfolio/jo13.jpg",
    alt: "Onderhoud van hagen en borders bij woningen",
    category: "particuliere-tuinen",
    location: "Apeldoorn",
    description: "Regulier onderhoud van hagen en borders bij een wooncomplex.",
    width: 800,
    height: 1067,
  },
  {
    id: "waterway-maintenance",
    src: "/images/portfolio/jo12.jpg",
    alt: "Onderhoud van vegetatie langs waterwegen",
    category: "openbare-ruimtes",
    location: "Zwolle",
    description: "Beheer van oevervegetatie langs waterwegen voor betere doorstroming en ecologisch evenwicht.",
    width: 800,
    height: 1067,
  },
  {
    id: "pathway-maintenance",
    src: "/images/portfolio/jo11.jpg",
    alt: "Onderhoud van groen langs wandelpaden",
    category: "openbare-ruimtes",
    location: "Deventer",
    description: "Snoeien en onderhouden van struiken langs openbare wandelpaden voor betere toegankelijkheid.",
    width: 800,
    height: 1067,
  },
  {
    id: "commercial-hedge",
    src: "/images/portfolio/jo10.jpg",
    alt: "Onderhoud van hagen bij bedrijfsterreinen",
    category: "bedrijfstuinen",
    location: "Apeldoorn",
    description: "Professioneel onderhoud van hagen en borders bij een bedrijfslocatie.",
    width: 800,
    height: 600,
  },
  {
    id: "company-vehicle-1",
    src: "/images/portfolio/lat3.jpeg",
    alt: "Bedrijfswagen van Yohannes Hovenier",
    category: "bedrijfstuinen",
    location: "Onderweg",
    description: "Onze professionele bedrijfswagen volledig uitgerust voor alle tuinwerkzaamheden.",
    width: 800,
    height: 1067,
  },
  {
    id: "company-vehicle-2",
    src: "/images/portfolio/jo16.jpg",
    alt: "Bedrijfswagen met logo op locatie",
    category: "bedrijfstuinen",
    location: "Projectlocatie",
    description: "Onze herkenbare bedrijfswagen klaar voor een nieuwe klus.",
    width: 800,
    height: 600,
  },
  {
    id: "garden-waste-removal",
    src: "/images/portfolio/jo14.jpg",
    alt: "Afvoer van tuinafval met kruiwagen",
    category: "particuliere-tuinen",
    location: "Apeldoorn",
    description: "Zorgvuldige afvoer van tuinafval na onderhoudswerkzaamheden.",
    width: 800,
    height: 1067,
  },
  // Add more images as needed
]

// Add services to each gallery image
const galleryImagesWithServices = galleryImages.map((image) => {
  // Add appropriate services based on the image category or other properties
  let imageServices: string[] = []

  // Assign services based on the image category and id
  if (image.category === "particuliere-tuinen") {
    if (image.id === "hedge-trimming-1" || image.id === "hedge-maintenance-2") {
      imageServices = ["tuinonderhoud", "snoeien"]
    } else if (image.id === "lawn-maintenance-1") {
      imageServices = ["tuinonderhoud", "grasverzorging"]
    } else if (image.id === "turf-installation") {
      imageServices = ["tuinaanleg", "grasverzorging"]
    } else if (image.id === "garden-waste-removal") {
      imageServices = ["tuinonderhoud"]
    }
  } else if (image.category === "openbare-ruimtes") {
    if (image.id === "waterway-maintenance") {
      imageServices = ["groenvoorziening", "tuinonderhoud"]
    } else if (image.id === "pathway-maintenance") {
      imageServices = ["groenvoorziening", "snoeien"]
    }
  } else if (image.category === "bedrijfstuinen") {
    if (image.id === "commercial-hedge") {
      imageServices = ["tuinonderhoud", "snoeien", "groenvoorziening"]
    } else if (image.id === "company-vehicle-1" || image.id === "company-vehicle-2") {
      imageServices = ["tuinonderhoud", "groenvoorziening"]
    }
  }

  return {
    ...image,
    services: imageServices,
  }
})

// Sample featured projects
const featuredProjects = [
  {
    id: "moderne-achtertuin-apeldoorn",
    title: "Moderne Achtertuin",
    category: "particuliere-tuinen",
    location: "Apeldoorn",
    date: "Juni 2023",
    excerpt: "Complete renovatie van een moderne achtertuin met terras, gazon en borders.",
    tags: ["Tuinontwerp", "Tuinaanleg", "Bestrating", "Beplanting"],
    thumbnail: "/images/portfolio/garden-maintenance.jpeg",
    featured: true,
    services: ["tuinontwerp", "tuinaanleg", "bestrating", "beplanting"],
  },
  {
    id: "bedrijfstuin-kantoorpand",
    title: "Bedrijfstuin Kantoorpand",
    category: "bedrijfstuinen",
    location: "Deventer",
    date: "Mei 2023",
    excerpt: "Onderhoud en seizoensgebonden beplanting voor een modern kantoorpand.",
    tags: ["Groenvoorziening", "Onderhoud", "Beplanting"],
    thumbnail: "/images/portfolio/commercial-landscaping.jpeg",
    featured: true,
    services: ["groenvoorziening", "tuinonderhoud", "beplanting"],
  },
  {
    id: "gemeentelijk-park-renovatie",
    title: "Gemeentelijk Park",
    category: "openbare-ruimtes",
    location: "Zwolle",
    date: "April 2023",
    excerpt: "Renovatie en onderhoud van een gemeentelijk park met focus op duurzaamheid.",
    tags: ["Groenvoorziening", "Onderhoud", "Beplanting", "Gazonbeheer"],
    thumbnail: "/images/portfolio/public-maintenance.jpeg",
    featured: true,
    services: ["groenvoorziening", "tuinonderhoud", "beplanting", "grasverzorging"],
  },
]

export default function PortfolioPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  useEffect(() => {
    setIsMounted(true)

    // Check URL params for pre-selected filters
    const urlParams = new URLSearchParams(window.location.search)
    const serviceParam = urlParams.get("service")
    if (serviceParam) {
      const serviceIds = serviceParam.split(",")
      const validServiceIds = serviceIds.filter((id) => services.some((s) => s.id === id))
      if (validServiceIds.length > 0) {
        setSelectedServices(validServiceIds)
      }
    }
  }, [])

  if (!isMounted) {
    return null // Prevent hydration errors
  }

  return (
    <>
      <ScrollProgress />

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <TextReveal text="Ons Portfolio" className="text-3xl md:text-4xl font-bold mb-4" />
            <ScrollReveal delay={300}>
              <p className="text-gray-600">
                Bekijk onze recente projecten en zie de kwaliteit van ons werk. Van particuliere tuinen tot
                bedrijfslandschappen, wij zijn trots op elk project.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Uitgelichte Projecten</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 100} direction="up">
                <Link href={`/portfolio/${project.id}`} className="block h-full">
                  <div className="group relative overflow-hidden rounded-lg shadow-lg h-full bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm opacity-90">{project.location}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{project.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Projectgalerij</h2>
          </ScrollReveal>

          <ScrollReveal>
            <PortfolioGallery
              images={galleryImagesWithServices}
              categories={categories}
              services={services}
              selectedServices={selectedServices}
              onServiceFilterChange={setSelectedServices}
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Uw Project in Ons Portfolio?</h2>
              <p className="text-gray-600 mb-6">
                Bent u op zoek naar een professioneel hovenierbedrijf voor uw volgende project? Wij helpen u graag met
                het realiseren van uw droomtuin of groenproject. Neem contact met ons op voor een vrijblijvend
                adviesgesprek en offerte.
              </p>
              <Button asChild>
                <Link href="/contact">Neem Contact Op</Link>
              </Button>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
                  <Image src="/images/portfolio/jo15.jpg" alt="Haagonderhoud" fill className="object-cover" />
                </div>
                <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
                  <Image src="/images/portfolio/lat2.jpeg" alt="Gazonaanleg" fill className="object-cover" />
                </div>
                <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
                  <Image src="/images/portfolio/jo12.jpg" alt="Wateronderhoud" fill className="object-cover" />
                </div>
                <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
                  <Image src="/images/portfolio/jo11.jpg" alt="Groenonderhoud" fill className="object-cover" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
