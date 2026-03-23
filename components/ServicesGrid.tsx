'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WHATSAPP = process.env.NEXT_PUBLIC_NATALI_WHATSAPP || '972000000000'

interface Service {
  icon: string
  title: string
  subtitle: string
  tagline: string
  description: string
  helps: string[]
  forWho: string
  duration: string
  price: string
  waMessage: string
  color: string
  accentColor: string
}

const services: Service[] = [
  {
    icon: '🧠',
    title: 'טיפול רגשי פרטני',
    subtitle: 'NLP · CBT · דמיון מודרך',
    tagline: 'שחרור עמוק, שינוי אמיתי',
    description:
      'טיפול רגשי אישי וממוקד בשיטת NLP, בשילוב כלים מקצועיים מעולם ה-CBT, דמיון מודרך ומדיטציה. מתאים לעיבוד חרדות, פחדים, טראומות, חיזוק הביטחון העצמי ויצירת חוסן נפשי משמעותי.',
    helps: ['חרדה ופחדים', 'טראומות ועיבוד רגשי', 'חיזוק ביטחון עצמי', 'חוסן נפשי'],
    forWho: 'נשים המחפשות שינוי רגשי עמוק',
    duration: '60–90 דקות',
    price: 'לפי הצורך',
    waMessage: 'היי נטלי 🌿 אני מעוניינת בטיפול רגשי פרטני NLP',
    color: 'rgba(143, 175, 138, 0.12)',
    accentColor: 'var(--sage)',
  },
  {
    icon: '🥗',
    title: 'ליווי תזונתי',
    subtitle: 'בריאות טבעית · אורח חיים',
    tagline: 'אנרגיה, בריאות, שמחת חיים',
    description:
      'תוכנית תזונה מותאמת אישית על בסיס בריאות טבעית, הממוקדת ביצירת אנרגיה גבוהה, חיזוק המערכת החיסונית, איזון מחלות כרוניות ושיפור איכות החיים.',
    helps: ['עלייה ברמת האנרגיה', 'חיזוק מערכת חיסונית', 'איזון מחלות כרוניות', 'שיפור איכות חיים'],
    forWho: 'מי שרוצה לחיות בריאה ומלאת חיים',
    duration: '60 דקות',
    price: 'לפי הצורך',
    waMessage: 'היי נטלי 🌿 אני מעוניינת בליווי תזונתי ואורח חיים בריא',
    color: 'rgba(200, 169, 110, 0.12)',
    accentColor: 'var(--gold)',
  },
  {
    icon: '🌀',
    title: 'טיפול אינטגרטיבי',
    subtitle: 'גוף · נפש · תודעה',
    tagline: 'שינוי עמוק בכל תחומי החיים',
    description:
      'תהליך הוליסטי המשלב טיפול רגשי ותודעתי, ליווי תזונתי, תנועה ונשימה. מיועד למי שרוצה שינוי עמוק ומקיף בכל תחומי החיים — גוף, נפש ותודעה. עובדת עם NLP, דימיון מודרך, כתיבה אינטואיטיבית, נשימה, קרקוע, טיפולי מים ותזונה טבעית.',
    helps: ['שינוי מקיף ועמוק', 'איזון גוף-נפש-תודעה', 'שחרור דפוסים ישנים', 'בניית חיים חדשים'],
    forWho: 'מי שמוכנה לתהליך שינוי שורשי',
    duration: '90 דקות',
    price: 'לפי תוכנית',
    waMessage: 'היי נטלי 🌿 אני מעוניינת בטיפול אינטגרטיבי משולב',
    color: 'rgba(196, 146, 122, 0.12)',
    accentColor: 'var(--rose)',
  },
  {
    icon: '⚡',
    title: 'אקסס בארס',
    subtitle: 'Access Bars®',
    tagline: 'שחרור · רוגע · בהירות',
    description:
      'טיפול אנרגטי עדין ולא פולשני שמבוצע במגע קל ב-32 נקודות ייחודיות בראש. המגע העדין מסייע לשחרר מטען אלקטרומגנטי שנאגר לאורך השנים, מפחית סטרס ולחץ, מאפשר ניקוי חסמים רגשיים ותודעתיים, ומוביל לתחושת רוגע, בהירות מנטלית ושחרור פנימי.',
    helps: ['הפחתת סטרס ולחץ', 'ניקוי חסמים רגשיים', 'בהירות מנטלית', 'שחרור פנימי עמוק'],
    forWho: 'מי שמחפשת שקט ושחרור עמוק',
    duration: '60–90 דקות',
    price: 'לפי הצורך',
    waMessage: 'היי נטלי 🌿 אני מעוניינת בסשן אקסס בארס',
    color: 'rgba(143, 175, 138, 0.08)',
    accentColor: 'var(--sage)',
  },
  {
    icon: '🌙',
    title: 'תטא הילינג',
    subtitle: 'ThetaHealing®',
    tagline: 'שינוי אמונות · ריפוי עמוק',
    description:
      'פרקטיקת ריפוי חדשנית שפותחת דלת לעולם של התפתחות אישית ורווחה נפשית. עוסקת בזיהוי ושינוי של אמונות בלתי מודעות שפועלות כמחסומים בחיינו. מסייעת בשחרור חסמים רגשיים, ריפוי רגשי עמוק, חיזוק תחושת הערך העצמי ויצירת שינוי פנימי.',
    helps: ['שינוי אמונות מגבילות', 'שחרור חסמים עמוקים', 'חיזוק ערך עצמי', 'ריפוי רגשי עמוק'],
    forWho: 'מי שרוצה לשנות דפוסים שורשיים',
    duration: '60–90 דקות',
    price: 'לפי הצורך',
    waMessage: 'היי נטלי 🌿 אני מעוניינת בסשן תטא הילינג',
    color: 'rgba(200, 169, 110, 0.08)',
    accentColor: 'var(--gold)',
  },
  {
    icon: '👦',
    title: 'ליווי לילדים',
    subtitle: 'גיל 5–17 · מותאם אישית',
    tagline: 'חוסן, ביטחון, שמחה',
    description:
      'טיפול המשלב שיטות על מנת להביא את הילד לרווחה רגשית, ביטחון ודימוי עצמי חיובי וחוסן רגשי. כולל: טיפול רגשי דרך משחק ושיחה, כלים לביטחון עצמי וויסות רגשי, טיפול CBT לחרדה חברתית ודרכי התמודדות עם הפרעות קשב. הטיפול מערב גם את ההורים באופן אקטיבי.',
    helps: ['חרדה חברתית ופחדים', 'קשיי קשב וריכוז', 'דימוי עצמי נמוך', 'ויסות רגשי'],
    forWho: 'ילדים ובני נוער גיל 5–17 וההורים שלהם',
    duration: '45–60 דקות',
    price: 'לפי הצורך',
    waMessage: 'היי נטלי 🌿 אני מעוניינת בליווי עבור ילד/י',
    color: 'rgba(196, 146, 122, 0.08)',
    accentColor: 'var(--rose)',
  },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(service.waMessage)}`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flip-card h-72 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
      tabIndex={0}
      role="button"
      aria-label={`${service.title} — לחצי לפרטים נוספים`}
      aria-expanded={flipped}
    >
      <div className={`flip-card-inner relative w-full h-full ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div
          className="flip-card-front absolute inset-0 rounded-3xl p-6 flex flex-col justify-between"
          style={{
            background: service.color,
            border: `1px solid rgba(0,0,0,0.06)`,
          }}
        >
          <div>
            <div className="text-4xl mb-3" aria-hidden="true">
              {service.icon}
            </div>
            <h3
              className="font-frank text-xl font-bold mb-1"
              style={{ color: 'var(--charcoal)' }}
            >
              {service.title}
            </h3>
            <p className="text-xs font-light opacity-60 ltr-text" style={{ color: 'var(--charcoal)' }}>
              {service.subtitle}
            </p>
          </div>
          <div>
            <p className="text-sm italic mb-4 opacity-70" style={{ color: 'var(--charcoal)' }}>
              {service.tagline}
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: service.accentColor, color: 'white', opacity: 0.9 }}
              >
                לפרטים →
              </span>
              <span className="text-xs opacity-40" style={{ color: 'var(--charcoal)' }}>
                (לחצי לפרוס)
              </span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-card-back absolute inset-0 rounded-3xl p-5 flex flex-col justify-between overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${service.accentColor}22, ${service.accentColor}08)`,
            border: `1.5px solid ${service.accentColor}40`,
          }}
        >
          <div className="overflow-y-auto flex-1 ml-1 pl-1">
            <p className="text-xs leading-relaxed mb-3 opacity-80" style={{ color: 'var(--charcoal)' }}>
              {service.description}
            </p>
            <div className="space-y-1 mb-3">
              {service.helps.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--charcoal)' }}>
                  <span style={{ color: service.accentColor }}>✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs opacity-70" style={{ color: 'var(--charcoal)' }}>
              <div>
                <span className="font-semibold">משך:</span> {service.duration}
              </div>
              <div>
                <span className="font-semibold">מחיר:</span> {service.price}
              </div>
            </div>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl text-xs font-semibold transition-all hover:shadow-md"
            style={{ background: '#25D366', color: 'white' }}
            aria-label={`שלחי הודעה בוואטסאפ לגבי ${service.title}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            שלחי הודעה לתיאום
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesGrid() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="services"
      ref={ref}
      className="py-24"
      style={{ background: 'linear-gradient(180deg, var(--cream) 0%, rgba(143,175,138,0.06) 100%)' }}
      aria-label="שירותי טיפול"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
            שירותים
          </span>
          <h2
            className="font-frank text-4xl md:text-5xl font-bold mt-3 mb-4"
            style={{ color: 'var(--charcoal)' }}
          >
            הטיפולים שלי
          </h2>
          <p className="text-base opacity-60 max-w-xl mx-auto" style={{ color: 'var(--charcoal)' }}>
            לחצי על כל כרטיס לקריאת פרטים נוספים ותיאום ישיר בוואטסאפ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        {/* Online note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 text-center p-6 rounded-2xl"
          style={{
            background: 'rgba(200, 169, 110, 0.1)',
            border: '1px solid rgba(200, 169, 110, 0.3)',
          }}
        >
          <span className="text-2xl mb-2 block" aria-hidden="true">💻</span>
          <p className="font-frank text-lg font-semibold mb-1" style={{ color: 'var(--charcoal)' }}>
            פגישות אונליין (זום)
          </p>
          <p className="text-sm opacity-70" style={{ color: 'var(--charcoal)' }}>
            ניתן לקבל כל טיפול מרחוק — נוח וגמיש, מהבית. מתאים לכל רחבי הארץ.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
