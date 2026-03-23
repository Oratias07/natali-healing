'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale'

const phases: { phase: Phase; duration: number; label: string; instruction: string }[] = [
  { phase: 'inhale', duration: 4, label: 'שאפי', instruction: 'שאפי לאט דרך האף...' },
  { phase: 'hold', duration: 7, label: 'החזיקי', instruction: 'החזיקי את האוויר...' },
  { phase: 'exhale', duration: 8, label: 'נשפי', instruction: 'נשפי לאט דרך הפה...' },
]

export default function BreathingWidget({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [count, setCount] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [started, setStarted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const phaseRef = useRef(0)

  const currentPhaseData = phases.find((p) => p.phase === phase)

  const runCycle = () => {
    let phaseIndex = 0
    phaseRef.current = phaseIndex

    const runPhase = (idx: number) => {
      if (idx >= phases.length) {
        setCycle((c) => c + 1)
        phaseIndex = 0
        idx = 0
      }
      const p = phases[idx]
      setPhase(p.phase)
      setCount(p.duration)

      let remaining = p.duration
      timerRef.current = setInterval(() => {
        remaining--
        setCount(remaining)
        if (remaining <= 0) {
          clearInterval(timerRef.current!)
          runPhase(idx + 1)
        }
      }, 1000)
    }

    runPhase(0)
  }

  const start = () => {
    setStarted(true)
    setCycle(0)
    runCycle()
  }

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase('idle')
    setStarted(false)
    setCount(0)
    setCycle(0)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) stop()
  }, [isOpen])

  const circleScale = phase === 'inhale' ? 1.4 : phase === 'hold' ? 1.4 : phase === 'exhale' ? 1 : 1
  const phaseDuration = currentPhaseData?.duration || 4

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(45,45,45,0.7)', backdropFilter: 'blur(12px)' }}
      role="dialog"
      aria-modal="true"
      aria-label="תרגיל נשימה 4-7-8"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-sm rounded-3xl p-8 text-center overflow-hidden"
        style={{ background: 'var(--cream)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 opacity-40 hover:opacity-80 text-2xl leading-none transition-opacity"
          aria-label="סגור תרגיל נשימה"
          style={{ color: 'var(--charcoal)' }}
        >
          ×
        </button>

        <h2 className="font-frank text-2xl font-bold mb-1" style={{ color: 'var(--charcoal)' }}>
          רגע של נשימה
        </h2>
        <p className="text-sm opacity-50 mb-8" style={{ color: 'var(--charcoal)' }}>
          טכניקת 4-7-8 לרגיעה עמוקה
        </p>

        {/* Breathing circle */}
        <div className="relative flex items-center justify-center mb-8" style={{ height: '200px' }}>
          {/* Outer ripple rings */}
          {started && phase !== 'idle' && (
            <>
              <motion.div
                className="absolute rounded-full border"
                style={{
                  borderColor: 'var(--sage)',
                  opacity: 0.2,
                }}
                animate={{
                  scale: [1, 1.8],
                  opacity: [0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                initial={{ width: 120, height: 120 }}
              />
              <motion.div
                className="absolute rounded-full border"
                style={{
                  borderColor: 'var(--rose)',
                  opacity: 0.15,
                }}
                animate={{
                  scale: [1, 2],
                  opacity: [0.25, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 0.5,
                }}
                initial={{ width: 120, height: 120 }}
              />
            </>
          )}

          {/* Main circle */}
          <motion.div
            className="rounded-full flex flex-col items-center justify-center relative z-10"
            style={{
              width: 130,
              height: 130,
              background: `radial-gradient(ellipse, var(--sage-light), var(--rose-light))`,
              border: '2px solid rgba(143,175,138,0.4)',
              willChange: 'transform',
            }}
            animate={{
              scale: circleScale,
              borderColor:
                phase === 'inhale'
                  ? 'rgba(143,175,138,0.7)'
                  : phase === 'hold'
                  ? 'rgba(200,169,110,0.7)'
                  : phase === 'exhale'
                  ? 'rgba(196,146,122,0.7)'
                  : 'rgba(143,175,138,0.3)',
            }}
            transition={{
              scale: {
                duration: phaseDuration,
                ease: phase === 'inhale' ? 'easeIn' : phase === 'exhale' ? 'easeOut' : 'linear',
              },
              borderColor: { duration: 0.5 },
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                {started && phase !== 'idle' ? (
                  <>
                    <p className="text-2xl font-bold font-frank" style={{ color: 'var(--charcoal)' }}>
                      {count}
                    </p>
                    <p className="text-xs font-medium" style={{ color: 'var(--sage)' }}>
                      {currentPhaseData?.label}
                    </p>
                  </>
                ) : (
                  <p className="text-3xl">🌿</p>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Instruction */}
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm mb-6 h-6"
            style={{ color: 'var(--charcoal)', opacity: 0.6 }}
          >
            {started ? currentPhaseData?.instruction : 'לחצי להתחיל את התרגיל'}
          </motion.p>
        </AnimatePresence>

        {/* Cycle counter */}
        {cycle > 0 && (
          <p className="text-xs mb-4 opacity-40" style={{ color: 'var(--charcoal)' }}>
            מחזור {cycle}
          </p>
        )}

        {/* Phase guide */}
        <div className="flex justify-center gap-4 mb-6 text-xs opacity-50" style={{ color: 'var(--charcoal)' }}>
          <span>שאפי 4s</span>
          <span>·</span>
          <span>החזיקי 7s</span>
          <span>·</span>
          <span>נשפי 8s</span>
        </div>

        {/* Buttons */}
        {!started ? (
          <button
            onClick={start}
            className="w-full py-4 rounded-full font-semibold text-white transition-all hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--sage), #6a9165)' }}
          >
            התחיל תרגיל נשימה
          </button>
        ) : (
          <button
            onClick={stop}
            className="w-full py-4 rounded-full font-semibold transition-all border-2"
            style={{
              borderColor: 'var(--rose)',
              color: 'var(--rose)',
            }}
          >
            עצור
          </button>
        )}
      </motion.div>
    </div>
  )
}

export function BreathingSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(143,175,138,0.08) 0%, rgba(196,146,122,0.06) 100%)',
      }}
      aria-label="תרגיל נשימה"
    >
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated ambient circle */}
          <div className="relative mx-auto mb-10" style={{ width: 160, height: 160 }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(143,175,138,0.3)',
                  animation: `breathe-circle ${4 + i}s ease-in-out ${i * 0.5}s infinite`,
                  willChange: 'transform, opacity',
                }}
              />
            ))}
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center text-4xl"
              style={{
                background: 'radial-gradient(ellipse, rgba(143,175,138,0.2), rgba(196,146,122,0.1))',
              }}
            >
              🌬️
            </div>
          </div>

          <h2 className="font-frank text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--charcoal)' }}>
            עצרי רגע. נשמי.
          </h2>
          <p className="text-lg opacity-70 mb-4" style={{ color: 'var(--charcoal)' }}>
            לפני שאת ממשיכה — רגע אחד של נשימה עמוקה.
          </p>
          <p className="text-base opacity-50 mb-10" style={{ color: 'var(--charcoal)' }}>
            טכניקת 4-7-8 מרגיעה את מערכת העצבים תוך 2 דקות.
          </p>
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all hover:shadow-xl hover:-translate-y-1"
            style={{ background: 'linear-gradient(135deg, var(--sage), #6a9165)' }}
            aria-label="פתח תרגיל נשימה"
          >
            <div
              className="w-5 h-5 rounded-full border-2 border-white"
              style={{ animation: 'breathe-circle 3s ease-in-out infinite' }}
              aria-hidden="true"
            />
            תרגיל נשימה 4-7-8
          </button>
        </motion.div>
      </div>
    </section>
  )
}
