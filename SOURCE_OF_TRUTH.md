# SOURCE OF TRUTH — מקור האמת של האתר

מסמך זה הוא **הסמכות העיצובית הסופית**. כל שינוי עיצובי צריך להתאים למה שמוגדר כאן.

---

## זהות המותג

| פריט | ערך |
|------|-----|
| שם | נטלי |
| תת-כותרת | גוף · נפש · תודעה |
| תחום | ריפוי הוליסטי |
| מיקום | עפולה + אונליין (כל הארץ) |
| קהל יעד | נשים + ילדים (גיל 5–17) |
| Tagline | "המרחב שלך לריפוי עמוק" |

---

## פלטת צבעים

| שם | משתנה CSS | HEX | שימוש |
|----|-----------|-----|--------|
| Sage (ירוק מרווה) | `--sage` | `#8FAF8A` | צבע ראשי, כפתורים, לוגו |
| Rose (ורוד-טרקוטה) | `--rose` | `#C4927A` | צבע משני, eyebrow, גבולות |
| Gold (זהב) | `--gold` | `#C8A96E` | אקסנט, קישוטים, focus rings |
| Cream (קרם) | `--cream` | `#FAF7F2` | רקע כללי |
| Charcoal (אפור כהה) | `--charcoal` | `#2D2D2D` | טקסט ראשי |
| Sage Light | `--sage-light` | `#e6ede5` | רקעים עדינים |
| Rose Light | `--rose-light` | `#f9ebe4` | רקעים עדינים |
| Gold Light | `--gold-light` | `#f9f0da` | selection highlight |

### גרדיאנטים עיקריים
- **כפתור ראשי:** `linear-gradient(135deg, var(--sage), #6a9165)`
- **Gradient Text:** `linear-gradient(135deg, var(--sage), var(--rose), var(--gold))`
- **Hero Background:** `organic-bg` — ראו globals.css
- **TrustBar:** `linear-gradient(135deg, var(--sage) 0%, #6a9165 50%, #537450 100%)`

---

## טיפוגרפיה

| משפחה | משתנה | שימוש |
|-------|--------|--------|
| Frank Ruhl Libre (serif) | `--font-frank`, `.font-frank` | כותרות, לוגו, שמות |
| Heebo (sans-serif) | `--font-heebo`, `.font-heebo` | גוף טקסט, ניווט |

### גדלי כותרות
- H1 Hero: `clamp(2.4rem, 6vw, 4.5rem)`
- Logo Hero: `clamp(3.5rem, 15vw, 10rem)`
- H2 סקציות: `text-3xl md:text-5xl` (Frank Ruhl Libre)
- H3: `text-xl font-bold`

---

## פריסה

| ערך | קלאס |
|-----|------|
| רוחב מקסימלי | `max-w-6xl mx-auto` |
| Padding אופקי | `px-4 sm:px-6` |
| ריווח סקציה | `py-16 md:py-24` |
| כיוון | RTL (`dir="rtl"`) |

### Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## קומפוננטות

