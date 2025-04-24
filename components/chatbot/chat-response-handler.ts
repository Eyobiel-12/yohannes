import type { ChatMessage } from "./types"

// Topics that the chatbot can recognize and respond to
const topics = {
  services: ["dienst", "service", "tuinonderhoud", "snoeien", "maaien", "aanleg", "ontwerp", "beplanting"],
  pricing: ["prijs", "kosten", "tarief", "offerte", "betalen", "euro", "€"],
  contact: ["contact", "bellen", "telefoon", "email", "e-mail", "bereiken", "afspraak"],
  location: ["locatie", "adres", "waar", "regio", "gebied", "werkgebied"],
  hours: ["openingstijden", "open", "gesloten", "bereikbaar", "beschikbaar", "wanneer"],
  about: ["over", "bedrijf", "ervaring", "achtergrond", "geschiedenis", "wie"],
  greeting: ["hallo", "hoi", "goedemorgen", "goedemiddag", "goedenavond", "hey"],
  thanks: ["bedankt", "dank", "dankjewel", "thanks", "dankuwel"],
  help: ["help", "hulp", "assistentie", "ondersteuning"],
}

// Service categories and specific services
const services = {
  tuinonderhoud: [
    "regulier tuinonderhoud",
    "snoeiwerkzaamheden",
    "onkruidbestrijding",
    "bladruimen",
    "vijveronderhoud",
  ],
  tuinaanleg: ["tuinontwerp", "bestrating", "beplanting", "gazonaanleg", "vijveraanleg", "verlichting"],
  boomverzorging: ["snoeien", "kappen", "planten", "ziektebestrijding"],
  groenvoorziening: ["bedrijfstuinen", "openbare ruimtes", "parkonderhoud"],
}

// Seasonal gardening advice
const seasonalAdvice = {
  spring: [
    "Het is een goed moment om uw gazon te verticuteren en te bemesten voor een gezonde start van het seizoen.",
    "Voorjaarsbloeiers planten kan nu nog steeds, maar zorg voor voldoende water tijdens droge periodes.",
    "Snoei uw heesters na de bloei voor een mooie vorm en gezonde groei.",
  ],
  summer: [
    "Regelmatig water geven is essentieel, bij voorkeur 's ochtends vroeg of 's avonds laat.",
    "Maai het gras niet te kort tijdens hete periodes om uitdroging te voorkomen.",
    "Verwijder uitgebloeide bloemen om doorbloeien te stimuleren.",
  ],
  autumn: [
    "Nu is het tijd om bladeren te ruimen en uw tuin winterklaar te maken.",
    "Plant voorjaarsbollen voor een kleurrijke start van het nieuwe seizoen.",
    "Bescherm vorstgevoelige planten voordat de eerste vorst invalt.",
  ],
  winter: [
    "Snoei bomen en struiken tijdens de rustperiode voor een gezonde groei in het voorjaar.",
    "Controleer tuinmeubilair en schuttingen op schade en voer reparaties uit.",
    "Plan uw tuinprojecten voor het komende jaar en vraag tijdig offertes aan.",
  ],
}

// Get the current season in Dutch
function getCurrentSeason(): "spring" | "summer" | "autumn" | "winter" {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return "spring" // maart t/m mei
  if (month >= 5 && month <= 7) return "summer" // juni t/m augustus
  if (month >= 8 && month <= 10) return "autumn" // september t/m november
  return "winter" // december t/m februari
}

// Extract user name from messages if available
function extractUserName(messages: ChatMessage[]): string | null {
  const namePatterns = [/mijn naam is (\w+)/i, /ik ben (\w+)/i, /ik heet (\w+)/i, /(\w+) hier/i]

  for (const message of messages) {
    if (message.sender === "user") {
      for (const pattern of namePatterns) {
        const match = message.content.match(pattern)
        if (match && match[1]) {
          return match[1]
        }
      }
    }
  }
  return null
}

// Identify the main topic of the message
function identifyTopic(message: string): string[] {
  const lowerMessage = message.toLowerCase()
  const identifiedTopics: string[] = []

  for (const [topic, keywords] of Object.entries(topics)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        identifiedTopics.push(topic)
        break
      }
    }
  }

  return identifiedTopics.length > 0 ? identifiedTopics : ["general"]
}

// Check if a specific service was mentioned
function identifyService(message: string): string | null {
  const lowerMessage = message.toLowerCase()

  for (const [category, serviceList] of Object.entries(services)) {
    if (lowerMessage.includes(category.toLowerCase())) {
      return category
    }

    for (const service of serviceList) {
      if (lowerMessage.includes(service.toLowerCase())) {
        return service
      }
    }
  }

  return null
}

// Check if the user has previously mentioned a topic
function hasPreviouslyMentioned(topic: string, messages: ChatMessage[]): boolean {
  for (const message of messages) {
    if (message.sender === "user") {
      const messageTopics = identifyTopic(message.content)
      if (messageTopics.includes(topic)) {
        return true
      }
    }
  }
  return false
}

