"use client"

// NOTE: Add your actual resume PDF file at public/resume.pdf to enable the download functionality

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "./ui/button"
import { FileDown, GraduationCap, Calendar, Award, Brain, Network, Eye, BarChart2 } from "lucide-react"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const calculateExperience = () => {
    const startDate = new Date(2023, 8, 1) // September 2023
    const currentDate = new Date()
    const diffInMonths =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth())

    const years = Math.floor(diffInMonths / 12)
    const months = diffInMonths % 12

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ${months > 0 ? `and ${months} month${months > 1 ? "s" : ""}` : ""}`
    }
    return `${months} month${months > 1 ? "s" : ""}`
  }

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const education = [
    {
      institution: "The University of Manchester",
      degree: "Master of Science - MS, Artificial Intelligence",
      period: "Sep 2024 - Sep 2025",
      logo: "/images/manchester-logo.png"
    },
    {
      institution: "SRM IST Chennai",
      degree: "Bachelor of Technology - BTech, Computer Science",
      period: "2020 - 2024",
      logo: "/images/srm-logo.png"
    }
  ]

  const specializations = [
    "Machine Learning",
    "Deep Neural Networks",
    "Computer Vision",
    "Data Science"
  ]

  // Animation variants for the education items
  const educationVariants = {
    hidden: { opacity: 0, y: 30, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      },
    }),
  }

  // Animation variants for specialization chips
  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.7 + i * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15
      },
    }),
  }

  // Animation variant for section headings
  const headingVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  // Animation variant for timeline
  const timelineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: "100%",
      transition: { 
        duration: 1.5, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  }

  // Animation variant for text
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  // Animation for profile image
  const profileVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Me and Profile Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-[2fr,3fr] gap-12 items-start">
            {/* Profile Image - Now beside About Me text */}
            <motion.div 
              variants={profileVariants} 
              className="relative"
              whileHover={{ scale: 1.02, rotate: 1, transition: { duration: 0.3 } }}
            >
              <div className="relative aspect-square max-w-sm mx-auto md:mx-0 md:sticky md:top-24">
                <motion.div 
                  className="absolute inset-0 border dark:border-white/10 border-primary/20 rounded-lg transform rotate-3 z-0"
                  animate={{ rotate: [3, 2, 3], x: [0, 2, 0], y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                ></motion.div>
                <Image
                  src="/images/vaibhav-profile.png"
                  alt="Vaibhav Parihar"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover z-10 relative dark:glass"
                />
              </div>
            </motion.div>

            {/* About Me Text */}
            <motion.div variants={variants}>
              <motion.h2 
                className="text-3xl font-bold mb-6 inline-block relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                About Me
                <motion.span 
                  className="absolute -bottom-2 left-0 h-px bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "33%" }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                ></motion.span>
              </motion.h2>

              <div className="sf-mono text-base font-light space-y-4 mb-6">
                <motion.p
                  custom={0}
                  variants={textVariants}
                >
                  Experienced Machine Learning Engineer and Data Scientist with expertise in predictive modeling, AI
                  solutions, and deep learning architectures. Proficient in Python, TensorFlow, and Scikit-learn, with a
                  track record of working on projects related to diabetic retinopathy detection, brain lesion analysis,
                  and product price optimization.
                </motion.p>
                <motion.p
                  custom={1}
                  variants={textVariants}
                >
                  Currently pursuing an MSc in Advanced Computer Science (Artificial Intelligence) at the University of
                  Manchester, with {calculateExperience()} of professional experience in AI and data science.
                </motion.p>
              </div>

              {/* Download Resume and Contact buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    asChild 
                    variant="outline" 
                    className="group w-full sm:w-auto transition-all duration-300 hover:bg-primary/10 hover:border-primary/30"
                  >
                    <a href="https://raw.githubusercontent.com/vaibhavparihar/vaibhavparihar/master/machine-learning-engineer.pdf" download="Vaibhav_Parihar_ML_Engineer_Resume.pdf" className="flex items-center justify-center">
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                      >
                        <FileDown className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
                      </motion.div>
                      <span>Download Resume</span>
                    </a>
                  </Button>
                </motion.div>
                
                <motion.a 
                  href="#contact" 
                  className="text-sm sf-mono flex items-center text-muted-foreground hover:text-primary transition-colors duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.querySelector("#contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  whileHover={{ x: 5 }}
                  initial={{ x: 0 }}
                >
                  Get in touch for more details
                  <motion.svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 18 18" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="ml-1"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                  >
                    <path d="M5.25 12.75L12.75 5.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.25 5.25H12.75V12.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Education Section - Full Width */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.h3 
            variants={headingVariants}
            className="text-xl font-medium mb-10 flex items-center"
          >
            <GraduationCap className="mr-2 h-5 w-5 text-primary" />
            Education
            <span className="ml-3 h-px bg-gradient-to-r from-primary/70 to-transparent flex-grow"></span>
          </motion.h3>
          
          {/* Horizontal Education Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div 
                key={index} 
                custom={index}
                variants={educationVariants}
                className="group"
              >
                {/* Card container with subtle hover effect */}
                <div className="dark:bg-[#141414] bg-white/90 dark:border-white/5 border-slate-200 rounded-xl p-6 h-full dark:hover:bg-black/90 hover:bg-white transition-all duration-300 dark:hover:border-primary/20 hover:border-primary/30 hover:shadow-lg dark:hover:shadow-primary/5 hover:shadow-primary/10 relative overflow-hidden group shadow-sm">
                  {/* Decorative gradient that appears on hover */}
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  <div className="flex items-start gap-4 mb-4 relative z-10">
                    {/* Logo container with enhanced styling */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.3, duration: 0.5 }}
                      className="h-16 w-16 flex-shrink-0 relative rounded-xl p-2 flex items-center justify-center overflow-hidden dark:bg-white/5 bg-gray-50 dark:border-white/10 border-slate-200 transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-md group-hover:shadow-primary/10"
                    >
                      <Image 
                        src={edu.logo} 
                        alt={edu.institution}
                        width={60}
                        height={60}
                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </motion.div>
                    
                    <div>
                      <h4 className="text-xl font-medium group-hover:text-primary transition-colors duration-300">{edu.institution}</h4>
                      <p className="sf-mono text-base font-light text-muted-foreground mb-1">{edu.degree}</p>
                      <p className="sf-mono text-sm font-light text-muted-foreground/70 flex items-center">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        {edu.period}
                      </p>
                    </div>
                  </div>
                  
                  {/* Additional content - empty now that we've removed progress bars */}
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ delay: index * 0.3 + 0.2, duration: 0.5 }}
                    className="mt-3 pt-3 dark:border-white/5 border-t border-slate-100 text-sm text-muted-foreground/80 relative z-10"
                  >
                    {/* Removed the thick line/progress bar as requested */}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
          
        {/* Specialization Section - Full Width with enhanced cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-10"
        >
          <motion.h3 
            variants={headingVariants}
            className="text-xl font-medium mb-10 flex items-center"
          >
            <Award className="mr-2 h-5 w-5 text-primary" />
            Specialization
            <span className="ml-3 h-px bg-gradient-to-r from-primary/70 to-transparent flex-grow"></span>
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {specializations.map((spec, index) => (
              <motion.div 
                key={index}
                custom={index}
                variants={chipVariants}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className="relative flex flex-col items-center justify-center p-6 rounded-xl 
                        overflow-hidden group cursor-default"
                style={{
                  background: "linear-gradient(45deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.06) 100%)"
                }}
              >
                {/* Glass background effect - Different styling for light/dark mode */}
                <motion.div 
                  className="absolute inset-0 dark:border-white/10 border-slate-200 rounded-xl z-0 border"
                  whileHover={{ opacity: 1 }}
                  initial={{ opacity: 0.3 }}
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)"
                  }}
                />
                
                {/* Light mode specific background */}
                <div className="absolute inset-0 bg-white/80 dark:bg-[#141414] rounded-xl z-0 border border-slate-200 dark:border-white/10 shadow-sm"></div>
                
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 duration-700 transition-opacity blur-xl z-0"
                  style={{ 
                    background: `radial-gradient(circle, rgba(var(--primary), 0.15) 0%, transparent 70%)`,
                    transform: "translate(0px, 8px)"
                  }}
                />
                
                {/* Icon container with enhanced animation */}
                <motion.div 
                  className="relative z-10 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4
                          group-hover:bg-primary/20 transition-all duration-500"
                  whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {index === 0 && <Brain className="h-6 w-6 text-primary" />}
                  {index === 1 && <Network className="h-6 w-6 text-primary" />}
                  {index === 2 && <Eye className="h-6 w-6 text-primary" />}
                  {index === 3 && <BarChart2 className="h-6 w-6 text-primary" />}
                </motion.div>
                
                {/* Text with enhanced animation */}
                <motion.span 
                  className="relative z-10 text-center font-medium transition-all duration-300 group-hover:text-primary"
                  whileHover={{ scale: 1.05 }}
                >
                  {spec}
                </motion.span>
                
                {/* Animated line under text that appears on hover */}
                <motion.div
                  className="h-0.5 w-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2 relative z-10"
                  initial={{ width: 0 }}
                  whileHover={{ width: "80%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

