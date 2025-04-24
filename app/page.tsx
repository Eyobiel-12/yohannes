"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Scissors, Shovel, Sprout, ChevronRight, ArrowRight } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import ScrollReveal from "@/components/animations/scroll-reveal"
import ParallaxEffect from "@/components/animations/parallax-effect"
import TextReveal from "@/components/animations/text-reveal"
import MagneticButton from "@/components/animations/magnetic-button"

// This is a forced update to trigger a new deployment

export default function Home() {
  // Animation refs
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true })
  const { ref: servicesRef, inView: servicesInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: portfolioRef, inView: portfolioInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: blogRef, inView: blogInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="hero-section min-h-screen flex items-center pt-20 relative">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl text-white space-y-6">
            <TextReveal
              text="Samen Beter voor Buiten"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl"
            >
              Professioneel tuinonderhoud en groenbeheer in Overijssel & Gelderland. Wij leveren hoogwaardige, duurzame
              groene ruimtes met enthousiasme en professionaliteit.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <MagneticButton>
                <Button size="lg" asChild className="relative overflow-hidden group">
                  <Link href="/contact">
                    <span className="relative z-10">Gratis Offerte</span>
                    <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </Link>
                </Button>
              </MagneticButton>
              <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm hover:bg-white/20" asChild>
                <Link href="/services">
                  Onze Diensten <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-white/30 hidden lg:block"></div>
        <div className="absolute top-32 right-10 w-20 h-20 border-t-2 border-r-2 border-white/30 hidden lg:block"></div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="services-section py-20 relative overflow-hidden">
        <ParallaxEffect className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></ParallaxEffect>
        <ParallaxEffect
          offset={30}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        ></ParallaxEffect>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Onze Diensten</h2>
              <p className="text-gray-600">
                Wij bieden een uitgebreid aanbod van tuinieren en landschapsdiensten om aan al uw buitenbehoeften te
                voldoen.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal delay={100}>
              <Card className="service-card border-none shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform group-hover:scale-110">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Tuinonderhoud</h3>
                  <p className="text-gray-600 mb-4">
                    Wij zorgen voor het complete onderhoud van uw tuin, van regelmatig onderhoud tot seizoensgebonden
                    werk.
                  </p>
                  <Link
                    href="/services?tab=tuinonderhoud"
                    className="text-primary font-medium inline-flex items-center hover:underline"
                  >
                    Meer Informatie <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card className="service-card border-none shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scissors className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Grasverzorging</h3>
                  <p className="text-gray-600 mb-4">
                    Professionele grasverzorging voor een gezond en mooi gazon het hele jaar door.
                  </p>
                  <Link
                    href="/services?tab=grasverzorging"
                    className="text-primary font-medium inline-flex items-center hover:underline"
                  >
                    Meer Informatie <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <Card className="service-card border-none shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shovel className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Civiele Werken</h3>
                  <p className="text-gray-600 mb-4">
                    Professionele uitvoering van kleinschalige civiele projecten met oog voor detail.
                  </p>
                  <Link
                    href="/services?tab=civiele-werken"
                    className="text-primary font-medium inline-flex items-center hover:underline"
                  >
                    Meer Informatie <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <Card className="service-card border-none shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sprout className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Groenvoorziening</h3>
                  <p className="text-gray-600 mb-4">
                    Een groene omgeving bevordert de gezondheid en vereist onderhoud, dat door vakbekwame medewerkers
                    wordt uitgevoerd.
                  </p>
                  <Link
                    href="/services?tab=groenvoorziening"
                    className="text-primary font-medium inline-flex items-center hover:underline"
                  >
                    Meer Informatie <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={500}>
            <div className="text-center mt-12">
              <MagneticButton>
                <Button variant="outline" asChild>
                  <Link href="/services">
                    Bekijk Alle Diensten <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section ref={portfolioRef} className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Werk</h2>
              <p className="text-gray-600">
                Bekijk enkele van onze recente projecten. Onze portfolio toont de kwaliteit en diversiteit van ons werk.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal delay={100}>
              <div className="group relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
                <Image
                  src="/images/portfolio/jo15.jpg"
                  alt="Haagonderhoud bij woning"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-medium">Haagonderhoud</p>
                  <p className="text-sm opacity-90">Particuliere tuin in Apeldoorn</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="group relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
                <Image
                  src="/images/portfolio/lat2.jpeg"
                  alt="Gazonaanleg project"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-medium">Gazonaanleg</p>
                  <p className="text-sm opacity-90">Nieuwbouwproject in Deventer</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="group relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
                <Image
                  src="/images/portfolio/jo12.jpg"
                  alt="Onderhoud waterpartij"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-medium">Waterpartij Onderhoud</p>
                  <p className="text-sm opacity-90">Openbare ruimte in Zwolle</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={400}>
            <div className="text-center mt-12">
              <MagneticButton>
                <Button asChild>
                  <Link href="/portfolio">
                    Bekijk Ons Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/texture-pattern.png')] opacity-5"></div>
        <ParallaxEffect className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl"></ParallaxEffect>
        <ParallaxEffect
          offset={30}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"
        ></ParallaxEffect>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold">Klaar om uw tuin te transformeren?</h2>
              <p className="text-lg">
                Neem vandaag nog contact met ons op voor een gratis adviesgesprek en offerte. Laten we samen een
                prachtige buitenruimte creëren.
              </p>
              <MagneticButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-primary hover:bg-white/90 hover:text-primary"
                  asChild
                >
                  <Link href="/contact">Begin Vandaag</Link>
                </Button>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
