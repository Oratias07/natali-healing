import type { Metadata } from 'next'
import { Frank_Ruhl_Libre, Heebo } from 'next/font/google'
import './globals.css'

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-frank',
  display: 'swap',
})

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'נטלי — המרחב לריפוי ושינוי אינטגרטיבי | עפולה',
  description:
    'נטלי, אנליסטית NLP מסטר ומטפלת הוליסטית בעפולה. טיפול רגשי, תטא הילינג, אקסס בארס, ליווי תזונתי וליווי ילדים. גוף. נפש. תודעה.',
  keywords:
    'NLP, תטא הילינג, אקסס בארס, טיפול רגשי, ריפוי הוליסטי, עפולה, חרדה, ליווי ילדים, בריאות טבעית',
  authors: [{ name: 'נטלי' }],
  creator: 'נטלי',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://natali-healing.co.il',
    siteName: 'נטלי — המרחב לריפוי',
    title: 'נטלי — המרחב לריפוי ושינוי אינטגרטיבי',
    description: 'טיפול הוליסטי משולב — גוף, נפש ותודעה. NLP, תטא הילינג, אקסס בארס ועוד. עפולה + אונליין.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://natali-healing.co.il',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: 'נטלי — המרחב לריפוי ושינוי אינטגרטיבי',
  description: 'מטפלת הוליסטית, אנליסטית NLP מסטר, תטא הילינג, אקסס בארס, ליווי תזונתי',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://natali-healing.co.il',
  telephone: '+972' + (process.env.NEXT_PUBLIC_NATALI_WHATSAPP || ''),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'עפולה',
    addressRegion: 'הצפון',
    addressCountry: 'IL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.6078,
    longitude: 35.2897,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  priceRange: '₪₪',
  servesCuisine: 'Holistic Healing',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'שירותי טיפול',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'טיפול רגשי פרטני NLP' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'תטא הילינג' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'אקסס בארס' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ליווי תזונתי' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ליווי אישי לילדים' } },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${frankRuhl.variable} ${heebo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-heebo antialiased">{children}</body>
    </html>
  )
}
