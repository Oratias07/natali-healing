'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP = process.env.NEXT_PUBLIC_NATALI_WHATSAPP || '972000000000'

interface Question {
  id: number
  text: string
  options: { label: string; value: string; scores: Record<string, number> }[]
}

const questions: Question[] = [
  {
    id: 1,
    text: 'מה מרגיש הכי בוער עבורך כרגע?',
    options: [
      { label: 'חרדה, פחד, או טראומה שאני נושאת', value: 'a', scores: { nlp: 3, integrative: 1 } },
      { label: 'עייפות, חוסר אנרגיה, ובריאות לקויה', value: 'b', scores: { nutrition: 3, integrative: 1 } },
      { label: 'תחושה שאני תקועה בחיים', value: 'c', scores: { theta: 2, integrative: 2 } },
      { label: 'הילד/ה שלי זקוק לעזרה', value: 'd', scores: { children: 4 } },
    ],
  },
  {
    id: 2,
    text: 'איך את מעדיפה לעבוד?',
    options: [
      { label: 'שיחה ממוקדת, לחפור לשורש', value: 'a', scores: { nlp: 2, theta: 1 } },
      { label: 'גוף פיזי — תזונה, תנועה, בריאות', value: 'b', scores: { nutrition: 3 } },
      { label: 'אנרגטית ועדינה — מגע, שחרור שקט', value: 'c', scores: { bars: 3 } },
      { label: 'שילוב של הכל יחד', value: 'd', scores: { integrative: 4 } },
    ],
  },
  {
    id: 3,
    text: 'מה הכי מתאר את מצבך?',
    options: [
      { label: 'חרדה חברתית, קשיי ריכוז, דימוי עצמי נמוך', value: 'a', scores: { nlp: 2, children: 1 } },
      { label: 'כאב, עייפות כרונית, מחלה', value: 'b', scores: { nutrition: 2, integrative: 2 } },
      { label: 'מחשבות שלא מרפות, אמונות שמגבילות', value: 'c', scores: { theta: 3, nlp: 1 } },
      { label: 'סטרס ועומס רגשי שצריך לשחרר', value: 'd', scores: { bars: 3, integrative: 1 } },
    ],
  },
  {
    id: 4,
    text: 'כמה זמן ואנרגיה את מוכנה להשקיע?',
    options: [
      { label: 'תהליך ארוך ועמוק — אני מוכנה לשינוי אמיתי', value: 'a', scores: { integrative: 3, theta: 1 } },
      { label: 'כמה מפגשים ממוקדים', value: 'b', scores: { nlp: 2, bars: 1 } },
      { label: 'סשן אחד לחוויה ולשחרור', value: 'c', scores: { bars: 3 } },
      { label: 'תלוי מה יוצא — גמישה', value: 'd', scores: { integrative: 2, nlp: 1 } },
    ],
  },
  {
    id: 5,
    text: 'מה חשוב לך בטיפול?',
    options: [
      { label: 'תוצאות מדויקות ומדידות', value: 'a', scores: { nlp: 2, nutrition: 1 } },
      { label: 'תחושת שחרור ורוגע עמוק', value: 'b', scores: { bars: 2, theta: 1 } },
      { label: 'שינוי באמונות ובתפיסת העולם', value: 'c', scores: { theta: 3 } },
      { label: 'שיפור הבריאות הפיזית לצד הרגשית', value: 'd', scores: { nutrition: 2, integrative: 2 } },
    ],
  },
]

interface ResultType {
  key: string
  title: string
  description: string
  emoji: string
  waMessage: string
}

const results: Record<string, ResultType> = {
  nlp: {
    key: 'nlp',
    title: 'טיפול רגשי פרטני (NLP)',
    description: 'את מחפשת שינוי רגשי ממוקד ועמוק. טיפול NLP עם שילוב CBT ודמיון מודרך יתן לך את הכלים לשחרר דפוסים ישנים ולבנות חוסן נפשי אמיתי.',
    emoji: '🧠',
    waMessage: 'היי נטלי 🌿 מילאתי את השאלון ויצא לי טיפול רגשי פרטני NLP — אני רוצה לשמוע עוד!',
  },
  nutrition: {
    key: 'nutrition',
    title: 'ליווי תזונתי ואורח חיים בריא',
    description: 'הגוף שלך שולח איתות — הגיע הזמן להקשיב לו. ליווי תזונתי מותאם אישית יעזור לך להחזיר אנרגיה, לאזן את הגוף ולחיות בריאה ומלאת חיים.',
    emoji: '🥗',
    waMessage: 'היי נטלי 🌿 מילאתי את השאלון ויצא לי ליווי תזונתי — אני רוצה לשמוע עוד!',
  },
  integrative: {
    key: 'integrative',
    title: 'טיפול אינטגרטיבי משולב',
    description: 'את מוכנה לשינוי עמוק ומקיף — גוף, נפש ותודעה יחד. תהליך אינטגרטיבי הוא בדיוק בשבילך: כולל NLP, תזונה, נשימה, תנועה וריפוי רגשי.',
    emoji: '🌀',
    waMessage: 'היי נטלי 🌿 מילאתי את השאלון ויצא לי טיפול אינטגרטיבי משולב — אני רוצה לשמוע עוד!',
  },
  bars: {
    key: 'bars',
    title: 'סשן אקסס בארס',
    description: 'הגוף שלך צורח לשחרור. סשן אקסס בארס הוא מגע עדין, שקט ועמוק שישחרר מטענים שנאגרו, יחזיר רוגע ובהירות — לפעמים סשן אחד משנה הכל.',
    emoji: '⚡',
    waMessage: 'היי נטלי 🌿 מילאתי את השאלון ויצא לי אקסס בארס — אני רוצה לשמוע עוד!',
  },
  theta: {
    key: 'theta',
    title: 'תטא הילינג',
    description: 'יש בך אמונות עמוקות שמגבילות אותך — ואת יודעת את זה. תטא הילינג יאפשר לך לזהות ולשנות אמונות בלתי מודעות ולפתוח לחיים חדשים.',
    emoji: '🌙',
    waMessage: 'היי נטלי 🌿 מילאתי את השאלון ויצא לי תטא הילינג — אני רוצה לשמוע עוד!',
  },
  children: {
    key: 'children',
    title: 'ליווי אישי לילדים',
    description: 'ילדך זקוק לתמיכה מקצועית ועדינה. הליווי לילדים משלב משחק, כלים להעצמה ו-CBT כדי לחזק את הביטחון, להפחית חרדה ולבנות חוסן רגשי.',
    emoji: '👦',
    waMessage: 'היי נטלי 🌿 מילאתי את השאלון בשביל ילד/י ויצא ליווי לילדים — אני רוצה לשמוע עוד!',
  },
}

