"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Leaf, Scissors, Sprout, Droplets, TreePine, Hammer, Lightbulb, Search, Filter } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define service categories with icons
const serviceCategories = [
  { id: "all", name: "Alle Diensten", icon: <Filter className="h-4 w-4" /> },
  { id: "tuinonderhoud", name: "Tuinonderhoud", icon: <Leaf className="h-4 w-4" /> },
  { id: "grasverzorging", name: "Grasverzorging", icon: <Scissors className="h-4 w-4" /> },
  { id: "civiele-werken", name: "Civiele Werken", icon: <Hammer className="h-4 w-4" /> },
  { id: "groenvoorziening", name: "Groenvoorziening", icon: <TreePine className="h-4 w-4" /> },
]

// Define services data
const servicesData = [
  {
    id: "complete-tuinonderhoud",
    title: "Complete Tuinonderhoud",
    shortDescription: "Professioneel onderhoud voor een verzorgde tuin het hele jaar door",
    fullDescription:
      "Wij zorgen voor het complete onderhoud van uw tuin, van regelmatig onderhoud tot seizoensgebonden werk. Onze ervaren hoveniers houden uw tuin in topconditie met precisie en vakmanschap.",
    icon: <Leaf className="h-6 w-6" />,
    image: "/images/portfolio/garden-maintenance.jpeg",
    benefits: [
      "Regelmatig onderhoud door ervaren hoveniers",
      "Seizoensgebonden tuinwerkzaamheden",
      "Persoonlijk onderhoudsplan op maat",
      "Behoud van een gezonde en mooie tuin",
    ],
    features: [
      { title: "Snoeien", description: "Vakkundig snoeien van hagen, struiken en bomen" },
      { title: "Onkruidbestrijding", description: "Effectieve en milieuvriendelijke onkruidbestrijding" },
      { title: "Bemesting", description: "Professionele bemesting voor gezonde planten" },
      { title: "Bladruimen", description: "Seizoensgebonden bladruimen en tuinafvoer" },
    ],
    category: "tuinonderhoud",
    popular: true,
  },
  {
    id: "snoeiwerkzaamheden",
    title: "Snoeiwerkzaamheden",
    shortDescription: "Vakkundig snoeien voor gezonde en mooie planten",
    fullDescription:
      "Onze specialisten zorgen voor het vakkundig snoeien van uw planten, hagen en bomen. Met de juiste technieken en kennis van verschillende plantensoorten garanderen wij een optimaal resultaat.",
    icon: <Scissors className="h-6 w-6" />,
    image: "/images/portfolio/jo15.jpg",
    benefits: [
      "Behoud van gezonde plantengroei",
      "Verbetering van bloei en vruchtvorming",
      "Behoud van de gewenste vorm en grootte",
      "Preventie van ziekten en plagen",
    ],
    features: [
      { title: "Vormsnoei", description: "Esthetische vormsnoei voor hagen en sierheesters" },
      { title: "Onderhoudssnoei", description: "Regelmatige snoei voor gezonde groei" },
      { title: "Fruitbomen", description: "Specialistische snoei van fruitbomen voor optimale opbrengst" },
      { title: "Seizoensplanning", description: "Snoei op het juiste moment voor elke plantensoort" },
    ],
    category: "tuinonderhoud",
  },
  {
    id: "professionele-grasverzorging",
    title: "Professionele Grasverzorging",
    shortDescription: "Voor een gezond en mooi gazon het hele jaar door",
    fullDescription:
      "Onze professionele grasverzorging zorgt voor een gezond en mooi gazon gedurende het hele jaar. Van maaien en verticuteren tot bemesten en herstellen van kale plekken, wij bieden complete gazonzorg.",
    icon: <Scissors className="h-6 w-6" />,
    image: "/images/portfolio/lat2.jpeg",
    benefits: [
      "Sterk en gezond gazon dat bestand is tegen droogte en ziekten",
      "Regelmatig onderhoud voor een constant mooi resultaat",
      "Professionele apparatuur voor optimale resultaten",
      "Advies over gazononderhoud en -beheer",
    ],
    features: [
      { title: "Maaien", description: "Regelmatig maaien op de juiste hoogte" },
      { title: "Verticuteren", description: "Verwijderen van mos en dood materiaal" },
      { title: "Bemesting", description: "Seizoensgebonden bemesting voor optimale groei" },
      { title: "Herstel", description: "Herstel van kale plekken en beschadigingen" },
    ],
    category: "grasverzorging",
    popular: true,
  },
  {
    id: "gazonaanleg",
    title: "Gazonaanleg",
    shortDescription: "Nieuwe gazons van hoge kwaliteit voor een perfect resultaat",
    fullDescription:
      "Wij leggen nieuwe gazons aan met hoogwaardige graszoden of zaaigoed voor een perfect resultaat. Van grondvoorbereiding tot de laatste details, wij zorgen voor een prachtig gazon dat direct klaar is voor gebruik.",
    icon: <Sprout className="h-6 w-6" />,
    image: "/images/portfolio/lat1.jpeg",
    benefits: [
      "Direct een volledig groen gazon bij gebruik van graszoden",
      "Zorgvuldige grondvoorbereiding voor langdurig resultaat",
      "Keuze uit verschillende grassoorten voor uw specifieke situatie",
      "Professionele aanleg met garantie op het resultaat",
    ],
    features: [
      { title: "Grondbewerking", description: "Zorgvuldige voorbereiding van de ondergrond" },
      { title: "Drainage", description: "Aanleg van drainage voor optimale waterafvoer" },
      { title: "Zoden of Zaaien", description: "Keuze tussen direct resultaat of kostenefficiënt zaaien" },
      { title: "Nazorg", description: "Advies en ondersteuning na aanleg" },
    ],
    category: "grasverzorging",
  },
  {
    id: "duurzame-parkeerterreinen",
    title: "Duurzame Parkeerterreinen",
    shortDescription: "Functionele en milieuvriendelijke parkeeroplossingen",
    fullDescription:
      "Wij ontwerpen en realiseren duurzame parkeerterreinen die zowel functioneel als milieuvriendelijk zijn. Met waterdoorlatende bestrating en strategisch geplaatste groenvoorzieningen creëren we parkeerplaatsen die bijdragen aan duurzaam waterbeheer.",
    icon: <Hammer className="h-6 w-6" />,
    image: "/images/portfolio/civil-works.jpeg",
    benefits: [
      "Verbeterde waterinfiltratie en verminderde wateroverlast",
      "Verminderde hittestress door strategische beplanting",
      "Duurzame materialen met lange levensduur",
      "Esthetisch aantrekkelijk en functioneel ontwerp",
    ],
    features: [
      { title: "Waterdoorlatende Bestrating", description: "Milieuvriendelijke oplossingen voor waterafvoer" },
      { title: "Groenintegratie", description: "Strategische plaatsing van groen voor schaduw en koeling" },
      { title: "Efficiënte Indeling", description: "Optimaal gebruik van beschikbare ruimte" },
      { title: "LED-verlichting", description: "Energiezuinige verlichting op zonne-energie" },
    ],
    category: "civiele-werken",
  },
  {
    id: "bestrating-en-verharding",
    title: "Bestrating & Verharding",
    shortDescription: "Professionele bestrating voor paden, terrassen en opritten",
    fullDescription:
      "Onze vakkundige stratenmakers verzorgen alle soorten bestratingswerk, van terrassen en tuinpaden tot opritten en parkeerplaatsen. Met oog voor detail en duurzaamheid creëren we verhardingen die zowel functioneel als esthetisch zijn.",
    icon: <Hammer className="h-6 w-6" />,
    image: "/images/portfolio/roadside-maintenance.jpeg",
    benefits: [
      "Vakkundige aanleg met oog voor detail",
      "Duurzame materialen en constructie",
      "Perfecte waterafvoer door juiste afschot",
      "Combinatie van functionaliteit en esthetiek",
    ],
    features: [
      { title: "Materialen", description: "Ruime keuze uit natuursteen, gebakken klinkers en betontegels" },
      { title: "Patronen", description: "Diverse legpatronen mogelijk voor unieke uitstraling" },
      { title: "Drainage", description: "Professionele afwatering voor duurzaam resultaat" },
      { title: "Opsluitingen", description: "Stevige randen voor langdurige stabiliteit" },
    ],
    category: "civiele-werken",
    popular: true,
  },
  {
    id: "vijveraanleg",
    title: "Vijveraanleg",
    shortDescription: "Natuurlijke waterpartijen voor een levendige tuin",
    fullDescription:
      "Wij ontwerpen en realiseren vijvers en waterpartijen die perfect in uw tuin passen. Van kleine siervijvers tot grote natuurlijke waterpartijen, wij zorgen voor een gezond ecosysteem met de juiste balans tussen planten en techniek.",
    icon: <Droplets className="h-6 w-6" />,
    image: "/images/portfolio/jo12.jpg",
    benefits: [
      "Natuurlijke uitstraling die past bij uw tuin",
      "Gezond ecosysteem met de juiste balans",
      "Onderhoudsarm door doordacht ontwerp",
      "Verhoogde biodiversiteit in uw tuin",
    ],
    features: [
      { title: "Natuurlijke Filtering", description: "Biologische filtering voor helder water" },
      { title: "Waterplanten", description: "Zorgvuldige selectie van waterplanten voor balans" },
      { title: "Techniek", description: "Onzichtbaar geïntegreerde pompen en filters" },
      { title: "Verlichting", description: "Optionele onderwaterverlichting voor sfeer" },
    ],
    category: "tuinonderhoud",
  },
  {
    id: "ecologisch-groenbeheer",
    title: "Ecologisch Groenbeheer",
    shortDescription: "Duurzaam beheer van groenvoorzieningen met oog voor biodiversiteit",
    fullDescription:
      "Ons ecologisch groenbeheer richt zich op het vergroten van de biodiversiteit en het creëren van duurzame groenvoorzieningen. Met speciale aandacht voor inheemse soorten en natuurlijke processen zorgen we voor groen dat zowel mooi als ecologisch waardevol is.",
    icon: <TreePine className="h-6 w-6" />,
    image: "/images/portfolio/vegetation-control.jpeg",
    benefits: [
      "Verhoogde biodiversiteit en ecologische waarde",
      "Verminderd gebruik van chemische middelen",
      "Lagere onderhoudskosten op lange termijn",
      "Bijdrage aan lokale flora en fauna",
    ],
    features: [
      { title: "Inheemse Beplanting", description: "Gebruik van lokale plantensoorten" },
      { title: "Gedifferentieerd Maaibeheer", description: "Gevarieerd maaibeleid voor diverse habitats" },
      { title: "Natuurlijke Bestrijding", description: "Biologische plaagbestrijding" },
      { title: "Waterhuishouding", description: "Duurzaam waterbeheer en -opvang" },
    ],
    category: "groenvoorziening",
  },
  {
    id: "beplantingsplannen",
    title: "Beplantingsplannen",
    shortDescription: "Professionele plantenkennis voor de juiste plant op de juiste plaats",
    fullDescription:
      "Onze beplantingsplannen zijn gebaseerd op jarenlange ervaring en grondige plantenkennis. Wij selecteren planten die passen bij uw grondsoort, lichtomstandigheden en persoonlijke wensen, voor een tuin die het hele jaar door aantrekkelijk is.",
    icon: <Sprout className="h-6 w-6" />,
    image: "/images/portfolio/flowering-hedge.jpeg",
    benefits: [
      "Planten die gedijen in uw specifieke situatie",
      "Jaarrond sierwaarde door zorgvuldige planning",
      "Onderhoudsarm door juiste plantenkeuze",
      "Harmonieuze compositie van kleuren en vormen",
    ],
    features: [
      { title: "Bodemanalyse", description: "Onderzoek naar bodemtype en -kwaliteit" },
      { title: "Seizoensplanning", description: "Spreiding van bloei en sierwaarde" },
      { title: "Biodiversiteit", description: "Aandacht voor insectvriendelijke beplanting" },
      { title: "Onderhoudsniveau", description: "Afstemming op gewenst onderhoudsniveau" },
    ],
    category: "groenvoorziening",
  },
  {
    id: "tuinverlichting",
    title: "Tuinverlichting",
    shortDescription: "Sfeervolle verlichting voor extra lange tuingenot",
    fullDescription:
      "Met onze tuinverlichting kunt u ook in de avonduren genieten van uw tuin. Wij ontwerpen en installeren sfeervolle verlichting die de mooiste elementen van uw tuin accentueert en zorgt voor veiligheid en gebruiksgemak.",
    icon: <Lightbulb className="h-6 w-6" />,
    image: "/images/bg-2.jpeg",
    benefits: [
      "Verlengd gebruik van uw tuin in de avonduren",
      "Verhoogde veiligheid en toegankelijkheid",
      "Accentuering van architectonische elementen",
      "Energiezuinige LED-technologie",
    ],
    features: [
      { title: "Padverlichting", description: "Veilige verlichting van looppaden" },
      { title: "Accentverlichting", description: "Subtiele belichting van planten en objecten" },
      { title: "Sfeerverlichting", description: "Warme, indirecte verlichting voor ambiance" },
      { title: "Smart Control", description: "Optionele bediening via smartphone" },
    ],
    category: "tuinonderhoud",
  },
]

export default function ServiceShowcase() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter services based on active category and search query
  const filteredServices = servicesData.filter((service) => {
    const matchesCategory = activeCategory === "all" || service.category === activeCategory
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-8">
      {/* Filter and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={(value) => setActiveCategory(value)}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 md:w-auto">
            {serviceCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                {category.icon}
                <span className="hidden md:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Zoek diensten..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            variants={item}
            className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-800"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {service.popular && <Badge className="absolute right-2 top-2 bg-primary">Populair</Badge>}
            </div>
            <div className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2 text-primary">{service.icon}</div>
                <h3 className="text-xl font-bold">{service.title}</h3>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{service.shortDescription}</p>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/services/${service.id}`} className="flex items-center justify-center gap-2">
                  <span>Meer informatie</span>
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredServices.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mb-2 text-xl font-bold">Geen diensten gevonden</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Probeer andere zoektermen of selecteer een andere categorie.
          </p>
        </div>
      )}
    </div>
  )
}
