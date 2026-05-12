import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://rustam-nextjs.vercel.app'
  const now  = new Date()

  return [
    // Real crawlable URLs only — hash fragments (#products) are NOT separate pages
    { url: base,               lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/order`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/checkout`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/cart`,     lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]
}
