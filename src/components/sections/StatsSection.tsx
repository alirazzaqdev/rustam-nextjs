'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { target: 19,  suffix: '+',  micro: 'SINCE 2006',  label: 'Years of expertise'   },
  { target: 500, suffix: '+',  micro: 'CLIENTS',      label: 'Happy customers'       },
  { target: 80,  suffix: '+',  micro: 'PRODUCTS',     label: 'Models in stock'       },
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
    <section ref={sectionRef} className="relative bg-slate-950 overflow-hidden">

      {/* Ambient amber glow — centered */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(217,119,6,0.09) 0%, transparent 70%)' }}
        aria-hidden
      />

      {/* Top + bottom 1px border accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" aria-hidden />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">

        {/* Section eyebrow */}
        <div className="flex items-center justify-center mb-12">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-amber-600/50" />
          <p className="mx-4 text-[10px] font-black tracking-[0.28em] text-amber-500 uppercase">
            By The Numbers
          </p>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-amber-600/50" />
        </div>

        {/* Stats grid — amber-tinted gap lines with outer glow shadow */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(217,119,6,0.12)',
            boxShadow: '0 0 0 1px rgba(217,119,6,0.14), 0 8px 48px rgba(0,0,0,0.55), 0 2px 12px rgba(217,119,6,0.08)',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center text-center px-6 py-12 lg:py-14 bg-slate-950 hover:bg-[#0f172b] transition-colors duration-300"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
            >
              {/* Amber micro-label */}
              <p className="text-[9px] font-black tracking-[0.28em] text-amber-500/80 uppercase mb-5">
                {stat.micro}
              </p>

              {/* Animated number */}
              <p
                suppressHydrationWarning
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight tabular-nums leading-none"
              >
                {counts[i]}
                <span className="text-amber-400">{stat.suffix}</span>
              </p>

              {/* Expanding amber accent line */}
              <div className="w-6 h-0.5 bg-amber-500/60 rounded-full mt-5 mb-4 group-hover:w-10 group-hover:bg-amber-400 transition-all duration-500" />

              {/* Label */}
              <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
