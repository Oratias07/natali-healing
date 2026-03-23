'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface StatItem {
  prefix: string
  value: number
  suffix: string
  label: string
  icon: string
}

const stats: StatItem[] = [
  { prefix: '+', value: 200, suffix: '', label: 'נשים שינו את חייהן', icon: '🌸' },
  { prefix: '', value: 8, suffix: '+', label: 'שנות ניסיון', icon: '✨' },
  { prefix: '', value: 6, suffix: '', label: 'שיטות טיפול משולבות', icon: '🌿' },
  { prefix: '', value: 98, suffix: '%', label: 'מרגישות שינוי תוך 3 מפגשים', icon: '💛' },
]

function Counter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={ref}>{count}</span>
}

export default function TrustBar() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--sage) 0%, #6a9165 50%, #537450 100%)',
      }}
      aria-label="נתוני אמון"
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 31px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center text-white"
            >
              <div className="text-3xl mb-2" aria-hidden="true">
                {stat.icon}
              </div>
              <div
                className="font-frank text-4xl md:text-5xl font-bold mb-2"
                aria-label={`${stat.prefix}${stat.value}${stat.suffix} ${stat.label}`}
              >
                {stat.prefix}
                <Counter target={stat.value} duration={1800 + i * 200} />
                {stat.suffix}
              </div>
              <p className="text-sm md:text-base opacity-90 font-light leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{ height: '40px' }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,40 C300,0 900,40 1200,10 L1200,40 Z" fill="var(--cream)" />
        </svg>
      </div>
    </section>
  )
}
