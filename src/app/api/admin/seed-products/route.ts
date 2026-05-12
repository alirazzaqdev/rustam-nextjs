import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'
import { products } from '@/data/products'

export async function POST() {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Bulk insert — one DB round-trip, never times out
  const result = await prisma.product.createMany({
    skipDuplicates: true,
    data: products.map(p => ({
      slug:        p.id,
      name:        p.name,
      description: p.description || `${p.brand} ${p.name}`,
      category:    p.category,
      brand:       p.brand || '',
      price:       p.price,
      image:       p.image || '',
      specs:       (p.specs as object) || {},
      featured:    p.featured,
      inStock:     p.inStock,
    })),
  })

  const total   = products.length
  const inserted = result.count
  const skipped  = total - inserted

  return NextResponse.json({ inserted, skipped, total })
}

// DELETE — wipe all products then re-seed fresh
export async function DELETE() {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await prisma.product.deleteMany()

  const result = await prisma.product.createMany({
    data: products.map(p => ({
      slug:        p.id,
      name:        p.name,
      description: p.description || `${p.brand} ${p.name}`,
      category:    p.category,
      brand:       p.brand || '',
      price:       p.price,
      image:       p.image || '',
      specs:       (p.specs as object) || {},
      featured:    p.featured,
      inStock:     p.inStock,
    })),
  })

  return NextResponse.json({ inserted: result.count, total: products.length })
}
