"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Leaf, Scissors, Shovel, Sprout, ChevronRight, Hammer, TreePine } from "lucide-react"
import ServiceShowcase from "@/components/services/service-showcase"
import ServiceProcess from "@/components/services/service-process"
import ServiceTestimonial from "@/components/services/service-testimonial"
import ServiceFAQ from "@/components/services/service-faq"
import ScrollReveal from "@/components/animations/scroll-reveal"
import ParallaxEffect from "@/components/animations/parallax-effect"
import CategoryCard from "@/components/services/category-card"
import { useInView } from "react-intersection-observer"

// Sample testimonials data
const testimonials = [
  {
    id: "testimonial-1",
    name: "Marieke de Vries",
    role: "Huiseigenaar",
    image: "/images/portfolio/jo10.jpg",
    quote:
      "Yohannes Hovenier heeft onze tuin compleet getransformeerd. Het team was professioneel, punctueel en heeft echt geluisterd naar onze wensen. We genieten nu elke dag van onze prachtige tuin!",
    service: "Complete Tuinonderhoud",
  },
  {
    id: "testimonial-2",
    name: "Jan Bakker",
    role: "Facilitair Manager",
    company: "ABC Kantoren",
    image: "/images/portfolio/jo16.jpg",
    quote:
      "Al jaren verzorgt Yohannes het groenonderhoud rond ons kantoorpand. De betrouwbaarheid en kwaliteit van hun werk is uitstekend. Het terrein ziet er altijd verzorgd uit, wat een goede indruk maakt op onze klanten.",
    service: "Bedrijfstuinen",
  },
  {
    id: "testimonial-3",
    name: "Gemeente Apeldoorn",
    role: "Afdeling Groenvoorziening",
    image: "/images/portfolio/jo12.jpg",
    quote:
      "De samenwerking met Yohannes Hovenier voor het onderhoud van onze gemeentelijke parken is zeer prettig. Hun ecologische aanpak heeft geleid tot een toename van biodiversiteit en positieve reacties van bewoners.",
    service: "Ecologisch Groenbeheer",
  },
]

// Process steps
const processSteps = [
  {
    title: "Kennismaking & Inventarisatie",
    description:
      "We beginnen met een persoonlijk gesprek om uw wensen en behoeften in kaart te brengen. We bekijken de locatie en bespreken de mogelijkheden.",
    icon: <Leaf className="h-8 w-8 text-primary" />,
  },
  {
    title: "Plan & Offerte",
    description:
      "Op basis van de inventarisatie stellen we een gedetailleerd plan en een transparante offerte op, zodat u precies weet wat u kunt verwachten.",
    icon: <Shovel className="h-8 w-8 text-primary" />,
  },
  {
    title: "Uitvoering",
    description:
      "Na uw goedkeuring gaan we aan de slag. Onze vakbekwame medewerkers voeren het werk uit met oog voor kwaliteit en detail.",
    icon: <Scissors className="h-8 w-8 text-primary" />,
  },
  {
    title: "Oplevering & Nazorg",
    description:
      "Na oplevering bespreken we het resultaat en geven we advies over onderhoud. We blijven beschikbaar voor vragen en vervolgdiensten.",
    icon: <Sprout className="h-8 w-8 text-primary" />,
  },
]

// FAQ data
const faqs = [
  {
    question: "Hoe vaak moet ik mijn tuin laten onderhouden?",
    answer:
      "Dit hangt af van het type tuin en uw persoonlijke wensen. Voor de meeste tuinen adviseren we een basisonderhoud van 6-8 keer per jaar, aangevuld met seizoensgebonden werkzaamheden. We stellen graag een onderhoudsplan op maat voor u op.",
  },
  {
    question: "Werken jullie met milieuvriendelijke methoden?",
    answer:
      "Absoluut! Duurzaamheid staat centraal in onze werkwijze. We gebruiken bij voorkeur biologische bestrijdingsmiddelen, werken met elektrisch gereedschap waar mogelijk, en adviseren over natuurvriendelijke tuininrichting die minder onderhoud en water vereist.",
  },
  {
    question: "Kan ik een onderhoudscontract afsluiten?",
    answer:
      "Ja, we bieden verschillende onderhoudscontracten aan, van maandelijks tot seizoensgebonden onderhoud. Een contract biedt u het gemak van een verzorgde tuin zonder zorgen, tegen een vooraf afgesproken tarief.",
  },
  {
    question: "Verzorgen jullie ook de afvoer van tuinafval?",
    answer:
      "Ja, bij al onze diensten is de afvoer van tuinafval inbegrepen. We zorgen ervoor dat alles netjes wordt opgeruimd en waar mogelijk wordt het groenafval duurzaam verwerkt of gecomposteerd.",
  },
  {
    question: "Geven jullie garantie op aangelegde beplanting?",
    answer:
      "We geven een jaar garantie op de aanplant, mits deze volgens onze adviezen wordt verzorgd. Bij een onderhoudscontract verlengen we deze garantie voor de duur van het contract.",
  },
]

