export interface ConversationContext {
  // Topics the user has asked about
  mentionedTopics: string[]
  // Most recent topic being discussed
  currentTopic: string | null
  // Service categories the user has shown interest in
  interestedServices: string[]
  // Track if user has mentioned location/project details
  hasSharedLocation: boolean
  hasSharedProjectDetails: boolean
  // Track if we've offered a quote/contact
  hasOfferedQuote: boolean
  // Number of messages in the current conversation
  messageCount: number
  // The last question answered
  lastQuestion: string | null
  // Name if user has shared it
  userName: string | null
  // Previous response to avoid repetition
  previousResponse: string | null
}

export function createInitialContext(): ConversationContext {
  return {
    mentionedTopics: [],
    currentTopic: null,
    interestedServices: [],
    hasSharedLocation: false,
    hasSharedProjectDetails: false,
    hasOfferedQuote: false,
    messageCount: 0,
    lastQuestion: null,
    userName: null,
    previousResponse: null,
  }
}

export function extractContext(messages: { content: string; sender: "user" | "bot" }[]): ConversationContext {
  const context = createInitialContext()

  // Skip bot welcome messages
  const userStartIndex = messages.findIndex((m) => m.sender === "user")
  if (userStartIndex === -1) return context

  const conversationMessages = messages.slice(userStartIndex)
  context.messageCount = conversationMessages.filter((m) => m.sender === "user").length

  // Process all messages to build context
  for (let i = 0; i < conversationMessages.length; i++) {
    const message = conversationMessages[i]
    const messageText = message.content.toLowerCase()

    if (message.sender === "user") {
      // Extract topics from user messages
      extractTopics(messageText, context)

      // Extract user name if they introduce themselves
      const nameMatch = messageText.match(/(?:ik ben|mijn naam is|hier spreekt) ([a-zA-Z]+)/i)
      if (nameMatch && nameMatch[1]) {
        context.userName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1)
      }

      // Check if user shared location
      if (
        messageText.includes("woon in") ||
        messageText.includes("mijn adres") ||
        messageText.includes("mijn tuin in") ||
        messageText.match(/in ([a-zA-Z\s]+) woon/i)
      ) {
        context.hasSharedLocation = true
      }

      // Check if user shared project details
      if (
        messageText.includes("mijn tuin") ||
        messageText.includes("mijn project") ||
        messageText.includes("ik wil graag") ||
        messageText.length > 100
      ) {
        // Long messages likely contain details
        context.hasSharedProjectDetails = true
      }

      // Store the last question to reference later
      context.lastQuestion = message.content
    } else if (i > 0 && conversationMessages[i - 1].sender === "user") {
      // Store the previous bot response to avoid repetition
      context.previousResponse = message.content
    }
  }

  return context
}

function extractTopics(messageText: string, context: ConversationContext) {
  // Service categories to track
  const serviceCategories = [
    "tuinonderhoud",
    "tuinaanleg",
    "beplanting",
    "snoeien",
    "bestrating",
    "gazon",
    "boomverzorging",
    "irrigatie",
    "ontwerp",
    "ecologisch",
  ]

  // Topics to recognize
  const topics = {
    prijs: ["offerte", "kosten", "prijs", "tarief", "prijsopgave", "budget"],
    diensten: ["dienst", "service", "wat doe", "wat bied", "wat lever"],
    contact: ["contact", "bellen", "mailen", "e-mail", "telefoon", "nummer"],
    locatie: ["locatie", "adres", "waar zit", "waar gevestigd"],
    tijden: ["openingstijd", "wanneer open", "wanneer bereikbaar", "werkdag"],
    beplanting: ["plant", "bloem", "struik", "boom", "haag"],
    onderhoud: ["onderhoud", "verzorging", "schoonmaak", "onkruid"],
    aanleg: ["aanleg", "nieuw", "creëren", "maken", "installeren"],
    seizoen: ["seizoen", "winter", "zomer", "herfst", "lente", "voorjaar"],
  }

  // Check for service categories
  for (const service of serviceCategories) {
    if (messageText.includes(service) && !context.interestedServices.includes(service)) {
      context.interestedServices.push(service)
    }
  }

  // Check for topics
  for (const [topic, keywords] of Object.entries(topics)) {
    for (const keyword of keywords) {
      if (messageText.includes(keyword) && !context.mentionedTopics.includes(topic)) {
        context.mentionedTopics.push(topic)
        context.currentTopic = topic
        break
      }
    }
  }
}

export function generateFollowupQuestion(context: ConversationContext): string | null {
  // Only generate follow-ups after a few messages
  if (context.messageCount < 2) return null

  // Avoid asking follow-ups too often
  if (Math.random() > 0.7) return null

  // If they've shown interest in services but not shared details
  if (context.interestedServices.length > 0 && !context.hasSharedProjectDetails) {
    const service = context.interestedServices[context.interestedServices.length - 1]
    return `Kunt u wat meer vertellen over uw project waarvoor u ${service} nodig heeft?`
  }

  // If they've mentioned prices but not shared project details
  if (context.mentionedTopics.includes("prijs") && !context.hasSharedProjectDetails) {
    return "Om u een goede prijsindicatie te kunnen geven, zou u wat meer kunnen vertellen over uw tuinproject?"
  }

  // If they've shared project details but not location
  if (context.hasSharedProjectDetails && !context.hasSharedLocation && !context.hasOfferedQuote) {
    return "In welke regio bevindt uw tuin zich? Dit helpt mij om beter advies te geven over lokale omstandigheden."
  }

  // If they've shared details but we haven't offered a quote yet
  if (context.hasSharedProjectDetails && !context.hasOfferedQuote) {
    context.hasOfferedQuote = true
    return "Op basis van wat u heeft verteld, kan ik u aanraden om een vrijblijvende offerte aan te vragen. Zou u daar interesse in hebben?"
  }

  // General seasonal follow-up when conversation is progressing
  if (context.messageCount >= 3 && !context.mentionedTopics.includes("seizoen")) {
    const currentMonth = new Date().getMonth()
    const seasons = [
      "winter",
      "winter",
      "lente",
      "lente",
      "lente",
      "zomer",
      "zomer",
      "zomer",
      "herfst",
      "herfst",
      "herfst",
      "winter",
    ]
    const currentSeason = seasons[currentMonth]

    return `Wist u trouwens dat de ${currentSeason} een uitstekende tijd is voor bepaalde tuinwerkzaamheden? Heeft u specifieke vragen over tuinonderhoud in deze periode?`
  }

  return null
}
