"use client"
import { useState, useEffect } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Scissors, ArrowLeft, Check, Euro, Sprout, Hammer, Droplets, TreePine, Lightbulb } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ScrollReveal from "@/components/animations/scroll-reveal"
import ParallaxEffect from "@/components/animations/parallax-effect"

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
    categoryName: "Tuinonderhoud",
    popular: true,
    pricing: {
      type: "Vanaf prijs",
      price: "€45",
      unit: "per uur",
      note: "Exacte prijs afhankelijk van tuingrootte en werkzaamheden",
    },
    gallery: [
      "/images/portfolio/garden-maintenance.jpeg",
      "/images/portfolio/jo15.jpg",
      "/images/portfolio/jo13.jpg",
      "/images/portfolio/jo14.jpg",
    ],
    faqs: [
      {
        question: "Hoe vaak is tuinonderhoud nodig?",
        answer:
          "Dit hangt af van uw tuin en wensen. Voor de meeste tuinen adviseren we onderhoud elke 4-6 weken tijdens het groeiseizoen en minder frequent in de winter.",
      },
      {
        question: "Kan ik een onderhoudscontract afsluiten?",
        answer:
          "Ja, we bieden verschillende onderhoudscontracten aan, van maandelijks tot seizoensgebonden onderhoud tegen een vast tarief.",
      },
      {
        question: "Nemen jullie het tuinafval mee?",
        answer: "Ja, bij al onze onderhoudsdiensten is de afvoer van tuinafval inbegrepen.",
      },
    ],
    relatedServices: ["snoeiwerkzaamheden", "professionele-grasverzorging", "vijveraanleg"],
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
    categoryName: "Tuinonderhoud",
    pricing: {
      type: "Vanaf prijs",
      price: "€45",
      unit: "per uur",
      note: "Exacte prijs afhankelijk van omvang en type beplanting",
    },
    gallery: [
      "/images/portfolio/jo15.jpg",
      "/images/portfolio/jo13.jpg",
      "/images/portfolio/jo11.jpg",
      "/images/portfolio/flowering-hedge.jpeg",
    ],
    faqs: [
      {
        question: "Wanneer is de beste tijd om te snoeien?",
        answer:
          "Dit hangt af van het type plant. Veel sierheesters worden na de bloei gesnoeid, hagen meestal in mei/juni en september, en fruitbomen in de winter. We adviseren u graag over de beste timing voor uw specifieke beplanting.",
      },
      {
        question: "Kan elke plant gesnoeid worden?",
        answer:
          "De meeste planten kunnen gesnoeid worden, maar de techniek en timing verschillen per soort. Sommige planten verdragen drastische snoei, terwijl andere voorzichtiger behandeld moeten worden.",
      },
      {
        question: "Hoe vaak moet een haag gesnoeid worden?",
        answer:
          "De meeste hagen hebben 2-3 snoeibeurten per jaar nodig, afhankelijk van de groeisnelheid en het gewenste uiterlijk. Snelgroeiende soorten zoals liguster kunnen vaker nodig hebben.",
      },
    ],
    relatedServices: ["complete-tuinonderhoud", "beplantingsplannen", "ecologisch-groenbeheer"],
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
    categoryName: "Grasverzorging",
    popular: true,
    pricing: {
      type: "Vanaf prijs",
      price: "€35",
      unit: "per uur",
      note: "Exacte prijs afhankelijk van gazongrootte en behandeling",
    },
    gallery: [
      "/images/portfolio/lat2.jpeg",
      "/images/portfolio/lat1.jpeg",
      "/images/bg-1.jpeg",
      "/images/portfolio/garden-maintenance.jpeg",
    ],
    faqs: [
      {
        question: "Hoe vaak moet een gazon gemaaid worden?",
        answer:
          "In het groeiseizoen (april-oktober) adviseren we wekelijks of tweewekelijks maaien, afhankelijk van de groeisnelheid. In de winter is maaien meestal niet nodig.",
      },
      {
        question: "Wanneer moet een gazon verticuteerd worden?",
        answer:
          "Verticuteren is ideaal in het voorjaar (april/mei) en eventueel nog een keer in het najaar (september). Dit verwijdert mos en dood materiaal, waardoor het gras beter kan ademen.",
      },
      {
        question: "Hoe kan ik kale plekken in mijn gazon herstellen?",
        answer:
          "Kale plekken kunnen worden hersteld door de grond los te maken, graszaad te zaaien, licht te bedekken met compost en goed te bewateren. De beste tijd hiervoor is het voorjaar of vroege najaar.",
      },
    ],
    relatedServices: ["gazonaanleg", "complete-tuinonderhoud", "beplantingsplannen"],
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
    categoryName: "Grasverzorging",
    pricing: {
      type: "Vanaf prijs",
      price: "€12",
      unit: "per m²",
      note: "Inclusief grondwerk en materiaal, exacte prijs na bezichtiging",
    },
    gallery: [
      "/images/portfolio/lat1.jpeg",
      "/images/portfolio/lat2.jpeg",
      "/images/portfolio/lat3.jpeg",
      "/images/bg-1.jpeg",
    ],
    faqs: [
      {
        question: "Wat is beter: graszoden of zaaien?",
        answer:
          "Graszoden geven direct resultaat en kunnen het hele jaar door worden gelegd, behalve bij vorst. Zaaien is kostenefficiënter maar vereist meer geduld (6-8 weken) en kan het beste in het voorjaar of najaar worden gedaan.",
      },
      {
        question: "Welke voorbereidingen zijn nodig voor een nieuw gazon?",
        answer:
          "Een goede voorbereiding is essentieel: verwijderen van oude vegetatie, grondbewerking, egaliseren, eventueel drainage aanleggen, en bodemverbetering met compost of zand afhankelijk van de grondsoort.",
      },
      {
        question: "Hoe lang moet ik wachten voordat ik een nieuw gazon kan gebruiken?",
        answer:
          "Bij graszoden kunt u het gazon na ongeveer 3 weken licht belasten. Bij een gezaaid gazon moet u wachten tot het gras 8-10 cm hoog is en dan eerst maaien voordat u het kunt gebruiken, meestal na 6-8 weken.",
      },
    ],
    relatedServices: ["professionele-grasverzorging", "bestrating-en-verharding", "beplantingsplannen"],
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
    categoryName: "Civiele Werken",
    pricing: {
      type: "Op aanvraag",
      price: "",
      unit: "",
      note: "Prijs afhankelijk van omvang, materialen en specifieke eisen",
    },
    gallery: [
      "/images/portfolio/civil-works.jpeg",
      "/images/portfolio/roadside-maintenance.jpeg",
      "/images/portfolio/urban-maintenance.jpeg",
      "/images/portfolio/vegetation-control.jpeg",
    ],
    faqs: [
      {
        question: "Wat zijn de voordelen van waterdoorlatende bestrating?",
        answer:
          "Waterdoorlatende bestrating vermindert wateroverlast door regenwater direct in de bodem te laten infiltreren, vermindert de belasting op het rioolsysteem, vult het grondwater aan, en vermindert vervuiling door filtering van het water.",
      },
      {
        question: "Hoe onderhoudsvriendelijk zijn groene parkeerterreinen?",
        answer:
          "Moderne groene parkeeroplossingen zijn ontworpen met onderhoudsvriendelijkheid in gedachten. Afhankelijk van het gekozen systeem is regelmatig maaien en onkruidbeheer nodig, maar dit is minimaal vergeleken met traditionele groenvakken.",
      },
      {
        question: "Zijn duurzame parkeerterreinen duurder dan traditionele oplossingen?",
        answer:
          "De initiële investering kan iets hoger zijn, maar op lange termijn zijn duurzame parkeerterreinen vaak kosteneffectiever door lagere onderhoudskosten, langere levensduur, en verminderde kosten voor waterafvoer en -zuivering.",
      },
    ],
    relatedServices: ["bestrating-en-verharding", "ecologisch-groenbeheer", "beplantingsplannen"],
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
    categoryName: "Civiele Werken",
    popular: true,
    pricing: {
      type: "Vanaf prijs",
      price: "€60",
      unit: "per m²",
      note: "Exacte prijs afhankelijk van materiaal en ondergrond",
    },
    gallery: [
      "/images/portfolio/roadside-maintenance.jpeg",
      "/images/portfolio/civil-works.jpeg",
      "/images/portfolio/urban-maintenance.jpeg",
      "/images/bg-2.jpeg",
    ],
    faqs: [
      {
        question: "Welke bestratingsmaterialen zijn het meest duurzaam?",
        answer:
          "Natuursteen en gebakken klinkers zijn zeer duurzame materialen met een lange levensduur. Betonklinkers zijn een goede middenweg qua prijs en duurzaamheid. De keuze hangt af van uw budget, stijlvoorkeur en de specifieke toepassing.",
      },
      {
        question: "Hoe lang duurt het aanleggen van een terras of oprit?",
        answer:
          "De doorlooptijd hangt af van de grootte en complexiteit van het project. Een gemiddeld terras van 30m² kan in 2-3 dagen worden aangelegd, terwijl een grotere oprit met complexe patronen 1-2 weken kan duren.",
      },
      {
        question: "Is het mogelijk om bestaande bestrating te hergebruiken?",
        answer:
          "Ja, in veel gevallen kunnen bestaande materialen worden hergebruikt, wat zowel kostenbesparend als duurzaam is. We beoordelen de kwaliteit van de materialen en adviseren u over de mogelijkheden.",
      },
    ],
    relatedServices: ["duurzame-parkeerterreinen", "tuinontwerp", "vijveraanleg"],
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
    categoryName: "Tuinonderhoud",
    pricing: {
      type: "Vanaf prijs",
      price: "€1500",
      unit: "",
      note: "Exacte prijs afhankelijk van grootte, materialen en techniek",
    },
    gallery: [
      "/images/portfolio/jo12.jpg",
      "/images/bg-1.jpeg",
      "/images/portfolio/jo11.jpg",
      "/images/portfolio/flowering-hedge.jpeg",
    ],
    faqs: [
      {
        question: "Hoeveel onderhoud heeft een vijver nodig?",
        answer:
          "Een goed aangelegde vijver met de juiste balans tussen planten en vissen vereist relatief weinig onderhoud. Seizoensgebonden taken zoals bladeren verwijderen in de herfst, plantenonderhoud in het voorjaar en occasionele controle van de techniek zijn voldoende.",
      },
      {
        question: "Kan een vijver in elke tuin worden aangelegd?",
        answer:
          "In principe kan in elke tuin een vorm van waterpartij worden gerealiseerd. De grootte, diepte en stijl worden aangepast aan de beschikbare ruimte en de grondsoort. Voor kleine tuinen zijn er compacte oplossingen zoals verhoogde vijvers of waterornamenten.",
      },
      {
        question: "Hoe lang duurt het voordat een nieuwe vijver helder water heeft?",
        answer:
          "Een nieuwe vijver heeft tijd nodig om biologisch evenwicht te bereiken. Met de juiste aanleg en beplanting kan dit binnen 4-6 weken gebeuren. In het begin kan het water tijdelijk troebel worden door algengroei, maar dit stabiliseert zich naarmate de waterplanten groeien.",
      },
    ],
    relatedServices: ["complete-tuinonderhoud", "tuinontwerp", "beplantingsplannen"],
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
    categoryName: "Groenvoorziening",
    pricing: {
      type: "Op aanvraag",
      price: "",
      unit: "",
      note: "Prijs afhankelijk van oppervlakte en gewenste beheersintensiteit",
    },
    gallery: [
      "/images/portfolio/vegetation-control.jpeg",
      "/images/portfolio/public-maintenance.jpeg",
      "/images/portfolio/roadside-maintenance.jpeg",
      "/images/portfolio/urban-maintenance.jpeg",
    ],
    faqs: [
      {
        question: "Wat houdt ecologisch groenbeheer precies in?",
        answer:
          "Ecologisch groenbeheer is een duurzame aanpak waarbij we werken met natuurlijke processen in plaats van ertegen. Dit betekent onder andere het gebruik van inheemse plantensoorten, gefaseerd maaibeheer, biologische plaagbestrijding, en het creëren van diverse habitats voor insecten, vogels en kleine zoogdieren.",
      },
      {
        question: "Is ecologisch groenbeheer geschikt voor elk type terrein?",
        answer:
          "Ja, de principes van ecologisch groenbeheer kunnen worden toegepast op elk terrein, van kleine particuliere tuinen tot grote bedrijfsterreinen en openbare ruimtes. De specifieke maatregelen worden aangepast aan de schaal en het type terrein.",
      },
      {
        question: "Ziet ecologisch beheerd groen er niet 'rommelig' uit?",
        answer:
          "Een ecologisch beheerde groene ruimte kan er anders uitzien dan traditioneel beheerd groen, maar 'rommelig' hoeft het zeker niet te zijn. Met doordacht ontwerp en gericht beheer kan ecologisch groen juist zeer aantrekkelijk zijn, met meer seizoensvariatie en levendigheid door de aanwezigheid van vlinders, bijen en vogels.",
      },
    ],
    relatedServices: ["beplantingsplannen", "complete-tuinonderhoud", "duurzame-parkeerterreinen"],
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
    categoryName: "Groenvoorziening",
    pricing: {
      type: "Vanaf prijs",
      price: "€250",
      unit: "",
      note: "Exacte prijs afhankelijk van tuingrootte en complexiteit",
    },
    gallery: [
      "/images/portfolio/flowering-hedge.jpeg",
      "/images/portfolio/garden-maintenance.jpeg",
      "/images/portfolio/jo13.jpg",
      "/images/portfolio/jo15.jpg",
    ],
    faqs: [
      {
        question: "Waarom is een professioneel beplantingsplan belangrijk?",
        answer:
          "Een professioneel beplantingsplan zorgt ervoor dat planten worden geselecteerd die passen bij de specifieke omstandigheden van uw tuin (bodem, licht, vocht) en bij uw wensen qua onderhoud en uitstraling. Dit resulteert in een gezondere, mooiere tuin met minder uitval van planten en minder onderhoud op lange termijn.",
      },
      {
        question: "Hoe wordt rekening gehouden met seizoensvariatie?",
        answer:
          "In een goed beplantingsplan wordt gezorgd voor spreiding van bloei, bladkleur en structuur over de seizoenen. Zo heeft uw tuin in elk seizoen aantrekkelijke elementen, van voorjaarsbloemen tot herfstkleuren en wintersilhouetten.",
      },
      {
        question: "Kan een beplantingsplan ook voor een bestaande tuin worden gemaakt?",
        answer:
          "Zeker! We kunnen een beplantingsplan maken voor zowel nieuwe als bestaande tuinen. Bij bestaande tuinen inventariseren we eerst welke planten behouden kunnen blijven en welke beter vervangen kunnen worden, en vullen we aan waar nodig.",
      },
    ],
    relatedServices: ["ecologisch-groenbeheer", "complete-tuinonderhoud", "tuinontwerp"],
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
    categoryName: "Tuinonderhoud",
    pricing: {
      type: "Vanaf prijs",
      price: "€750",
      unit: "",
      note: "Exacte prijs afhankelijk van omvang en type verlichting",
    },
    gallery: [
      "/images/bg-2.jpeg",
      "/images/portfolio/garden-maintenance.jpeg",
      "/images/portfolio/jo12.jpg",
      "/images/portfolio/jo14.jpg",
    ],
    faqs: [
      {
        question: "Is tuinverlichting energiezuinig?",
        answer:
          "Moderne tuinverlichting maakt gebruik van energiezuinige LED-technologie, die tot 80% minder energie verbruikt dan traditionele verlichting. Daarnaast kunnen sensoren en timers worden geïnstalleerd om het energieverbruik verder te optimaliseren.",
      },
      {
        question: "Kan tuinverlichting ook in bestaande tuinen worden aangelegd?",
        answer:
          "Ja, tuinverlichting kan prima in bestaande tuinen worden geïnstalleerd. We zorgen ervoor dat de aanleg zo min mogelijk impact heeft op de bestaande beplanting en verharding.",
      },
      {
        question: "Hoe onderhoudsvriendelijk is tuinverlichting?",
        answer:
          "LED-tuinverlichting is zeer onderhoudsvriendelijk en heeft een lange levensduur. De armaturen zijn weerbestendig en vereisen weinig onderhoud. Periodieke controle en schoonmaken is voldoende om de verlichting in optimale conditie te houden.",
      },
    ],
    relatedServices: ["complete-tuinonderhoud", "bestrating-en-verharding", "vijveraanleg"],
  },
]