function computeResult(answers: Record<number, string>): string {
  const scores: Record<string, number> = { nlp: 0, nutrition: 0, integrative: 0, bars: 0, theta: 0, children: 0 }
  questions.forEach((q) => {
    const answer = answers[q.id]
    if (!answer) return
    const option = q.options.find((o) => o.value === answer)
    if (!option) return
    Object.entries(option.scores).forEach(([key, val]) => {
      scores[key] = (scores[key] || 0) + val
    })
  })
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
}

export default function Quiz({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0) // 0 = intro
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<ResultType | null>(null)

  const currentQuestion = questions[step - 1]

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [step]: value }
    setAnswers(newAnswers)
    if (step < questions.length) {
      setStep(step + 1)
    } else {
      const key = computeResult(newAnswers)
      setResult(results[key] || results.integrative)
      setStep(questions.length + 1)
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
      role="dialog"
      aria-modal="true"
      aria-label="שאלון לגילוי הטיפול המתאים"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: 'var(--cream)', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div
          className="p-6 pb-4 sticky top-0 z-10"
          style={{
            background: 'linear-gradient(135deg, var(--sage), #6a9165)',
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-white opacity-70 hover:opacity-100 text-2xl leading-none"
            aria-label="סגור שאלון"
          >
            ×
          </button>
          <h2 className="font-frank text-2xl font-bold text-white text-center">
            ✨ גלי איזה טיפול מתאים לך
          </h2>
          {step > 0 && step <= questions.length && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-white opacity-70 mb-1">
                <span>שאלה {step} מתוך {questions.length}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white bg-opacity-30">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${(step / questions.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Intro */}
            {step === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">🌿</div>
                <p className="text-base leading-relaxed mb-8 opacity-80" style={{ color: 'var(--charcoal)' }}>
                  5 שאלות קצרות שיעזרו לנו להבין איזה מסע ריפוי מתאים בדיוק לך — ולהתאים לך את הדרך הנכונה.
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-4 rounded-full font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, var(--sage), #6a9165)' }}
                >
                  בואי נתחיל ✨
                </button>
              </motion.div>
            )}

            {/* Question */}
            {step > 0 && step <= questions.length && currentQuestion && (
              <motion.div
                key={`q${step}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
              >
                <h3
                  className="font-frank text-xl font-bold mb-6 leading-relaxed"
                  style={{ color: 'var(--charcoal)' }}
                >
                  {currentQuestion.text}
                </h3>
                <div className="space-y-3">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className="w-full text-right p-4 rounded-2xl border-2 text-sm leading-relaxed transition-all hover:shadow-md hover:-translate-y-0.5"
                      style={{
                        borderColor: 'rgba(143,175,138,0.3)',
                        background: 'rgba(143,175,138,0.05)',
                        color: 'var(--charcoal)',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="mt-4 text-xs opacity-50 hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--charcoal)' }}
                  >
                    ← חזרה
                  </button>
                )}
              </motion.div>
            )}

            {/* Result */}
            {result && step > questions.length && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="text-6xl mb-4"
                >
                  {result.emoji}
                </motion.div>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                  style={{ background: 'rgba(143,175,138,0.15)', color: 'var(--sage)' }}
                >
                  הטיפול המומלץ עבורך
                </div>
                <h3
                  className="font-frank text-2xl font-bold mb-4"
                  style={{ color: 'var(--charcoal)' }}
                >
                  {result.title}
                </h3>
                <p className="text-sm leading-relaxed mb-8 opacity-75" style={{ color: 'var(--charcoal)' }}>
                  {result.description}
                </p>
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(result.waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-semibold text-white transition-all hover:shadow-lg"
                    style={{ background: '#25D366' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    שלחי הודעה לנטלי
                  </a>
                  <button
                    onClick={reset}
                    className="w-full py-3 rounded-full text-sm opacity-50 hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--charcoal)' }}
                  >
                    עשי את השאלון מחדש
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
