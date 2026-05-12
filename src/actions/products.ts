'use server'

import { prisma } from '@/lib/prisma'
import { products as staticProducts } from '@/data/products'
import type { Product, ProductCategory } from '@/types'

function mapDbProduct(p: {
  slug: string; name: string; category: string; brand: string; price: number;
  image: string; specs: unknown; description: string; inStock: boolean; featured: boolean;
}): Product {
  return {
    id:          p.slug,
    name:        p.name,
    category:    p.category as ProductCategory,
    brand:       p.brand,
    price:       p.price,
    image:       p.image || null,
    specs:       (p.specs as Record<string, string>) || {},
    description: p.description,
    inStock:     p.inStock,
    featured:    p.featured,
  }
}

async function fromDb<T>(
  dbFn: () => Promise<T[]>,
  staticFallback: Product[]
): Promise<Product[]> {
  try {
    const count = await prisma.product.count()
    if (count === 0) return staticFallback
    const rows = await dbFn()
    return (rows as Parameters<typeof mapDbProduct>[0][]).map(mapDbProduct)
  } catch {
    return staticFallback
  }
}

export async function getProducts(): Promise<Product[]> {
  return fromDb(
    () => prisma.product.findMany({ orderBy: [{ featured: 'desc' }, { createdAt: 'asc' }] }),
    staticProducts
  )
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const p = await prisma.product.findFirst({ where: { OR: [{ slug: id }, { id }] } })
    if (p) return mapDbProduct(p)
  } catch { /* fall through */ }
  return staticProducts.find(p => p.id === id) ?? null
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  return fromDb(
    () => prisma.product.findMany({ where: { category }, orderBy: { featured: 'desc' } }),
    staticProducts.filter(p => p.category === category)
  )
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
  return fromDb(
    () => prisma.product.findMany({
      where: { brand: { contains: brand, mode: 'insensitive' } },
      orderBy: { featured: 'desc' },
    }),
    staticProducts.filter(p => p.brand === brand)
  )
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return fromDb(
    () => prisma.product.findMany({ where: { featured: true }, orderBy: { createdAt: 'asc' }, take: 6 }),
    staticProducts.filter(p => p.featured).slice(0, 6)
  )
}
