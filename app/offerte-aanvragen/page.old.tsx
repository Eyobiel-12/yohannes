"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { nl } from "date-fns/locale"
import { CalendarIcon, CheckCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { FileUploader } from "@/components/quote-form/file-uploader"
import { ProjectTypeSelector } from "@/components/quote-form/project-type-selector"

// Form schema for validation
const formSchema = z.object({
  // Persoonlijke informatie
  name: z.string().min(2, { message: "Naam moet minimaal 2 karakters bevatten" }),
  email: z.string().email({ message: "Voer een geldig e-mailadres in" }),
  phone: z.string().min(10, { message: "Voer een geldig telefoonnummer in" }),
  address: z.string().min(5, { message: "Voer een geldig adres in" }),
  postalCode: z.string().min(6, { message: "Voer een geldige postcode in" }),
  city: z.string().min(2, { message: "Voer een geldige plaats in" }),

  // Project informatie
  projectType: z.string({ required_error: "Selecteer een projecttype" }),
  projectScope: z.string({ required_error: "Selecteer een projectomvang" }),
  projectDescription: z.string().min(10, { message: "Beschrijving moet minimaal 10 karakters bevatten" }),

  // Specifieke details
  propertyType: z.string().optional(),
  gardenSize: z.string().optional(),
  existingGarden: z.string().optional(),

  // Diensten
  services: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Selecteer minimaal één dienst",
  }),

  // Planning
  timeframe: z.string().optional(),
  preferredStartDate: z.date().optional(),

  // Budget
  budget: z.string().optional(),

  // Extra informatie
  additionalInfo: z.string().optional(),

  // Voorwaarden
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "U moet akkoord gaan met de voorwaarden",
  }),
})

// Service options
const serviceOptions = [
  { id: "tuinontwerp", label: "Tuinontwerp" },
  { id: "tuinaanleg", label: "Tuinaanleg" },
  { id: "tuinonderhoud", label: "Tuinonderhoud" },
  { id: "snoeien", label: "Snoeien" },
  { id: "grasverzorging", label: "Grasverzorging" },
  { id: "bestrating", label: "Bestrating" },
  { id: "vijveraanleg", label: "Vijveraanleg" },
  { id: "beplanting", label: "Beplanting" },
  { id: "verlichting", label: "Tuinverlichting" },
  { id: "irrigatie", label: "Irrigatiesystemen" },
  { id: "civiele-werken", label: "Civiele Werken" },
  { id: "groenvoorziening", label: "Groenvoorziening" },
]

export default function QuoteRequestPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      city: "",
      projectType: "",
      projectScope: "",
      projectDescription: "",
      propertyType: "",
      gardenSize: "",
      existingGarden: "",
      services: [],
      timeframe: "",
      budget: "",
      additionalInfo: "",
      termsAccepted: false,
    },
  })
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    
    // Simulate form submission with a delay
    setTimeout(() => {
      console.log("Form values:", values)
      console.log("Uploaded files:", uploadedFiles)
      
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Redirect to thank you page after 2 seconds
      setTimeout(() => {
        router.push("/offerte-aanvragen/bedankt")
      }, 2000)
    }, 1500)
  }
  
  const nextStep = async () => {
    let canProceed = false
    
    if (step === 1) {
      const result = await form.trigger(['name', 'email', 'phone', 'address', 'postalCode', 'city'])
      canProceed = result
    } else if (step === 2) {
      const result = await form.trigger(['projectType', 'projectScope', 'projectDescription'])
      canProceed = result
    } else if (step === 3) {
      const result = await form.trigger(['services'])
      canProceed = result
    }
    
    if (canProceed) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }
  
  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }
  
  if (isSuccess) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl text-center">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Bedankt voor uw aanvraag!</h1>
          <p className="text-gray-600 mb-8">
            Uw offerteaanvraag is succesvol verzonden. We nemen zo spoedig mogelijk contact met u op.
          </p>
          <p className="text-gray-600 mb-8">U wordt nu doorgestuurd naar de bevestigingspagina...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Offerte Aanvragen</h1>
            <p className="text-gray-600">
              Vul het onderstaande formulier in om een vrijblijvende offerte aan te vragen voor uw project.
              Wij nemen zo spoedig mogelijk contact met u op.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Basic form structure */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Form content here */}
                    <div className="flex justify-between mt-8">
                      {step > 1 && (
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Vorige Stap
                        </Button>
                      )}
                      
                      {step < 4 ? (
                        <Button type="button" onClick={nextStep} className="ml-auto">
                          Volgende Stap
                        </Button>
                      ) : (
                        <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <span>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Versturen...
                            </span>
                          ) : (
                            "Offerte Aanvragen"
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 