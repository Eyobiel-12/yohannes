import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ChatBot from "@/components/chatbot/chat-bot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yohannes Hovenier - Professionele Tuindiensten",
  description:
    "Professionele hoveniersdiensten voor particulieren en bedrijven. Tuinaanleg, onderhoud, beplanting en meer.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  )
}
