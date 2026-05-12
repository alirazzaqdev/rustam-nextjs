import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'
import { products } from '@/data/products'

export async function POST() {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let inserted = 0
  let skipped  = 0

  for (const p of products) {
    const slug = p.id
    const existing = await prisma.product.findUnique({ where: { slug } })
    if (existing) { skipped++; continue }

    await prisma.product.create({
      data: {
        slug,
        name:        p.name,
        description: p.description || `${p.brand} ${p.name}`,
        category:    p.category,
        brand:       p.brand || '',
        price:       p.price,
        image:       p.image || '',
        specs:       (p.specs as object) || {},
        featured:    p.featured,
        inStock:     p.inStock,
      },
    })
    inserted++
  }

  return NextResponse.json({ inserted, skipped, total: products.length })
}
