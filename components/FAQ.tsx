'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const faqs = [
  {
    q: 'כמה מפגשים אני צריכה?',
    a: 'זה תלוי לגמרי בך ובמה שאת מביאה איתך. לחלק מהנשים 3-5 מפגשים מספיקים לשינוי משמעותי. אחרות בוחרות בתהליך ארוך יותר. בפגישת ההיכרות הראשונה (חינם!) אנחנו מבינות יחד מה מתאים לך.',
  },
  {
    q: 'האם אפשר להתחיל טיפול עבור ילד?',
    a: 'בהחלט! הטיפול לילדים מותאם לגיל ולצורך — דרך משחק, שיחה, ועבודה קוגניטיבית-התנהגותית. ההורים משתתפים באופן אקטיבי בתהליך. ילדים מגיל 5 ומעלה מתאימים לליווי.',
  },
  {
    q: 'מה ההבדל בין NLP לתטא הילינג?',
    a: 'NLP (תכנות נוירו-לשוני) עובד בעיקר על דפוסי חשיבה, תקשורת ועיבוד חוויות — תוך שיחה ודמיון מודרך. תטא הילינג עובדת בגלי מוח תטא ועוסקת בשינוי אמונות בלתי מודעות ברמה עמוקה יותר. לעיתים אני משלבת את שניהם.',
  },
  {
    q: 'יש אפשרות לטיפולים אונליין?',
    a: 'כן! כל הטיפולים (מלבד אקסס בארס שדורש מגע פיזי) זמינים בזום. רבות מהמטופלות שלי מגיעות מכל הארץ. הפגישה מתקיימת מהנוחות של הבית שלך.',
  },
  {
    q: 'כמה עולה מפגש?',
    a: 'המחיר משתנה לפי סוג הטיפול ואורך המפגש. שיחת ההיכרות הראשונה בחינם לגמרי. לאחר מכן נבנה ביחד תוכנית שמתאימה לך — גם מבחינת תוכן וגם מבחינה כלכלית. אני מאמינה שריפוי צריך להיות נגיש.',
  },
  {
    q: 'האם אקסס בארס כואב?',
    a: 'בכלל לא! זה מגע קל מאוד — קצות האצבעות נוגעות בעדינות ב-32 נקודות על הראש. רוב האנשים נרדמים במהלך הסשן. זה מרגיש כמו מדיטציה עמוקה.',
  },
  {
    q: 'כמה זמן עד שארגיש שינוי?',
    a: '98% מהמטופלות שלי מרגישות שינוי כבר תוך 3 מפגשים ראשונים. חלקן מרגישות הבדל כבר ביציאה מהמפגש הראשון. שינוי עמוק לוקח זמן — אבל אתות ראשוניים מגיעים מהר.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="faq"
      ref={ref}
      className="py-16 md:py-24"
      style={{ background: 'var(--cream)' }}
      aria-label="שאלות נפוצות"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-sm tracking-widest uppercase font-medium" style={{ color: 'var(--rose)' }}>
            שאלות נפוצות
          </span>
          <h2
            className="font-frank text-3xl md:text-5xl font-bold mt-3"
            style={{ color: 'var(--charcoal)' }}
          >
            יש לך שאלות?
          </h2>
        </motion.div>

        <div className="space-y-3" role="list">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden"
              style={{
                border: `1px solid ${openIndex === i ? 'rgba(143,175,138,0.5)' : 'rgba(0,0,0,0.07)'}`,
                background: openIndex === i ? 'rgba(143,175,138,0.05)' : 'white',
                transition: 'all 0.3s ease',
              }}
              role="listitem"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-right"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span
                  className="font-frank font-semibold text-base leading-snug"
                  style={{ color: 'var(--charcoal)' }}
                >
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-light text-xl"
                  style={{
                    background: openIndex === i ? 'var(--sage)' : 'rgba(143,175,138,0.15)',
                    color: openIndex === i ? 'white' : 'var(--sage)',
                  }}
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-5 pb-5 text-sm leading-relaxed"
                      style={{ color: 'var(--charcoal)', opacity: 0.75 }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-sm opacity-60 mb-4" style={{ color: 'var(--charcoal)' }}>
            לא מצאת תשובה? כתבי לי ישירות 🌿
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_NATALI_WHATSAPP || '972000000000'}?text=${encodeURIComponent('היי נטלי, יש לי שאלה...')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white transition-all hover:shadow-md"
            style={{ background: '#25D366' }}
            aria-label="פתחי שיחת וואטסאפ עם נטלי"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            שאלי אותי בוואטסאפ
          </a>
        </motion.div>
      </div>
    </section>
  )
}
