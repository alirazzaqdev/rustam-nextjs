'use client'
import { useEffect, useRef } from 'react'

interface ChargeEffectProps {
  trigger: boolean
  x: number
  y: number
  onComplete: () => void
}

interface ZBolt {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  angle: number
  life: number
  color: string
}

const COLORS = ['#34D399', '#6EE7B7', '#ffffff', '#A7F3D0', '#059669'] as const

function drawZBolt(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  angle: number,
  alpha: number,
  color: string
) {
  ctx.save()
  ctx.globalAlpha  = alpha
  ctx.strokeStyle  = color
  ctx.lineWidth    = size * 0.18
  ctx.shadowBlur   = 14
  ctx.shadowColor  = color
  ctx.lineCap      = 'round'
  ctx.lineJoin     = 'round'

  ctx.translate(cx, cy)
  ctx.rotate(angle)

  const h = size
  const w = size * 0.7

  ctx.beginPath()
  ctx.moveTo(-w / 2, -h / 2) // top-left
  ctx.lineTo( w / 2, -h / 2) // top-right
  ctx.lineTo(-w / 2,  h / 2) // bottom-left
  ctx.lineTo( w / 2,  h / 2) // bottom-right
  ctx.stroke()

  ctx.restore()
}

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

    const bolts: ZBolt[] = Array.from({ length: 10 }, () => {
      const dir = Math.random() * Math.PI * 2
      const spd = Math.random() * 4 + 2
      return {
        x,
        y,
        vx:    Math.cos(dir) * spd,
        vy:    Math.sin(dir) * spd,
        size:  Math.random() * 22 + 14,
        angle: Math.random() * Math.PI * 2,
        life:  1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let alive = false

      for (const bolt of bolts) {
        if (bolt.life <= 0) continue
        alive = true

        bolt.x     += bolt.vx
        bolt.y     += bolt.vy
        bolt.angle += 0.08
        bolt.life  -= 0.038

        drawZBolt(ctx, bolt.x, bolt.y, bolt.size, bolt.angle, Math.max(0, bolt.life), bolt.color)
      }

      // Big center Z flash during first ~40% of animation
      const firstLife = bolts[0]?.life ?? 0
      if (firstLife > 0.6) {
        const flash = (firstLife - 0.6) / 0.4
        drawZBolt(ctx, x, y, 48, 0, flash,          '#ffffff')
        drawZBolt(ctx, x, y, 36, 0, flash * 0.7,    '#34D399')
      }

      if (alive) {
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
