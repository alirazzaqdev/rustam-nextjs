import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

async function requireAuth() {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const deny = await requireAuth(); if (deny) return deny
  const { id } = await params
  const body = await req.json()

  const { name, description, category, brand, price, image, specs, warranty, featured, inStock } = body

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...(name        !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(category    !== undefined && { category }),
      ...(brand       !== undefined && { brand }),
      ...(price       !== undefined && { price: Number(price) }),
      ...(image       !== undefined && { image }),
      ...(specs       !== undefined && { specs }),
      ...(warranty    !== undefined && { warranty }),
      ...(featured    !== undefined && { featured: Boolean(featured) }),
      ...(inStock     !== undefined && { inStock: Boolean(inStock) }),
    },
  })

  revalidatePath('/')
  return NextResponse.json(product)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const deny = await requireAuth(); if (deny) return deny
  const { id } = await params
  await prisma.product.delete({ where: { id } })
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
