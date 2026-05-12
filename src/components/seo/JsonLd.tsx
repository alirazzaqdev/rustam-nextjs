export default function JsonLd() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://rustam-nextjs.vercel.app/#business',
    name: 'Rustam Battery & Solar Energy House',
    alternateName: 'Rustam Battery Solar',
    description: "Pakistan's trusted solar energy company since 2016. Solar panels, batteries, and Knox inverters for residential, commercial and industrial customers in Lahore.",
    url: 'https://rustam-nextjs.vercel.app',
    telephone: '+923213770402',
    email: 'ia6969537@gmail.com',
    foundingDate: '2016',
    priceRange: 'PKR 5,000 - PKR 2,000,000',
    currenciesAccepted: 'PKR',
    paymentAccepted: 'Cash, JazzCash, EasyPaisa, Bank Transfer',
    image: 'https://rustam-nextjs.vercel.app/logo.png',
    logo: {
      '@type': 'ImageObject',
      url: 'https://rustam-nextjs.vercel.app/logo.png',
      width: 1040,
      height: 1040,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kahna Nau',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      postalCode: '54000',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 31.3739,
      longitude: 74.3675,
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '16:00' },
    ],
    sameAs: ['https://wa.me/923213770402'],
    hasMap: 'https://maps.google.com/?q=31.3739,74.3675',
    areaServed: [
      { '@type': 'City', name: 'Lahore' },
      { '@type': 'State', name: 'Punjab, Pakistan' },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: 31.3739, longitude: 74.3675 },
      geoRadius: '50000',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        author: { '@type': 'Person', name: 'Haji Muhammad Akram' },
        reviewBody: 'Rustam Battery ne hamara 10kW ka solar system install kiya. Bijli ka bill PKR 25,000 se seedha PKR 2,500 per aa gaya. Bohat khush hun.',
      },
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        author: { '@type': 'Person', name: 'Ch. Naveed Ahmed' },
        reviewBody: 'Our factory was spending PKR 4 lakh monthly on electricity. After 50kW system from Rustam Battery, we now pay under PKR 40,000. ROI in under 3 years.',
      },
    ],
  }

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rustam Battery & Solar Energy House',
    url: 'https://rustam-nextjs.vercel.app',
    logo: 'https://rustam-nextjs.vercel.app/logo.png',
    foundingDate: '2016',
    founder: { '@type': 'Person', name: 'Muhammad Rustam' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92-321-3770402',
      contactType: 'customer service',
      areaServed: 'PK',
      availableLanguage: ['Urdu', 'English'],
    },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Rustam Battery & Solar Energy House',
    url: 'https://rustam-nextjs.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://rustam-nextjs.vercel.app/?search={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://rustam-nextjs.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://rustam-nextjs.vercel.app/#products' },
      { '@type': 'ListItem', position: 3, name: 'Services', item: 'https://rustam-nextjs.vercel.app/#services' },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much can I save with solar panels in Lahore?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most customers in Lahore save 60-80% on electricity bills. A 5kW system typically reduces monthly bills from PKR 15,000-20,000 to PKR 3,000-5,000. Contact us for a free site assessment.' },
      },
      {
        '@type': 'Question',
        name: 'What is the price of solar panels in Lahore Pakistan 2026?',
        acceptedAnswer: { '@type': 'Answer', text: 'Solar panel prices in Lahore range from PKR 22,000 to PKR 30,000 per panel depending on brand and wattage. We stock Canadian Solar, JinkoSolar, LONGi, JA Solar and more. Contact us for latest pricing.' },
      },
      {
        '@type': 'Question',
        name: 'Which battery is best for solar in Pakistan?',
        acceptedAnswer: { '@type': 'Answer', text: 'For solar in Pakistan, we recommend AGS, Osaka, Phoenix, and Alaska lead-acid batteries for budget options, and Knox Powerwall lithium batteries for premium long-term performance. We stock all major brands.' },
      },
      {
        '@type': 'Question',
        name: 'How long does solar installation take in Lahore?',
        acceptedAnswer: { '@type': 'Answer', text: 'Residential solar systems (3-10kW) take 1-2 days to install. Commercial systems take 3-5 days. We handle everything including site survey, installation, wiring, and net metering.' },
      },
      {
        '@type': 'Question',
        name: 'Does Rustam Battery offer free site visit in Lahore?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes! We offer completely free site visits and consultations across Lahore. Call +92 321 3770402 or WhatsApp us to book your free visit within 24 hours.' },
      },
    ],
  }

  const productList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Solar Panels, Batteries & Inverters — Rustam Battery Lahore',
    description: 'Complete range of solar products available at Rustam Battery & Solar Energy House, Kahna Nau, Lahore',
    numberOfItems: 93,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Product',
          name: 'Osaka HT115 Plus-A Battery',
          description: 'Popular Osaka lead-acid battery for home solar and UPS. 72Ah capacity.',
          image: 'https://rustam-nextjs.vercel.app/logo.png',
          brand: { '@type': 'Brand', name: 'Osaka' },
          offers: { '@type': 'Offer', price: '14214', priceCurrency: 'PKR', availability: 'https://schema.org/InStock', url: 'https://rustam-nextjs.vercel.app/#products', seller: { '@type': 'Organization', name: 'Rustam Battery' } },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Product',
          name: 'Knox Krypton 6000 4kW Hybrid Inverter',
          description: 'Knox Krypton 6000 4kW hybrid inverter with built-in WiFi and BMS. Genuine Voltronic Power Taiwan.',
          image: 'https://rustam-nextjs.vercel.app/logo.png',
          brand: { '@type': 'Brand', name: 'Knox' },
          offers: { '@type': 'Offer', price: '120500', priceCurrency: 'PKR', availability: 'https://schema.org/InStock', url: 'https://rustam-nextjs.vercel.app/#products', seller: { '@type': 'Organization', name: 'Rustam Battery' } },
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Product',
          name: 'Canadian Solar 585W N-Type Bifacial Panel',
          description: 'Canadian Solar 585W N-Type Bifacial solar panel. Ready stock in Lahore.',
          image: 'https://rustam-nextjs.vercel.app/logo.png',
          brand: { '@type': 'Brand', name: 'Canadian Solar' },
          offers: { '@type': 'Offer', price: '26179', priceCurrency: 'PKR', availability: 'https://schema.org/InStock', url: 'https://rustam-nextjs.vercel.app/#products', seller: { '@type': 'Organization', name: 'Rustam Battery' } },
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productList) }} />
    </>
  )
}
