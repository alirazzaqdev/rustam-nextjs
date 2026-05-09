import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// Helper to fetch data from Sanity
export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string
  params?: Record<string, unknown>
}): Promise<T> {
  try {
    return await client.fetch<T>(query, params)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return {} as T
  }
}

// Image URL helper
import { imageBuilder } from './imageBuilder'
export { imageBuilder }
