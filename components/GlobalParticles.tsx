'use client'

import { useState, useEffect } from 'react'

interface Particle {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  color: string
}

export default function GlobalParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = ['#8FAF8A', '#C4927A', '#C8A96E', '#cddacb', '#f2d4c6']
    const count = window.innerWidth < 640 ? 10 : 18
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 2 + 1.5,
        duration: Math.random() * 18 + 14,
        delay: -(Math.random() * 30),
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    )
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: 0,
            width: p.size,
            height: p.size,
            background: p.color,
            animation: `particle-fall ${p.duration}s linear ${p.delay}s infinite`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}
