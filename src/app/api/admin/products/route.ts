import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

async function requireAuth() {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}

export async function GET(req: NextRequest) {
  const deny = await requireAuth(); if (deny) return deny

  const { searchParams } = new URL(req.url)
  const page     = Math.max(1, Number(searchParams.get('page') || 1))
  const limit    = Math.min(100, Number(searchParams.get('limit') || 50))
  const search   = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''

  const where = {
    ...(search   ? { OR: [
      { name:  { contains: search, mode: 'insensitive' as const } },
      { brand: { contains: search, mode: 'insensitive' as const } },
    ] } : {}),
    ...(category ? { category } : {}),
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.product.count({ where }),
  ])

  return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  const deny = await requireAuth(); if (deny) return deny

  const body = await req.json()
  const { name, slug, description, category, brand, price, image, specs, warranty, featured, inStock } = body

  if (!name || !category || price === undefined) {
    return NextResponse.json({ error: 'name, category, and price are required' }, { status: 400 })
  }

  const base = (slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
  const finalSlug = `${base}-${Date.now()}`

  const product = await prisma.product.create({
    data: {
      name, slug: finalSlug,
      description: description || '',
      category, brand: brand || '',
      price: Number(price),
      image: image || '',
      specs: specs || {},
      warranty: warranty || null,
      featured: Boolean(featured),
      inStock: inStock !== false,
    },
  })

  return NextResponse.json(product, { status: 201 })
}
