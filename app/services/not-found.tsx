// Add a not-found page for services that don't exist
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Dienst Niet Gevonden</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        De dienst die u zoekt bestaat niet of is verwijderd. Bekijk onze andere diensten in ons aanbod.
      </p>
      <Button asChild>
        <Link href="/services">Terug naar Diensten</Link>
      </Button>
    </div>
  )
}
