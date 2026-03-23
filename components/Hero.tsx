'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero({ onOpenQuiz, onOpenBreathing }: { onOpenQuiz: () => void; onOpenBreathing: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Parallax movement for the whole block
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  // Logo: moves toward top-right corner (where Nav logo lives), then fades as Nav logo appears
  const logoX = useTransform(scrollYProgress, (v) => {
    if (typeof window === 'undefined') return 0
    return Math.min(v / 0.45, 1) * window.innerWidth * 0.41
  })
  const logoY = useTransform(scrollYProgress, (v) => {
    if (typeof window === 'undefined') return 0
    return Math.min(v / 0.45, 1) * window.innerHeight * -0.34
  })
  const logoScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.16])
  const logoOpacity = useTransform(scrollYProgress, [0.28, 0.48], [1, 0])

  // Image: fades out early and shrinks slightly
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85])

  // Rest of the content (eyebrow, H1, CTAs): fades slightly later
  const contentOpacity = useTransform(scrollYProgress, [0.05, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden organic-bg"
      aria-label="כותרת ראשית"
    >
      {/* Morphing blob backgrounds — hidden on small screens for perf */}
      <div
        className="absolute hidden sm:block opacity-20 pointer-events-none"
        style={{
          width: 'min(600px, 80vw)',
          height: 'min(600px, 80vw)',
          background: 'radial-gradient(ellipse, var(--sage) 0%, transparent 70%)',
          top: '-10%',
          right: '-10%',
          animation: 'morph 12s ease-in-out infinite',
          willChange: 'transform, border-radius',
        }}
      />
      <div
        className="absolute opacity-15 pointer-events-none"
        style={{
          width: 'min(400px, 60vw)',
          height: 'min(400px, 60vw)',
          background: 'radial-gradient(ellipse, var(--rose) 0%, transparent 70%)',
          bottom: '-5%',
          left: '-5%',
          animation: 'morph 10s ease-in-out infinite reverse',
          willChange: 'transform, border-radius',
        }}
      />
      <div
        className="absolute hidden sm:block opacity-10 pointer-events-none"
        style={{
          width: 'min(400px, 50vw)',
          height: 'min(400px, 50vw)',
          background: 'radial-gradient(ellipse, var(--gold) 0%, transparent 70%)',
          top: '40%',
          left: '30%',
          animation: 'morph 14s ease-in-out infinite 3s',
          willChange: 'transform, border-radius',
        }}
      />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Main content */}
      <motion.div
        style={{ y }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20 sm:pt-0"
      >
        {/* ─── LOGO — גדול ומרכזי, נע לפינה הימנית העליונה בגלילה ─── */}
        <motion.div
          style={{ scale: logoScale, opacity: logoOpacity, x: logoX, y: logoY }}
          className="mb-2 sm:mb-5"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="font-frank font-bold tracking-wide block"
            style={{
              color: 'var(--sage)',
              fontSize: 'clamp(3.5rem, 15vw, 10rem)',
              lineHeight: 1,
            }}
          >
            נטלי
          </span>
          <span
            className="block font-light tracking-[0.3em] sm:tracking-[0.35em] mt-1 sm:mt-2"
            style={{ color: 'var(--rose)', fontSize: 'clamp(0.7rem, 1.8vw, 1.1rem)' }}
          >
            גוף · נפש · תודעה
          </span>
        </motion.div>

        {/* ─── תמונה — נעלמת בגלילה ─── */}
        <motion.div
          style={{ opacity: imageOpacity, scale: imageScale }}
          className="flex justify-center mb-4 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative overflow-hidden shadow-2xl"
            style={{
              width: 'clamp(130px, 35vw, 260px)',
              height: 'clamp(130px, 35vw, 260px)',
              borderRadius: '50%',
              border: '3px solid rgba(143,175,138,0.45)',
              boxShadow: '0 20px 60px rgba(143,175,138,0.25), 0 0 0 6px rgba(255,255,255,0.5)',
            }}
          >
            <Image
              src="/Nataly_smile_picture.jpeg"
              alt="נטלי — מטפלת הוליסטית"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 640px) 35vw, 260px"
            />
          </div>
        </motion.div>

        {/* ─── שאר תוכן הגיבור ─── */}
        <motion.div style={{ opacity: contentOpacity }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-7"
          >
            <span className="h-px w-8 sm:w-12 opacity-40" style={{ background: 'var(--gold)' }} />
            <span
              className="font-medium tracking-wider sm:tracking-widest uppercase"
              style={{ color: 'var(--rose)', fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)' }}
            >
              ריפוי הוליסטי · עפולה ואונליין
            </span>
            <span className="h-px w-8 sm:w-12 opacity-40" style={{ background: 'var(--gold)' }} />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-frank font-bold leading-tight mb-3 sm:mb-5"
            style={{ color: 'var(--charcoal)', fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
          >
            המרחב שלך
            <br />
            <span className="gradient-text">לריפוי עמוק</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="font-light mb-2 sm:mb-3 px-2 sm:px-0"
            style={{
              color: 'var(--charcoal)',
              opacity: 0.7,
              fontSize: 'clamp(0.8rem, 2.2vw, 1.1rem)',
              lineHeight: 1.6,
            }}
          >
            NLP · תטא הילינג · אקסס בארס
            <span className="hidden sm:inline"> · ליווי תזונתי · ריפוי רגשי לנשים וילדים</span>
            <span className="sm:hidden block text-xs mt-0.5" style={{ opacity: 0.6 }}>
              ליווי תזונתי · ריפוי רגשי לנשים וילדים
            </span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-5 sm:mt-8 mb-5 sm:mb-10"
          >
            <button
              onClick={onOpenQuiz}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--sage), #6a9165)',
                color: 'white',
                minWidth: '0',
                maxWidth: '320px',
              }}
              aria-label="פתחי את השאלון לגילוי הטיפול המתאים"
            >
              <span className="relative z-10">✨ גלי איזה טיפול מתאים לך</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #6a9165, #537450)' }}
              />
            </button>

            <a
              href="#booking"
              className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
              style={{
                borderColor: 'var(--rose)',
                color: 'var(--rose)',
                minWidth: '0',
                maxWidth: '320px',
              }}
              aria-label="קבעי שיחת היכרות חינם"
            >
              שיחת היכרות חינם 🤍
            </a>
          </motion.div>

          {/* Breathing shortcut */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={onOpenBreathing}
            className="flex items-center gap-2 mx-auto text-xs sm:text-sm opacity-60 hover:opacity-90 transition-opacity"
            style={{ color: 'var(--charcoal)' }}
            aria-label="פתחי תרגיל נשימה"
          >
            <div
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border"
              style={{
                borderColor: 'var(--sage)',
                animation: 'breathe-circle 4s ease-in-out infinite',
              }}
            />
            <span>רגע של נשימה</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs opacity-40 tracking-widest hidden sm:block" style={{ color: 'var(--charcoal)' }}>
          גלול למטה
        </span>
        <div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
          style={{ borderColor: 'rgba(143,175,138,0.5)' }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{
              background: 'var(--sage)',
              animation: 'scroll-bounce 2s ease-in-out infinite',
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
