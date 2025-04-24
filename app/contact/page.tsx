"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { MapPin, Phone, Clock, Send, CheckCircle } from "lucide-react"
import ChatBot from "@/components/chatbot/chat-bot"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Naam moet minimaal 2 karakters bevatten.",
  }),
  email: z.string().email({
    message: "Voer een geldig e-mailadres in.",
  }),
  phone: z.string().min(10, {
    message: "Voer een geldig telefoonnummer in.",
  }),
  service: z.string({
    required_error: "Selecteer een dienst.",
  }),
  message: z.string().min(10, {
    message: "Bericht moet minimaal 10 karakters bevatten.",
  }),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsSuccess(true)
      form.reset()

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5"></div>
          <div className="absolute top-40 -left-20 w-60 h-60 rounded-full bg-primary/5"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-primary/5"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-700">
              Neem Contact Op
            </h1>
            <p className="text-lg text-gray-600 md:text-xl mb-8">
              Heeft u vragen of bent u klaar om uw buitenruimte te transformeren? Ons team staat klaar om uw visie tot
              leven te brengen.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-20 bg-[url('/images/portfolio/jo10.jpg')] bg-cover opacity-5"></div>
        <div className="absolute bottom-0 right-0 w-full h-20 bg-[url('/images/portfolio/jo13.jpg')] bg-cover opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>

        <div className="container relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Contactgegevens
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hoe U Ons Kunt Bereiken</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Wij zijn er om uw vragen te beantwoorden en u te helpen met al uw tuinbehoeften. Kies de meest geschikte
              manier om contact op te nemen met ons team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="h-6 w-6" />,
                title: "Onze Locatie",
                content: (
                  <p className="text-gray-600">
                    Aristotelesstraat 993
                    <br />
                    7323 NZ Apeldoorn
                    <br />
                    Nederland
                  </p>
                ),
                action: {
                  text: "Route Bekijken",
                  url: "https://maps.google.com/?q=Aristotelesstraat+993,+7323+NZ+Apeldoorn",
                },
                color: "from-emerald-400 to-green-600",
              },
              {
                icon: <Phone className="h-6 w-6" />,
                title: "Contactgegevens",
                content: (
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <strong>Telefoon:</strong> 06 1663 8510
                    </p>
                    <p className="text-gray-600">
                      <strong>E-mail:</strong> info@yohanneshoveneirsbderijf.com
                    </p>
                  </div>
                ),
                action: {
                  text: "Nu Bellen",
                  url: "tel:0616638510",
                },
                color: "from-blue-400 to-primary",
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: "Openingstijden",
                content: (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maandag - Vrijdag:</span>
                      <span className="font-medium">08:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zaterdag:</span>
                      <span className="font-medium">Gesloten</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zondag:</span>
                      <span className="font-medium">Gesloten</span>
                    </div>
                  </div>
                ),
                action: {
                  text: "Afspraak Maken",
                  url: "#contact-form",
                },
                color: "from-amber-400 to-orange-500",
              },
            ].map((card, index) => (
              <div key={index} className="group">
                <div className="h-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                  <div className={`h-2 w-full bg-gradient-to-r ${card.color}`}></div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} text-white`}>{card.icon}</div>
                      <h3 className="text-xl font-bold">{card.title}</h3>
                    </div>
                    <div className="mb-6">{card.content}</div>
                    <a
                      href={card.action.url}
                      className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                      {card.action.text}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form and Map Section */}
      <section className="py-12 md:py-20 bg-gray-50" id="contact-form">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Stuur Ons een Bericht</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="text-gray-600 mb-8">
                Vul het onderstaande formulier in en wij nemen zo snel mogelijk contact met u op om uw projectwensen te
                bespreken.
              </p>

              {isSuccess && (
                <div className="bg-green-50 border-l-4 border-primary text-green-700 p-4 rounded mb-6 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Bedankt voor uw bericht! We nemen spoedig contact met u op.</span>
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Volledige Naam</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jan Jansen"
                              {...field}
                              className="transition-all duration-300 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                            />
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
                          <FormLabel className="text-sm font-medium">E-mailadres</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="jan@voorbeeld.nl"
                              {...field}
                              className="transition-all duration-300 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Telefoonnummer</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="06 1234 5678"
                              {...field}
                              className="transition-all duration-300 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Gewenste Dienst</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="transition-all duration-300 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary">
                                <SelectValue placeholder="Selecteer een dienst" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="garden-maintenance">Tuinonderhoud</SelectItem>
                              <SelectItem value="lawn-care">Gazonverzorging</SelectItem>
                              <SelectItem value="corporate-gardens">Bedrijfstuinen</SelectItem>
                              <SelectItem value="weed-control">Milieuvriendelijke Onkruidbestrijding</SelectItem>
                              <SelectItem value="other">Overig</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Uw Bericht</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Geef hier details over uw project of vraag..."
                            className="min-h-[150px] transition-all duration-300 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full md:w-auto px-8 py-6 text-base font-medium transition-all duration-300 bg-gradient-to-r from-primary to-green-700 hover:from-green-700 hover:to-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Verzenden...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Bericht Versturen
                        <Send className="h-4 w-4 ml-1" />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="relative">
              <div className="h-[500px] lg:h-full rounded-xl overflow-hidden shadow-2xl border-8 border-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.8046500386515!2d5.9646!3d52.2135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c7df4d3b9b1e63%3A0x2a7eb7f82771a95c!2sAristotelesstraat%2C%20Apeldoorn!5e0!3m2!1sen!2snl!4v1650000000000!5m2!1sen!2snl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 text-white">
                  <p className="font-medium">Yohannes Hoveniersbedrijf</p>
                  <p className="text-sm">Aristotelesstraat 993, Apeldoorn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-green-100">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Klaar om Uw Ruimte te Transformeren?</h2>
            <p className="text-gray-600 mb-8">
              Of u nu regelmatig onderhoud nodig heeft of een complete tuintransformatie, ons team staat klaar om u te
              helpen bij het creëren van de buitenruimte van uw dromen.
            </p>
            <Button className="px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105">
              Vraag een Gratis Offerte Aan
            </Button>
          </div>
        </div>
      </section>

      {/* ChatBot Component */}
      <ChatBot />
    </>
  )
}
