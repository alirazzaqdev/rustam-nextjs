'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { target: 19,  suffix: '+',  micro: 'SINCE 2006',  label: 'Years of expertise'   },
  { target: 500, suffix: '+',  micro: 'CLIENTS',      label: 'Happy customers'       },
  { target: 70,  suffix: '%',  micro: 'SAVINGS',      label: 'Avg. bill reduction'   },
  { target: 5,   suffix: 'kW', micro: 'CAPACITY',     label: 'Avg. system size'      },
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
        const duration = 1500
        const startTime = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setCounts(targets.map(t => Math.round(eased * t)))
          if (p < 1) requestAnimationFrame(tick)
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
    <section ref={sectionRef} className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-gray-100">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center px-8 py-14"
            >
              {/* Amber micro-label — replaces icon */}
              <p className="text-[10px] font-black tracking-[0.22em] text-amber-600 uppercase mb-5">
                {stat.micro}
              </p>

              {/* Giant number */}
              <p
                suppressHydrationWarning
                className="text-6xl md:text-7xl font-black text-slate-900 tracking-tight tabular-nums leading-none"
              >
                {counts[i]}{stat.suffix}
              </p>

              {/* Thin amber accent line */}
              <div className="w-8 h-0.5 bg-amber-400 rounded-full my-4" />

              {/* Description */}
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
