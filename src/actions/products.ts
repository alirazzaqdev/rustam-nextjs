'use server'

import { prisma } from '@/lib/prisma'
import type { Product } from '@/types'

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return products as Product[]
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    })
    return product as Product | null
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return null
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: { category },
      orderBy: { createdAt: 'desc' },
    })
    return products as Product[]
  } catch (error) {
    console.error('Failed to fetch products by category:', error)
    return []
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    })
    return products as Product[]
  } catch (error) {
    console.error('Failed to fetch featured products:', error)
    return []
  }
}
