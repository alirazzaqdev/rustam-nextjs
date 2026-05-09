'use server'

import { prisma } from '@/lib/prisma'
import type { Testimonial } from '@/types'

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return testimonials as Testimonial[]
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)
    return []
  }
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    })
    return testimonials as Testimonial[]
  } catch (error) {
    console.error('Failed to fetch featured testimonials:', error)
    return []
  }
}