export default function ServicePage() {
  const params = useParams()
  const [isMounted, setIsMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Prevent hydration errors
  }

  const serviceId = params.serviceId as string
  const service = servicesData.find((s) => s.id === serviceId)

  if (!service) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-white py-16 md:py-24">
        <ParallaxEffect className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></ParallaxEffect>
        <ParallaxEffect
          offset={30}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        ></ParallaxEffect>

        <div className="container relative z-10">
          <Link href="/services" className="mb-6 inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={16} />
            <span>Terug naar alle diensten</span>
          </Link>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div>
              <Badge className="mb-4">{service.categoryName}</Badge>
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">{service.title}</h1>
              <p className="mb-6 text-lg text-gray-600">{service.fullDescription}</p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Offerte Aanvragen</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="tel:0616638510">Bel Direct: 06 1663 8510</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-tl-3xl z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-br-3xl z-0"></div>
              <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overzicht</TabsTrigger>
              <TabsTrigger value="features">Kenmerken</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Voordelen</h2>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                            <Check className="h-3 w-3" />
                          </div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Prijsindicatie</h2>
                    <div className="rounded-lg bg-gray-50 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="rounded-full bg-primary/20 p-3">
                          <Euro className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{service.pricing?.type}</p>
                          <p className="text-2xl font-bold">
                            {service.pricing?.price}{" "}
                            <span className="text-base font-normal text-gray-500">{service.pricing?.unit}</span>
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600">{service.pricing?.note}</p>
                      <Button className="w-full mt-4" asChild>
                        <Link href="/contact">Offerte Aanvragen</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {service.gallery && (
                <ScrollReveal>
                  <h2 className="text-2xl font-bold mb-6">Projecten</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {service.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${service.title} project ${index + 1}`}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </TabsContent>

            <TabsContent value="features">
              <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {service.features.map((feature, index) => (
                    <div key={index} className="rounded-lg border p-6">
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="faq">
              <ScrollReveal>
                <div className="space-y-6">
                  {service.faqs?.map((faq, index) => (
                    <div key={index} className="rounded-lg border p-6">
                      <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Klaar om te beginnen?</h2>
            <p className="text-lg">
              Neem vandaag nog contact met ons op voor een gratis adviesgesprek en offerte voor uw{" "}
              {service.title.toLowerCase()} project.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary hover:bg-white/90 hover:text-primary"
                asChild
              >
                <Link href="/contact">Offerte Aanvragen</Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-primary-foreground/10 text-white border border-white/20 hover:bg-primary-foreground/20"
                asChild
              >
                <Link href="tel:0616638510">Bel Direct: 06 1663 8510</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