| קובץ | תפקיד | סדר בעמוד |
|------|--------|-----------|
| `Nav.tsx` | ניווט fixed | 1 (z-50) |
| `Hero.tsx` | כניסה ראשית | 2 |
| `TrustBar.tsx` | נתוני אמון | 3 |
| `About.tsx` | אודות (#about) | 4 |
| `ServicesGrid.tsx` | שירותים (#services) | 5 |
| `BreathingWidget.tsx` (BreathingSection) | נשימה | 6 |
| `Testimonials.tsx` | עדויות (#testimonials) | 7 |
| `LeadMagnet.tsx` | לכידת לידים | 8 |
| `FAQ.tsx` | שאלות (#faq) | 9 |
| `Booking.tsx` | קביעת פגישה (#booking) | 10 |
| `ContactForm.tsx` | צרי קשר (#contact) | 11 |
| `Footer.tsx` | footer | 12 |
| `WhatsAppFloat.tsx` | כפתור צף (fixed) | תמיד (z-40) |
| `Quiz.tsx` | מודל שאלון | modal (z-50+) |
| `BreathingWidget.tsx` | מודל נשימה | modal (z-50+) |

---

## תמונות

| קובץ | גודל | שימוש |
|------|------|--------|
| `/Nataly_smile_picture.jpeg` | 176 KB | Hero — תמונה עגולה |
| `/natali-photo.jpeg` | 224 KB | About — תמונה ריבועית עם morph |

### גדלי תמונות
- Hero (עגולה): `clamp(130px, 35vw, 260px)` × `clamp(130px, 35vw, 260px)` — עם `pt-20 sm:pt-0` לחישוב גובה ה-nav
- About: `maxWidth: 420px`, aspect-square

---

## CSS Classes חשובות (globals.css)

| קלאס | תפקיד |
|------|--------|
| `.organic-bg` | רקע Hero עם gradients |
| `.dot-pattern` | דפוס נקודות |
| `.glass` | glassmorphism בהיר |
| `.glass-dark` | glassmorphism כהה |
| `.gradient-text` | טקסט צבעוני (sage→rose→gold) |
| `.gradient-text-gold` | טקסט זהב מנצנץ |
| `.flip-card` | מכל flip 3D |
| `.flip-card-inner` | פנים flip (transform) |
| `.flip-card-front/back` | צדדי הכרטיס |
| `.carousel-container` | scroll snap אופקי |
| `.accordion-content` | max-height accordion |
| `.wa-pulse` | אנימציית pulse לכפתור WA |

---

## Animations (keyframes)

| שם | קובץ | תיאור |
|----|------|--------|
| `float` | globals.css + tailwind | שייט אנכי ±20px |
| `breathe-circle` | globals.css | הגדלה/כיווץ עם opacity |
| `morph` | globals.css + tailwind | שינוי border-radius אורגני |
| `shimmer` | globals.css + tailwind | הזזת background-position |
| `particle-float` | globals.css | שייט חלקיקים |
| `ripple` | globals.css | התרחבות עם fade |
| `wa-pulse` | globals.css | pulse ירוק לכפתור WhatsApp |
| `scroll-bounce` | globals.css | קפיצה לחץ scroll indicator |
| `counter-up` | globals.css | fade in עם תנועה למעלה |

---

## WhatsApp

- **מספר:** `NEXT_PUBLIC_NATALI_WHATSAPP` (`.env.local`)
- **פורמט:** `972XXXXXXXXX` (ללא + וללא מקפים)
- **הודעת ברירת מחדל:** `"היי נטלי 🌿"`
- **URL:** `https://wa.me/{NUMBER}?text={ENCODED_MSG}`

---

## SEO

- **שפה:** `he` (עברית), RTL
- **Schema:** `HealthAndBeautyBusiness` (JSON-LD ב-layout.tsx)
- **מיקום:** עפולה, ישראל (32.6078°N, 35.2897°E)
- **Canonical:** `NEXT_PUBLIC_SITE_URL`
- **Robots:** index + follow

---

## עקרונות עיצוב

1. **לא לשנות צבעי מותג** — רק הגוונים המוגדרים ב-CSS variables
2. **RTL תמיד** — כל פריסה חייבת לתמוך בעברית
3. **כפתורים ראשיים** — תמיד `rounded-full` עם gradient sage
4. **כפתורים משניים** — `border-2` עם `borderColor: var(--rose)`
5. **כרטיסים** — `rounded-3xl` עם צל עדין
6. **Section headers** — Eyebrow ב-rose + H2 ב-Frank Ruhl Libre
7. **אנימציות** — תמיד `ease: [0.22, 1, 0.36, 1]` לכניסות, `framer-motion`
8. **Hover** — `hover:-translate-y-1` + `hover:shadow-xl` לכפתורים
