import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/data/products'
import type { Product, ProductCategory } from '@/types'

const CATEGORIES = new Set<ProductCategory>(['Battery', 'Solar Panel', 'Inverter', 'Accessory'])

function isCategory(value: string): value is ProductCategory {
  return CATEGORIES.has(value as ProductCategory)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const brand = searchParams.get('brand')
  const featured = searchParams.get('featured')

  let result: Product[] = products
  if (category && isCategory(category)) result = result.filter((p) => p.category === category)
  if (brand) result = result.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
  if (featured) result = result.filter((p) => p.featured === (featured === 'true'))

  return NextResponse.json(result)
}
