"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "./ui/card"
import { Brain, Code, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

const experiences = [
  {
    title: "Artificial Intelligence Intern",
    company: "InternPe",
    period: "September 2023 - October 2023",
    description: [
      "Developed statistical models for various AI-driven projects",
      "Worked on Predictive Analysis of Diabetes and Laptop Price Prediction",
      "Documented coding workflows and presented technical findings",
    ],
    icon: <Brain className="h-6 w-6" />,
  },
  {
    title: "Data Science Intern",
    company: "CodeClause",
    period: "August 2023 - September 2023",
    description: [
      "Built probabilistic predictive models for multiple projects",
      "Conducted market basket analysis using the Apriori algorithm",
      "Worked on product price recommendation models with 98% accuracy",
    ],
    icon: <Code className="h-6 w-6" />,
  },
  {
    title: "Web Development Intern",
    company: "CodeClause",
    period: "August 2023 - September 2023",
    description: [
      "Developed web applications using HTML5, CSS3, and JavaScript",
      "Implemented live language translation features",
      "Created responsive and accessible user interfaces",
    ],
    icon: <Globe className="h-6 w-6" />,
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Calculate which experience card is in view
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.offsetTop
        const sectionHeight = sectionRef.current.offsetHeight
        const scrollPosition = window.scrollY + window.innerHeight / 2
        const relativePosition = scrollPosition - sectionTop
        
        // Only calculate this for desktop view (md and up screens)
        if (window.innerWidth >= 768) {
          // Calculate precise position along the timeline based on scroll
          // This uses a percentage of the section scrolled rather than discrete steps
          const scrollPercentage = Math.min(
            Math.max(relativePosition / sectionHeight, 0),
            1
          )
          
          // Map scroll percentage to card indices (0 to experiences.length - 1)
          const mappedIndex = scrollPercentage * (experiences.length - 1)
          setActiveIndex(mappedIndex)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-20 dark:bg-black/30 bg-gray-50/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Professional Experience</h2>
          <p className="sf-mono text-base font-light max-w-2xl mx-auto">
            My journey in the field of Machine Learning and Data Science
          </p>
        </motion.div>

        {/* Desktop Timeline (hidden on mobile) */}
        <div className="hidden md:block relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px dark:bg-white/10 bg-gray-300/50 transform translate-x-px"></div>
          
          {/* Moving timeline dot */}
          <motion.div
            className="absolute left-1/2 w-6 h-6 rounded-full bg-primary z-20 -ml-3"
            initial={{ top: "0%" }}
            animate={{ top: `${Math.min(Math.max(activeIndex * (100 / (experiences.length - 1)), 0), 100)}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-24 ${
                index % 2 === 0 ? "pr-12 text-right ml-0 mr-auto" : "pl-12 ml-auto mr-0"
              } w-1/2`}
            >
              {/* Timeline card */}
              <Card className={cn(
                "border-white/5",
                "dark:bg-[#141414] dark:border-white/5",
                "border border-gray-200 bg-white/90 shadow-sm"
              )}>
                <CardContent className="p-6">
                  <div className={`flex items-center mb-4 ${index % 2 === 0 ? "justify-end" : ""}`}>
                    <div className={`p-2 rounded-full bg-primary/10 ${index % 2 === 0 ? "order-2 ml-3" : "mr-3"}`}>
                      {exp.icon}
                    </div>
                    <div className={index % 2 === 0 ? "text-right" : ""}>
                      <h3 className="text-xl font-medium">{exp.title}</h3>
                      <p className="text-sm text-gray-400">{exp.company}</p>
                    </div>
                  </div>

                  <p className={`sf-mono text-sm font-light dark:text-gray-400 text-gray-500 mb-4 ${index % 2 === 0 ? "text-right" : ""}`}>
                    {exp.period}
                  </p>

                  <ul className={`sf-mono text-sm space-y-2 ${index % 2 === 0 ? "text-right" : ""}`}>
                    {exp.description.map((item, i) => (
                      <li key={i} className={`flex items-start ${index % 2 === 0 ? "justify-end" : ""}`}>
                        {index % 2 === 0 && <span className="dark:text-gray-300 text-gray-600">{item}</span>}
                        <span className={`text-primary ${index % 2 === 0 ? "ml-2" : "mr-2"}`}>•</span>
                        {index % 2 !== 0 && <span className="dark:text-gray-300 text-gray-600">{item}</span>}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Timeline (shown only on mobile) */}
        <div className="md:hidden space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="dark:bg-[#141414] glass border-white/5 relative">
                {/* Removed timeline dot and line */}
                <CardContent className="p-6">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <div className="p-2 rounded-full bg-primary/10 mr-3">{exp.icon}</div>
                      <div>
                        <h3 className="text-lg font-medium">{exp.title}</h3>
                        <p className="text-sm text-gray-400">{exp.company}</p>
                      </div>
                    </div>

                    <p className="sf-mono text-sm font-light dark:text-gray-400 text-gray-500 mb-4">{exp.period}</p>

                    <ul className="sf-mono text-sm space-y-3 ml-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-2 flex-shrink-0">•</span>
                          <span className="dark:text-gray-300 text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
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

