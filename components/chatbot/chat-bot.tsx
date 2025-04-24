"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Trash2 } from "lucide-react"
import ChatMessage from "./chat-message"
import SuggestedQuestions from "./suggested-questions"
import { handleChatResponse } from "./chat-response-handler"
import type { ChatMessage as ChatMessageType } from "./types"
import { saveChatToStorage, loadChatFromStorage, clearChatStorage } from "./chat-storage"

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load chat history from localStorage on initial render
  useEffect(() => {
    // Only run this once
    if (isInitialized) return

    // Try to load existing chat from storage
    const savedMessages = loadChatFromStorage()

    if (savedMessages && savedMessages.length > 0) {
      setMessages(savedMessages)
    } else {
      // Initialize with welcome message if no saved chat
      const welcomeMessage: ChatMessageType = {
        id: "welcome",
        content: "Hallo! Ik ben Yohannes, uw persoonlijke tuinexpert. Hoe kan ik u vandaag helpen met uw tuinvragen?",
        sender: "bot",
        timestamp: new Date().toISOString(),
      }
      setMessages([welcomeMessage])

      // Add a slight delay before sending the second welcome message
      setTimeout(() => {
        const followupMessage: ChatMessageType = {
          id: "welcome-followup",
          content:
            "U kunt me vragen stellen over onze diensten, tuinonderhoud, beplanting of een offerte aanvragen. Ik help u graag verder!",
          sender: "bot",
          timestamp: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, followupMessage])
      }, 1500)
    }

    setIsInitialized(true)
  }, [isInitialized])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && messages.length > 0) {
      saveChatToStorage(messages)
    }
  }, [messages, isInitialized])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Calculate a realistic typing delay based on response length
    // Pass the entire messages array including the new user message
    const allMessages = [...messages, userMessage]
    const botResponse = handleChatResponse(inputValue, allMessages)
    const typingDelay = Math.min(1000 + botResponse.length * 10, 3000) // Between 1-3 seconds

    // Simulate bot thinking and typing
    setTimeout(() => {
      const botMessage: ChatMessageType = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: "bot",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, typingDelay)
  }

  const handleSuggestedQuestion = (question: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      content: question,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Calculate a realistic typing delay based on response length
    // Pass the entire messages array including the new user message
    const allMessages = [...messages, userMessage]
    const botResponse = handleChatResponse(question, allMessages)
    const typingDelay = Math.min(1000 + botResponse.length * 10, 3000) // Between 1-3 seconds

    // Simulate bot thinking and typing
    setTimeout(() => {
      const botMessage: ChatMessageType = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: "bot",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, typingDelay)
  }

  const clearChat = () => {
    // Clear chat history and start fresh
    clearChatStorage()

    const welcomeMessage: ChatMessageType = {
      id: "welcome-new",
      content: "Hallo! Ik ben Yohannes, uw persoonlijke tuinexpert. Hoe kan ik u vandaag helpen met uw tuinvragen?",
      sender: "bot",
      timestamp: new Date().toISOString(),
    }

    setMessages([welcomeMessage])

    // Add a slight delay before sending the second welcome message
    setTimeout(() => {
      const followupMessage: ChatMessageType = {
        id: "welcome-followup",
        content:
          "U kunt me vragen stellen over onze diensten, tuinonderhoud, beplanting of een offerte aanvragen. Ik help u graag verder!",
        sender: "bot",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, followupMessage])
    }, 1500)
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all z-50"
        aria-label={isOpen ? "Sluit chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-10rem)] bg-gray-50 rounded-lg shadow-xl flex flex-col z-50 overflow-hidden border border-gray-200"
          >
            {/* Chat header */}
            <div className="bg-primary text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 overflow-hidden">
                  <img src="/images/logo.png" alt="Yohannes" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <h3 className="font-medium">Yohannes</h3>
                  <p className="text-xs opacity-80">Online | Tuinexpert</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearChat}
                  className="text-white/80 hover:text-white flex items-center"
                  title="Gesprek wissen"
                >
                  <Trash2 size={18} />
                </button>
                <button onClick={toggleChat} className="text-white/80 hover:text-white" title="Sluiten">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    <img src="/images/logo.png" alt="Yohannes" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm inline-block">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions - only show for new chats */}
            {messages.length < 4 && messages[0]?.id.includes("welcome") && (
              <div className="px-4 py-2 bg-gray-100">
                <SuggestedQuestions onSelectQuestion={handleSuggestedQuestion} />
              </div>
            )}

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Typ uw vraag hier..."
                  className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-primary text-white p-2 rounded-r-md hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="text-xs text-gray-400 mt-2 text-center">
                {messages.length > 1 && "Uw gesprek wordt bewaard wanneer u door de website navigeert."}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
