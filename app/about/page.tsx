import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <>
      <section className="relative py-12 md:py-20 overflow-hidden">
        {/* Background image collage */}
        <div className="absolute inset-0 grid grid-cols-4 opacity-20">
          <div className="w-full h-full">
            <Image src="/images/portfolio/jo10.jpg" alt="Garden project" fill className="object-cover" />
          </div>
          <div className="w-full h-full">
            <Image src="/images/portfolio/jo13.jpg" alt="Garden project" fill className="object-cover" />
          </div>
          <div className="w-full h-full">
            <Image src="/images/portfolio/yo2.jpg" alt="Garden project" fill className="object-cover" />
          </div>
          <div className="w-full h-full">
            <Image src="/images/portfolio/lat3.jpeg" alt="Garden project" fill className="object-cover" />
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-white"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block bg-white/70 backdrop-blur-sm px-6 py-2 rounded-full mb-4">
              <span className="text-primary font-medium">Yohannes Hoveniersbedrijf B.V.</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Over Ons</h1>
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-gray-700 text-lg">
                Wij zijn een professioneel hoveniersbedrijf gespecialiseerd in tuinonderhoud, groenvoorziening en
                boomverzorging in Overijssel en Gelderland.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Onze Missie</h2>
                <p className="text-gray-600 mb-4">
                  Bij Yohannes Hoveniersbedrijf streven we ernaar om hoogwaardige en duurzame groene ruimtes te creëren
                  en te onderhouden die bijdragen aan een betere leefomgeving voor onze klanten.
                </p>
                <p className="text-gray-600">
                  We werken met passie en vakmanschap om elke tuin en groenvoorziening te transformeren in een
                  prachtige, functionele buitenruimte die het hele jaar door genot brengt.
                </p>
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                <Image src="/images/portfolio/jo11.jpg" alt="Garden maintenance" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ons Team</h2>
            <p className="text-gray-600">
              Ons ervaren team van hoveniers en groenspecialisten staat klaar om uw projecten met enthousiasme en
              professionaliteit uit te voeren.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64">
                <Image src="/images/portfolio/yo1.jpg" alt="Yohannes - Founder" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Yohannes Hovenier</h3>
                <p className="text-gray-500 mb-2">Oprichter & Hoofdhovenier</p>
                <p className="text-gray-600">
                  Met meer dan 15 jaar ervaring in de groensector, leidt Yohannes ons team met passie en expertise.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64">
                <Image src="/images/portfolio/yo4.jpg" alt="Team member" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Mark Bergman</h3>
                <p className="text-gray-500 mb-2">Senior Hovenier</p>
                <p className="text-gray-600">
                  Gespecialiseerd in tuinontwerp en aanleg, met een voorliefde voor duurzame tuinoplossingen.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64">
                <Image src="/images/portfolio/yo7.jpg" alt="Team member" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Sophie de Vries</h3>
                <p className="text-gray-500 mb-2">Groenspecialist</p>
                <p className="text-gray-600">
                  Expert in plantenverzorging en ecologisch verantwoord tuinieren voor optimale biodiversiteit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-40 rounded-lg overflow-hidden shadow-md">
                    <Image src="/images/portfolio/yo3.jpg" alt="Company values" fill className="object-cover" />
                  </div>
                  <div className="relative h-40 rounded-lg overflow-hidden shadow-md">
                    <Image src="/images/portfolio/yo5.jpg" alt="Company values" fill className="object-cover" />
                  </div>
                  <div className="relative h-40 rounded-lg overflow-hidden shadow-md">
                    <Image src="/images/portfolio/jo15.jpg" alt="Company values" fill className="object-cover" />
                  </div>
                  <div className="relative h-40 rounded-lg overflow-hidden shadow-md">
                    <Image src="/images/portfolio/jo16.jpg" alt="Company values" fill className="object-cover" />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Onze Waarden</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Kwaliteit</h3>
                      <p className="text-gray-600">
                        We streven naar uitmuntendheid in elk aspect van ons werk, van ontwerp tot onderhoud.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Duurzaamheid</h3>
                      <p className="text-gray-600">
                        We gebruiken milieuvriendelijke methoden en materialen om de natuur te beschermen.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Integriteit</h3>
                      <p className="text-gray-600">
                        We handelen eerlijk en transparant in alle aspecten van onze dienstverlening.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Klaar om uw buitenruimte te transformeren?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Neem vandaag nog contact met ons op voor een gratis offerte en ontdek hoe wij uw tuin of groenvoorziening
              kunnen verbeteren.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="px-8 py-6 text-base">
                <Link href="/contact">Contact Opnemen</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-base">
                <Link href="/portfolio">Bekijk Ons Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
