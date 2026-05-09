import { Metadata } from 'next'

export const siteConfig = {
  name: 'Rustam Battery & Solar Energy House',
  description: '19 years of expertise in solar panels, batteries, and energy solutions for Lahore, Pakistan',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://rustambattery.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/rustambattery',
    linkedin: 'https://linkedin.com/company/rustam-battery',
  },
}

export function generateMetadata(
  title: string,
  description: string,
  path: string = '/'
): Metadata {
  const fullUrl = `${siteConfig.url}${path}`

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: fullUrl,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.ogImage],
    },
    keywords: [
      'solar panels',
      'solar battery',
      'solar energy',
      'Lahore',
      'Pakistan',
      'renewable energy',
      'solar installation',
      'energy solutions',
    ],
    authors: [
      {
        name: 'Rustam Battery & Solar Energy House',
        url: siteConfig.url,
      },
    ],
  }
}

export function getStructuredData(type: string, data: Record<string, any>) {
  const baseUrl = siteConfig.url

  switch (type) {
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: siteConfig.name,
        description: siteConfig.description,
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Lahore',
          addressLocality: 'Lahore',
          addressRegion: 'Punjab',
          addressCountry: 'Pakistan',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+92-300-1234567',
          contactType: 'Customer Service',
        },
        sameAs: [siteConfig.links.twitter, siteConfig.links.linkedin],
      }

    case 'product':
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data.name,
        description: data.description,
        image: data.image,
        price: data.price,
        priceCurrency: 'PKR',
        availability: data.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        aggregateRating:
          data.rating && data.reviews
            ? {
                '@type': 'AggregateRating',
                ratingValue: data.rating,
                reviewCount: data.reviews,
              }
            : undefined,
      }

    case 'breadcrumb':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map(
          (item: Record<string, any>, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${baseUrl}${item.url}`,
          })
        ),
      }

    case 'faq':
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.questions.map((q: Record<string, any>) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
        })),
      }

    default:
      return {}
  }
}
