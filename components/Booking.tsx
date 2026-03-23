'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WHATSAPP = process.env.NEXT_PUBLIC_NATALI_WHATSAPP || '972000000000'

export default function Booking() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="booking"
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(143,175,138,0.08) 0%, rgba(196,146,122,0.06) 100%)',
      }}
      aria-label="קביעת פגישה"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-sm tracking-widest uppercase font-medium" style={{ color: 'var(--rose)' }}>
            קביעת פגישה
          </span>
          <h2
            className="font-frank text-4xl md:text-5xl font-bold mt-3 mb-4"
            style={{ color: 'var(--charcoal)' }}
          >
            בואי נתחיל את המסע
          </h2>
          <p className="text-base opacity-60 max-w-lg mx-auto" style={{ color: 'var(--charcoal)' }}>
            שיחת היכרות ראשונה של 15 דקות — בחינם לגמרי. בואי נראה אם זה מתאים לך.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {/* Free intro — WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-3xl p-8"
            style={{
              background: 'linear-gradient(135deg, var(--sage), #6a9165)',
              color: 'white',
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl" aria-hidden="true">🌿</span>
              <div>
                <p className="font-frank text-2xl font-bold">שיחת היכרות חינם</p>
                <p className="text-sm opacity-80">15 דקות · ללא התחייבות</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed mb-6">
              נדבר, נבין מה את צריכה, ונראה יחד איזה מסע מתאים לך. ללא לחץ, ללא עלות.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('היי נטלי 🌿 אני רוצה לקבוע שיחת היכרות חינם!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 text-sm font-semibold transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{ color: 'var(--sage)' }}
              aria-label="קבעי שיחת היכרות חינם בוואטסאפ"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              קבעי עכשיו בוואטסאפ
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* What to expect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-3xl p-6"
              style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)' }}
            >
              <h3
                className="font-frank text-lg font-bold mb-4"
                style={{ color: 'var(--charcoal)' }}
              >
                מה קורה בשיחת ההיכרות?
              </h3>
              <ul className="space-y-3">
                {[
                  ['🗣️', 'נדבר על מה שמביאה אותך'],
                  ['🔍', 'נבין יחד מה את צריכה'],
                  ['🗺️', 'נמפה את הדרך הנכונה עבורך'],
                  ['💛', 'תחליטי בלי שום לחץ'],
                ].map(([icon, text], i) => (
                  <li key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--charcoal)', opacity: 0.75 }}>
                    <span className="text-base" aria-hidden="true">{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Location info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="rounded-3xl p-6 flex flex-col justify-center gap-4"
              style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.25)' }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl" aria-hidden="true">📍</span>
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--charcoal)' }}>
                    עפולה | כל הארץ אונליין
                  </p>
                  <p className="text-xs opacity-60" style={{ color: 'var(--charcoal)' }}>
                    א׳–ה׳ 9:00–20:00 · ו׳ 9:00–14:00
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl" aria-hidden="true">📅</span>
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--charcoal)' }}>
                    זמינות שוטפת
                  </p>
                  <p className="text-xs opacity-60" style={{ color: 'var(--charcoal)' }}>
                    א׳ · ב׳ · ד׳ · ה׳ · ו׳ · אונליין
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
