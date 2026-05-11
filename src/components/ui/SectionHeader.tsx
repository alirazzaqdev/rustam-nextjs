import type { ReactNode } from 'react'

interface SectionHeaderProps {
  label: string
  title: string
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center'
  return (
    <div className={`${isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'} ${className}`}>
      <div className={`inline-flex items-center gap-3 mb-4 ${isCenter ? '' : ''}`}>
        <span className="h-px w-6 bg-emerald-500 inline-block" />
        <p className="text-emerald-600 text-xs font-bold tracking-[0.18em] uppercase">
          {label}
        </p>
        <span className="h-px w-6 bg-emerald-500 inline-block" />
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-gray-500 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
