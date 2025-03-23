"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"
import { Card } from "./ui/card"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  
  // Use resolved theme to ensure accurate theme detection during SSR
  const isDark = mounted ? theme === "dark" : resolvedTheme === "dark"

  // Ensure theme is applied immediately on load
  useEffect(() => {
    // Check if dark mode is preferred by system
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.classList.toggle('dark', prefersDark && theme !== "light" || theme === "dark")
    setMounted(true)
  }, [theme])

  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = (currentScroll / totalScroll) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (!mounted) return;
    
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, mounted])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (!mounted) return;
    
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToTop = () => {
    if (!mounted) return;
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 h-0.5 bg-primary z-50 transition-all duration-300 ease-in-out"
        style={{ width: `${scrollProgress}%` }}
      />
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-40 backdrop-blur-md transition-colors",
          isDark ? 'bg-black/60 border-b border-white/5' : 'bg-background/70 border-b border-slate-200/30 shadow-sm'
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <button
                onClick={scrollToTop}
                className={cn(
                  "text-2xl font-bold transition-colors duration-300 hover:text-primary focus:outline-none",
                  isDark ? 'text-gray-100' : 'text-foreground' 
                )}
                aria-label="Scroll to top"
              >
                <span className="sr-only">Vaibhav Parihar</span>
                <span className="font-bold">VP</span>
              </button>
            </div>

            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "sf-mono text-sm font-light hover:text-primary transition-colors duration-300 relative group",
                        isDark ? 'text-gray-300' : 'text-muted-foreground' 
                      )}
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full bg-primary"></span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
                className={cn("mr-2", isDark ? "border-gray-800" : "")}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-400" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-300" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <Menu className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`} />
                <X className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden fixed inset-0 z-50 transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full",
            isDark ? "bg-black" : "bg-white"
          )}
        >
          <div className={cn(
            "flex justify-end p-4 border-b",
            isDark ? 'border-gray-800/80' : 'border-slate-100'
          )}>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="pt-8 pb-6 px-6">
            <nav>
              <ul className="space-y-6">
                {navItems.map((item) => (
                  <li key={item.name} className={cn(
                    "border-b pb-4",
                    isDark ? 'border-gray-800/80' : 'border-slate-100'
                  )}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "sf-mono text-lg font-light hover:text-primary transition-colors duration-300 w-full text-left",
                        isDark ? 'text-gray-300' : 'text-muted-foreground'
                      )}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <div className="h-16"></div> {/* Spacer for fixed header */}
    </>
  )
}

