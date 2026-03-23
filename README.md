# נטלי — המרחב לריפוי ושינוי אינטגרטיבי 🌿

> אתר Next.js 14 מלא ומוכן לפרודקשן עבור נטלי, מטפלת הוליסטית בעפולה.

[![Live Demo](https://img.shields.io/badge/Live-natali--healing.vercel.app-4a7c59?style=for-the-badge&logo=vercel)](https://natali-healing.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

---

## 🖼️ תצוגת האתר

### Hero — לוגו גדול עם תמונה, נצנצים נופלים
> הלוגו "נטלי" מוצג בפולסקרין בגופן ענק. בגלילה: הלוגו מתכווץ אל הנאב, התמונה נדהה.

![Hero Section](https://image.thum.io/get/width/1280/crop/800/noanimate/https://natali-healing.vercel.app)

---

### אודות — סקשן "מי אני" עם תמונה ואנימציות
> תיאור רקע מקצועי, שיטות טיפול, ותגים צפים עם שנות ניסיון.

![About Section](https://image.thum.io/get/width/1280/crop/800/noanimate/https://natali-healing.vercel.app/#about)

---

### קביעת פגישה — WhatsApp ישיר (ללא Calendly)
> כרטיס WhatsApp בולט לשיחת היכרות חינם, + "מה קורה בשיחה" + שעות פעילות.

![Booking Section](https://image.thum.io/get/width/1280/crop/800/noanimate/https://natali-healing.vercel.app/#booking)

---

## ✨ פיצ'רים עיקריים

| פיצ'ר | תיאור |
|--------|--------|
| **Hero Splash** | לוגו "נטלי" בפולסקרין + תמונת חיוך עגולה. בגלילה הלוגו מתכווץ לנאב והתמונה נדהה |
| **GlobalParticles** | נצנצים צפים ברחבי כל האתר (לא רק בהירו) |
| **Scroll Animation** | לוגו נע לפינה הימנית עליונה בגלילה ומתחבר ויזואלית לנאב |
| **Nav חכם** | לוגו הנאב מוסתר עד שלוגו ההירו מסיים את המסע — מניעת כפילות |
| **ServicesGrid** | 6 כרטיסי flip עם שיטות הטיפול השונות |
| **Quiz אינטראקטיבי** | 5 שאלות → המלצה אישית על טיפול מתאים |
| **BreathingWidget** | תרגיל נשימה 4-7-8 עם אנימציה עיגולית |
| **Testimonials** | קרוסלה של עדויות לקוחות |
| **LeadMagnet** | הורדת מדריך חינם עם אוטומציית ווטסאפ |
| **FAQ** | שאלות נפוצות אקורדיון |
| **Booking** | שיחת היכרות ב-WhatsApp (ללא שירות Calendly חיצוני) |
| **ContactForm** | טופס יצירת קשר עם Resend email |
| **WhatsAppFloat** | כפתור ווטסאפ צף בכל הדפים |
| **RTL מלא** | Hebrew, direction: rtl, Frank Ruhl Libre font |
| **SEO** | JSON-LD Schema, sitemap.xml, robots.txt, Open Graph |
| **Responsive** | מותאם מלא למובייל, טאבלט, דסקטופ |

---

## 📁 מבנה הפרויקט

```
natali-healing/
├── app/
│   ├── layout.tsx              # RTL, Hebrew fonts, metadata, JSON-LD SEO
│   ├── page.tsx                # דף הבית — מרכיב את כל הסקשנים
│   ├── globals.css             # CSS variables, animations (morph, particles, breathe)
│   └── api/contact/
│       └── route.ts            # API: שליחת אימייל + WhatsApp notification
├── components/
│   ├── Nav.tsx                 # ניווט sticky — לוגו מופיע אחרי Hero scroll
│   ├── Hero.tsx                # Splash screen: לוגו ענק + תמונה → מתכווץ בגלילה
│   ├── GlobalParticles.tsx     # נצנצים גלובליים צפים ברחבי האתר
│   ├── TrustBar.tsx            # מספרים מונפשים (לקוחות, ניסיון, שיטות)
│   ├── About.tsx               # אודות נטלי — תמונה + ביוגרפיה
│   ├── ServicesGrid.tsx        # 6 כרטיסי flip: NLP, תטא, אקסס בארס, CBT...
│   ├── Quiz.tsx                # שאלון 5 שאלות → המלצה אישית
│   ├── BreathingWidget.tsx     # תרגיל נשימה 4-7-8 (modal + section)
│   ├── Testimonials.tsx        # עדויות — קרוסלה אוטומטית
│   ├── LeadMagnet.tsx          # מדריך חינם להורדה
│   ├── FAQ.tsx                 # שאלות נפוצות — אקורדיון
│   ├── Booking.tsx             # קביעת פגישה — WhatsApp ישיר (ללא Calendly)
│   ├── ContactForm.tsx         # טופס יצירת קשר עם ולידציה (zod)
│   ├── WhatsAppFloat.tsx       # כפתור WhatsApp צף
│   └── Footer.tsx              # פוטר עם קישורים ורשתות חברתיות
├── lib/
│   └── whatsapp.ts             # פונקציות עזר לשליחת WhatsApp
├── pictures/                   # תמונות מקור (לא מוגשות ישירות)
│   ├── Nataly_smile_picture.jpeg
│   ├── Nataly_face_picture.jpeg
│   └── Nataly_sit_picture.jpeg
├── public/
│   ├── natali-photo.jpeg       # תמונת פרופיל (About section)
│   ├── Nataly_smile_picture.jpeg # תמונת Hero
│   ├── robots.txt
│   └── sitemap.xml
├── docs/
│   └── screenshots/            # צילומי מסך לתיעוד
├── .env.example                # משתני סביבה לדוגמה
├── vercel.json                 # הגדרות Vercel + security headers
├── next.config.js              # Next.js config + image optimization
├── tailwind.config.ts
└── README.md
```

---

## ⚙️ התנהגות UI/UX — מה חדש

### Hero Scroll Effect
כשהאתר נפתח, הלוגו "נטלי" מוצג **בגודל ענק** (עד 10rem) ממורכז בדף, עם תמונת החיוך בעיגול מתחתיו.

בגלילה מתרחשים שלושה אפקטים בו-זמנית:
- **הלוגו** — מתכווץ ונע לפינה הימנית העליונה (לכיוון הנאב)
- **התמונה** — נדהה ומתכווצת מהר יותר (נעלמת ב-30% scroll)
- **התוכן** (כותרת, כפתורים) — נדהה בהדרגה

כשהלוגו מסיים את מסעו, לוגו הנאב **מופיע** (fade in) — כך שלא יהיו שני לוגואים גלויים בו-זמנית.

### GlobalParticles
נצנצים קטנים בצבעי הפלטה (sage, rose, gold) מרחפים לאורך כל האתר — לא רק בהירו.

### Booking — ללא Calendly
סקשן קביעת הפגישה הוסר ממנו ה-Calendly placeholder. כעת הוא מכיל:
- כרטיס WhatsApp ירוק עם הודעה מוכנה לשליחה
- "מה קורה בשיחת ההיכרות?" — 4 נקודות
- מיקום + שעות פעילות

---

## 🚀 הוראות התקנה מקומית

```bash
# 1. כנסי לתיקיית הפרויקט
cd natali-healing

# 2. התקני dependencies
npm install

# 3. צרי קובץ environment
cp .env.example .env.local

# 4. מלאי את הפרטים ב-.env.local

# 5. הרצי בסביבת פיתוח
npm run dev
```

האתר יהיה זמין ב: http://localhost:3000

---

## 🔑 משתני סביבה

צרי קובץ `.env.local` עם המשתנים הבאים:

```env
# WhatsApp — מספר הטלפון של נטלי (ללא + ובלי מקפים)
NEXT_PUBLIC_NATALI_WHATSAPP=972501234567

# Resend (Email API) — לטופס יצירת קשר
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@natali-healing.co.il
NATALI_EMAIL=natali@natali-healing.co.il
```

---

## 📧 חיבור Resend (שליחת אימייל)

1. גשי ל-[resend.com](https://resend.com) והירשמי
2. הוסיפי את הדומיין שלך
3. צרי API Key
4. עדכני `.env.local` עם הפרטים למעלה

---

## ☁️ פרסום ב-Vercel

### דרך GitHub (מומלץ)
1. Push את הקוד ל-GitHub
2. גשי ל-[vercel.com/new](https://vercel.com/new)
3. חברי את ה-Repo `natali-healing`
4. הוסיפי Environment Variables בהגדרות
5. לחצי **Deploy**

### Environment Variables ב-Vercel
- Dashboard → Project → Settings → Environment Variables
- הוסיפי: `NEXT_PUBLIC_NATALI_WHATSAPP`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NATALI_EMAIL`

---

## 🖼️ עדכון תמונות

### תמונת Hero (עיגול בכניסה לאתר)
החליפי את הקובץ:
```
public/Nataly_smile_picture.jpeg
```

### תמונת אודות (About section)
החליפי את הקובץ:
```
public/natali-photo.jpeg
```

### עדכון מספר WhatsApp
ב-`.env.local` (או ב-Vercel Environment Variables):
```env
NEXT_PUBLIC_NATALI_WHATSAPP=972501234567
```

---

## 🔧 פקודות שימושיות

```bash
npm run dev      # פיתוח מקומי (http://localhost:3000)
npm run build    # בניה לפרודקשן
npm run start    # הרצת build מקומי
npm run lint     # בדיקת קוד
```

---

## 🌿 טכנולוגיות

| טכנולוגיה | גרסה | שימוש |
|------------|------|--------|
| **Next.js** | 14 (App Router) | Framework ראשי |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | 3.4 | עיצוב |
| **Framer Motion** | 11 | אנימציות scroll, fade, morphing |
| **React Hook Form** | 7.52 | טפסים |
| **Zod** | 3.23 | ולידציה |
| **Resend** | 3.3 | שליחת אימיילים |

---

*גוף · נפש · תודעה* 🌿
