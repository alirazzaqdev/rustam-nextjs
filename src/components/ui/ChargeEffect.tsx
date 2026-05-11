'use client'
import { useEffect, useRef } from 'react'

interface ChargeEffectProps {
  trigger: boolean
  x: number
  y: number
  onComplete: () => void
}

interface Particle {
  x: number
  y: number
  vy: number
  vx: number
  life: number
  size: number
  color: string
}

const PARTICLE_COLORS = ['#34D399', '#6EE7B7', '#059669', '#A7F3D0'] as const

const RINGS = [
  { delay: 0,  color: '#34D399', maxR: 80 },
  { delay: 8,  color: '#6EE7B7', maxR: 60 },
  { delay: 16, color: '#A7F3D0', maxR: 45 },
] as const

export default function ChargeEffect({ trigger, x, y, onComplete }: ChargeEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number>(0)

  useEffect(() => {
    if (!trigger) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    let frame = 0
    const maxFrames = 55

    const particles: Particle[] = Array.from({ length: 14 }, () => ({
      x: x + (Math.random() - 0.5) * 30,
      y: y + Math.random() * 10,
      vy: -(Math.random() * 3 + 1.5),
      vx: (Math.random() - 0.5) * 1.5,
      life: 1,
      size: Math.random() * 4 + 2,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }))

    const boltPoints: [number, number][] = [
      [x + 4, y - 10],
      [x - 2, y - 1],
      [x + 3, y - 1],
      [x - 4, y + 10],
    ]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      // Expanding rings
      for (const ring of RINGS) {
        const f = frame - ring.delay
        if (f < 0) continue
        const progress = f / (maxFrames - ring.delay)
        if (progress > 1) continue

        ctx.save()
        ctx.globalAlpha  = (1 - progress) * 0.7
        ctx.strokeStyle  = ring.color
        ctx.lineWidth    = 2.5
        ctx.shadowBlur   = 8
        ctx.shadowColor  = ring.color
        ctx.beginPath()
        ctx.arc(x, y, ring.maxR * progress, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      // Rising particles
      for (const p of particles) {
        if (p.life <= 0) continue
        p.y    += p.vy
        p.x    += p.vx
        p.vy   *= 0.98
        p.life -= 0.025

        ctx.save()
        ctx.globalAlpha = p.life
        ctx.fillStyle   = p.color
        ctx.shadowBlur  = 10
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // Lightning bolt flash (first 12 frames)
      if (frame < 12) {
        ctx.save()
        ctx.globalAlpha  = (12 - frame) / 12
        ctx.strokeStyle  = '#ffffff'
        ctx.lineWidth    = 2
        ctx.shadowBlur   = 12
        ctx.shadowColor  = '#34D399'
        ctx.beginPath()
        boltPoints.forEach(([bx, by], i) =>
          i === 0 ? ctx.moveTo(bx, by) : ctx.lineTo(bx, by)
        )
        ctx.stroke()
        ctx.restore()
      }

      if (frame < maxFrames) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        onComplete()
      }
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [trigger, x, y, onComplete])

  if (!trigger) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}
