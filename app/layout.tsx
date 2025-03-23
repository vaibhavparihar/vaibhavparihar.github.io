import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider, DarkThemeSwitcher } from "../components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] })

export const metadata: Metadata = {
  title: "Vaibhav Parihar | Machine Learning Engineer",
  description:
    "Portfolio of Vaibhav Parihar, Machine Learning Engineer specializing in AI solutions and deep learning architectures.",
  keywords: ["Machine Learning", "AI", "Deep Learning", "Portfolio", "Vaibhav Parihar"]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script id="dark-mode-script" strategy="beforeInteractive">
          {`
            // Force dark mode on initial load (runs before React hydrates)
            const userTheme = localStorage.getItem('portfolio-theme');
            if (userTheme !== 'light') {
              document.documentElement.classList.add('dark');
              document.body.classList.add('dark');
              localStorage.setItem('portfolio-theme', 'dark');
            }
          `}
        </Script>
      </head>
      <body className={`${inter.className} dark`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="portfolio-theme" disableTransitionOnChange={false}>
          <DarkThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}