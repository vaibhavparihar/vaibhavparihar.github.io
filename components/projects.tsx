"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, BarChart3, Eye, Cloud, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const projects = [
  {
    title: "Classification of Diabetic Retinopathy Severity",
    description: "Built an AI-driven system to classify Diabetic Retinopathy severity using deep neural networks.",
    icon: <Eye className="h-12 w-12" />,
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
    tags: ["Python", "TensorFlow", "Deep Learning", "Neural Networks"],
    details: {
      problem:
        "Early detection of diabetic retinopathy is crucial for preventing vision loss, but manual screening is time-consuming and subjective.",
      approach:
        "Developed a convolutional neural network model trained on 5,500+ retinal images to automatically classify severity levels.",
      technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "Pandas", "NumPy"],
      results: "Achieved 91% accuracy in classifying five severity levels, potentially reducing screening time by 60%.",
    },
    github: "https://github.com/vaibhavparihar",
    demo: "#",
  },
  {
    title: "Advanced Neural Network for Brain Lesion Detection",
    description: "Developed brain tumor detection using VGG16, InceptionV3, and Xception architectures.",
    icon: <Brain className="h-12 w-12" />,
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    tags: ["OpenCV", "Keras", "Pandas", "Neural Networks"],
    details: {
      problem: "Brain lesion detection requires specialized expertise and is prone to human error.",
      approach:
        "Implemented and compared multiple pre-trained CNN architectures (VGG16, InceptionV3, Xception) for lesion detection and classification.",
      technologies: ["Python", "Keras", "TensorFlow", "OpenCV", "Scikit-learn"],
      results:
        "Xception model achieved 94% accuracy, outperforming other architectures. System can process MRI scans in under 3 seconds.",
    },
    github: "https://github.com/vaibhavparihar",
    demo: "#",
  },
  {
    title: "Product Price Optimization Using Machine Learning",
    description: "Created price recommendation system using Linear Regression, Random Forest, and Ridge Regression.",
    icon: <BarChart3 className="h-12 w-12" />,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    tags: ["Scikit-learn", "NumPy", "Seaborn", "Regression"],
    details: {
      problem: "Manual price optimization is inefficient and often fails to maximize profit margins.",
      approach:
        "Developed a comparative analysis of multiple regression models to predict optimal product pricing based on market data.",
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      results:
        "Implemented system achieved 98% accuracy in price predictions, leading to potential 15% increase in profit margins.",
    },
    github: "https://github.com/vaibhavparihar",
    demo: "#",
  },
  {
    title: "Weather Prediction System",
    description: "Leverage Ridge Regression model to make an accurate weather prediction system.",
    icon: <Cloud className="h-12 w-12" />,
    iconBg: "bg-sky-500/20",
    iconColor: "text-sky-400",
    tags: ["Ridge Regression", "Python", "Pandas", "Meteorology"],
    details: {
      problem:
        "Traditional weather forecasting methods can be computationally expensive and less accurate for short-term predictions.",
      approach:
        "Implemented a Ridge Regression model trained on historical weather data to predict temperature, humidity, and precipitation.",
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Weather API"],
      results:
        "Achieved 92% accuracy for 24-hour forecasts, with significant improvement in computational efficiency compared to traditional methods.",
    },
    github: "https://github.com/vaibhavparihar",
    demo: "#",
  },
  {
    title: "Diabetes Prediction Model",
    description:
      "Used support vector machine to predict if a patient has diabetes or not based on his medical records.",
    icon: <Activity className="h-12 w-12" />,
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400",
    tags: ["SVM", "Healthcare", "Classification", "Medical AI"],
    details: {
      problem:
        "Early diabetes detection is crucial for effective treatment, but traditional diagnostic methods can be time-consuming.",
      approach: "Developed a Support Vector Machine model trained on patient medical records to predict diabetes risk.",
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      results:
        "Model achieved 89% accuracy in predicting diabetes, potentially enabling earlier intervention and treatment.",
    },
    github: "https://github.com/vaibhavparihar",
    demo: "#",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [mounted, setMounted] = useState(false)

  // After hydration, we can safely use the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  // Animation variants for icons
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
  }

  // Animation variants for tags
  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.3,
      },
    }),
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="sf-mono text-base font-light max-w-2xl mx-auto">
            A selection of my recent work in Machine Learning and AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="h-full"
            >
              <Card
                className={cn(
                  "h-full border-white/5 overflow-hidden group transition-all duration-300",
                  hoveredIndex === index ? "border-white/20 dark:bg-[#141414]" : "dark:bg-[#141414]",
                )}
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-6">
                    <motion.div
                      variants={iconVariants}
                      className={`p-6 rounded-full ${project.iconBg} ${project.iconColor} transition-all duration-500`}
                    >
                      {project.icon}
                    </motion.div>
                  </div>

                  <motion.h3
                    className="text-xl font-medium mb-2 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    className="sf-mono text-sm font-light mb-4 text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {project.description}
                  </motion.p>

                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {project.tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={tagVariants}
                        className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                          isDark ? 
                          "bg-white/5 text-gray-300 hover:bg-white/10" : 
                          "bg-primary/10 text-primary/90 hover:bg-primary/20"
                        }`}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div
                    className="flex justify-center mt-auto pt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm flex items-center transition-colors px-4 py-2 rounded-md ${
                        isDark ?
                        "text-gray-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5" :
                        "text-primary hover:text-primary-foreground border border-primary/20 hover:border-primary/30 hover:bg-primary/10"
                      }`}
                    >
                      View Project
                    </a>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

