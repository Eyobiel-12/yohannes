"use client"

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
    <>
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
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex justify-between items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm mb-2",
                        step === i
                          ? "bg-primary text-white"
                          : step > i
                          ? "bg-primary/20 text-primary"
                          : "bg-gray-200 text-gray-500"
                      )}
                    >
                      {step > i ? <CheckCircle className="h-5 w-5" /> : i}
                    </div>
                    <span
                      className={cn(
                        "text-sm hidden md:block",
                        step === i ? "text-primary font-medium" : "text-gray-500"
                      )}
                    >
                      {i === 1
                        ? "Persoonlijke Gegevens"
                        : i === 2
                        ? "Project Details"
                        : i === 3
                        ? "Diensten & Planning"
                        : "Bevestiging"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
                <div
                  className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300"
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Step 1: Persoonlijke Gegevens */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Persoonlijke Gegevens</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        </div>
                        
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
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adres*</FormLabel>
                              <FormControl>
                                <Input placeholder="Straatnaam en huisnummer" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postcode*</FormLabel>
                                <FormControl>
                                  <Input placeholder="1234 AB" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Plaats*</FormLabel>
                                <FormControl>
                                  <Input placeholder="Plaatsnaam" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Step 2: Project Details */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Project Details</h2>
                        
                        <FormField
                          control={form.control}
                          name="projectType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type Project*</FormLabel>
                              <FormControl>
                                <ProjectTypeSelector
                                  value={field.value}
                                  onValueChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="projectScope"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Omvang Project*</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecteer de omvang van uw project" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="klein\">Klein (< 50m²)</SelectItem>
                                  <SelectItem value="middel">Middel (50-200m²)</SelectItem>
                                  <SelectItem value="groot">Groot (200-500m²)</SelectItem>
                                  <SelectItem value="zeer-groot">Zeer groot (> 500m²)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {form.watch("projectType") === "particuliere-tuin" && (
                          <>
                            <FormField
                              control={form.control}
                              name="propertyType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Type Woning</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecteer uw type woning" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="vrijstaand">Vrijstaande woning</SelectItem>
                                      <SelectItem value="twee-onder-een-kap">Twee-onder-een-kap</SelectItem>
                                      <SelectItem value="rijtjeshuis">Rijtjeshuis</SelectItem>
                                      <SelectItem value="appartement">Appartement met tuin/balkon</SelectItem>
                                      <SelectItem value="anders">Anders</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="existingGarden"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Huidige Situatie</FormLabel>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="nieuwe-tuin" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Nieuwe tuin (nog geen bestaande tuin)
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="renovatie" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Renovatie van bestaande tuin
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="onderhoud" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Onderhoud van bestaande tuin
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )}
                        
                        <FormField
                          control={form.control}
                          name="projectDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Projectbeschrijving*</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Beschrijf uw project en wensen zo gedetailleerd mogelijk..."
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Geef zoveel mogelijk details over uw project, wensen en specifieke eisen.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div>
                          <FormLabel>Foto's of Documenten Uploaden</FormLabel>
                          <div className="mt-2">
                            <FileUploader
                              onFilesSelected={(files) => setUploadedFiles(files)}
                              maxFiles={5}
                              maxFileSizeMB={10}
                            />
                          </div>
                          <FormDescription>
                            Upload foto's van de huidige situatie of schetsen van uw ideeën (max. 5 bestanden, max. 10MB per bestand)
                          </FormDescription>
                        </div>
                      </div>
                    )}
                    
                    {/* Step 3: Diensten & Planning */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Diensten & Planning</h2>
                        
                        <FormField
                          control={form.control}
                          name="services"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel>Gewenste Diensten*</FormLabel>
                                <FormDescription>
                                  Selecteer alle diensten waarin u geïnteresseerd bent
                                </FormDescription>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {serviceOptions.map((service) => (
                                  <FormField
                                    key={service.id}
                                    control={form.control}
                                    name="services"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={service.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(service.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, service.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== service.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {service.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="timeframe"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gewenste Tijdsbestek</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Wanneer wilt u dat het project wordt uitgevoerd?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="zo-snel-mogelijk">Zo snel mogelijk</SelectItem>
                                  <SelectItem value="binnen-1-maand">Binnen 1 maand</SelectItem>
                                  <SelectItem value="binnen-3-maanden">Binnen 3 maanden</SelectItem>
                                  <SelectItem value="binnen-6-maanden">Binnen 6 maanden</SelectItem>
                                  <SelectItem value="later">Later dan 6 maanden</SelectItem>
                                  <SelectItem value="nog-niet-bekend">Nog niet bekend</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="preferredStartDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Voorkeursdatum (indien bekend)</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP", { locale: nl })
                                      ) : (
                                        <span>Kies een datum</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date() || date > new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormDescription>
                                Selecteer een voorkeursdatum indien u een specifieke startdatum in gedachten heeft
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget Indicatie</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Wat is uw budget voor dit project?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="< €1.000">Minder dan €1.000</SelectItem>
                                  <SelectItem value="€1.000 - €5.000">€1.000 - €5.000</SelectItem>
                                  <SelectItem value="€5.000 - €10.000">€5.000 - €10.000</SelectItem>
                                  <SelectItem value="€10.000 - €25.000">€10.000 - €25.000</SelectItem>
                                  <SelectItem value="> €25.000">Meer dan €25.000</SelectItem>
                                  <SelectItem value="nog-niet-bekend">Nog niet bekend</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Een indicatie van uw budget helpt ons om een passende offerte op te stellen
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="additionalInfo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Aanvullende Informatie</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Overige informatie die u wilt delen..."
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Deel eventuele aanvullende informatie die relevant kan zijn voor uw offerte
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Step 4: Bevestiging */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Bevestiging</h2>
                        
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="font-bold mb-4">Samenvatting van uw aanvraag</h3>
                          
                          <Tabs defaultValue="persoonlijk" className="w-full">
                            <TabsList className="grid grid-cols-3 mb-4">
                              <TabsTrigger value="persoonlijk">Persoonlijk</TabsTrigger>
                              <TabsTrigger value="project">Project</TabsTrigger>
                              <TabsTrigger value="planning">Planning</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="persoonlijk" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">Naam</p>
                                  <p className="font-medium">{form.getValues("name")}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">E-mail</p>
                                  <p className="font-medium">{form.getValues("email")}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Telefoon</p>
                                  <p className="font-medium">{form.getValues("phone")}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Adres</p>
                                  <p className="font-medium">
                                    {form.getValues("address")}, {form.getValues("postalCode")}{" "}
                                    {form.getValues("city")}
                                  </p>
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="project" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">Type Project</p>
                                  <p className="font-medium">
                                    {form.getValues("projectType") === "particuliere-tuin"
                                      ? "Particuliere Tuin"
                                      : form.getValues("projectType") === "bedrijfstuin"
                                      ? "Bedrijfstuin"
                                      : form.getValues("projectType") === "openbare-ruimte"
                                      ? "Openbare Ruimte"
                                      : form.getValues("projectType") === "civiele-werken"
                                      ? "Civiele Werken"
                                      : form.getValues("projectType")}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Omvang Project</p>
                                  <p className="font-medium">
                                    {form.getValues("projectScope") === "klein"
                                      ? "Klein (< 50m²)"
                                      : form.getValues("projectScope") === "middel"
                                      ? "Middel (50-200m²)"
                                      : form.getValues("projectScope") === "groot"
                                      ? "Groot (200-500m²)"
                                      : form.getValues("projectScope") === "zeer-groot"
                                      ? "Zeer groot (> 500m²)"
                                      : form.getValues("projectScope")}
                                  </p>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-sm text-gray-500">Projectbeschrijving</p>
                                <p className="font-medium">{form.getValues("projectDescription")}</p>
                              </div>
                              
                              <div>
                                <p className="text-sm text-gray-500">Gewenste Diensten</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {form.getValues("services").map((service) => (
                                    <Badge key={service} variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                      {serviceOptions.find((s) => s.id === service)?.label || service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              {uploadedFiles.length > 0 && (
                                <div>
                                  <p className="text-sm text-gray-500">Geüploade Bestanden</p>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {uploadedFiles.map((file, index) => (
                                      <Badge key={index} variant="outline">
                                        {file.name}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </TabsContent>
                            
                            <TabsContent value="planning" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">Tijdsbestek</p>
                                  <p className="font-medium">
                                    {form.getValues("timeframe") === "zo-snel-mogelijk"
                                      ? "Zo snel mogelijk"
                                      : form.getValues("timeframe") === "binnen-1-maand"
                                      ? "Binnen 1 maand"
                                      : form.getValues("timeframe") === "binnen-3-maanden"
                                      ? "Binnen 3 maanden"
                                      : form.getValues("timeframe") === "binnen-6-maanden"
                                      ? "Binnen 6 maanden"
                                      : form.getValues("timeframe") === "later"
                                      ? "Later dan 6 maanden"
                                      : form.getValues("timeframe") === "nog-niet-bekend"
                                      ? "Nog niet bekend"
                                      : form.getValues("timeframe") || "Niet opgegeven"}
                                  </p>
                                </div>
                                
                                <div>
                                  <p className="text-sm text-gray-500">Budget</p>
                                  <p className="font-medium">
                                    {form.getValues("budget") || "Niet opgegeven"}
                                  </p>
                                </div>
                                
                                {form.getValues("preferredStartDate") && (
                                  <div>
                                    <p className="text-sm text-gray-500">Voorkeursdatum</p>
                                    <p className="font-medium">
                                      {format(form.getValues("preferredStartDate"), "PPP", { locale: nl })}
                                    </p>
                                  </div>
                                )}
                              </div>
                              
                              {form.getValues("additionalInfo") && (
                                <div>
                                  <p className="text-sm text-gray-500">Aanvullende Informatie</p>
                                  <p className="font-medium">{form.getValues("additionalInfo")}</p>
                                </div>
                              )}
                            </TabsContent>
                          </Tabs>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="termsAccepted"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Ik ga akkoord met de verwerking van mijn gegevens voor het opstellen van een offerte*
                                </FormLabel>
                                <FormDescription>
                                  Door dit formulier in te dienen, gaat u ermee akkoord dat wij uw gegevens gebruiken om contact met u op te nemen en een offerte op te stellen.
                                </FormDescription>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-between pt-4">
                      {step > 1 ? (
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Vorige
                        </Button>
                      ) : (
                        <div></div>
                      )}
                      
                      {step < 4 ? (
                        <Button type="button" onClick={nextStep}>
                          Volgende
                        </Button>
                      ) : (
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Verzenden...
                            </>
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
    </>
  )
}
