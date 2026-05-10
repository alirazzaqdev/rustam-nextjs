export type ProductCategory = 'Battery' | 'Solar Panel' | 'Inverter' | 'Accessory'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  brand: string
  price: number
  specs: Record<string, string>
  description: string
  inStock: boolean
  featured: boolean
  image?: string | null
}

export type Service = {
  id: string
  name: string
  slug: string
  description: string
  icon?: string
  featured: boolean
}

export type Testimonial = {
  id: string
  name: string
  company?: string
  title?: string
  content: string
  rating: number
  image?: string
  featured: boolean
}

export type QuoteRequest = {
  id: string
  name: string
  email: string
  phone: string
  projectType: string
  estimatedBudget?: number
  description?: string
  status: string
}

export type FAQ = {
  id: string
  question: string
  answer: string
  category?: string
  order?: number
}
