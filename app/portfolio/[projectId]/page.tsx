"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, MapPin, Calendar, User, CheckCircle, ChevronRight } from "lucide-react"

// Sample projects data - in a real application, this would come from a database or API
const projects = [
  {
    id: "moderne-achtertuin-apeldoorn",
    title: "Moderne Achtertuin",
    category: "particuliere-tuinen",
    categoryName: "Particuliere Tuinen",
    location: "Apeldoorn",
    date: "Juni 2023",
    client: "Familie de Vries",
    description: `
      <p>Voor deze moderne achtertuin in Apeldoorn hebben we een complete renovatie uitgevoerd. De klant wenste een onderhoudsvriendelijke tuin met een modern design, voldoende ruimte voor ontspanning en een groene uitstraling.</p>
      <p>We hebben gekozen voor een strakke indeling met een ruim terras van grote keramische tegels, een gazon voor de kinderen en borders met een mix van vaste planten en siergrassen voor jaarrond sierwaarde.</p>
      <p>Bijzondere elementen in deze tuin zijn de verhoogde cortenstalen plantenbakken, de geïntegreerde verlichting en het op maat gemaakte waterornament dat voor een rustgevend geluid zorgt.</p>
    `,
    services: ["Tuinontwerp", "Tuinaanleg", "Bestrating", "Beplanting", "Verlichting", "Waterornament"],
    challenges:
      "De uitdaging bij dit project was het creëren van voldoende privacy in een relatief kleine ruimte, zonder dat de tuin benauwd zou aanvoelen. Door het gebruik van verschillende hoogtes in de beplanting en strategisch geplaatste bomen hebben we een intieme maar ruimtelijke tuin gecreëerd.",
    results:
      "Het resultaat is een moderne, onderhoudsvriendelijke tuin die perfect aansluit bij de wensen van de klant en de architectuur van het huis. De tuin biedt nu jaarrond sierwaarde en verschillende plekken om te genieten van de buitenruimte.",
    mainImage: "/images/portfolio/garden-maintenance.jpeg",
    gallery: [
      { src: "/images/portfolio/garden-maintenance.jpeg", alt: "Overzicht van de moderne achtertuin" },
      { src: "/images/portfolio/residential-hedge.jpeg", alt: "Terras met keramische tegels" },
      { src: "/images/portfolio/flowering-hedge.jpeg", alt: "Verhoogde cortenstalen plantenbakken" },
      { src: "/images/bg-1.jpeg", alt: "Waterornament detail" },
      { src: "/images/portfolio/vegetation-control.jpeg", alt: "Borders met vaste planten en siergrassen" },
      { src: "/images/bg-2.jpeg", alt: "Tuinverlichting in de avond" },
    ],
    relatedProjects: ["villatuin-met-vijver", "bedrijfstuin-kantoorpand", "gemeentelijk-park-renovatie"],
  },
  {
    id: "bedrijfstuin-kantoorpand",
    title: "Bedrijfstuin Kantoorpand",
    category: "bedrijfstuinen",
    categoryName: "Bedrijfstuinen",
    location: "Deventer",
    date: "Mei 2023",
    client: "ABC Verzekeringen B.V.",
    description: `
      <p>Voor dit moderne kantoorpand in Deventer verzorgen wij het complete onderhoud en de seizoensgebonden beplanting. Het doel was om een representatieve en uitnodigende entree te creëren die past bij de uitstraling van het bedrijf.</p>
      <p>We hebben een onderhoudsplan opgesteld dat voorziet in wekelijks onderhoud van de groenvoorzieningen, seizoensgebonden wisselingen van de beplanting en jaarlijkse grotere onderhoudswerkzaamheden.</p>
      <p>Bijzondere aandacht is besteed aan de entree van het gebouw, waar we met kleurrijke beplanting en strakke vormgeving een visitekaartje voor het bedrijf hebben gecreëerd.</p>
    `,
    services: [
      "Groenvoorziening",
      "Onderhoud",
      "Seizoensgebonden beplanting",
      "Snoeiwerkzaamheden",
      "Onkruidbestrijding",
    ],
    challenges:
      "De uitdaging bij dit project was het creëren van een onderhoudsplan dat zowel kostenefficiënt is als zorgt voor een jaarrond aantrekkelijke uitstraling. Daarnaast moest de beplanting bestand zijn tegen de stedelijke omgeving en de specifieke lichtomstandigheden rond het gebouw.",
    results:
      "Het resultaat is een professioneel onderhouden bedrijfstuin die het hele jaar door een verzorgde indruk maakt en bijdraagt aan de representatieve uitstraling van het kantoorpand. De seizoensgebonden wisselingen in de beplanting zorgen voor een dynamisch beeld dat medewerkers en bezoekers waarderen.",
    mainImage: "/images/portfolio/commercial-landscaping.jpeg",
    gallery: [
      { src: "/images/portfolio/commercial-landscaping.jpeg", alt: "Overzicht van de bedrijfstuin" },
      { src: "/images/portfolio/institutional-landscaping.jpeg", alt: "Entree met seizoensbeplanting" },
      { src: "/images/portfolio/urban-maintenance.jpeg", alt: "Groene afscheiding parkeerplaats" },
      { src: "/images/portfolio/roadside-maintenance.jpeg", alt: "Binnentuin met zitgelegenheid" },
      { src: "/images/portfolio/public-maintenance.jpeg", alt: "Detail van de beplanting" },
    ],
    relatedProjects: [
      "bedrijventerrein-groenvoorziening",
      "moderne-achtertuin-apeldoorn",
      "gemeentelijk-park-renovatie",
    ],
  },
  {
    id: "gemeentelijk-park-renovatie",
    title: "Gemeentelijk Park",
    category: "openbare-ruimtes",
    categoryName: "Openbare Ruimtes",
    location: "Zwolle",
    date: "April 2023",
    client: "Gemeente Zwolle",
    description: `
      <p>In opdracht van de gemeente Zwolle hebben we een renovatie en onderhoudsplan uitgevoerd voor een bestaand gemeentelijk park. De focus lag op het verbeteren van de biodiversiteit, het creëren van meer gebruiksmogelijkheden voor verschillende doelgroepen en het implementeren van duurzame onderhoudsoplossingen.</p>
      <p>We hebben nieuwe beplantingsschema's geïntroduceerd met inheemse soorten die bijdragen aan de lokale biodiversiteit. Daarnaast zijn er nieuwe wandelpaden aangelegd, zitgelegenheden geplaatst en is er een natuurlijke speelplaats voor kinderen gecreëerd.</p>
      <p>Een belangrijk aspect van dit project was het implementeren van ecologisch groenbeheer, waarbij we gebruik maken van natuurlijke processen en minimale chemische middelen.</p>
    `,
    services: [
      "Groenvoorziening",
      "Onderhoud",
      "Beplanting",
      "Gazonbeheer",
      "Ecologisch groenbeheer",
      "Aanleg paden en zitgelegenheden",
    ],
    challenges:
      "De grootste uitdaging bij dit project was het balanceren van ecologische waarden met de recreatieve functie van het park. We moesten oplossingen vinden die zowel de biodiversiteit bevorderen als voldoen aan de wensen van verschillende gebruikersgroepen, van jonge gezinnen tot senioren.",
    results:
      "Het resultaat is een levendig park dat nu meer bezoekers trekt en tegelijkertijd een hogere ecologische waarde heeft. De gemeente is zeer tevreden met de duurzame onderhoudsoplossingen die we hebben geïmplementeerd, die zowel kostenefficiënt zijn als bijdragen aan de gemeentelijke duurzaamheidsdoelstellingen.",
    mainImage: "/images/portfolio/public-maintenance.jpeg",
    gallery: [
      { src: "/images/portfolio/public-maintenance.jpeg", alt: "Overzicht van het gemeentelijk park" },
      { src: "/images/portfolio/vegetation-control.jpeg", alt: "Nieuwe wandelpaden" },
      { src: "/images/portfolio/roadside-maintenance.jpeg", alt: "Natuurlijke speelplaats" },
      { src: "/images/portfolio/flowering-hedge.jpeg", alt: "Biodiverse beplanting" },
      { src: "/images/portfolio/urban-maintenance.jpeg", alt: "Zitgelegenheden in het park" },
      { src: "/images/bg-2.jpeg", alt: "Vijverpartij met natuurlijke oever" },
    ],
    relatedProjects: ["schoolplein-herinrichting", "moderne-achtertuin-apeldoorn", "bedrijfstuin-kantoorpand"],
  },
  {
    id: "parkeerterrein-aanleg",
    title: "Parkeerterrein Aanleg",
    category: "civiele-projecten",
    categoryName: "Civiele Projecten",
    location: "Arnhem",
    date: "Maart 2023",
    client: "XYZ Bedrijvencentrum",
    description: `
      <p>Voor het XYZ Bedrijvencentrum in Arnhem hebben we een duurzaam parkeerterrein aangelegd met waterdoorlatende bestrating. Het doel was om een functioneel parkeerterrein te creëren dat tegelijkertijd bijdraagt aan duurzaam waterbeheer en een groene uitstraling heeft.</p>
      <p>We hebben gekozen voor een combinatie van waterdoorlatende klinkers en grasbetontegels, aangevuld met strategisch geplaatste groenstroken en bomen. Deze combinatie zorgt voor een goede waterinfiltratie en vermindert hittestress in de zomer.</p>
      <p>Het project omvatte ook de aanleg van een efficiënt drainagesysteem en LED-verlichting op zonne-energie.</p>
    `,
    services: ["Civiele Werken", "Bestrating", "Drainage", "Groenvoorziening", "Verlichting"],
    challenges:
      "De uitdaging bij dit project was het combineren van functionaliteit met duurzaamheid. Het parkeerterrein moest voldoende parkeerplaatsen bieden en goed toegankelijk zijn, maar tegelijkertijd bijdragen aan duurzaam waterbeheer en een prettige uitstraling hebben.",
    results:
      "Het resultaat is een modern parkeerterrein dat niet alleen functioneel is maar ook bijdraagt aan de duurzaamheidsdoelstellingen van het bedrijvencentrum. De waterdoorlatende bestrating en het efficiënte drainagesysteem zorgen voor een goede waterhuishouding, terwijl de groenvoorzieningen bijdragen aan een prettige uitstraling en vermindering van hittestress.",
    mainImage: "/images/portfolio/civil-works.jpeg",
    gallery: [
      { src: "/images/portfolio/civil-works.jpeg", alt: "Overzicht van het parkeerterrein" },
      { src: "/images/portfolio/roadside-maintenance.jpeg", alt: "Detail waterdoorlatende bestrating" },
      { src: "/images/portfolio/urban-maintenance.jpeg", alt: "Groenstroken tussen parkeerplaatsen" },
      { src: "/images/bg-1.jpeg", alt: "LED-verlichting op zonne-energie" },
      { src: "/images/portfolio/vegetation-control.jpeg", alt: "Drainagesysteem tijdens aanleg" },
    ],
    relatedProjects: ["fietspad-aanleg", "bedrijfstuin-kantoorpand", "bedrijventerrein-groenvoorziening"],
  },
  {
    id: "villatuin-met-vijver",
    title: "Villatuin met Vijver",
    category: "particuliere-tuinen",
    categoryName: "Particuliere Tuinen",
    location: "Epe",
    date: "Juli 2023",
    client: "Familie Jansen",
    description: `
      <p>Voor deze ruime villatuin in Epe hebben we een ontwerp gemaakt en uitgevoerd met als centraal element een natuurlijke vijver. De wens van de klant was een tuin die aansluit bij de landelijke omgeving, maar toch een luxe uitstraling heeft.</p>
      <p>We hebben gekozen voor een organische vormgeving met verschillende terrassen die uitzicht bieden op de vijver en de tuin. De vijver is voorzien van een natuurlijke filtering en beplanting, waardoor er geen chemicaliën nodig zijn voor het onderhoud.</p>
      <p>De beplanting bestaat uit een mix van inheemse en sierlijke soorten die jaarrond voor kleur en structuur zorgen. Bijzondere aandacht is besteed aan de verlichting, die de tuin ook in de avonduren tot een sfeervolle plek maakt.</p>
    `,
    services: ["Tuinontwerp", "Tuinaanleg", "Vijveraanleg", "Beplanting", "Terrassen", "Verlichting"],
    challenges:
      "De uitdaging bij dit project was het integreren van een grote vijver in de tuin op een natuurlijke manier. De grondwaterstand en de bodemgesteldheid vereisten speciale aandacht bij de aanleg van de vijver. Daarnaast moest de tuin zowel representatief als praktisch zijn voor de bewoners.",
    results:
      "Het resultaat is een harmonieuze tuin die perfect aansluit bij de villa en de omgeving. De vijver vormt een natuurlijk middelpunt en trekt diverse vogels en insecten aan, wat bijdraagt aan de biodiversiteit. De verschillende terrassen bieden de bewoners de mogelijkheid om op verschillende momenten van de dag van de tuin te genieten.",
    mainImage: "/images/portfolio/residential-hedge.jpeg",
    gallery: [
      { src: "/images/portfolio/residential-hedge.jpeg", alt: "Overzicht van de villatuin met vijver" },
      { src: "/images/bg-1.jpeg", alt: "Natuurlijke vijver met waterplanten" },
      { src: "/images/portfolio/garden-maintenance.jpeg", alt: "Terras met uitzicht op de vijver" },
      { src: "/images/portfolio/flowering-hedge.jpeg", alt: "Borders met vaste planten" },
      { src: "/images/bg-2.jpeg", alt: "Tuinverlichting in de avond" },
      { src: "/images/portfolio/vegetation-control.jpeg", alt: "Natuurlijke oever van de vijver" },
    ],
    relatedProjects: ["moderne-achtertuin-apeldoorn", "bedrijfstuin-kantoorpand", "gemeentelijk-park-renovatie"],
  },
  {
    id: "bedrijventerrein-groenvoorziening",
    title: "Bedrijventerrein Groenvoorziening",
    category: "bedrijfstuinen",
    categoryName: "Bedrijfstuinen",
    location: "Apeldoorn",
    date: "Augustus 2023",
    client: "Bedrijventerrein De Velden",
    description: `
      <p>Voor bedrijventerrein De Velden in Apeldoorn hebben we een grootschalig project uitgevoerd voor het onderhoud en de vernieuwing van de groenvoorziening. Het doel was om het bedrijventerrein een frissere en meer representatieve uitstraling te geven.</p>
      <p>We hebben een masterplan ontwikkeld voor het hele terrein, waarbij we hebben gekeken naar de huidige staat van het groen, de wensen van de bedrijven en de mogelijkheden voor verduurzaming. Op basis hiervan hebben we een gefaseerd plan uitgevoerd voor de vernieuwing van de beplanting en het verbeteren van de infrastructuur.</p>
      <p>Bijzondere aandacht is besteed aan de entree van het bedrijventerrein en de hoofdwegen, waar we met opvallende beplanting en duidelijke structuren een betere oriëntatie hebben gecreëerd.</p>
    `,
    services: ["Groenvoorziening", "Onderhoud", "Beplanting", "Masterplan", "Infrastructuur"],
    challenges:
      "De uitdaging bij dit project was het creëren van een samenhangend geheel op een groot terrein met verschillende bedrijven en gebouwen. Daarnaast moest de uitvoering gefaseerd plaatsvinden om de dagelijkse bedrijfsactiviteiten zo min mogelijk te verstoren. Ook was er een beperkt budget beschikbaar, wat creatieve oplossingen vereiste.",
    results:
      "Het resultaat is een bedrijventerrein met een veel groenere en meer samenhangende uitstraling. De nieuwe beplanting is niet alleen esthetisch aantrekkelijker, maar ook onderhoudsvriendelijker en duurzamer. De bedrijven op het terrein zijn zeer tevreden met de verbeterde uitstraling, wat bijdraagt aan een positiever imago voor hun klanten en bezoekers.",
    mainImage: "/images/portfolio/institutional-landscaping.jpeg",
    gallery: [
      { src: "/images/portfolio/institutional-landscaping.jpeg", alt: "Overzicht van het bedrijventerrein" },
      { src: "/images/portfolio/commercial-landscaping.jpeg", alt: "Entree van het bedrijventerrein" },
      { src: "/images/portfolio/urban-maintenance.jpeg", alt: "Groenstroken langs hoofdwegen" },
      { src: "/images/portfolio/roadside-maintenance.jpeg", alt: "Beplanting rond bedrijfspanden" },
      { src: "/images/portfolio/vegetation-control.jpeg", alt: "Detail van de nieuwe beplanting" },
    ],
    relatedProjects: ["bedrijfstuin-kantoorpand", "parkeerterrein-aanleg", "gemeentelijk-park-renovatie"],
  },
  {
    id: "schoolplein-herinrichting",
    title: "Schoolplein Herinrichting",
    category: "openbare-ruimtes",
    categoryName: "Openbare Ruimtes",
    location: "Deventer",
    date: "September 2023",
    client: "Basisschool De Regenboog",
    description: `
      <p>Voor basisschool De Regenboog in Deventer hebben we het schoolplein heringericht met natuurlijke speelelementen en groenvoorziening. Het doel was om een uitdagende en educatieve buitenruimte te creëren die kinderen stimuleert om meer te bewegen en te leren over de natuur.</p>
      <p>We hebben het bestaande, grotendeels verharde schoolplein getransformeerd naar een groene oase met verschillende zones voor spel, ontdekking en rust. Er zijn natuurlijke speelelementen toegevoegd zoals boomstammen, keien en een waterspeelplaats. Daarnaast hebben we een moestuin aangelegd waar kinderen kunnen leren over het kweken van groenten en kruiden.</p>
      <p>De beplanting is zorgvuldig geselecteerd op kindvriendelijkheid, onderhoudsgemak en educatieve waarde. Er zijn verschillende inheemse planten gebruikt die vlinders en bijen aantrekken, wat bijdraagt aan de biodiversiteit en educatieve mogelijkheden biedt.</p>
    `,
    services: ["Ontwerp", "Aanleg", "Speelelementen", "Beplanting", "Moestuin", "Educatieve elementen"],
    challenges:
      "De uitdaging bij dit project was het creëren van een veilige maar uitdagende speelomgeving binnen een beperkt budget. Het schoolplein moest voldoen aan alle veiligheidseisen, maar tegelijkertijd avontuurlijk en natuurlijk aanvoelen. Daarnaast moest de herinrichting plaatsvinden tijdens de zomervakantie, wat een strakke planning vereiste.",
    results:
      "Het resultaat is een transformatie van een saai, verhard schoolplein naar een groene, avontuurlijke leeromgeving. De kinderen zijn enthousiast over de nieuwe speelmogelijkheden en de leerkrachten maken graag gebruik van de buitenruimte voor lessen over natuur en milieu. Het schoolplein trekt nu ook buiten schooltijden kinderen en ouders uit de buurt aan, wat bijdraagt aan de sociale cohesie in de wijk.",
    mainImage: "/images/portfolio/flowering-hedge.jpeg",
    gallery: [
      { src: "/images/portfolio/flowering-hedge.jpeg", alt: "Overzicht van het schoolplein" },
      { src: "/images/portfolio/institutional-landscaping.jpeg", alt: "Natuurlijke speelelementen" },
      { src: "/images/bg-1.jpeg", alt: "Waterspeelplaats" },
      { src: "/images/portfolio/vegetation-control.jpeg", alt: "Moestuin voor educatieve doeleinden" },
      { src: "/images/portfolio/garden-maintenance.jpeg", alt: "Zithoek met schaduw" },
      { src: "/images/portfolio/public-maintenance.jpeg", alt: "Beplanting die vlinders aantrekt" },
    ],
    relatedProjects: ["gemeentelijk-park-renovatie", "moderne-achtertuin-apeldoorn", "fietspad-aanleg"],
  },
  {
    id: "fietspad-aanleg",
    title: "Fietspad Aanleg",
    category: "civiele-projecten",
    categoryName: "Civiele Projecten",
    location: "Zutphen",
    date: "Oktober 2023",
    client: "Gemeente Zutphen",
    description: `
      <p>In opdracht van de gemeente Zutphen hebben we een nieuw fietspad aangelegd met bijbehorende groenvoorziening. Het fietspad verbindt een woonwijk met het centrum en is onderdeel van een breder plan om duurzame mobiliteit te stimuleren.</p>
      <p>We hebben gekozen voor een duurzame aanpak met milieuvriendelijke materialen en een ontwerp dat rekening houdt met de natuurlijke omgeving. Het fietspad is aangelegd met een speciale asfaltsoort die CO2-uitstoot tijdens productie vermindert en een langere levensduur heeft dan traditioneel asfalt.</p>
      <p>Langs het fietspad hebben we een gevarieerde beplanting aangebracht die bijdraagt aan de biodiversiteit en een aangename fietsomgeving creëert. Er zijn ook rustpunten gecreëerd met zitgelegenheden en informatieborden over de lokale natuur en geschiedenis.</p>
    `,
    services: ["Civiele Werken", "Bestrating", "Groenvoorziening", "Duurzame materialen", "Rustpunten"],
    challenges:
      "De uitdaging bij dit project was het aanleggen van een fietspad door een gebied met ecologische waarde, zonder de natuurlijke omgeving te verstoren. We moesten zorgvuldig te werk gaan om de impact op de flora en fauna te minimaliseren en tegelijkertijd een veilig en comfortabel fietspad te creëren. Ook moesten we rekening houden met de waterhuishouding in het gebied.",
    results:
      "Het resultaat is een aantrekkelijk fietspad dat goed wordt gebruikt door bewoners en bezoekers. De groenvoorziening langs het pad heeft zich goed ontwikkeld en draagt bij aan de biodiversiteit in het gebied. De gemeente is zeer tevreden met de duurzame uitvoering en de positieve reacties van gebruikers. Het project heeft bijgedragen aan de doelstelling van de gemeente om duurzame mobiliteit te stimuleren.",
    mainImage: "/images/portfolio/roadside-maintenance.jpeg",
    gallery: [
      { src: "/images/portfolio/roadside-maintenance.jpeg", alt: "Overzicht van het fietspad" },
      { src: "/images/portfolio/civil-works.jpeg", alt: "Duurzaam asfalt tijdens aanleg" },
      { src: "/images/portfolio/vegetation-control.jpeg", alt: "Groenvoorziening langs het fietspad" },
      { src: "/images/bg-2.jpeg", alt: "Rustpunt met zitgelegenheid" },
      { src: "/images/portfolio/public-maintenance.jpeg", alt: "Informatiebord over lokale natuur" },
    ],
    relatedProjects: ["parkeerterrein-aanleg", "gemeentelijk-park-renovatie", "bedrijventerrein-groenvoorziening"],
  },
  {
    id: "vegetatie-beheer",
    title: "Vegetatie Beheer",
    category: "openbare-ruimtes",
    categoryName: "Openbare Ruimtes",
    location: "Apeldoorn",
    date: "November 2023",
    client: "Waterschap Vallei en Veluwe",
    description: `
      <p>In opdracht van Waterschap Vallei en Veluwe hebben we een uitgebreid vegetatiebeheerproject uitgevoerd langs waterwegen en in natuurgebieden. Het doel was om de waterafvoer te optimaliseren en tegelijkertijd de ecologische waarde van deze gebieden te vergroten.</p>
      <p>We hebben een gedifferentieerd maaibeleid geïmplementeerd, waarbij sommige delen intensiever worden onderhouden voor een goede waterafvoer, terwijl andere delen juist extensiever worden beheerd om de biodiversiteit te bevorderen. Hierbij maken we gebruik van speciale machines die minimale bodemverdichting veroorzaken.</p>
      <p>Daarnaast hebben we invasieve exoten verwijderd en vervangen door inheemse soorten die beter passen in het lokale ecosysteem en bijdragen aan de stabiliteit van de oevers.</p>
    `,
    services: [
      "Vegetatiebeheer",
      "Ecologisch Onderhoud",
      "Natuurbeheer",
      "Invasieve Soorten Bestrijding",
      "Maaibeheer",
    ],
    challenges:
      "De uitdaging bij dit project was het vinden van de juiste balans tussen waterbeheer en natuurwaarden. Te intensief beheer zou de biodiversiteit schaden, terwijl te extensief beheer problemen zou kunnen veroorzaken voor de waterafvoer. Daarnaast moesten we rekening houden met broedseizoen en andere ecologisch gevoelige periodes.",
    results:
      "Het resultaat is een verbeterde waterafvoer met behoud en zelfs versterking van de ecologische waarden. De biodiversiteit is toegenomen, wat blijkt uit monitoring van flora en fauna. Het waterschap is zeer tevreden met de professionele aanpak en de balans die we hebben gevonden tussen verschillende belangen.",
    mainImage: "/images/portfolio/vegetation-control.jpeg",
    gallery: [
      { src: "/images/portfolio/vegetation-control.jpeg", alt: "Vegetatiebeheer langs waterweg" },
      { src: "/images/portfolio/public-maintenance.jpeg", alt: "Ecologisch maaibeheer" },
      { src: "/images/portfolio/roadside-maintenance.jpeg", alt: "Verwijdering invasieve exoten" },
      { src: "/images/portfolio/garden-maintenance.jpeg", alt: "Specialistische machines in actie" },
      { src: "/images/portfolio/urban-maintenance.jpeg", alt: "Resultaat na beheermaatregelen" },
    ],
    relatedProjects: ["gemeentelijk-park-renovatie", "fietspad-aanleg", "stadsgroen-onderhoud"],
  },
  {
    id: "stadsgroen-onderhoud",
    title: "Stadsgroen Onderhoud",
    category: "openbare-ruimtes",
    categoryName: "Openbare Ruimtes",
    location: "Deventer",
    date: "December 2023",
    client: "Gemeente Deventer",
    description: `
      <p>Voor de gemeente Deventer verzorgen wij het onderhoud van groenvoorzieningen in de stedelijke omgeving. Het doel is om de leefbaarheid en aantrekkelijkheid van de stad te vergroten door goed onderhouden groen, met speciale aandacht voor duurzaamheid en biodiversiteit.</p>
      <p>We hebben een onderhoudsplan ontwikkeld dat rekening houdt met de specifieke uitdagingen van stadsgroen, zoals droogtestress, bodemverdichting en vervuiling. Hierbij maken we gebruik van innovatieve technieken zoals sensoren voor bodemvocht en slimme irrigatiesystemen.</p>
      <p>Daarnaast hebben we op verschillende locaties de traditionele seizoensbeplanting vervangen door vaste planten die minder water en onderhoud vereisen maar wel jaarrond sierwaarde bieden. Ook hebben we bijenlinten aangelegd om de biodiversiteit te bevorderen.</p>
    `,
    services: ["Groenvoorziening", "Onderhoud", "Stadsbeheer", "Duurzame Beplanting", "Biodiversiteit"],
    challenges:
      "De uitdaging bij dit project was het ontwikkelen van onderhoudsstrategieën die passen bij de toenemende klimaatverandering, met langere periodes van droogte en hevige regenval. Daarnaast moesten we rekening houden met de intensieve gebruiksdruk van stadsgroen en de wensen van verschillende belanghebbenden, van bewoners tot ondernemers.",
    results:
      "Het resultaat is een robuuster en duurzamer stadsgroen dat beter bestand is tegen klimaatverandering en tegelijkertijd bijdraagt aan de biodiversiteit. De nieuwe beplantingsconcepten hebben geleid tot een afname van het waterverbruik en een toename van het aantal insecten en vogels in de stad. Bewoners waarderen de verbeterde uitstraling van het groen en de gemeente is tevreden met de kostenefficiëntie op lange termijn.",
    mainImage: "/images/portfolio/urban-maintenance.jpeg",
    gallery: [
      { src: "/images/portfolio/urban-maintenance.jpeg", alt: "Stadsgroen onderhoud" },
      { src: "/images/portfolio/roadside-maintenance.jpeg", alt: "Duurzame beplanting in de stad" },
      { src: "/images/portfolio/public-maintenance.jpeg", alt: "Bijenlinten in stedelijke omgeving" },
      { src: "/images/portfolio/commercial-landscaping.jpeg", alt: "Slimme irrigatiesystemen" },
      { src: "/images/portfolio/vegetation-control.jpeg", alt: "Onderhoud van stadsparken" },
    ],
    relatedProjects: ["gemeentelijk-park-renovatie", "vegetatie-beheer", "bedrijventerrein-groenvoorziening"],
  },
]

