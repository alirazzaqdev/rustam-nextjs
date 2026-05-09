'use server'

import { prisma } from '@/lib/prisma'
import type { Service } from '@/types'

export async function getServices(): Promise<Service[]> {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return services as Service[]
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return []
  }
}

export async function getFeaturedServices(): Promise<Service[]> {
  try {
    const services = await prisma.service.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
    })
    return services as Service[]
  } catch (error) {
    console.error('Failed to fetch featured services:', error)
    return []
  }
}
