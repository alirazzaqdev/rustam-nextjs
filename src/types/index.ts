export type Product = {
  id: string
  name: string
  slug: string
  description: string
  category: string
  price: number
  image: string
  specs: Record<string, any>
  warranty?: string
  featured: boolean
  inStock: boolean
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
