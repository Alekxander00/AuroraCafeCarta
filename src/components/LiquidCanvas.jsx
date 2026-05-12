import { useEffect, useRef } from 'react'

const FLOAT_COLOR = 'rgba(197, 151, 89, 0.28)'
const SHADOW_COLOR = 'rgba(12, 26, 20, 0.22)'

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: 0,
    vy: 0,
    size: 6 + Math.random() * 12,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.02,
  }
}

function wrapParticle(particle, width, height) {
  if (particle.x < -40) particle.x = width + 40
  if (particle.x > width + 40) particle.x = -40
  if (particle.y < -40) particle.y = height + 40
  if (particle.y > height + 40) particle.y = -40
}

function drawBean(ctx, particle) {
  ctx.save()
  ctx.translate(particle.x, particle.y)
  ctx.rotate(particle.rotation)

  ctx.fillStyle = FLOAT_COLOR
  ctx.beginPath()
  ctx.ellipse(0, 0, particle.size * 1.28, particle.size, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = SHADOW_COLOR
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.moveTo(0, -particle.size * 0.72)
  ctx.quadraticCurveTo(-particle.size * 0.38, 0, 0, particle.size * 0.72)
  ctx.stroke()

  ctx.restore()
}

export function LiquidCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return undefined
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0
    let width = 0
    let height = 0
    let particles = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight

      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const density = Math.max(18, Math.round((width * height) / 52000))
      particles = Array.from({ length: density }, () => createParticle(width, height))
    }

    const drawBackdrop = (time) => {
      const gradient = context.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, '#07100c')
      gradient.addColorStop(0.45, '#10241b')
      gradient.addColorStop(1, '#1f1a12')

      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      for (let index = 0; index < 5; index += 1) {
        const waveX = width * (0.16 + index * 0.19) + Math.sin(time * 0.00014 + index) * 44
        const waveY = height * (0.22 + (index % 3) * 0.24)
        const radius = Math.max(width, height) * (0.18 + index * 0.03)
        const glow = context.createRadialGradient(waveX, waveY, 0, waveX, waveY, radius)
        glow.addColorStop(0, 'rgba(216, 192, 153, 0.1)')
        glow.addColorStop(0.45, 'rgba(197, 151, 89, 0.08)')
        glow.addColorStop(1, 'rgba(12, 26, 20, 0)')
        context.fillStyle = glow
        context.beginPath()
        context.arc(waveX, waveY, radius, 0, Math.PI * 2)
        context.fill()
      }
    }

    const render = (time) => {
      drawBackdrop(time)

      particles.forEach((particle, index) => {
        const angle =
          Math.sin((particle.x + time * 0.028) * 0.0034) +
          Math.cos((particle.y - time * 0.02) * 0.0042) +
          Math.sin((index + 1) * 0.7)

        particle.vx += Math.cos(angle * Math.PI) * 0.018
        particle.vy += Math.sin(angle * Math.PI) * 0.018

        particle.vx *= 0.985
        particle.vy *= 0.985
        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.spin

        wrapParticle(particle, width, height)
        drawBean(context, particle)
      })

      animationFrame = window.requestAnimationFrame(render)
    }

    resize()

    if (reducedMotion) {
      drawBackdrop(0)
      particles.forEach((particle) => drawBean(context, particle))
    } else {
      animationFrame = window.requestAnimationFrame(render)
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="liquid-canvas" aria-hidden="true" />
}

