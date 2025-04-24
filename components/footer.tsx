import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Yohannes Hovenier B.V."
                width={50}
                height={50}
                className="h-12 w-auto"
              />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-white">YOHANNES</h1>
                <p className="text-xs text-gray-300">Hovenier & groenonderhoud</p>
              </div>
            </Link>
            <p className="text-gray-300 text-sm">
              Hoogwaardige, duurzame groene ruimtes met enthousiasme en professionaliteit sinds 2022.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="mailto:info@yohanneshoveneirsbderijf.com"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Snelle Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary transition-colors">
                  Diensten
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-300 hover:text-primary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors">
                  Over Ons
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contactgegevens</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-300">Aristotelesstraat 993, 7323 NZ Apeldoorn</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <Link href="tel:0616638510" className="text-gray-300 hover:text-primary transition-colors">
                  06 1663 8510
                </Link>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <Link
                  href="mailto:info@yohanneshoveneirsbderijf.com"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  info@yohanneshoveneirsbderijf.com
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Openingstijden</h4>
              <p className="text-gray-300 text-sm">Maandag - Vrijdag: 08:00 - 17:00</p>
              <p className="text-gray-300 text-sm">Weekend: Gesloten</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Nieuwsbrief</h3>
            <p className="text-gray-300 text-sm mb-4">
              Schrijf u in voor onze nieuwsbrief voor tuintips en bedrijfsupdates.
            </p>
            <form className="space-y-2">
              <Input type="email" placeholder="Uw e-mailadres" className="bg-gray-800 border-gray-700 text-white" />
              <Button type="submit" className="w-full">
                Inschrijven
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Yohannes Hovenier B.V. Alle rechten voorbehouden.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="/privacy-policy" className="text-gray-400 text-sm hover:text-primary transition-colors">
              Privacybeleid
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 text-sm hover:text-primary transition-colors">
              Algemene Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
