'use server'

import { prisma } from '@/lib/prisma'
import type { FAQ } from '@/types'

export async function getFAQs(): Promise<FAQ[]> {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { order: 'asc' },
    })
    return faqs as FAQ[]
  } catch (error) {
    console.error('Failed to fetch FAQs:', error)
    return []
  }
}

export async function getFAQsByCategory(category: string): Promise<FAQ[]> {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { category },
      orderBy: { order: 'asc' },
    })
    return faqs as FAQ[]
  } catch (error) {
    console.error('Failed to fetch FAQs by category:', error)
    return []
  }
}
