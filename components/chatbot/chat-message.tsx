import { formatDistanceToNow } from "date-fns"
import { nl } from "date-fns/locale"
import type { ChatMessage } from "./types"

interface ChatMessageProps {
  message: ChatMessage
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === "bot"

  // Format the timestamp to show how long ago the message was sent
  const formattedTime = formatDistanceToNow(new Date(message.timestamp), {
    addSuffix: true,
    locale: nl,
  })

  // Function to convert URLs in text to clickable links
  const formatMessageWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)|(\/[a-z-]+(?:\/[a-z-]+)*)/g

    return text.split(urlRegex).map((part, i) => {
      if (!part) return null

      // Check if part is a URL
      if (part.match(/^https?:\/\//)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {part}
          </a>
        )
      }

      // Check if part is an internal link (starts with /)
      if (part.match(/^\/[a-z-]+(?:\/[a-z-]+)*/)) {
        return (
          <a key={i} href={part} className="text-primary hover:underline">
            {part}
          </a>
        )
      }

      // Regular text
      return part
    })
  }

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 overflow-hidden">
          <img src="/images/logo.png" alt="Yohannes" className="w-6 h-6 object-contain" />
        </div>
      )}

      <div className="max-w-[80%]">
        <div className={`p-3 rounded-lg ${isBot ? "bg-white shadow-sm text-gray-800" : "bg-primary text-white"}`}>
          <div className="whitespace-pre-wrap break-words">{formatMessageWithLinks(message.content)}</div>
        </div>
        <div className="text-xs text-gray-400 mt-1 px-1">{formattedTime}</div>
      </div>
    </div>
  )
}
