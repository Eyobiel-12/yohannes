"use client"

import { useState, useEffect } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Scissors, Sprout, Droplets, TreePine, Hammer, Lightbulb, ArrowLeft } from "lucide-react"
import ScrollReveal from "@/components/animations/scroll-reveal"
import ParallaxEffect from "@/components/animations/parallax-effect"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Define service categories with details
const serviceCategories = [
  {
    id: "tuinonderhoud",
    name: "Tuinonderhoud",
    title: "Professioneel Tuinonderhoud",
    description: "Vakkundige verzorging van uw tuin voor een gezonde en mooie buitenruimte het hele jaar door.",
    longDescription: `Onze tuinonderhoudsdiensten zorgen ervoor dat uw tuin er het hele jaar door op zijn best uitziet. 
    Met jarenlange ervaring en vakkennis bieden wij complete onderhoudsoplossingen voor particuliere tuinen, 
    bedrijfstuinen en openbare ruimtes. Van regelmatig onderhoud zoals snoeien, maaien en onkruidbestrijding 
    tot seizoensgebonden werkzaamheden zoals bladruimen en voorjaarsbemesting - wij zorgen voor een gezonde 
    en verzorgde tuin in elk seizoen.`,
    icon: <Leaf className="h-6 w-6" />,
    image: "/images/portfolio/garden-maintenance.jpeg",
    benefits: [
      "Regelmatig onderhoud door ervaren hoveniers",
      "Seizoensgebonden tuinwerkzaamheden",
      "Persoonlijk onderhoudsplan op maat",
      "Behoud van een gezonde en mooie tuin",
    ],
    featuredServices: ["complete-tuinonderhoud", "snoeiwerkzaamheden", "vijveraanleg"],
  },
  {
    id: "grasverzorging",
    name: "Grasverzorging",
    title: "Specialistische Grasverzorging",
    description: "Professionele diensten voor een perfect gazon, van aanleg tot onderhoud.",
    longDescription: `Een mooi gazon is de trots van elke tuin. Onze specialistische grasverzorgingsdiensten 
    omvatten alles wat nodig is voor een perfect gazon: van de aanleg van nieuwe gazons met hoogwaardige 
    graszoden of zaaigoed tot het complete onderhoud met maaien, verticuteren, beluchten en bemesten. 
    Onze experts kennen alle geheimen van een gezond en sterk gazon dat bestand is tegen droogte, 
    ziekten en intensief gebruik.`,
    icon: <Scissors className="h-6 w-6" />,
    image: "/images/portfolio/lat2.jpeg",
    benefits: [
      "Sterk en gezond gazon dat bestand is tegen droogte en ziekten",
      "Regelmatig onderhoud voor een constant mooi resultaat",
      "Professionele apparatuur voor optimale resultaten",
      "Advies over gazononderhoud en -beheer",
    ],
    featuredServices: ["professionele-grasverzorging", "gazonaanleg"],
  },
  {
    id: "civiele-werken",
    name: "Civiele Werken",
    title: "Civiele Werken & Bestrating",
    description: "Professionele aanleg van bestrating, terrassen, opritten en duurzame parkeeroplossingen.",
    longDescription: `Onze civiele werkzaamheden omvatten alle vormen van bestrating en verharding voor zowel 
    particuliere als zakelijke projecten. Van sierbestrating voor terrassen en tuinpaden tot functionele 
    verharding voor opritten en parkeerterreinen - wij zorgen voor een vakkundige aanleg met oog voor detail 
    en duurzaamheid. Daarbij bieden wij innovatieve oplossingen zoals waterdoorlatende bestrating en 
    geïntegreerde groenvoorzieningen voor een optimale balans tussen functionaliteit en milieuvriendelijkheid.`,
    icon: <Hammer className="h-6 w-6" />,
    image: "/images/portfolio/civil-works.jpeg",
    benefits: [
      "Vakkundige aanleg met oog voor detail",
      "Duurzame materialen en constructie",
      "Perfecte waterafvoer door juiste afschot",
      "Combinatie van functionaliteit en esthetiek",
    ],
    featuredServices: ["bestrating-en-verharding", "duurzame-parkeerterreinen"],
  },
  {
    id: "groenvoorziening",
    name: "Groenvoorziening",
    title: "Professionele Groenvoorziening",
    description: "Duurzame en ecologische groenoplossingen voor particuliere en openbare ruimtes.",
    longDescription: `Onze groenvoorzieningsdiensten richten zich op het creëren en onderhouden van duurzame 
    groene ruimtes met aandacht voor ecologie en biodiversiteit. Wij verzorgen complete beplantingsplannen 
    met zorgvuldig geselecteerde planten die passen bij de specifieke omstandigheden en wensen. Daarnaast 
    bieden wij ecologisch groenbeheer waarbij we werken met natuurlijke processen en inheemse soorten om 
    groenvoorzieningen te creëren die niet alleen mooi zijn, maar ook ecologisch waardevol.`,
    icon: <TreePine className="h-6 w-6" />,
    image: "/images/portfolio/vegetation-control.jpeg",
    benefits: [
      "Verhoogde biodiversiteit en ecologische waarde",
      "Planten die gedijen in uw specifieke situatie",
      "Jaarrond sierwaarde door zorgvuldige planning",
      "Onderhoudsarm door juiste plantenkeuze",
    ],
    featuredServices: ["ecologisch-groenbeheer", "beplantingsplannen"],
  },
]

