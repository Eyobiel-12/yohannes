"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQ {
  question: string
  answer: string
  serviceId?: string
}

interface ServiceFAQProps {
  faqs: FAQ[]
  serviceId?: string
}

export default function ServiceFAQ({ faqs, serviceId }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Filter FAQs by service if serviceId is provided
  const filteredFAQs = serviceId ? faqs.filter((faq) => !faq.serviceId || faq.serviceId === serviceId) : faqs

  // If no FAQs for this service, don't render the component
  if (filteredFAQs.length === 0) return null

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about our services.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border p-4 text-left transition-colors",
                  openIndex === index
                    ? "border-green-500 bg-green-50 dark:border-green-500/50 dark:bg-green-900/20"
                    : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/50",
                )}
              >
                <h3
                  className={cn(
                    "text-lg font-medium",
                    openIndex === index ? "text-green-700 dark:text-green-400" : "text-gray-900 dark:text-white",
                  )}
                >
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp
                    className={cn(
                      "h-5 w-5",
                      openIndex === index ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400",
                    )}
                  />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-b-lg border-x border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
