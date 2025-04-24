"use client"

import React from "react"
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  name: z.string().min(2, { message: "Naam moet minimaal 2 karakters bevatten" }),
  email: z.string().email({ message: "Voer een geldig e-mailadres in" }),
  phone: z.string().min(10, { message: "Voer een geldig telefoonnummer in" }),
  message: z.string().min(10, { message: "Beschrijving moet minimaal 10 karakters bevatten" }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "U moet akkoord gaan met de voorwaarden",
  }),
})

export default function QuoteRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      termsAccepted: false,
    },
  })
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    
    // Simulate form submission with a delay
    setTimeout(() => {
      console.log("Form values:", values)
      
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Redirect to thank you page after 2 seconds
      setTimeout(() => {
        router.push("/offerte-aanvragen/bedankt")
      }, 2000)
    }, 1500)
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
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Naam*</FormLabel>
                          <FormControl>
                            <Input placeholder="Volledige naam" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mailadres*</FormLabel>
                          <FormControl>
                            <Input placeholder="uw@email.nl" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefoonnummer*</FormLabel>
                          <FormControl>
                            <Input placeholder="06 1234 5678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Uw bericht*</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Vertel ons over uw project" 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Versturen...
                        </span>
                      ) : (
                        "Offerte Aanvragen"
                      )}
                    </Button>
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