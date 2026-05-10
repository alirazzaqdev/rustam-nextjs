'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Battery, Sun, Zap, Package } from 'lucide-react'

interface ProductImageProps {
  src?: string | null
  name: string
  brand: string
  category: string
  size?: 'card' | 'modal'
}

const brandGradients: Record<string, string> = {
  Osaka:   'from-blue-600 to-blue-800',
  Phoenix: 'from-red-600 to-red-800',
  AGS:     'from-emerald-600 to-emerald-800',
  Alaska:  'from-violet-600 to-violet-800',
  default: 'from-amber-500 to-orange-600',
}

function CategoryIcon({ category, size }: { category: string; size: 'card' | 'modal' }) {
  const cls = size === 'modal' ? 'w-16 h-16' : 'w-10 h-10'
  const className = `${cls} text-white opacity-15 absolute bottom-3 right-3`
  if (category === 'Battery') return <Battery className={className} aria-hidden />
  if (category === 'Solar Panel') return <Sun className={className} aria-hidden />
  if (category === 'Inverter') return <Zap className={className} aria-hidden />
  return <Package className={className} aria-hidden />
}

function getInitials(brand: string, name: string): string {
  if (brand && brand !== 'Various') return brand.slice(0, 2).toUpperCase()
  const words = name.trim().split(' ')
  return words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

export default function ProductImage({ src, name, brand, category, size = 'card' }: ProductImageProps) {
  const [imgError, setImgError] = useState(false)
  const gradient = brandGradients[brand] ?? brandGradients.default
  const initials = getInitials(brand, name)
  const isModal = size === 'modal'

  if (src && !imgError) {
    return (
      <div className={`relative w-full ${isModal ? 'h-64' : 'h-48'} overflow-hidden bg-gray-50`}>
        <Image
          src={src}
          alt={name}
          fill
          className="object-contain p-4"
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return (
    <div
      className={`relative w-full ${isModal ? 'h-64' : 'h-48'} bg-gradient-to-br ${gradient} flex flex-col items-center justify-center overflow-hidden`}
      aria-label={`${brand} ${name}`}
    >
      {/* Decorative circles */}
      <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/10" aria-hidden />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10" aria-hidden />

      {/* Initials */}
      <span className={`text-white font-black tracking-tight select-none z-10 ${isModal ? 'text-7xl' : 'text-5xl'}`}>
        {initials}
      </span>

      {/* Brand label */}
      <span className="text-white/60 font-semibold text-xs tracking-widest uppercase mt-2 z-10">
        {brand !== 'Various' ? brand : category}
      </span>

      <CategoryIcon category={category} size={size} />
    </div>
  )
}
