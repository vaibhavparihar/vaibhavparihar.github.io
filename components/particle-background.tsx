"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

// Throttle function to limit the rate at which a function is executed
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return function(...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>(0)
  const { theme, resolvedTheme } = useTheme()
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  
  // Track if the component is mounted
  const isMounted = useRef(false)
  
  useEffect(() => {
    isMounted.current = true;
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    
    return () => {
      isMounted.current = false;
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const isDarkMode = theme === 'dark' || resolvedTheme === 'dark'
    
    // Adjust based on device performance
    const isLowPerfDevice = window.navigator.hardwareConcurrency <= 4 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Reduce animations based on performance or user preference
    const shouldReduceAnimations = isReducedMotion || isLowPerfDevice;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = Math.floor(window.innerWidth);
      const displayHeight = Math.floor(window.innerHeight);
      
      // Set canvas size with device pixel ratio for clarity
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      
      // Scale the context to ensure correct drawing
      ctx.scale(dpr, dpr);
      
      // Set CSS size
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      
      initParticles();
    }

    const initParticles = () => {
      particlesRef.current = []
      // Increase particle count by approximately 50%
      const particleCount = shouldReduceAnimations ? 30 : 45;

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * (shouldReduceAnimations ? 0.4 : 0.7),
          speedY: (Math.random() - 0.5) * (shouldReduceAnimations ? 0.4 : 0.7),
          opacity: Math.random() * 0.4 + 0.1, // Lower max opacity
        })
      }
    }

    const drawParticles = () => {
      if (!isMounted.current) return;
      
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

      // Determine particle and connection color based on theme
      // In light mode, use softer blue-gray tones for better visibility
      const particleColor = isDarkMode ? '255, 255, 255' : '100, 116, 139' // Slate-400 for light mode
      
      particlesRef.current.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity * (isDarkMode ? 1 : 0.4)})`
        ctx.fill()

        // Update position (slower movement for reduced animation)
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width / window.devicePixelRatio) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height / window.devicePixelRatio) {
          particle.speedY *= -1
        }

        // Only add mouse interaction if reduced motion is not preferred
        if (!shouldReduceAnimations) {
          // Mouse attraction - simplified for performance
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Increase attract radius by 40%
          const attractRadius = 210; // Increased from 150
          if (distance < attractRadius) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            // Increase force by 40%
            const force = (attractRadius - distance) / attractRadius * 1.12 // Increased from 0.8 
            
            particle.x += forceDirectionX * force
            particle.y += forceDirectionY * force
          }
        }
      })

      // Only connect some particles to improve performance
      if (!shouldReduceAnimations) {
        connectParticles(particleColor, isDarkMode)
      } else {
        // Simplified connection logic for reduced motion
        connectParticlesSparse(particleColor, isDarkMode)
      }

      animationFrameRef.current = requestAnimationFrame(drawParticles)
    }

    const connectParticles = (particleColor: string, isDarkMode: boolean) => {
      // Increase max distance by ~40% to create more connections
      const maxDistance = 170 // Increased from 120

      for (let i = 0; i < particlesRef.current.length; i++) {
        // Only connect with nearby particles to improve performance
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const distanceSquared = dx * dx + dy * dy
          const maxDistanceSquared = maxDistance * maxDistance
          
          // Using squared distance comparison for performance (avoid square root)
          if (distanceSquared < maxDistanceSquared) {
            // Calculate real distance only when needed
            const distance = Math.sqrt(distanceSquared)
            // Increase opacity for more visible connections
            const opacity = isDarkMode 
              ? 0.11 * (1 - distance / maxDistance) // Increased from 0.08
              : 0.08 * (1 - distance / maxDistance); // Increased from 0.05
            
            ctx.beginPath()
            // In light mode, use a softer color for connections
            const connectionColor = isDarkMode ? particleColor : '148, 163, 184' // Slate-300 for connections
            ctx.strokeStyle = `rgba(${connectionColor}, ${opacity})`
            ctx.lineWidth = 0.4 // Thinner lines for better performance 
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
            ctx.stroke()
          }
        }
      }
    }
    
    // Simplified connection function for reduced motion/low-performance devices
    const connectParticlesSparse = (particleColor: string, isDarkMode: boolean) => {
      const maxDistance = 100;
      
      // Only connect every other particle
      for (let i = 0; i < particlesRef.current.length; i += 2) {
        for (let j = i + 2; j < particlesRef.current.length; j += 2) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const distanceSquared = dx * dx + dy * dy
          
          if (distanceSquared < maxDistance * maxDistance) {
            const distance = Math.sqrt(distanceSquared)
            const opacity = (isDarkMode ? 0.05 : 0.03) * (1 - distance / maxDistance);
            
            ctx.beginPath()
            const connectionColor = isDarkMode ? particleColor : '148, 163, 184'
            ctx.strokeStyle = `rgba(${connectionColor}, ${opacity})`
            ctx.lineWidth = 0.3
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Throttled mouse event handlers for better performance
    const handleMouseMove = throttle((e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }, 16) // Approx 60fps

    const handleTouchMove = throttle((e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX
        mouseRef.current.y = e.touches[0].clientY
      }
    }, 16)

    window.addEventListener("resize", throttle(resizeCanvas, 200))
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    resizeCanvas()
    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [theme, resolvedTheme, isReducedMotion])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0" 
      style={{ pointerEvents: "none" }} 
      aria-hidden="true"
    />
  )
}

