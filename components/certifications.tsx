"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "./ui/card"
import { Award } from "lucide-react"

const certifications = [
  {
    name: "AI For Everyone",
    issuer: "DeepLearning.AI",
    date: "2023",
  },
  {
    name: "Data Analytics and Visualization Virtual Experience",
    issuer: "Accenture",
    date: "2023",
  },
  {
    name: "Problem Solving & SQL (Basic)",
    issuer: "HackerRank",
    date: "2022",
  },
  {
    name: "Python (Basic) Certification",
    issuer: "HackerRank",
    date: "2022",
  },
  {
    name: "Database Foundations & Introduction to Cloud Computing",
    issuer: "IBM",
    date: "2022",
  },
]

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section id="certifications" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Certifications</h2>
          <p className="sf-mono text-base font-light max-w-2xl mx-auto">Professional certifications and credentials</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <Card className="h-full border-white/5 transition-all duration-300 dark:bg-[#141414] hover:bg-primary/5 hover:border-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-500"></div>
                <div className="absolute -inset-1 bg-primary/0 group-hover:bg-primary/5 blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>

                <CardContent className="p-4 sm:p-6 flex flex-col h-full relative z-10">
                  <div className="flex items-start mb-4">
                    <div className="p-2 rounded-full bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors duration-300">
                      <Award className="h-5 w-5 text-primary flex-shrink-0" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium group-hover:text-white transition-colors duration-300">
                        {cert.name}
                      </h3>
                      <p className="sf-mono text-xs sm:text-sm font-light text-gray-400">{cert.issuer}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 text-right">
                    <span className="sf-mono text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {cert.date}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

