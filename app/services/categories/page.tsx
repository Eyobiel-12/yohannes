"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Scissors, Hammer, TreePine } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ScrollReveal from "@/components/animations/scroll-reveal"
import TextReveal from "@/components/animations/text-reveal"
import { motion } from "framer-motion"

// Define service categories
const serviceCategories = [
  {
    id: "tuinonderhoud",
    name: "Tuinonderhoud",
    description: "Vakkundige verzorging van uw tuin voor een gezonde en mooie buitenruimte het hele jaar door.",
    icon: <Leaf className="h-8 w-8" />,
    color: "bg-green-100 text-green-600",
    image: "/images/portfolio/garden-maintenance.jpeg",
  },
  {
    id: "grasverzorging",
    name: "Grasverzorging",
    description: "Professionele diensten voor een perfect gazon, van aanleg tot onderhoud.",
    icon: <Scissors className="h-8 w-8" />,
    color: "bg-emerald-100 text-emerald-600",
    image: "/images/portfolio/lat2.jpeg",
  },
  {
    id: "civiele-werken",
    name: "Civiele Werken",
    description: "Professionele aanleg van bestrating, terrassen, opritten en duurzame parkeeroplossingen.",
    icon: <Hammer className="h-8 w-8" />,
    color: "bg-amber-100 text-amber-600",
    image: "/images/portfolio/civil-works.jpeg",
  },
  {
    id: "groenvoorziening",
    name: "Groenvoorziening",
    description: "Duurzame en ecologische groenoplossingen voor particuliere en openbare ruimtes.",
    icon: <TreePine className="h-8 w-8" />,
    color: "bg-lime-100 text-lime-600",
    image: "/images/portfolio/vegetation-control.jpeg",
  },
]

export default function ServiceCategoriesPage() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/10 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <TextReveal text="Dienstcategorieën" className="text-3xl md:text-4xl font-bold mb-4" />
            <ScrollReveal delay={300}>
              <p className="text-gray-600">
                Ontdek ons uitgebreide aanbod van diensten, georganiseerd per categorie om u te helpen precies te vinden
                wat u nodig heeft.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {serviceCategories.map((category, index) => (
              <motion.div key={category.id} variants={fadeInUp} whileHover={{ y: -8, transition: { duration: 0.3 } }}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${category.color} mb-2`}>
                        {category.icon}
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                    <p className="text-gray-600 mb-6">{category.description}</p>
                    <Button asChild className="group">
                      <Link href={`/services/categories/${category.id}`} className="flex items-center gap-2">
                        Bekijk Diensten
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Niet zeker welke dienst u nodig heeft?</h2>
            <p className="text-lg">
              Neem contact met ons op voor een gratis adviesgesprek. Onze experts helpen u graag bij het bepalen van de
              beste oplossing voor uw project.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-primary hover:bg-white/90 hover:text-primary shadow-lg hover:shadow-xl transition-shadow"
              asChild
            >
              <Link href="/contact">Neem Contact Op</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
