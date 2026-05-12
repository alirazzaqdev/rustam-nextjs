import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { products as staticProducts } from '@/data/products'

export const revalidate = 60 // cache 1 min

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category') || ''
  const brand    = searchParams.get('brand')    || ''
  const featured = searchParams.get('featured') || ''

  try {
    const dbCount = await prisma.product.count()

    if (dbCount === 0) {
      // Fall back to static data if DB not seeded yet
      let result = staticProducts
      if (category) result = result.filter(p => p.category === category)
      if (brand)    result = result.filter(p => p.brand.toLowerCase() === brand.toLowerCase())
      if (featured) result = result.filter(p => p.featured === (featured === 'true'))
      return NextResponse.json(result)
    }

    const where = {
      ...(category ? { category } : {}),
      ...(brand    ? { brand: { contains: brand, mode: 'insensitive' as const } } : {}),
      ...(featured ? { featured: featured === 'true' } : {}),
    }

    const dbProducts = await prisma.product.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { createdAt: 'asc' }],
    })

    // Normalize to match the Product type the frontend expects
    const normalized = dbProducts.map((p: typeof dbProducts[number]) => ({
      id:          p.slug,
      name:        p.name,
      category:    p.category,
      brand:       p.brand,
      price:       p.price,
      image:       p.image,
      specs:       (p.specs as Record<string, string>) || {},
      description: p.description,
      inStock:     p.inStock,
      featured:    p.featured,
    }))

    return NextResponse.json(normalized)
  } catch {
    // On DB error, fall back to static
    let result = staticProducts
    if (category) result = result.filter(p => p.category === category)
    if (brand)    result = result.filter(p => p.brand.toLowerCase() === brand.toLowerCase())
    if (featured) result = result.filter(p => p.featured === (featured === 'true'))
    return NextResponse.json(result)
  }
}
