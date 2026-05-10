'use server'

import { products } from '@/data/products'
import type { Product } from '@/types'

export async function getProducts(): Promise<Product[]> {
  return products
}

export async function getProductById(id: string): Promise<Product | null> {
  return products.find((p) => p.id === id) ?? null
}

export async function getProductsByCategory(category: Product['category']): Promise<Product[]> {
  return products.filter((p) => p.category === category)
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
  return products.filter((p) => p.brand === brand)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.featured).slice(0, 6)
}
