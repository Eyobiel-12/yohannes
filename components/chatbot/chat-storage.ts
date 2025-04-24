import type { ChatMessage } from "./types"

const STORAGE_KEY = "yohannes-chat-history"
const EXPIRATION_TIME = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Save chat history to localStorage with expiration
export function saveChatToStorage(messages: ChatMessage[]): void {
  try {
    const storageItem = {
      messages,
      timestamp: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageItem))
  } catch (error) {
    console.error("Fout bij het opslaan van chatgeschiedenis:", error)
  }
}

// Load chat history from localStorage if not expired
export function loadChatFromStorage(): ChatMessage[] | null {
  try {
    const storageItem = localStorage.getItem(STORAGE_KEY)
    if (!storageItem) return null

    const { messages, timestamp } = JSON.parse(storageItem)

    // Check if the stored chat has expired
    if (Date.now() - timestamp > EXPIRATION_TIME) {
      clearChatStorage()
      return null
    }

    return messages
  } catch (error) {
    console.error("Fout bij het laden van chatgeschiedenis:", error)
    return null
  }
}

// Clear chat history from localStorage
export function clearChatStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Fout bij het wissen van chatgeschiedenis:", error)
  }
}
