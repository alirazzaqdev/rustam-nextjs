'use client'
import { useEffect, useRef } from 'react'

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
}

interface SparkEffectProps {
  trigger: boolean
  x: number
  y: number
  onComplete: () => void
}

const COLORS = ['#6EE7B7', '#34D399', '#059669', '#ffffff', '#A7F3D0']

export default function SparkEffect({ trigger, x, y, onComplete }: SparkEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number>(0)
  const sparksRef = useRef<Spark[]>([])

  useEffect(() => {
    if (!trigger) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    sparksRef.current = Array.from({ length: 18 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 6 + 2
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: Math.random() * 3 + 1,
      }
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparksRef.current = sparksRef.current.filter((s) => s.life > 0)

      for (const spark of sparksRef.current) {
        spark.x  += spark.vx
        spark.y  += spark.vy
        spark.vy += 0.15
        spark.vx *= 0.97
        spark.life -= 0.035

        const color = COLORS[Math.floor(Math.random() * COLORS.length)]

        ctx.save()
        ctx.globalAlpha  = spark.life
        ctx.fillStyle    = color
        ctx.shadowBlur   = 6
        ctx.shadowColor  = '#059669'
        ctx.beginPath()
        ctx.arc(spark.x, spark.y, spark.size * spark.life, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = color
        ctx.lineWidth   = 1
        ctx.beginPath()
        ctx.moveTo(spark.x, spark.y)
        ctx.lineTo(spark.x - spark.vx * 3, spark.y - spark.vy * 3)
        ctx.stroke()
        ctx.restore()
      }

      if (sparksRef.current.length > 0) {
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
