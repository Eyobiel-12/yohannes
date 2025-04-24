import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  return (
    <div className="container py-20 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-3xl text-center">
        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Bedankt voor uw aanvraag!</h1>
        <p className="text-gray-600 mb-8">
          We hebben uw offerteaanvraag ontvangen en zullen deze zo spoedig mogelijk verwerken. Een van onze medewerkers
          zal binnen 2 werkdagen contact met u opnemen om uw project te bespreken.
        </p>
        <p className="text-gray-600 mb-12">
          Heeft u in de tussentijd vragen? Neem dan gerust contact met ons op via{" "}
          <a href="tel:0616638510" className="text-primary hover:underline">
            06 1663 8510
          </a>{" "}
          of{" "}
          <a href="mailto:info@yohanneshoveneirsbderijf.nl" className="text-primary hover:underline">
            info@yohanneshoveneirsbderijf.nl
          </a>
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link href="/">Terug naar Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/portfolio">Bekijk Ons Portfolio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