// Define services data (simplified version from the service detail page)
const servicesData = [
  {
    id: "complete-tuinonderhoud",
    title: "Complete Tuinonderhoud",
    shortDescription: "Professioneel onderhoud voor een verzorgde tuin het hele jaar door",
    icon: <Leaf className="h-6 w-6" />,
    image: "/images/portfolio/garden-maintenance.jpeg",
    category: "tuinonderhoud",
    popular: true,
  },
  {
    id: "snoeiwerkzaamheden",
    title: "Snoeiwerkzaamheden",
    shortDescription: "Vakkundig snoeien voor gezonde en mooie planten",
    icon: <Scissors className="h-6 w-6" />,
    image: "/images/portfolio/jo15.jpg",
    category: "tuinonderhoud",
  },
  {
    id: "professionele-grasverzorging",
    title: "Professionele Grasverzorging",
    shortDescription: "Voor een gezond en mooi gazon het hele jaar door",
    icon: <Scissors className="h-6 w-6" />,
    image: "/images/portfolio/lat2.jpeg",
    category: "grasverzorging",
    popular: true,
  },
  {
    id: "gazonaanleg",
    title: "Gazonaanleg",
    shortDescription: "Nieuwe gazons van hoge kwaliteit voor een perfect resultaat",
    icon: <Sprout className="h-6 w-6" />,
    image: "/images/portfolio/lat1.jpeg",
    category: "grasverzorging",
  },
  {
    id: "duurzame-parkeerterreinen",
    title: "Duurzame Parkeerterreinen",
    shortDescription: "Functionele en milieuvriendelijke parkeeroplossingen",
    icon: <Hammer className="h-6 w-6" />,
    image: "/images/portfolio/civil-works.jpeg",
    category: "civiele-werken",
  },
  {
    id: "bestrating-en-verharding",
    title: "Bestrating & Verharding",
    shortDescription: "Professionele bestrating voor paden, terrassen en opritten",
    icon: <Hammer className="h-6 w-6" />,
    image: "/images/portfolio/roadside-maintenance.jpeg",
    category: "civiele-werken",
    popular: true,
  },
  {
    id: "vijveraanleg",
    title: "Vijveraanleg",
    shortDescription: "Natuurlijke waterpartijen voor een levendige tuin",
    icon: <Droplets className="h-6 w-6" />,
    image: "/images/portfolio/jo12.jpg",
    category: "tuinonderhoud",
  },
  {
    id: "ecologisch-groenbeheer",
    title: "Ecologisch Groenbeheer",
    shortDescription: "Duurzaam beheer van groenvoorzieningen met oog voor biodiversiteit",
    icon: <TreePine className="h-6 w-6" />,
    image: "/images/portfolio/vegetation-control.jpeg",
    category: "groenvoorziening",
  },
  {
    id: "beplantingsplannen",
    title: "Beplantingsplannen",
    shortDescription: "Professionele plantenkennis voor de juiste plant op de juiste plaats",
    icon: <Sprout className="h-6 w-6" />,
    image: "/images/portfolio/flowering-hedge.jpeg",
    category: "groenvoorziening",
  },
  {
    id: "tuinverlichting",
    title: "Tuinverlichting",
    shortDescription: "Sfeervolle verlichting voor extra lange tuingenot",
    icon: <Lightbulb className="h-6 w-6" />,
    image: "/images/bg-2.jpeg",
    category: "tuinonderhoud",
  },
]

