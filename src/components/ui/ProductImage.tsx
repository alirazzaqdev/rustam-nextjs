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
  Osaka:   'from-slate-100 to-slate-200',
  Phoenix: 'from-slate-100 to-slate-200',
  AGS:     'from-slate-100 to-slate-200',
  Alaska:  'from-slate-100 to-slate-200',
  Knox:    'from-slate-100 to-slate-200',
  default: 'from-slate-100 to-slate-200',
}

function CategoryIcon({ category, size }: { category: string; size: 'card' | 'modal' }) {
  const cls = size === 'modal' ? 'w-14 h-14' : 'w-8 h-8'
  const className = `${cls} text-emerald-300 opacity-40 absolute bottom-3 right-3`
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
      <div className={`relative w-full ${isModal ? 'h-64' : 'h-40'} overflow-hidden bg-gray-50`}>
        <Image
          src={src}
          alt={name}
          fill
          className="object-contain p-4"
          onError={() => setImgError(true)}
          sizes={isModal
            ? '(max-width: 768px) 100vw, 40vw'
            : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'}
        />
      </div>
    )
  }

  return (
    <div
      className={`relative w-full ${isModal ? 'h-64' : 'h-40'} bg-gradient-to-br ${gradient} flex flex-col items-center justify-center overflow-hidden`}
      aria-label={`${brand} ${name}`}
    >
      <span className={`font-black tracking-tight select-none z-10 ${isModal ? 'text-6xl' : 'text-4xl'} text-emerald-600`}>
        {initials}
      </span>
      <span className="text-emerald-500 font-bold text-xs tracking-widest uppercase mt-1 z-10">
        {brand !== 'Various' ? brand : category}
      </span>
      <CategoryIcon category={category} size={size} />
    </div>
  )
}
