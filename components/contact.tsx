"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "./ui/card"
import { Mail, Linkedin, Github, Phone, MapPin, Coffee } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [mounted, setMounted] = useState(false)

  // After hydration, we can safely use the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const primaryContacts = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      value: "vaibhavparihar0@gmail.com",
      link: "mailto:vaibhavparihar0@gmail.com",
      hoverColor: "group-hover:bg-gradient-to-br group-hover:from-blue-500/10 group-hover:to-cyan-500/10",
      iconColor: "text-primary group-hover:text-cyan-400",
      buttonText: "Send Email",
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      label: "LinkedIn",
      value: "vaibhav-parihar694",
      link: "https://www.linkedin.com/in/vaibhav-parihar694/",
      hoverColor: "group-hover:bg-gradient-to-br group-hover:from-blue-600/10 group-hover:to-blue-400/10",
      iconColor: "text-primary group-hover:text-blue-400",
      buttonText: "Connect",
    },
    {
      icon: <Github className="h-6 w-6" />,
      label: "GitHub",
      value: "vaibhavparihar",
      link: "https://github.com/vaibhavparihar",
      hoverColor: "group-hover:bg-gradient-to-br group-hover:from-purple-500/10 group-hover:to-violet-500/10",
      iconColor: "text-primary group-hover:text-violet-400",
      buttonText: "View Projects",
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className={`py-20 ${
      isDark ? "bg-black/30" : "bg-gradient-to-b from-background to-background/50"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="sf-mono text-base font-light max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly chat
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Primary Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {primaryContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card
                  className={`h-full overflow-hidden transition-all duration-300 ${
                    isDark 
                    ? "border-white/5 bg-white/5 hover:border-white/10 " 
                    : "border border-border/40 bg-card/50 hover:border-border/70"
                  } ${contact.hoverColor}`}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div
                      className={`p-4 rounded-full mb-4 ${contact.iconColor} ${
                        isDark ? "bg-white/5 group-hover:bg-black/20" : "bg-primary/5"
                      } transition-colors duration-300`}
                    >
                      {contact.icon}
                    </div>

                    <h3 className="text-xl font-medium mb-1">{contact.label}</h3>
                    <p className={`sf-mono text-sm font-light mb-4 break-all ${
                      isDark ? "text-gray-300" : "text-muted-foreground"
                    }`}>
                      {contact.value}
                    </p>

                    <Button
                      asChild
                      variant="outline"
                      className={`mt-auto w-full ${
                        isDark 
                        ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20" 
                        : "bg-card/50 hover:bg-card"
                      }`}
                    >
                      <a href={contact.link} target="_blank" rel="noopener noreferrer">
                        {contact.buttonText}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Secondary Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`backdrop-blur-sm p-4 mb-8 ${
              isDark 
              ? "bg-white/5 rounded-lg" 
              : "bg-card/50 border border-border rounded-lg"
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <div className="flex items-center w-full sm:w-auto justify-center">
                <div className={`p-2 rounded-full mr-3 text-primary ${
                  isDark ? "bg-white/10" : "bg-primary/10"
                }`}>
                  <Phone className="h-4 w-4" />
                </div>
                <p className="sf-mono text-sm font-light">+447733498737 (UK)</p>
              </div>

              <div className={`hidden sm:block h-4 w-px ${
                isDark ? "bg-white/10" : "bg-border"
              }`}></div>

              <div className="flex items-center w-full sm:w-auto justify-center">
                <div className={`p-2 rounded-full mr-3 text-primary ${
                  isDark ? "bg-white/10" : "bg-primary/10"
                }`}>
                  <MapPin className="h-4 w-4" />
                </div>
                <p className="sf-mono text-sm font-light">Manchester, United Kingdom</p>
              </div>
            </div>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className={`sf-mono text-base font-light mb-6 ${
              isDark ? "text-gray-400" : "text-muted-foreground"
            }`}>Looking forward to connecting with you!</p>

            <div className={`inline-flex items-center gap-3 px-5 sm:px-7 py-3 rounded-full max-w-full overflow-hidden shadow-sm transition-colors duration-300 hover:bg-white/10 ${
              isDark 
              ? "bg-white/5 border border-white/10" 
              : "bg-card/50 border border-border"
            }`}>
              <p className="sf-mono text-xs sm:text-sm font-light truncate">
                Fun fact: I told my AI to optimize itself… now it refuses to run until I bring it coffee
              </p>
              <Coffee className={`h-5 w-5 flex-shrink-0 ${
                isDark ? "text-amber-400" : "text-amber-500"
              }`} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