// Get a random item from an array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// Main function to handle chat responses
export function handleChatResponse(message: string, messages: ChatMessage[] = []): string {
  const topics = identifyTopic(message)
  const userName = extractUserName(messages)
  const currentSeason = getCurrentSeason()
  const mentionedService = identifyService(message)

  // Greeting with name if available
  const greeting = userName ? `Hallo ${userName}! ` : ""

  // Handle greetings
  if (topics.includes("greeting")) {
    return `${greeting}Hallo! Hoe kan ik u vandaag helpen met uw tuinvragen?`
  }

  // Handle thanks
  if (topics.includes("thanks")) {
    return `Graag gedaan! ${userName ? userName + ", " : ""}Is er nog iets anders waarmee ik u kan helpen?`
  }

  // Handle help requests
  if (topics.includes("help")) {
    return `${greeting}Ik kan u helpen met informatie over onze tuindiensten, prijzen, contactgegevens, openingstijden en meer. Wat wilt u precies weten?`
  }

  // Handle services inquiries
  if (topics.includes("services")) {
    if (mentionedService) {
      // Specific service was mentioned
      switch (mentionedService) {
        case "tuinonderhoud":
          return `${greeting}Ons tuinonderhoud omvat alle regelmatige werkzaamheden om uw tuin in topconditie te houden, zoals snoeien, maaien, onkruidbestrijding en seizoensgebonden taken. We kunnen dit op maat aanbieden met een onderhoudscontract of als losse service. Wilt u meer weten over onze onderhoudscontracten?`

        case "tuinaanleg":
          return `${greeting}Bij tuinaanleg verzorgen we het complete proces van ontwerp tot realisatie. We houden rekening met uw wensen, de bodemgesteldheid en lichtomstandigheden voor een optimaal resultaat. Heeft u al een specifiek idee voor uw tuin?`

        case "boomverzorging":
          return `${greeting}Onze boomverzorging omvat het vakkundig snoeien, verzorgen en indien nodig veilig verwijderen van bomen. We zorgen voor de gezondheid en veiligheid van uw bomen met respect voor de natuur. Heeft u een specifieke boom die aandacht nodig heeft?`

        case "groenvoorziening":
          return `${greeting}Onze groenvoorzieningsdiensten zijn gericht op bedrijven en openbare ruimtes. We verzorgen complete groenprojecten van ontwerp tot onderhoud, met aandacht voor duurzaamheid en biodiversiteit. Bent u geïnteresseerd in een specifiek aspect van groenvoorziening?`

        default:
          return `${greeting}We bieden inderdaad ${mentionedService} aan als onderdeel van onze diensten. Wilt u hier meer informatie over of bent u geïnteresseerd in een vrijblijvende offerte?`
      }
    } else {
      // General services question
      return `${greeting}Yohannes Hovenier biedt diverse tuindiensten aan, waaronder tuinonderhoud, tuinaanleg, beplanting, snoeien, bestrating, en meer. We hebben ook gespecialiseerde diensten zoals gazonverzorging, boomverzorging, irrigatiesystemen en ecologisch tuinieren. U kunt onze volledige lijst met diensten bekijken op /services. Is er een specifieke dienst waar u meer over wilt weten?`
    }
  }

  // Handle pricing inquiries
  if (topics.includes("pricing")) {
    if (mentionedService) {
      return `${greeting}Voor een prijsopgave voor ${mentionedService} kunt u een vrijblijvende offerte aanvragen via ons offerteformulier op /offerte-aanvragen. De exacte prijs hangt af van verschillende factoren zoals de grootte van het project en specifieke wensen. Zou u wat meer kunnen vertellen over het project waarvoor u een offerte wilt?`
    } else {
      return `${greeting}Onze prijzen zijn afhankelijk van de specifieke dienst, de omvang van het project en uw wensen. Voor een nauwkeurige prijsopgave kunt u een vrijblijvende offerte aanvragen via /offerte-aanvragen of bel ons op 06 1663 8510. Welke dienst heeft u specifiek in gedachten?`
    }
  }

  // Handle contact inquiries
  if (topics.includes("contact")) {
    return `${greeting}U kunt contact met ons opnemen via telefoon: 06 1663 8510, e-mail: info@yohanneshoveneirsbderijf.nl, of via het contactformulier op onze website: /contact. We reageren doorgaans binnen 24 uur op berichten. Waarmee kunnen we u helpen?`
  }

  // Handle location inquiries
  if (topics.includes("location")) {
    return `${greeting}Ons bedrijf is gevestigd in Apeldoorn (Aristotelesstraat 993, 7323 NZ), maar we werken in heel Overijssel en Gelderland. Bent u geïnteresseerd in onze diensten voor een specifieke locatie?`
  }

  // Handle opening hours inquiries
  if (topics.includes("hours")) {
    return `${greeting}Onze kantooruren zijn van maandag tot en met vrijdag van 08:00 tot 17:00 uur. In het weekend zijn we gesloten. U kunt echter altijd een bericht achterlaten via onze website of e-mail, en we nemen zo snel mogelijk contact met u op. Heeft u een dringende vraag?`
  }

  // Handle about inquiries
  if (topics.includes("about")) {
    return `${greeting}Yohannes Hovenier is een professioneel hoveniersbedrijf gespecialiseerd in tuinonderhoud, groenvoorziening en boomverzorging in Overijssel en Gelderland. We staan voor kwaliteit, duurzaamheid en persoonlijke service. Meer informatie over ons bedrijf vindt u op /about. Heeft u een specifieke vraag over ons bedrijf?`
  }

  // If no specific topic was identified, provide seasonal advice or general response
  if (topics.includes("general")) {
    // If we've had a conversation already, provide seasonal advice
    if (messages.length > 3) {
      return `${greeting}${getRandomItem(seasonalAdvice[currentSeason])} Heeft u een specifieke tuinvraag waar ik u mee kan helpen?`
    } else {
      // First-time general response
      return `${greeting}Ik ben Yohannes, uw virtuele tuinexpert. Ik kan u informeren over onze diensten, prijzen, en meer. Waarmee kan ik u vandaag helpen?`
    }
  }

  // Fallback response
  return `${greeting}Bedankt voor uw bericht. Kan ik u helpen met informatie over onze tuindiensten, een offerte of heeft u een andere vraag?`
}
