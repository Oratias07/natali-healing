'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const reasons = [
    'משלבת גוף, נפש ותודעה — לא רק רגש, לא רק תזונה, לא רק אנרגיה — אלא כל התמונה השלמה.',
    'מתאימה את התהליך באופן אישי — אם מישהי רוצה תהליך רגשי נלך לשם, אם צריכה תהליך תזונתי נעבוד בזה.',
    'התמחות מיוחדת בליווי רגשי לילדים — דרך משחק, העצמה וגישה קוגניטיבית-התנהגותית.',
    'עברתי בעצמי תהליכים ובאה עם הלב פתוח — המסע שלי לא התחיל מלימודים אלא מהחיים עצמם.',
    'יוצרת חיבור עמוק — רגשי ואנרגטי. הטיפול שלי לא טכני — אני יוצרת מרחב אנושי, מרפא ובטוח.',
    'מובילה תהליך שורשי — לא פלסטר. המטרה היא לרפא, לשחרר דפוסים ולבנות חוסן נפשי לאורך זמן.',
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--cream)' }}
      aria-label="אודות נטלי"
    >
      {/* Decorative background */}
      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, var(--rose) 0%, transparent 70%)',
          transform: 'translate(-30%, -30%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="text-sm tracking-widest uppercase font-medium"
            style={{ color: 'var(--rose)' }}
          >
            אודות
          </span>
          <h2
            className="font-frank text-4xl md:text-5xl font-bold mt-3"
            style={{ color: 'var(--charcoal)' }}
          >
            מי אני
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo placeholder (right in RTL = visual left) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 md:order-2"
            aria-hidden="true"
          >
            {/* Morphing photo frame */}
            <div className="relative mx-auto" style={{ maxWidth: '420px' }}>
              <div
                className="w-full aspect-square rounded-3xl overflow-hidden relative"
                style={{
                  animation: 'morph 10s ease-in-out infinite',
                }}
              >
                <Image
                  src="/natali-photo.jpeg"
                  alt="נטלי — מטפלת הוליסטית, NLP מסטר"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 90vw, 420px"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3 shadow-lg"
              >
                <p className="text-xs font-semibold" style={{ color: 'var(--charcoal)' }}>
                  NLP מסטר
                </p>
                <p className="text-xs opacity-60" style={{ color: 'var(--charcoal)' }}>
                  מאמנת ומטפלת הוליסטית
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-4 -left-4 glass rounded-2xl px-4 py-3 shadow-lg"
              >
                <p className="text-2xl">🌿</p>
                <p className="text-xs font-semibold mt-1" style={{ color: 'var(--sage)' }}>
                  +8 שנות ניסיון
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1"
          >
            <div
              className="rounded-2xl p-1 mb-8 inline-block"
              style={{ background: 'linear-gradient(135deg, var(--sage), var(--gold))' }}
            >
              <div className="bg-cream rounded-xl px-4 py-2">
                <p className="text-sm font-medium gradient-text">היי, נעים להכיר 👋</p>
              </div>
            </div>

            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: 'var(--charcoal)', opacity: 0.85 }}
            >
              שמי נטלי, אנלפיסטתית בדרגת מסטר, מלווה ומאמנת לריפוי רגשי עמוק, טיפול בחרדות, מיקוד מטרות, העצמה ומדריכה לאורח חיים בבריאות טבעית, בנוסף מלווה סשאנים בתטא הילינג ובאקסס בארס, הכל במטרה להחזיר את החוסן הנפשי, המיקוד ושמחת החיים שלך.
            </p>

            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: 'var(--charcoal)', opacity: 0.85 }}
            >
              הטיפולים משולבים מהעולם המנטאלי והרוחני – הכל בראייה הוליסטית משולבת של האדם – גוף, נפש ותודעה. הטיפול שלי משלב מגוון שיטות טיפול מוכחות כמו NLP, CBT, דימיון מודרך, תטא הילינג, אקסס בארס, לצד ליווי לאורח חיים מבוסס בריאות טבעית, טיפולי מים, תנועה, נשימה ומדיטציה.
            </p>

            <p
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: 'var(--charcoal)', opacity: 0.85 }}
            >
              אני מאמינה שריפוי אמיתי ושינוי משמעותי נוצרים כשאנחנו רואים את כל המכלול שלך — גוף נפש ותודעה. אני מלווה נשים וילדים באווירה מקצועית, חמה ומכילה, מתוך הקשבה אמיתית והתאמה אישית מלאה לצרכים שלך.
            </p>

            {/* Why choose me */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(143, 175, 138, 0.08)', border: '1px solid rgba(143,175,138,0.2)' }}
            >
              <h3
                className="font-frank text-xl font-bold mb-4"
                style={{ color: 'var(--charcoal)' }}
              >
                למה לבחור בי?
              </h3>
              <ul className="space-y-3">
                {reasons.map((reason, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color: 'var(--charcoal)', opacity: 0.8 }}
                  >
                    <span className="text-base mt-0.5 shrink-0" style={{ color: 'var(--gold)' }}>
                      ✦
                    </span>
                    {reason}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
