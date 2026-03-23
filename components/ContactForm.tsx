'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'שם חובה'),
  phone: z.string().min(9, 'מספר טלפון לא תקין'),
  topic: z.string().min(1, 'יש לבחור נושא'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const topics = [
  'טיפול רגשי פרטני (NLP)',
  'ליווי תזונתי ואורח חיים',
  'טיפול אינטגרטיבי משולב',
  'אקסס בארס',
  'תטא הילינג',
  'ליווי לילדים ובני נוער',
  'פגישות אונליין',
  'שאלה כללית',
]

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'contact' }),
      })
      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none focus:ring-2`

  const inputStyle = (hasError: boolean) => ({
    borderColor: hasError ? 'var(--rose)' : 'rgba(143,175,138,0.35)',
    background: 'white',
    color: 'var(--charcoal)',
    focusRingColor: 'var(--sage)',
  })

  return (
    <section
      id="contact"
      ref={ref}
      className="py-16 md:py-24"
      style={{ background: 'linear-gradient(180deg, rgba(143,175,138,0.06) 0%, var(--cream) 100%)' }}
      aria-label="טופס יצירת קשר"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-sm tracking-widest uppercase font-medium" style={{ color: 'var(--rose)' }}>
            צרי קשר
          </span>
          <h2
            className="font-frank text-3xl md:text-5xl font-bold mt-3 mb-4"
            style={{ color: 'var(--charcoal)' }}
          >
            כתבי לי
          </h2>
          <p className="text-base opacity-60" style={{ color: 'var(--charcoal)' }}>
            אחזור אלייך תוך 24 שעות — לרוב הרבה יותר מהר 🌿
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 space-y-5"
          >
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(143,175,138,0.1)', border: '1px solid rgba(143,175,138,0.2)' }}
            >
              <p className="font-frank text-lg font-bold mb-1" style={{ color: 'var(--charcoal)' }}>
                נטלי
              </p>
              <p className="text-sm opacity-70 leading-relaxed" style={{ color: 'var(--charcoal)' }}>
                מטפלת הוליסטית · NLP מסטר
                <br />
                עפולה, ישראל
              </p>
            </div>

            {[
              {
                icon: '📱',
                label: 'וואטסאפ',
                value: 'שלחי הודעה',
                href: `https://wa.me/${process.env.NEXT_PUBLIC_NATALI_WHATSAPP || '972000000000'}?text=${encodeURIComponent('היי נטלי 🌿')}`,
              },
              {
                icon: '📍',
                label: 'מיקום',
                value: 'עפולה + אונליין',
                href: null,
              },
              {
                icon: '🕐',
                label: 'שעות פעילות',
                value: 'א׳–ה׳ 9:00–20:00',
                href: null,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-2xl p-4"
                style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <div>
                  <p className="text-xs opacity-50 mb-0.5" style={{ color: 'var(--charcoal)' }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium"
                      style={{ color: 'var(--sage)' }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Philosophy quote */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(200,169,110,0.1), rgba(196,146,122,0.08))',
                border: '1px solid rgba(200,169,110,0.25)',
              }}
            >
              <p className="text-sm italic leading-relaxed" style={{ color: 'var(--charcoal)', opacity: 0.8 }}>
                &ldquo;אני לא המרפאה — אני מראה את הדרך ונותנת את הכלים.&rdquo;
              </p>
              <p className="text-xs mt-2 font-medium" style={{ color: 'var(--gold)' }}>
                — נטלי
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:col-span-3"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center p-12 rounded-3xl"
                style={{ background: 'rgba(143,175,138,0.12)', border: '1px solid rgba(143,175,138,0.3)' }}
              >
                <div className="text-5xl mb-4">🌿</div>
                <p className="font-frank text-2xl font-bold mb-2" style={{ color: 'var(--charcoal)' }}>
                  ההודעה נשלחה!
                </p>
                <p className="opacity-70 text-sm" style={{ color: 'var(--charcoal)' }}>
                  קיבלתי את פנייתך ואחזור אלייך בקרוב.
                  <br />
                  בינתיים — נשמי עמוק 🤍
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm opacity-50 hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--charcoal)' }}
                >
                  שלחי הודעה נוספת
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="rounded-3xl p-6 sm:p-8 space-y-5"
                style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}
                aria-label="טופס פנייה"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cf-name" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--charcoal)' }}>
                      שם *
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      placeholder="השם שלך"
                      {...register('name')}
                      className={inputClass(!!errors.name)}
                      style={inputStyle(!!errors.name)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'cf-name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="cf-name-error" className="text-xs mt-1" style={{ color: 'var(--rose)' }}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cf-phone" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--charcoal)' }}>
                      טלפון *
                    </label>
                    <input
                      id="cf-phone"
                      type="tel"
                      placeholder="050-0000000"
                      {...register('phone')}
                      className={inputClass(!!errors.phone)}
                      style={{ ...inputStyle(!!errors.phone), textAlign: 'right' }}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'cf-phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="cf-phone-error" className="text-xs mt-1" style={{ color: 'var(--rose)' }}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="cf-topic" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--charcoal)' }}>
                    נושא הפנייה *
                  </label>
                  <select
                    id="cf-topic"
                    {...register('topic')}
                    className={inputClass(!!errors.topic)}
                    style={inputStyle(!!errors.topic)}
                    aria-invalid={!!errors.topic}
                    aria-describedby={errors.topic ? 'cf-topic-error' : undefined}
                    defaultValue=""
                  >
                    <option value="" disabled>בחרי נושא...</option>
                    {topics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.topic && (
                    <p id="cf-topic-error" className="text-xs mt-1" style={{ color: 'var(--rose)' }}>
                      {errors.topic.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="cf-message" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--charcoal)' }}>
                    הודעה (אופציונלי)
                  </label>
                  <textarea
                    id="cf-message"
                    rows={4}
                    placeholder="ספרי לי קצת על עצמך ועל מה שמביא אותך..."
                    {...register('message')}
                    className={inputClass(false)}
                    style={{ ...inputStyle(false), resize: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, var(--sage), #6a9165)' }}
                  aria-busy={status === 'loading'}
                >
                  {status === 'loading' ? '⏳ שולחת...' : 'שלחי הודעה 🌿'}
                </button>

                {status === 'error' && (
                  <p className="text-xs text-center" style={{ color: 'var(--rose)' }}>
                    שגיאה. נסי שוב או פנה ישירות בוואטסאפ.
                  </p>
                )}

                <p className="text-xs text-center opacity-40" style={{ color: 'var(--charcoal)' }}>
                  הפרטים שלך מוגנים ולא יועברו לגורם שלישי
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