// Function to get related projects
const getRelatedProjects = (relatedIds) => {
  return projects.filter((project) => relatedIds.includes(project.id))
}

export default function ProjectDetailPage() {
  const { projectId } = useParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedImage, setSelectedImage] = useState(null)

  // Find the current project
  const project = projects.find((p) => p.id === projectId)

  // If project not found, return 404
  if (!project) {
    notFound()
  }

  // Get related projects
  const relatedProjects = getRelatedProjects(project.relatedProjects)

  return (
    <>
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <Link href="/portfolio" className="text-primary flex items-center mb-4 hover:underline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar Portfolio
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
              <div className="flex items-center mt-2">
                <Badge variant="outline" className="mr-2 bg-primary/5 text-primary border-primary/20">
                  {project.categoryName}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-1" />
                <span>{project.client}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-lg mb-8">
                <Image
                  src={project.mainImage || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full mb-8">
                  <TabsTrigger value="overview">Overzicht</TabsTrigger>
                  <TabsTrigger value="services">Diensten</TabsTrigger>
                  <TabsTrigger value="gallery">Galerij</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: project.description }} />

                    <h3 className="text-xl font-bold mt-8 mb-4">Uitdagingen</h3>
                    <p>{project.challenges}</p>

                    <h3 className="text-xl font-bold mt-8 mb-4">Resultaten</h3>
                    <p>{project.results}</p>
                  </div>
                </TabsContent>

                <TabsContent value="services">
                  <h3 className="text-xl font-bold mb-6">Geleverde Diensten</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.services.map((service, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="gallery">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className="border-none shadow-lg mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Categorie</p>
                      <p className="font-medium">{project.categoryName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Locatie</p>
                      <p className="font-medium">{project.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Datum</p>
                      <p className="font-medium">{project.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Klant</p>
                      <p className="font-medium">{project.client}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Interesse in een soortgelijk project?</h3>
                  <p className="text-gray-600 mb-6">
                    Bent u geïnspireerd door dit project en wilt u iets soortgelijks voor uw eigen tuin of bedrijf? Neem
                    contact met ons op voor een vrijblijvend adviesgesprek.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/contact">Neem Contact Op</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl max-h-[80vh]">
            <button
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="relative aspect-auto h-full">
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-white text-center mt-4">{selectedImage.alt}</p>
          </div>
        </div>
      )}

      {/* Related Projects */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Gerelateerde Projecten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((relatedProject) => (
              <Link key={relatedProject.id} href={`/portfolio/${relatedProject.id}`}>
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={relatedProject.mainImage || "/placeholder.svg"}
                      alt={relatedProject.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{relatedProject.title}</h3>
                    <p className="text-gray-600 line-clamp-2 mb-2">
                      {relatedProject.excerpt || relatedProject.description.substring(0, 100)}
                    </p>
                    <div className="text-primary font-medium inline-flex items-center hover:underline">
                      Bekijk Project <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
