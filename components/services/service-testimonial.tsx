"use client"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  serviceId: string
}

interface ServiceTestimonialProps {
  testimonials: Testimonial[]
  serviceId?: string
}

export default function ServiceTestimonial({ testimonials, serviceId }: ServiceTestimonialProps) {
  // Filter testimonials by service if serviceId is provided
  const filteredTestimonials = serviceId ? testimonials.filter((t) => t.serviceId === serviceId) : testimonials

  // If no testimonials for this service, don't render the component
  if (filteredTestimonials.length === 0) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800"
            >
              <Quote className="absolute right-6 top-6 h-12 w-12 text-green-100 dark:text-green-900/30" />
              <div className="relative">
                <p className="mb-6 text-gray-600 dark:text-gray-300">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
