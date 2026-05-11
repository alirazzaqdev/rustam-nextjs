'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, TrendingDown, Calendar, Zap } from 'lucide-react'

const STATS = [
  { target: 19, suffix: '+', label: 'Years of expertise',  icon: Calendar, bg: 'bg-emerald-50', color: 'text-emerald-600', border: 'border-emerald-100' },
  { target: 500, suffix: '+', label: 'Happy customers',    icon: Users,    bg: 'bg-emerald-50', color: 'text-emerald-600', border: 'border-emerald-100' },
  { target: 70, suffix: '%',  label: 'Avg. bill reduction',icon: TrendingDown, bg: 'bg-sky-50', color: 'text-sky-600',     border: 'border-sky-100'     },
  { target: 5,  suffix: 'kW', label: 'Avg. system size',   icon: Zap,      bg: 'bg-amber-50',  color: 'text-amber-600',   border: 'border-amber-100'   },
]

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [counts, setCounts]   = useState(STATS.map(s => s.target))
  const [fired, setFired]     = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired) return
        setFired(true)
        obs.disconnect()

        const targets = STATS.map(s => s.target)
        const duration = 1400
        const startTime = performance.now()

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCounts(targets.map(t => Math.round(eased * t)))
          if (progress < 1) requestAnimationFrame(tick)
        }

        setCounts(STATS.map(() => 0))
        requestAnimationFrame(tick)
      },
      { threshold: 0.35 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [fired])

  return (
    <section ref={sectionRef} className="bg-white py-14 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={20} className={stat.color} strokeWidth={2.25} />
                </div>

                <p
                  suppressHydrationWarning
                  className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight tabular-nums leading-none"
                >
                  {counts[i]}{stat.suffix}
                </p>

                <p className="text-sm text-gray-500 mt-2.5 font-medium">{stat.label}</p>

                <div className={`mt-3 h-0.5 w-8 ${stat.bg} rounded-full`} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
