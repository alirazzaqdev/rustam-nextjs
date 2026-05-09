# SEO Optimization Guide

## Overview

The website includes comprehensive SEO features:
- Dynamic meta tags (title, description, OG images)
- JSON-LD structured data
- Sitemap generation
- Robots.txt configuration
- Google Analytics integration
- Twitter & Open Graph cards

---

## Configuration

### 1. Environment Variables

Add to `.env.local`:

```env
# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Site URL
NEXT_PUBLIC_APP_URL="https://rustambattery.com"
```

### 2. Get Google Analytics ID

1. Go to https://analytics.google.com
2. Create property for "Rustam Battery"
3. Get Measurement ID (G-XXXXX)
4. Add to `.env.local`

---

## SEO Features Included

### Meta Tags

Automatically generated for all pages:
- ✅ Title tag (60 chars max)
- ✅ Meta description (160 chars max)
- ✅ Canonical URLs
- ✅ Viewport settings
- ✅ Theme color

### Open Graph

For social media sharing:
- ✅ og:title
- ✅ og:description
- ✅ og:image (1200x630px)
- ✅ og:url
- ✅ og:type

### Twitter Cards

For Twitter sharing:
- ✅ twitter:card (summary_large_image)
- ✅ twitter:title
- ✅ twitter:description
- ✅ twitter:image

### Structured Data (JSON-LD)

Search engines understand your content:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Rustam Battery & Solar Energy House",
  "url": "https://rustambattery.com",
  "logo": "https://rustambattery.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Lahore",
    "addressLocality": "Lahore",
    "addressCountry": "Pakistan"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+92-300-1234567",
    "contactType": "Customer Service"
  }
}
```

### Sitemap

Auto-generated at `/sitemap.xml`:
- Home page (priority: 1.0)
- Products section (priority: 0.9)
- Services section (priority: 0.8)
- Calculator (priority: 0.8)
- FAQ (priority: 0.8)
- Contact (priority: 0.7)

### Robots.txt

Located at `/robots.txt`:
- Allows Google, Bing indexing
- Blocks bad bots (Ahrefs, Semrush)
- Specifies crawl delays

---

## Using SEO Functions

### Generate Page Metadata

```typescript
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata(
  'Solar Products',
  'Browse our solar panels, batteries, and inverters',
  '/products'
)
```

### Add Structured Data to Pages

```typescript
import { getStructuredData } from '@/lib/seo'

export function ProductPage({ product }) {
  const schema = getStructuredData('product', {
    name: product.name,
    description: product.description,
    image: product.image,
    price: product.price,
    inStock: product.inStock,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Page content */}
    </>
  )
}
```

---

## Schema Types Available

### 1. Organization

```typescript
getStructuredData('organization', {})
```

Defines business info for Knowledge Graph.

### 2. Product

```typescript
getStructuredData('product', {
  name: 'Solar Panel 500W',
  description: '...',
  image: 'image-url',
  price: 45000,
  inStock: true,
  rating: 4.5,
  reviews: 128,
})
```

### 3. Breadcrumb

```typescript
getStructuredData('breadcrumb', {
  items: [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: 'Solar Panels', url: '/products?category=solar-panels' },
  ],
})
```

### 4. FAQ

```typescript
getStructuredData('faq', {
  questions: [
    {
      question: 'How much can I save?',
      answer: '40-60% reduction in electricity bills...',
    },
  ],
})
```

---

## Optimization Checklist

### On-Page SEO

- [ ] Title tag (50-60 characters, includes keyword)
- [ ] Meta description (150-160 characters)
- [ ] H1 tag (one per page, unique)
- [ ] Internal links (contextual, anchor text optimized)
- [ ] Images alt text (descriptive)
- [ ] URL structure (simple, readable)
- [ ] Mobile responsive (tested)

### Technical SEO

- [ ] Sitemap.xml submitted to Google
- [ ] Robots.txt configured
- [ ] Structured data (JSON-LD) added
- [ ] Open Graph tags complete
- [ ] Page speed optimized (Lighthouse 90+)
- [ ] Core Web Vitals good
- [ ] Mobile-first indexing ready
- [ ] HTTPS enabled

### Content SEO

- [ ] Keyword research done
- [ ] Content targets search intent
- [ ] 300+ words per page
- [ ] Natural keyword density (1-2%)
- [ ] Long-tail keywords included
- [ ] Internal links strategy
- [ ] Fresh content schedule

### Link Building

- [ ] Local citations (Google My Business, etc.)
- [ ] Industry directories
- [ ] Local business listings
- [ ] Social media profiles

---

## Monitor SEO Performance

### Google Search Console

1. Go to https://search.google.com/search-console
2. Add property: https://rustambattery.com
3. Verify ownership (via DNS record)
4. Check:
   - Indexation status
   - Search performance
   - Mobile usability
   - Core Web Vitals

### Google Analytics

1. Track visitor behavior
2. Monitor conversion funnels
3. Check traffic sources
4. Analyze user engagement
5. Set up goals

### Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters
2. Add site
3. Submit sitemap
4. Monitor crawl errors

---

## SEO Best Practices

### Keywords

- Target 3-4 primary keywords per page
- Use variations (LSI keywords)
- Avoid keyword stuffing
- Natural language first

### Content

- Update regularly (monthly minimum)
- Add fresh content (blog posts, case studies)
- Internal linking strategy
- Longer form content (2000+ words for pillar pages)

### User Experience

- Mobile responsive
- Fast loading (target: < 3 seconds)
- Clear navigation
- Accessibility (WCAG 2.2 AA)
- No intrusive ads/popups

### Technical

- Clean URL structure
- XML sitemap updated
- Robots.txt optimized
- SSL certificate (HTTPS)
- Canonical tags for duplicates

---

## Common Issues & Solutions

### Low Rankings

**Causes:**
- Low-quality content
- Weak backlink profile
- Poor technical SEO
- Keyword mismatch

**Solutions:**
- Improve content quality
- Build relevant backlinks
- Fix technical issues
- Target correct keywords

### Crawl Errors

**Check:**
- Google Search Console
- 404 errors (broken links)
- 5xx server errors
- Robots.txt issues

**Fix:**
- Redirect broken links
- Fix server errors
- Update robots.txt

### Indexation Issues

**Check:**
- Search Console coverage
- Robots.txt blocking
- Noindex tags
- Meta robots directives

**Fix:**
- Remove noindex if needed
- Update robots.txt
- Submit sitemap

---

## Tools for SEO

- **Google Search Console** - https://search.google.com/search-console
- **Google Analytics** - https://analytics.google.com
- **Lighthouse** - Built into Chrome DevTools
- **MozBar** - Browser extension for SEO metrics
- **SEMrush** - https://semrush.com
- **Ahrefs** - https://ahrefs.com
- **Yoast SEO** - https://yoast.com

---

## Next Steps

1. ✅ SEO foundation is in place
2. ⬜ Submit sitemap to Google Search Console
3. ⬜ Verify ownership with Google
4. ⬜ Add Google Analytics
5. ⬜ Create content calendar
6. ⬜ Build backlinks
7. ⬜ Monitor Search Console monthly

---

**Ready to boost your SEO!** Start with Google Search Console and analytics setup. 📈
