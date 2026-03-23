'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'שם חובה'),
  phone: z.string().min(9, 'מספר טלפון לא תקין'),
})

type FormData = z.infer<typeof schema>

export default function LeadMagnet() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, topic: 'מדריך חינם — 5 כלים לחרדה', type: 'lead_magnet' }),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(200,169,110,0.1) 0%, rgba(196,146,122,0.08) 100%)',
      }}
      aria-label="מדריך חינם"
    >
      {/* Decorative blob */}
      <div
        className="absolute pointer-events-none opacity-20"
        style={{
          width: 400, height: 400,
          background: 'radial-gradient(ellipse, var(--gold), transparent 70%)',
          top: '-20%', left: '-10%',
          animation: 'morph 12s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative"
            aria-hidden="true"
          >
            {/* PDF mockup */}
            <div className="relative mx-auto" style={{ maxWidth: 280 }}>
              {/* Shadow pages */}
              <div
                className="absolute rounded-2xl"
                style={{
                  inset: 0,
                  background: 'white',
                  transform: 'rotate(3deg) translate(8px, 8px)',
                  opacity: 0.5,
                }}
              />
              <div
                className="absolute rounded-2xl"
                style={{
                  inset: 0,
                  background: 'white',
                  transform: 'rotate(-2deg) translate(-5px, 5px)',
                  opacity: 0.4,
                }}
              />
              {/* Main PDF card */}
              <div
                className="relative rounded-2xl p-8 shadow-xl"
                style={{
                  background: 'linear-gradient(145deg, #fff 0%, #faf7f2 100%)',
                  border: '1px solid rgba(200,169,110,0.3)',
                }}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">🌿</div>
                  <div
                    className="text-xs tracking-widest uppercase mb-3 font-medium"
                    style={{ color: 'var(--gold)' }}
                  >
                    מדריך חינם
                  </div>
                  <h3
                    className="font-frank text-xl font-bold leading-tight mb-4"
                    style={{ color: 'var(--charcoal)' }}
                  >
                    5 כלים לשחרור חרדה ביומיום
                  </h3>
                  <div className="space-y-2 text-right">
                    {[
                      '🌬️ נשימה מווסתת',
                      '🧠 שינוי מחשבות',
                      '🌊 קרקוע מיידי',
                      '✍️ כתיבה שחררת',
                      '🤍 חמלה עצמית',
                    ].map((tool, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm py-2 px-3 rounded-xl"
                        style={{ background: 'rgba(143,175,138,0.08)', color: 'var(--charcoal)' }}
                      >
                        <span>{tool}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-4 text-xs font-medium"
                    style={{ color: 'var(--rose)' }}
                  >
                    מאת נטלי — מטפלת הוליסטית
                  </div>
                </div>
              </div>

              {/* WhatsApp badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-2 shadow-lg flex items-center gap-2"
                style={{ background: '#25D366' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="text-white text-xs font-medium">נשלח לוואטסאפ</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <span className="text-sm tracking-widest uppercase font-medium" style={{ color: 'var(--rose)' }}>
              בחינם לגמרי
            </span>
            <h2
              className="font-frank text-3xl md:text-4xl font-bold mt-3 mb-4"
              style={{ color: 'var(--charcoal)' }}
            >
              קבלי את המדריך שלי
            </h2>
            <p className="text-base leading-relaxed mb-8 opacity-70" style={{ color: 'var(--charcoal)' }}>
              5 כלים מעשיים לשחרור חרדה שאת יכולה להשתמש בהם כבר היום — ישירות לוואטסאפ שלך.
            </p>

            {status === 'success' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center p-8 rounded-2xl"
                style={{ background: 'rgba(143,175,138,0.15)', border: '1px solid rgba(143,175,138,0.3)' }}
              >
                <div className="text-4xl mb-3">🌿</div>
                <p className="font-frank text-xl font-bold mb-2" style={{ color: 'var(--charcoal)' }}>
                  המדריך בדרך אלייך!
                </p>
                <p className="text-sm opacity-70" style={{ color: 'var(--charcoal)' }}>
                  בדקי את הוואטסאפ שלך — נשלח עכשיו.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div>
                  <label htmlFor="lm-name" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--charcoal)' }}>
                    שם *
                  </label>
                  <input
                    id="lm-name"
                    type="text"
                    placeholder="השם שלך"
                    {...register('name')}
                    className="w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none"
                    style={{
                      borderColor: errors.name ? 'var(--rose)' : 'rgba(143,175,138,0.35)',
                      background: 'white',
                      color: 'var(--charcoal)',
                    }}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'lm-name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="lm-name-error" className="text-xs mt-1" style={{ color: 'var(--rose)' }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lm-phone" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--charcoal)' }}>
                    מספר טלפון (לשליחה בוואטסאפ) *
                  </label>
                  <input
                    id="lm-phone"
                    type="tel"
                    placeholder="050-0000000"
                    {...register('phone')}
                    className="w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ltr-text"
                    style={{
                      borderColor: errors.phone ? 'var(--rose)' : 'rgba(143,175,138,0.35)',
                      background: 'white',
                      color: 'var(--charcoal)',
                      textAlign: 'right',
                    }}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'lm-phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="lm-phone-error" className="text-xs mt-1" style={{ color: 'var(--rose)' }}>
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, var(--gold), #b8903f)' }}
                  aria-busy={status === 'loading'}
                >
                  {status === 'loading' ? 'שולחת...' : 'שלחי לי את המדריך בוואטסאפ 🌿'}
                </button>

                {status === 'error' && (
                  <p className="text-xs text-center" style={{ color: 'var(--rose)' }}>
                    שגיאה בשליחה. אנא נסי שוב או פנה ישירות בוואטסאפ.
                  </p>
                )}

                <p className="text-xs text-center opacity-40" style={{ color: 'var(--charcoal)' }}>
                  ללא ספאם. הפרטים שמורים בצנעה.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
