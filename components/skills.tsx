"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "./ui/card"
import { Code, Database, Cpu, LineChart, Layers, Terminal, ChevronLeft, ChevronRight } from "lucide-react"
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

        {/* Mobile View - Improved Carousel/Slider */}
        <div className="sm:hidden">
          <div className="relative px-10">
            {/* Container with previous card preview (blurred) */}
            {activeSkillIndex > 0 && (
              <div className="absolute left-0 top-0 w-14 h-full opacity-30 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background z-10"></div>
                <Card className="h-full scale-90 blur-[2px] dark:bg-[#141414] border-white/5">
                  <CardContent className="p-3">
                    <div className="flex items-center mb-3">
                      <div className="mr-2 p-1 rounded-full bg-primary/10">
                        {skillCategories[(activeSkillIndex - 1 + skillCategories.length) % skillCategories.length].icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Previous button - just the arrow icon */}
            <button 
              onClick={goToPrevSkill}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-primary/80 hover:text-primary transition-colors"
              aria-label="Previous skill"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            {/* Card with animation */}
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
            
            {/* Next button - just the arrow icon */}
            <button 
              onClick={goToNextSkill}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-primary/80 hover:text-primary transition-colors"
              aria-label="Next skill"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Container with next card preview (blurred) */}
            {activeSkillIndex < skillCategories.length - 1 && (
              <div className="absolute right-0 top-0 w-14 h-full opacity-30 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background z-10"></div>
                <Card className="h-full scale-90 blur-[2px] dark:bg-[#141414] border-white/5">
                  <CardContent className="p-3">
                    <div className="flex items-center mb-3">
                      <div className="mr-2 p-1 rounded-full bg-primary/10">
                        {skillCategories[(activeSkillIndex + 1) % skillCategories.length].icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Ultra-small dot indicators - 70% smaller than before */}
          <div className="mt-3 flex justify-center items-center">
            <div className="flex space-x-2">
              {skillCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSkillIndex(index)}
                  className={cn(
                    "w-[3px] h-[3px] rounded-full transition-colors",
                    index === activeSkillIndex ? "bg-primary scale-110" : "bg-gray-400/30 hover:bg-gray-400/50"
                  )}
                  aria-label={`Go to skill ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

