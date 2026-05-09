# Sanity CMS Setup Guide

## Overview

Sanity CMS is a headless content management system that allows you to:
- Manage products, services, testimonials, FAQs
- Edit content without touching code
- Upload images with optimization
- Preview content in real-time
- Collaborate with team members
- Access content via API

---

## Step 1: Create Sanity Account & Project

### 1.1 Sign Up
1. Go to **https://www.sanity.io/**
2. Click **"Get Started"**
3. Sign up with **GitHub** (recommended) or email
4. Verify your email

### 1.2 Create Sanity Project
1. After login, click **"Create project"**
2. Fill in:
   - **Project name:** `Rustam Battery`
   - **Project slug:** `rustam-battery` (or auto-generated)
3. Select **"Start with a clean project"**
4. Choose your **region** (Europe is default)
5. Click **"Create project"**

**Wait** 1-2 minutes for project setup

### 1.3 Get Your Credentials
Once project is ready:
1. Go to **Project settings** (gear icon, bottom left)
2. Click **"API"** in left menu
3. Copy your **Project ID** (something like: `abc123def456`)
4. Remember your **Dataset name** (default: `production`)
5. Scroll down to **"Tokens"**
6. Create a new **API token** with these permissions:
   - `Editor` (for CMS editing)
7. Copy the token

---

## Step 2: Configure Next.js Environment

### 2.1 Add Environment Variables

Create/update `.env.local`:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id-here"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
SANITY_API_TOKEN="your-api-token-here"

# Rest of your .env vars...
DATABASE_URL="..."
RESEND_API_KEY=""
...
```

**Important:** 
- Variables starting with `NEXT_PUBLIC_` are available in browser
- `SANITY_API_TOKEN` is server-only (secret)

---

## Step 3: Install Sanity Dependencies

```bash
npm install next-sanity sanity @sanity/image-url @sanity/vision sanity/structure
```

**Already done!** The packages are installed.

---

## Step 4: Start Sanity Studio

In your terminal:

```bash
npm run sanity:dev
```

Output:
```
✓ Sanity Studio running at http://localhost:3333
```

**Open in browser:** `http://localhost:3333`

You'll see the Sanity content editor where you can:
- Create/edit Products
- Create/edit Services
- Add Testimonials
- Manage FAQs
- Upload images

---

## Step 5: Content Types Available

### Products
Fields:
- Name (required)
- Slug (auto-generated)
- Description (required)
- Category (Solar Panels, Batteries, Inverters, Accessories)
- Price in PKR (required)
- Image
- Specifications (array of key-value pairs)
- Warranty
- Featured (true/false)
- In Stock (true/false)

### Services
Fields:
- Name (required)
- Slug (auto-generated)
- Description (required)
- Icon (emoji)
- Featured (true/false)

### Testimonials
Fields:
- Customer Name (required)
- Company/Organization
- Job Title
- Testimonial Content (required)
- Rating (1-5 stars)
- Customer Photo
- Featured (true/false)

### FAQs
Fields:
- Question (required)
- Answer (required)
- Category (General, Technical, Pricing, Installation, Warranty)
- Display Order (number)

---

## Step 6: Fetch Content in Next.js

### Example: Get Products from Sanity

Create `src/sanity/queries.ts`:

```typescript
export const PRODUCTS_QUERY = `
  *[_type == "product" && published == true] {
    _id,
    name,
    slug,
    description,
    category,
    price,
    "image": image.asset->url,
    specifications,
    warranty,
    featured,
    inStock
  }
`

export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    description,
    price,
    "image": image.asset->url,
    featured
  }
`
```

### Use in Components

```typescript
'use client'

import { useEffect, useState } from 'react'
import { sanityFetch } from '@/lib/sanity'
import { PRODUCTS_QUERY } from '@/sanity/queries'

export default function ProductsFromCMS() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const data = await sanityFetch({
        query: PRODUCTS_QUERY,
      })
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>PKR {product.price}</p>
        </div>
      ))}
    </div>
  )
}
```

---

## Step 7: Deploy Sanity to Production

### 7.1 Deploy Studio to Sanity Hosting
```bash
npm run sanity:deploy
```

This publishes your Studio to a unique URL managed by Sanity.

### 7.2 Set Environment Variables in Vercel
When deploying Next.js to Vercel:
1. Go to **Vercel Project Settings**
2. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_TOKEN`
3. Redeploy

---

## Useful Commands

```bash
npm run sanity:dev          # Start Sanity Studio locally
npm run sanity:deploy       # Deploy Studio to Sanity
npm run sanity:studio       # Alias for dev (no --dev flag)
```

---

## Access Sanity Studio

### Local Development
```
http://localhost:3333
```

### After Deployment
Sanity provides you with a URL like:
```
https://rustam-battery.sanity.studio
```

---

## Troubleshooting

### "Authentication failed"
- Check SANITY_API_TOKEN is correct
- Verify token has correct permissions
- Regenerate token if needed in project settings

### "Schema not syncing"
- Clear `.next` build folder
- Restart dev server: `npm run dev`
- Check schema files in `sanity/schemas/`

### "Image not uploading"
- Ensure image is under 10MB
- Check CORS settings in Sanity
- Verify project has asset management enabled

---

## Next Steps

1. **Populate Content**
   - Add 5-10 products
   - Add 3-5 services
   - Add customer testimonials
   - Add FAQ items

2. **Update Next.js Components**
   - Replace hardcoded data with Sanity queries
   - Test content updates reflect in live site

3. **Deploy to Production**
   - Set Sanity env vars in Vercel
   - Update content after deployment

---

## Resources

- Sanity Docs: https://www.sanity.io/docs
- Sanity Studio: https://www.sanity.io/docs/sanity-studio
- Next.js + Sanity: https://www.sanity.io/plugins/next-sanity
- GROQ Queries: https://www.sanity.io/docs/groq

---

**Ready to go!** Start with `npm run sanity:dev` and begin managing your content. 🚀
