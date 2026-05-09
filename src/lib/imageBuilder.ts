import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from 'sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const builder = imageUrlBuilder({
  projectId,
  dataset,
})

export function imageBuilder(source: SanityImageSource) {
  return builder.image(source)
}

export function imageUrl(source: SanityImageSource) {
  return builder.image(source).url()
}
