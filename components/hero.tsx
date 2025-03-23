"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import ParticleBackground from "./particle-background"
import { useTheme } from "next-themes"

export default function Hero() {
  const taglineRef = useRef<HTMLSpanElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark" || theme === "dark"
  const [mounted, setMounted] = useState(false)

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Optimize parallax effect to use passive scroll listening
  const { scrollY } = useScroll({ target: sectionRef });
  const titleY = useTransform(scrollY, [0, 500], [0, -100]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const subtitleY = useTransform(scrollY, [0, 500], [0, -50]);
  const taglineY = useTransform(scrollY, [0, 500], [0, -25]);
  const buttonScale = useTransform(scrollY, [0, 200], [1, 0.9]);

  // More efficient typewriter effect
  useEffect(() => {
    if (!taglineRef.current || !mounted) return;

    // Clear any existing content
    taglineRef.current.textContent = "";
    
    const text = "Turning Data into Decisions";
    let i = 0;
    
    // Use requestAnimationFrame for better performance
    const typeWriter = () => {
      if (i < text.length && taglineRef.current) {
        taglineRef.current.textContent = text.substring(0, i + 1);
        i++;
        requestAnimationFrame(() => setTimeout(typeWriter, 40));
      }
    };

    // Start the typewriter effect with a delay
    const timeoutId = setTimeout(typeWriter, 500);
    
    // Clean up function
    return () => {
      clearTimeout(timeoutId);
      if (taglineRef.current) {
        taglineRef.current.textContent = text;
      }
    };
  }, [mounted]);

  // Render static content before hydration
  if (!mounted) {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Vaibhav Parihar</h1>
            <h2 className="sf-mono text-lg md:text-xl font-light text-muted-foreground mb-6">Machine Learning Engineer</h2>
            <p className="sf-mono text-xl md:text-2xl font-light mb-8 h-8">
              Turning Data into Decisions
              <span className="animate-blink">|</span>
            </p>
            <div>
              <Button
                className={`group ${isDark ? "" : "bg-primary hover:bg-primary/90"}`}
              >
                Explore My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Interactive content after hydration
  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      <ParticleBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ y: titleY, opacity: titleOpacity }}
            initial={{ opacity: 1, y: 0 }} // Start fully visible
            transition={{ 
              duration: 0.7, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            <span className="inline-block overflow-hidden">
              <motion.span 
                className="inline-block"
                initial={{ y: 0 }} // Start at normal position
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Vaibhav Parihar
              </motion.span>
            </span>
          </motion.h1>

          <motion.h2 
            className="sf-mono text-lg md:text-xl font-light text-muted-foreground mb-6"
            style={{ y: subtitleY }}
            initial={{ opacity: 1, y: 0 }} // Start fully visible
            transition={{ 
              duration: 0.7, 
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            <span className="inline-block overflow-hidden">
              <motion.span 
                className="inline-block"
                initial={{ y: 0 }} // Start at normal position
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Machine Learning Engineer
              </motion.span>
            </span>
          </motion.h2>

          <motion.p 
            className="sf-mono text-xl md:text-2xl font-light mb-8 h-8"
            style={{ y: taglineY }}
            initial={{ opacity: 1 }} // Start fully visible
            transition={{ duration: 0.5 }}
          >
            <span ref={taglineRef}></span>
            <span className="animate-blink">|</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 1, scale: 1 }} // Start fully visible
            style={{ scale: buttonScale }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => {
                const projectsSection = document.querySelector("#projects")
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className={`group ${isDark ? "" : "bg-primary hover:bg-primary/90"}`}
            >
              Explore My Work
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "loop", ease: "easeInOut" }}
              >
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          initial={{ opacity: 1, y: 0 }} // Start fully visible
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className={`w-6 h-10 border-2 rounded-full flex justify-center ${
            isDark ? 'border-white/30' : 'border-slate-300'
          }`}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            className={`w-1 h-2 rounded-full mt-2 ${
              isDark ? 'bg-white/50' : 'bg-primary/60'
            }`}
          />
        </motion.div>
      </div>
    </section>
  )
}

