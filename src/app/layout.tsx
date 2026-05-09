import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Rustam Battery & Solar Energy - Solar Solutions in Lahore",
  description: "19 years of expertise in solar panels, batteries, and energy solutions for residential, commercial, and industrial customers in Lahore, Pakistan.",
  keywords: ["solar panels", "solar battery", "solar energy", "Lahore", "Pakistan", "renewable energy"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rustambattery.com",
    siteName: "Rustam Battery",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
