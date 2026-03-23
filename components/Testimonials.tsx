'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Story {
  avatar: string
  name: string
  age: string
  challenge: string
  transformation: string
  quote: string
  rating: number
  tag: string
  tagColor: string
}

const stories: Story[] = [
  {
    avatar: 'A',
    name: 'מיכל',
    age: '34',
    challenge: 'סבלתי מחרדות חברתיות שנים. לא יכולתי להיכנס לחדר מלא אנשים בלי לאבד את עצמי.',
    transformation: 'אחרי 6 מפגשי NLP אני ממש בן אדם אחר. הולכת לאירועים, מדברת, צוחקת. לא מאמינה שזו אני.',
    quote: 'נטלי ראתה אותי — לא רק את הבעיה. זה שינה הכל.',
    rating: 5,
    tag: 'טיפול רגשי NLP',
    tagColor: 'rgba(143,175,138,0.2)',
  },
  {
    avatar: 'B',
    name: 'שירה',
    age: '41',
    challenge: 'עייפות כרונית, כאבים, תחושה שהגוף שלי נגדי. ניסיתי כל דיאטה אפשרית.',
    transformation: 'התחלתי ליווי תזונתי טבעי עם נטלי. תוך חודשיים — אנרגיה, שינה, בריאות. הגוף שלי נרגע.',
    quote: 'סוף סוף הבנתי מה הגוף שלי צריך. זה לא דיאטה — זה אורח חיים.',
    rating: 5,
    tag: 'ליווי תזונתי',
    tagColor: 'rgba(200,169,110,0.2)',
  },
  {
    avatar: 'C',
    name: 'רחל',
    age: '29',
    challenge: 'בת שלי בת 8 לא ישנה לבד, פחדים, בכי כל ערב. לא ידעתי מה לעשות.',
    transformation: '4 מפגשים עם נטלי ובתי ישנה לבד, שמחה, ביטחון עצמי חדש. ההורה שלי בכתה מאושר.',
    quote: 'נטלי הגיעה לבת שלי דרך משחק ואהבה. קסם.',
    rating: 5,
    tag: 'ליווי לילדים',
    tagColor: 'rgba(196,146,122,0.2)',
  },
  {
    avatar: 'D',
    name: 'דנה',
    age: '38',
    challenge: 'שנים של אמונה שאני לא מספיקה טובה. בכל תחום — עבודה, קשרים, אמהות.',
    transformation: 'תטא הילינג עם נטלי פתח לי דלתות שלא ידעתי שקיימות. היום אני בוחרת אחרת.',
    quote: 'היא לא שינתה אותי — היא עזרה לי לזכור מי אני באמת.',
    rating: 5,
    tag: 'תטא הילינג',
    tagColor: 'rgba(143,175,138,0.15)',
  },
  {
    avatar: 'E',
    name: 'לימור',
    age: '45',
    challenge: 'שנים של סטרס מטורף בעבודה. לא ישנתי, לא נשמתי, הייתי רובוט.',
    transformation: 'סשן אקסס בארס אחד — יצאתי אחרת לגמרי. הרגשתי כמו שהורידו ממני 10 שנים.',
    quote: 'לא ידעתי שנשימה כזו אפשרית. תודה נטלי.',
    rating: 5,
    tag: 'אקסס בארס',
    tagColor: 'rgba(200,169,110,0.15)',
  },
]

function AvatarSVG({ letter, color }: { letter: string; color: string }) {
  const colors: Record<string, { bg: string; face: string }> = {
    A: { bg: '#cddacb', face: '#537450' },
    B: { bg: '#f2d4c6', face: '#a05c44' },
    C: { bg: '#f9f0da', face: '#9e7530' },
    D: { bg: '#e6ede5', face: '#435d41' },
    E: { bg: '#f9ebe4', face: '#864a38' },
  }
  const c = colors[letter] || colors.A

  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="36" cy="36" r="36" fill={c.bg} />
      <ellipse cx="36" cy="28" rx="14" ry="16" fill={c.face} opacity="0.7" />
      <ellipse cx="36" cy="60" rx="22" ry="18" fill={c.face} opacity="0.4" />
    </svg>
  )
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`דירוג: ${count} כוכבים מתוך 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: 'var(--gold)' }}>★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollTo = (i: number) => {
    if (!scrollRef.current) return
    const card = scrollRef.current.children[i] as HTMLElement
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    setActiveIndex(i)
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 overflow-hidden"
      style={{ background: 'var(--cream)' }}
      aria-label="סיפורי שינוי"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-sm tracking-widest uppercase font-medium" style={{ color: 'var(--rose)' }}>
            עדויות
          </span>
          <h2 className="font-frank text-4xl md:text-5xl font-bold mt-3 mb-3" style={{ color: 'var(--charcoal)' }}>
            סיפורי שינוי
          </h2>
          <p className="text-base opacity-60" style={{ color: 'var(--charcoal)' }}>
            נשים אמיתיות. שינוי אמיתי.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 carousel-container snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          role="list"
        >
          {stories.map((story, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="carousel-item flex-shrink-0 rounded-3xl p-6 snap-start"
              style={{
                width: 'min(320px, 85vw)',
                background: story.tagColor,
                border: '1px solid rgba(0,0,0,0.05)',
              }}
              role="listitem"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <AvatarSVG letter={story.avatar} color={story.tagColor} />
                <div>
                  <p className="font-frank font-bold text-lg" style={{ color: 'var(--charcoal)' }}>
                    {story.name}, {story.age}
                  </p>
                  <div
                    className="text-xs px-3 py-1 rounded-full inline-block mt-1"
                    style={{ background: 'rgba(255,255,255,0.7)', color: 'var(--charcoal)', opacity: 0.8 }}
                  >
                    {story.tag}
                  </div>
                </div>
              </div>

              <Stars count={story.rating} />

              {/* Before */}
              <div className="mt-4 mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-50" style={{ color: 'var(--charcoal)' }}>
                  לפני
                </p>
                <p className="text-sm leading-relaxed opacity-70" style={{ color: 'var(--charcoal)' }}>
                  {story.challenge}
                </p>
              </div>

              {/* After */}
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--sage)' }}>
                  אחרי
                </p>
                <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--charcoal)' }}>
                  {story.transformation}
                </p>
              </div>

              {/* Quote */}
              <blockquote
                className="text-sm italic font-medium pt-4"
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                  color: 'var(--charcoal)',
                  opacity: 0.75,
                }}
              >
                &ldquo;{story.quote}&rdquo;
              </blockquote>
            </motion.article>
          ))}
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="ניווט בין עדויות">
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`עדות ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIndex === i ? 24 : 8,
                height: 8,
                background: activeIndex === i ? 'var(--sage)' : 'rgba(143,175,138,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
