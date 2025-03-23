'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // After mounting, we can render the children
  React.useEffect(() => {
    setMounted(true)
    
    // Force dark mode on initial page load
    const theme = localStorage.getItem('portfolio-theme')
    if (!theme || theme === 'system') {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
      localStorage.setItem('portfolio-theme', 'dark')
    }
  }, [])

  // Add dark class to body element when theme changes
  React.useEffect(() => {
    if (!mounted) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          const htmlElement = document.documentElement;
          const isDark = htmlElement.classList.contains('dark');
          
          if (isDark) {
            document.body.classList.add('dark');
          } else {
            document.body.classList.remove('dark');
          }
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  return (
    <NextThemesProvider {...props}>
      {mounted ? children : null}
    </NextThemesProvider>
  )
}

// Create a wrapper component to ensure dark mode on first render
export function DarkThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  
  React.useEffect(() => {
    // Check local storage directly
    const storedTheme = localStorage.getItem('portfolio-theme')
    
    // If no stored theme or system theme, set to dark
    if (!storedTheme || storedTheme === 'system') {
      setTheme('dark')
    }
  }, [setTheme])
  
  return null
}
