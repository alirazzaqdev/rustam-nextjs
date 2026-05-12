import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { getStructuredData } from "@/lib/seo"
import JsonLd from "@/components/seo/JsonLd"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rustam-nextjs.vercel.app'),

  title: {
    default: 'Solar Panels, Batteries & Inverters in Lahore | Rustam Battery',
    template: '%s | Rustam Battery & Solar Energy House Lahore',
  },

  description: "Pakistan's trusted solar energy company since 2006. Buy solar panels, batteries (Osaka, AGS, Phoenix, Alaska), Knox inverters in Lahore. Free site visit. 500+ installations. Call +92 321 3770402",

  keywords: [
    'solar panels Lahore', 'solar panels Pakistan', 'battery shop Lahore',
    'solar energy Lahore', 'Osaka battery Lahore', 'AGS battery price Pakistan',
    'Phoenix battery Lahore', 'Alaska battery price', 'Knox inverter Lahore',
    'solar inverter Pakistan', 'solar installation Lahore', 'solar system price Pakistan',
    'net metering Lahore', 'hybrid solar system Pakistan', 'on grid solar system Lahore',
    'solar panels price Pakistan 2026', 'Canadian Solar panels Pakistan',
    'JinkoSolar Pakistan', 'LONGi solar panels', 'Knox Krypton inverter',
    'solar battery backup Lahore', 'UPS battery Lahore', 'tubular battery Pakistan',
    'lithium battery Pakistan', 'Knox Powerwall Pakistan', 'solar company Lahore',
    'Kahna Nau solar', 'load shedding solution Lahore', 'bijli bill kam karna',
    'solar panel installation Lahore', 'best solar company Pakistan',
    'cheap solar panels Lahore', 'solar panels for home Pakistan',
    '5kW solar system Lahore', '10kW solar system Pakistan', 'solar panel dealer Lahore',
  ],

  authors: [{ name: 'Rustam Battery & Solar Energy House' }],
  creator: 'Rustam Battery & Solar Energy House',
  publisher: 'Rustam Battery & Solar Energy House',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://rustam-nextjs.vercel.app',
    siteName: 'Rustam Battery & Solar Energy House',
    title: 'Solar Panels, Batteries & Inverters in Lahore | Rustam Battery',
    description: "Pakistan's trusted solar energy company since 2006. 500+ installations. Solar panels, batteries, Knox inverters. Free site visit in Lahore.",
    images: [{ url: '/logo.png', width: 1040, height: 1040, alt: 'Rustam Battery & Solar Energy House — Solar Panels Lahore' }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Solar Panels & Batteries in Lahore | Rustam Battery',
    description: 'Trusted solar energy company since 2006. Solar panels, batteries, Knox inverters. Free site visit. 500+ installations across Lahore.',
    images: ['/logo.png'],
  },

  alternates: {
    canonical: 'https://rustam-nextjs.vercel.app',
  },

  category: 'Solar Energy',

  verification: {
    google: 'add-google-search-console-verification-here',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = getStructuredData('organization', {})

  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D97706" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://wa.me" />

        {/* Geo meta — local SEO */}
        <meta name="geo.region" content="PK-PB" />
        <meta name="geo.placename" content="Lahore, Punjab, Pakistan" />
        <meta name="geo.position" content="31.3739;74.3675" />
        <meta name="ICBM" content="31.3739, 74.3675" />
        <meta httpEquiv="content-language" content="en-PK" />

        {/* Business meta */}
        <meta name="classification" content="Solar Energy, Battery Sales, Inverters" />
        <meta name="category" content="Solar Energy Company" />
        <meta name="coverage" content="Lahore, Punjab, Pakistan" />
        <meta name="distribution" content="local" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />

        {/* JSON-LD Structured Data */}
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  )
}