export default function CategoryPage() {
  const params = useParams()
  const [isMounted, setIsMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Prevent hydration errors
  }

  const categoryId = params.categoryId as string
  const category = serviceCategories.find((c) => c.id === categoryId)

  if (!category) {
    notFound()
  }

  // Filter services for this category
  const categoryServices = servicesData.filter((service) => service.category === categoryId)

  // Get featured services if specified, otherwise use the first 3 services
  const featuredServices = category.featuredServices
    ? servicesData.filter((service) => category.featuredServices?.includes(service.id))
    : categoryServices.slice(0, 3)

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
      <section className="relative bg-gradient-to-b from-primary/10 to-white py-16 md:py-24 overflow-hidden">
        <ParallaxEffect className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></ParallaxEffect>
        <ParallaxEffect
          offset={30}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        ></ParallaxEffect>

        <div className="container relative z-10">
          <Link href="/services" className="mb-6 inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            <span>Terug naar alle diensten</span>
          </Link>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 items-center">
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
                {category.name}
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {category.title}
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-gray-600 text-lg mb-8">
                {category.description}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="shadow-md hover:shadow-lg transition-shadow">
                  <Link href="#diensten">Bekijk Diensten</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="bg-white/80 backdrop-blur-sm hover:bg-white">
                  <Link href="/contact">Offerte Aanvragen</Link>
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
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
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

      {/* About Category Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                  <TabsTrigger value="overview">Overzicht</TabsTrigger>
                  <TabsTrigger value="benefits">Voordelen</TabsTrigger>
                  <TabsTrigger value="approach">Aanpak</TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="overview" className="space-y-4">
                      <h2 className="text-3xl font-bold mb-6 text-center">Over {category.name}</h2>
                      <div className="prose max-w-none text-gray-600">
                        <p className="text-lg leading-relaxed">{category.longDescription}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="benefits">
                      <h2 className="text-3xl font-bold mb-6 text-center">Voordelen van onze {category.name}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {category.benefits.map((benefit, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-lg">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="approach">
                      <h2 className="text-3xl font-bold mb-6 text-center">Onze Aanpak</h2>
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <ol className="space-y-6">
                          <li className="flex gap-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                              1
                            </div>
                            <div>
                              <h3 className="text-xl font-bold mb-2">Persoonlijke Inventarisatie</h3>
                              <p className="text-gray-600">
                                We beginnen met een grondige inventarisatie van uw wensen en de specifieke situatie. Dit
                                vormt de basis voor een plan op maat.
                              </p>
                            </div>
                          </li>
                          <li className="flex gap-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                              2
                            </div>
                            <div>
                              <h3 className="text-xl font-bold mb-2">Professioneel Advies</h3>
                              <p className="text-gray-600">
                                Op basis van onze expertise geven we u advies over de beste aanpak en mogelijkheden voor
                                uw specifieke situatie.
                              </p>
                            </div>
                          </li>
                          <li className="flex gap-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                              3
                            </div>
                            <div>
                              <h3 className="text-xl font-bold mb-2">Vakkundige Uitvoering</h3>
                              <p className="text-gray-600">
                                Ons team van ervaren professionals voert de werkzaamheden uit met oog voor detail en
                                kwaliteit.
                              </p>
                            </div>
                          </li>
                          <li className="flex gap-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                              4
                            </div>
                            <div>
                              <h3 className="text-xl font-bold mb-2">Nazorg & Onderhoud</h3>
                              <p className="text-gray-600">
                                We bieden uitgebreide nazorg en onderhoudsplannen om ervoor te zorgen dat het resultaat
                                langdurig mooi blijft.
                              </p>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Uitgelichte {category.name} Diensten</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Ontdek onze meest populaire diensten binnen {category.name.toLowerCase()} en zie hoe wij u kunnen
                helpen.
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-800 h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {service.popular && (
                    <Badge className="absolute right-2 top-2 bg-primary shadow-lg">
                      <span className="animate-pulse mr-1">●</span> Populair
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">{service.icon}</div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{service.title}</h3>
                  </div>
                  <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow">{service.shortDescription}</p>
                  <Button asChild variant="outline" className="w-full mt-auto group-hover:bg-primary/5">
                    <Link href={`/services/${service.id}`} className="flex items-center justify-center gap-2">
                      <span>Meer informatie</span>
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Category Services Section */}
      <section id="diensten" className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Alle {category.name} Diensten</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Bekijk ons complete aanbod van {category.name.toLowerCase()} diensten en vind de perfecte oplossing voor
                uw project.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryServices.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 100}>
                <Link href={`/services/${service.id}`} className="block h-full">
                  <div
                    className={cn(
                      "group relative overflow-hidden rounded-lg shadow-lg h-full bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
                      service.popular && "ring-2 ring-primary/20",
                    )}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-medium flex items-center gap-2">
                          Bekijk details <ArrowRight className="h-4 w-4" />
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full bg-primary/10 p-1.5 text-primary group-hover:bg-primary/20 transition-colors">
                          {service.icon}
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
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
              <h2 className="text-3xl md:text-4xl font-bold">
                Klaar om uw {category.name.toLowerCase()} project te starten?
              </h2>
              <p className="text-lg">
                Neem vandaag nog contact met ons op voor een gratis adviesgesprek en offerte. Onze experts staan klaar
                om u te helpen bij het realiseren van uw wensen.
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
