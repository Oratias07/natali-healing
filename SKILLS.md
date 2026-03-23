# SKILLS — פונקציונאליות ויכולות האתר

מסמך זה מתעד את כל היכולות האינטראקטיביות של האתר. **לפני שינוי כלשהו — ודאי שהפונקציונאליות הרשומה כאן לא נפגעת.**

---

## 1. מודל Quiz — "גלי איזה טיפול מתאים לך"
- **קובץ:** `components/Quiz.tsx`
- **טריגר:** כפתור Hero + כפתור ServicesGrid
- **מצב:** `quizOpen` ב-`app/page.tsx`
- **ממשק:** Modal עם AnimatePresence מ-framer-motion
- **שמירת מצב:** `isOpen` / `onClose` props
- **⚠️ לא לשבור:** הכפתורים `onOpenQuiz` ב-Hero ו-ServicesGrid חייבים להפעיל את המודל

## 2. מודל BreathingWidget — "רגע של נשימה"
- **קובץ:** `components/BreathingWidget.tsx` (מכיל גם `BreathingSection`)
- **טריגר:** כפתור Hero (breathing shortcut) + `BreathingSection` בעמוד
- **מצב:** `breathingOpen` ב-`app/page.tsx`
- **ממשק:** Modal עם AnimatePresence
- **⚠️ לא לשבור:** `onOpenBreathing` prop ב-Hero + `onOpen` ב-BreathingSection

## 3. כרטיסי שירות עם Flip — ServicesGrid
- **קובץ:** `components/ServicesGrid.tsx`
- **אינטראקציה:** לחיצה/Enter מפנה כרטיס (CSS 3D transform)
- **CSS:** `.flip-card`, `.flip-card-inner`, `.flip-card-front`, `.flip-card-back` ב-`globals.css`
- **⚠️ לא לשבור:** `onClick={() => setFlipped(!flipped)}` + `onKeyDown` + `aria-expanded`

## 4. טופס יצירת קשר + API
- **קובץ:** `components/ContactForm.tsx` + `app/api/contact/route.ts`
- **ולידציה:** React Hook Form + Zod
- **שליחה:** POST ל-`/api/contact` עם Resend
- **שדות:** שם, טלפון, אימייל, נושא, הודעה
- **⚠️ לא לשבור:** שמות שדות בסכמה: `name`, `phone`, `email`, `subject`, `message`

## 5. טופס LeadMagnet + API
- **קובץ:** `components/LeadMagnet.tsx`
- **ולידציה:** React Hook Form + Zod
- **שדות:** שם, טלפון, אימייל
- **⚠️ לא לשבור:** שמות שדות: `name`, `phone`, `email`

## 6. אנימציות Scroll Parallax — Hero
- **קובץ:** `components/Hero.tsx`
- **כלי:** `useScroll` + `useTransform` מ-framer-motion
- **אפקטים:** Logo מתכווץ, תמונה נעלמת, תוכן נעלם עם גלילה
- **⚠️ לא לשבור:** `containerRef` חייב להיות מחובר ל-`<section>`, transforms מחוברים לאלמנטים הנכונים

## 7. Counter אנימציה — TrustBar
- **קובץ:** `components/TrustBar.tsx`
- **כלי:** `useInView` + `setInterval` לספירה עולה
- **⚠️ לא לשבור:** ה-`ref` חייב להיות מחובר ל-`<section>`

## 8. תפריט נייד — Nav
- **קובץ:** `components/Nav.tsx`
- **מצב:** `menuOpen` + `scrolled`
- **אנימציה:** height: 0 → auto + opacity עם AnimatePresence
- **⚠️ לא לשבור:** `aria-expanded`, סגירת תפריט בלחיצה על קישור (`onClick={() => setMenuOpen(false)}`)

## 9. כפתור WhatsApp צף
- **קובץ:** `components/WhatsAppFloat.tsx`
- **מיקום:** `fixed bottom-6 left-4 z-40` (LTR direction)
- **אנימציה:** `wa-pulse` ב-globals.css + hover scale
- **⚠️ לא לשבור:** z-index 40, לא לחסום תוכן חשוב

## 10. FAQ אקורדיון
- **קובץ:** `components/FAQ.tsx`
- **CSS:** `.accordion-content` ב-globals.css
- **⚠️ לא לשבור:** אנימציית max-height

## 11. Testimonials קרוסלה
- **קובץ:** `components/Testimonials.tsx`
- **CSS:** `.carousel-container`, `.carousel-item` ב-globals.css
- **⚠️ לא לשבור:** scroll-snap behavior

## 12. פרטיקלים מרחפים — Hero
- **קובץ:** `components/Hero.tsx`
- **יצור:** `useEffect` — נוצרים בצד הלקוח בלבד (מונע hydration mismatch)
- **⚠️ לא לשבור:** אתחול ב-`useEffect` בלבד, לא ב-SSR

---

## משתני סביבה קריטיים
| משתנה | שימוש | ברירת מחדל |
|--------|--------|-------------|
| `NEXT_PUBLIC_NATALI_WHATSAPP` | כל כפתורי WhatsApp | `972000000000` |
| `NEXT_PUBLIC_SITE_URL` | Metadata + Schema | `https://natali-healing.co.il` |
| `RESEND_API_KEY` | שליחת מיילים | ריק (מיילים לא נשלחים) |
| `RESEND_FROM_EMAIL` | שדה From | ריק |
| `NATALI_EMAIL` | כתובת יעד למיילים | ריק |
