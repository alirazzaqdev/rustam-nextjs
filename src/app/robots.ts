import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/cart'],
      },
    ],
    sitemap: 'https://rustambattery.com/sitemap.xml',
    host: 'https://rustambattery.com',
  }
}
