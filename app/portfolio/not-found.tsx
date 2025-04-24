import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Project Niet Gevonden</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Het project dat u zoekt bestaat niet of is verwijderd. Bekijk onze andere projecten in ons portfolio.
      </p>
      <Button asChild>
        <Link href="/portfolio">Terug naar Portfolio</Link>
      </Button>
    </div>
  )
}
