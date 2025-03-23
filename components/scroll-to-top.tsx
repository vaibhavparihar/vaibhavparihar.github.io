"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return;

    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [mounted])

  const scrollToTop = () => {
    if (!mounted) return;
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Don't render anything until after hydration to avoid mismatch
  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-30"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className={`h-10 w-10 rounded-full shadow-lg ${
              isDark 
                ? "bg-primary/90 hover:bg-primary" 
                : "bg-primary hover:bg-primary/90 text-white"
            }`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

