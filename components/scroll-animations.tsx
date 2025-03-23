"use client"

import { useEffect } from "react"

interface ScrollAnimationProps {
  target: string
  threshold?: number
  rootMargin?: string
  once?: boolean
  className?: string
}

export default function useScrollAnimation({
  target,
  threshold = 0.1,
  rootMargin = "0px",
  once = false,
}: ScrollAnimationProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
            if (once) {
              observer.unobserve(entry.target)
            }
          } else {
            if (!once) {
              entry.target.classList.remove("animate-in")
            }
          }
        })
      },
      {
        threshold,
        rootMargin,
      },
    )

    const elements = document.querySelectorAll(target)
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [target, threshold, rootMargin, once])

  return null
}

