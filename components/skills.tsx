"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "./ui/card"
import { Code, Database, Cpu, LineChart, Layers, Terminal } from "lucide-react"

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
  // Removed "once: true" so animation triggers every time section comes into view
  const isInView = useInView(sectionRef, { amount: 0.1 })

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-black/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
          <p className="sf-mono text-base font-light max-w-2xl mx-auto">
            My expertise in Machine Learning, AI, and related technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </section>
  )
}

