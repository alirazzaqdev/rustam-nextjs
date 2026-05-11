import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rustam-nextjs.vercel.app'
  const now = new Date()

  return [
    { url: baseUrl,                       lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/#products`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/order`,            lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/#services`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#contact`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#calculator`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/#team`,            lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
