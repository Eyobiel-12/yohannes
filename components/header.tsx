"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Diensten", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Over Ons", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="Yohannes Hovenier B.V." width={50} height={50} className="h-12 w-auto" />
          <div className="ml-3">
            <h1 className="text-xl font-bold text-primary dark:text-white">YOHANNES</h1>
            <p className="text-xs text-gray-600 dark:text-gray-300">Hovenier & groenonderhoud</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-gray-700 dark:text-gray-200",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="tel:0616638510"
            className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary"
          >
            <Phone className="h-4 w-4 mr-2" />
            06 1663 8510
          </Link>
          <Button asChild>
            <Link href="/contact">Offerte Aanvragen</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-200">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu openen</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-6 border-b">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/images/logo.png"
                      alt="Yohannes Hovenier B.V."
                      width={40}
                      height={40}
                      className="h-10 w-auto"
                    />
                    <div className="ml-2">
                      <h1 className="text-lg font-bold text-primary">YOHANNES</h1>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Hovenier & groenonderhoud</p>
                    </div>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Menu sluiten</span>
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="flex flex-col space-y-6 py-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-gray-700 dark:text-gray-200",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto pt-6 border-t">
                  <Link
                    href="tel:0616638510"
                    className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary mb-4"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    06 1663 8510
                  </Link>
                  <Button asChild className="w-full">
                    <Link href="/contact">Offerte Aanvragen</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
