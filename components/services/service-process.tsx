"use client"

import type React from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, Calendar, Truck, MessageSquare, ThumbsUp } from "lucide-react"

interface ProcessStep {
  icon: React.ReactNode
  title: string
  description: string
}

const processSteps: ProcessStep[] = [
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Initial Consultation",
    description: "We start with a detailed discussion about your needs and expectations for the project.",
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: "Custom Proposal",
    description: "We create a tailored proposal with detailed scope, timeline, and pricing for your approval.",
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: "Scheduling",
    description: "Once approved, we schedule your project at a time that works best for you.",
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Service Execution",
    description: "Our expert team arrives on time and completes the work with precision and care.",
  },
  {
    icon: <ThumbsUp className="h-8 w-8" />,
    title: "Final Inspection",
    description: "We conduct a thorough inspection and walkthrough to ensure your complete satisfaction.",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Follow-up Care",
    description: "We provide ongoing support and maintenance recommendations to protect your investment.",
  },
]

export default function ServiceProcess() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">Our Service Process</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            We follow a structured approach to ensure quality results and complete customer satisfaction.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              className="relative rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-gray-800"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                {step.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
