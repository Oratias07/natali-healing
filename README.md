# נטלי — המרחב לריפוי ושינוי אינטגרטיבי 🌿

אתר Next.js 14 מלא ומוכן לפרודקשן עבור נטלי, מטפלת הוליסטית בעפולה.

---

## 🚀 הוראות התקנה מקומית

### דרישות מקדימות
- Node.js 18+
- npm או yarn

### שלבי ההתקנה

```bash
# 1. כנסי לתיקיית הפרויקט
cd natali-healing

# 2. התקני dependencies
npm install

# 3. צרי קובץ environment
cp .env.example .env.local

# 4. מלאי את הפרטים ב-.env.local (ראי הוראות למטה)

# 5. הרצי בסביבת פיתוח
npm run dev
```

האתר יהיה זמין ב: http://localhost:3000

---

## 📱 איך לחבר Twilio לוואטסאפ

### שלב 1 — פתחי חשבון Twilio
1. גשי ל [twilio.com](https://twilio.com) והירשמי
2. בחרי **WhatsApp Business** מהתפריט
3. הגדירי Sandbox או חשבון ייצור (ייצור דורש אישור Meta)

### שלב 2 — קבלי את הפרטים
מה שצריך למצוא ב-Console של Twilio:
- **Account SID** — מתחיל ב-AC
- **Auth Token** — ב-Console הראשי
- **WhatsApp From Number** — בד"כ: `whatsapp:+14155238886` (Sandbox)

### שלב 3 — עדכני את .env.local
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
NATALI_WHATSAPP_NUMBER=whatsapp:+972XXXXXXXXX
```

> **חשוב:** בסביבת Sandbox, גם נטלי וגם הלקוחה צריכות להצטרף ל-Sandbox על ידי שליחת "join [כינוי]" למספר Twilio.

---

## 📧 איך לחבר Resend (גיבוי אימייל)

1. גשי ל [resend.com](https://resend.com) והירשמי
2. הוסיפי את הדומיין שלך
3. צרי API Key
4. עדכני `.env.local`:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@natali-healing.co.il
NATALI_EMAIL=natali@natali-healing.co.il
```

---

## ☁️ איך לפרסם ב-Vercel

### אפשרות א׳ — דרך CLI
```bash
# התקני Vercel CLI
npm install -g vercel

# פרסמי
vercel

# לפרודקשן
vercel --prod
```

### אפשרות ב׳ — דרך GitHub
1. Push את הקוד ל-GitHub
2. גשי ל [vercel.com](https://vercel.com) ולחצי **New Project**
3. חברי את ה-Repo
4. הוסיפי Environment Variables (כל מה שב-.env.example)
5. לחצי **Deploy**

### הוספת Environment Variables ב-Vercel
- Dashboard → Project → Settings → Environment Variables
- הוסיפי כל variable מה-.env.example

---

## 📅 איך לחבר Calendly

1. פתחי חשבון ב [calendly.com](https://calendly.com)
2. צרי Event Type: "שיחת היכרות חינם" — 15 דקות
3. ב-`components/Booking.tsx` — החליפי את ה-placeholder ב:

```jsx
<iframe
  src="https://calendly.com/YOUR_USERNAME/intro"
  width="100%"
  height="630"
  frameBorder="0"
  title="קביעת פגישה"
/>
```

---

## 🖼️ איך לעדכן תמונות ותכנים

### תמונת פרופיל
החליפי את ה-SVG Avatar ב-`components/About.tsx` עם:
```jsx
import Image from 'next/image'

<Image
  src="/natali-photo.jpg"
  alt="נטלי — מטפלת הוליסטית"
  width={500}
  height={600}
  className="rounded-3xl object-cover"
  priority
/>
```
שמי את התמונה בתיקיית `/public/`.

### עדכון מספר וואטסאפ
ב-`.env.local`:
```env
NEXT_PUBLIC_NATALI_WHATSAPP=972501234567
```
(ללא + ובלי מקפים)

### עדכון תכנים
כל התכנים נמצאים בקבצי ה-components. לדוגמה:
- **שירותים:** `components/ServicesGrid.tsx`
- **עדויות:** `components/Testimonials.tsx`
- **שאלות נפוצות:** `components/FAQ.tsx`

---

## 🔧 פקודות שימושיות

```bash
npm run dev      # פיתוח מקומי
npm run build    # בניה לפרודקשן
npm run start    # הרצת build מקומי
npm run lint     # בדיקת קוד
```

---

## 📁 מבנה הפרויקט

```
natali-healing/
├── app/
│   ├── layout.tsx         # RTL, Hebrew fonts, metadata, JSON-LD
│   ├── page.tsx           # דף הבית
│   ├── globals.css        # סגנונות גלובליים
│   └── api/contact/
│       └── route.ts       # WhatsApp + Email API
├── components/
│   ├── Nav.tsx            # ניווט sticky
│   ├── Hero.tsx           # Hero section
│   ├── TrustBar.tsx       # מספרים מונפשים
│   ├── About.tsx          # אודות נטלי
│   ├── ServicesGrid.tsx   # 6 flip cards של שירותים
│   ├── Quiz.tsx           # שאלון 5 שאלות
│   ├── BreathingWidget.tsx # תרגיל נשימה 4-7-8
│   ├── Testimonials.tsx   # סיפורי שינוי - קרוסלה
│   ├── LeadMagnet.tsx     # מדריך חינם
│   ├── FAQ.tsx            # שאלות נפוצות
│   ├── Booking.tsx        # קביעת פגישה + Calendly
│   ├── ContactForm.tsx    # טופס יצירת קשר
│   ├── WhatsAppFloat.tsx  # כפתור WhatsApp צף
│   └── Footer.tsx         # פוטר
├── lib/
│   └── whatsapp.ts        # Twilio helper functions
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── .env.example
├── vercel.json
├── tailwind.config.ts
└── README.md
```

---

## 🌿 נבנה מתוך אהבה

האתר נבנה עם:
- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Framer Motion**
- **React Hook Form + Zod**
- **Twilio WhatsApp API**
- **Resend Email API**

---

*גוף · נפש · תודעה* 🌿