// Service categories for the categories section
const serviceCategories = [
  {
    id: "tuinonderhoud",
    name: "Tuinonderhoud",
    description: "Vakkundige verzorging van uw tuin voor een gezonde en mooie buitenruimte het hele jaar door.",
    image: "/images/portfolio/garden-maintenance.jpeg",
    icon: <Leaf className="h-5 w-5" />,
    serviceCount: 4,
  },
  {
    id: "grasverzorging",
    name: "Grasverzorging",
    description: "Professionele diensten voor een perfect gazon, van aanleg tot onderhoud.",
    image: "/images/portfolio/lat2.jpeg",
    icon: <Scissors className="h-5 w-5" />,
    serviceCount: 2,
  },
  {
    id: "civiele-werken",
    name: "Civiele Werken",
    description: "Professionele aanleg van bestrating, terrassen, opritten en duurzame parkeeroplossingen.",
    image: "/images/portfolio/civil-works.jpeg",
    icon: <Hammer className="h-5 w-5" />,
    serviceCount: 2,
  },
  {
    id: "groenvoorziening",
    name: "Groenvoorziening",
    description: "Duurzame en ecologische groenoplossingen voor particuliere en openbare ruimtes.",
    image: "/images/portfolio/vegetation-control.jpeg",
    icon: <TreePine className="h-5 w-5" />,
    serviceCount: 2,
  },
]

export default function ServicesPage() {
  const [isMounted, setIsMounted] = useState(false)
  const { ref: showcaseRef, inView: showcaseInView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Prevent hydration errors
  }

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
      <section className="py-20 md:py-28 bg-gradient-to-b from-primary/10 to-white relative overflow-hidden">
        <ParallaxEffect className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></ParallaxEffect>
        <ParallaxEffect
          offset={30}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        ></ParallaxEffect>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              }}
            >
              <motion.div
                variants={fadeInUp}
                className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-4"
              >
                Professionele Dienstverlening
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Onze Diensten
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-gray-600 text-lg mb-8">
                Wij bieden een uitgebreid aanbod van tuinieren en landschapsdiensten om aan al uw buitenbehoeften te
                voldoen. Van tuinonderhoud tot civiele werken, wij zijn uw partner voor alle groene projecten.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="shadow-md hover:shadow-lg transition-shadow">
                  <Link href="#diensten">Bekijk Diensten</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="bg-white/80 backdrop-blur-sm hover:bg-white">
                  <Link href="/services/categories">Bekijk Categorieën</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="perspective-1000"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/20 rounded-tl-3xl z-0 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-br-3xl z-0 animate-pulse"></div>
                <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
                  <Image
                    src="/images/portfolio/garden-maintenance.jpeg"
                    alt="Professionele tuindiensten"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Onze Dienstcategorieën</h2>
              <p className="text-gray-600">
                Ontdek ons uitgebreide aanbod van diensten, georganiseerd per categorie om u te helpen precies te vinden
                wat u nodig heeft.
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {serviceCategories.map((category, index) => (
              <motion.div key={category.id} variants={fadeInUp}>
                <CategoryCard {...category} />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" className="group">
              <Link href="/services/categories" className="flex items-center gap-2">
                Alle Categorieën Bekijken
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Showcase Section */}
      <section id="diensten" className="py-16 md:py-24" ref={showcaseRef}>
        <div className="container">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ontdek Onze Diensten</h2>
              <p className="text-gray-600">
                Bekijk ons uitgebreide aanbod van diensten en vind de perfecte oplossing voor uw project. Filter op
                categorie of zoek specifieke diensten om precies te vinden wat u nodig heeft.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>{showcaseInView && <ServiceShowcase />}</ScrollReveal>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <ScrollReveal>
            <ServiceProcess steps={processSteps} />
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Wat Onze Klanten Zeggen</h2>
              <p className="text-gray-600">
                Ontdek waarom klanten kiezen voor onze diensten en hoe wij hun verwachtingen overtreffen.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <ServiceTestimonial testimonials={testimonials} />
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <ScrollReveal>
            <ServiceFAQ faqs={faqs} />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/texture-pattern.png')] opacity-5"></div>
        <ParallaxEffect className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl"></ParallaxEffect>
        <ParallaxEffect
          offset={30}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"
        ></ParallaxEffect>

        <div className="container relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Klaar om uw project te starten?</h2>
              <p className="text-lg">
                Neem vandaag nog contact met ons op voor een gratis adviesgesprek en offerte. Onze experts staan klaar
                om u te helpen bij het realiseren van uw droomproject.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-primary hover:bg-white/90 hover:text-primary shadow-lg hover:shadow-xl transition-shadow"
                  asChild
                >
                  <Link href="/contact">Offerte Aanvragen</Link>
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-primary-foreground/10 text-white border border-white/20 hover:bg-primary-foreground/20 shadow-lg hover:shadow-xl transition-shadow"
                  asChild
                >
                  <Link href="tel:0616638510">Bel Direct: 06 1663 8510</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
