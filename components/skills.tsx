"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "./ui/card"
import { Code, Database, Cpu, LineChart, Layers, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

const skillCategories = [
  {
    name: "Machine Learning & AI",
    icon: <Cpu className="h-6 w-6" />,
    skills: [
      { name: "TensorFlow", level: 90 },
      { name: "PyTorch", level: 85 },
      { name: "Scikit-learn", level: 95 },
      { name: "Neural Networks", level: 90 },
      { name: "Computer Vision", level: 85 },
      { name: "NLP", level: 80 },
    ],
  },
  {
    name: "Programming Languages",
    icon: <Code className="h-6 w-6" />,
    skills: [
      { name: "Python", level: 95 },
      { name: "C++", level: 80 },
      { name: "JavaScript", level: 75 },
      { name: "HTML/CSS", level: 85 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    name: "Data Science",
    icon: <LineChart className="h-6 w-6" />,
    skills: [
      { name: "Pandas", level: 95 },
      { name: "NumPy", level: 90 },
      { name: "Data Visualization", level: 85 },
      { name: "Statistical Analysis", level: 90 },
      { name: "Feature Engineering", level: 85 },
    ],
  },
  {
    name: "Databases & Tools",
    icon: <Database className="h-6 w-6" />,
    skills: [
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Git", level: 90 },
      { name: "Docker", level: 70 },
      { name: "Jupyter", level: 95 },
    ],
  },
  {
    name: "Frameworks",
    icon: <Layers className="h-6 w-6" />,
    skills: [
      { name: "Flask", level: 85 },
      { name: "Django", level: 75 },
      { name: "React", level: 70 },
      { name: "Next.js", level: 65 },
      { name: "FastAPI", level: 80 },
    ],
  },
  {
    name: "DevOps & Cloud",
    icon: <Terminal className="h-6 w-6" />,
    skills: [
      { name: "AWS", level: 75 },
      { name: "Google Cloud", level: 70 },
      { name: "CI/CD", level: 65 },
      { name: "Linux", level: 85 },
      { name: "Kubernetes", level: 60 },
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  // Add state for current active skill in mobile view
  const [activeSkillIndex, setActiveSkillIndex] = useState(0)

  // Function to navigate to next skill card in mobile view
  const goToNextSkill = () => {
    setActiveSkillIndex((prev) => (prev + 1) % skillCategories.length)
  }

  // Function to navigate to previous skill card in mobile view
  const goToPrevSkill = () => {
    setActiveSkillIndex((prev) => (prev - 1 + skillCategories.length) % skillCategories.length)
  }

  return (
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
          <p className="sf-mono text-base font-light max-w-2xl mx-auto">
            My expertise in various technologies and tools
          </p>
        </motion.div>

        {/* Desktop View - Grid Layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full dark:bg-[#141414] border-white/5">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-6">
                    <div className="mr-3 p-2 rounded-full bg-primary/10">{category.icon}</div>
                    <h3 className="text-lg sm:text-xl font-medium">{category.name}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="sf-mono text-sm font-light">{skill.name}</span>
                          <span className="sf-mono text-xs text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: index * 0.1 + i * 0.1 }}
                            className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile View - Carousel/Slider */}
        <div className="sm:hidden">
          <motion.div
            key={activeSkillIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full dark:bg-[#141414] border-white/5">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-6">
                  <div className="mr-3 p-2 rounded-full bg-primary/10">{skillCategories[activeSkillIndex].icon}</div>
                  <h3 className="text-lg sm:text-xl font-medium">{skillCategories[activeSkillIndex].name}</h3>
                </div>

                <div className="space-y-4">
                  {skillCategories[activeSkillIndex].skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="sf-mono text-sm font-light">{skill.name}</span>
                        <span className="sf-mono text-xs text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Slider Navigation */}
          <div className="mt-6 flex justify-center items-center">
            <button 
              onClick={goToPrevSkill}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors mr-4"
            >
              <span className="sr-only">Previous skill</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Dot indicators */}
            <div className="flex space-x-2">
              {skillCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSkillIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === activeSkillIndex ? "bg-primary" : "bg-gray-400/30"
                  )}
                  aria-label={`Go to skill ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={goToNextSkill}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors ml-4"
            >
              <span className="sr-only">Next skill</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

