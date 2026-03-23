import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const hasResend = !!process.env.RESEND_API_KEY
let resend: import('resend').Resend | null = null
if (hasResend) {
  const { Resend } = require('resend')
  resend = new Resend(process.env.RESEND_API_KEY)
}

const contactSchema = z.object({
  name: z.string().min(2, 'שם חובה'),
  phone: z.string().min(9, 'מספר טלפון לא תקין').max(15),
  topic: z.string().min(1, 'יש לבחור נושא'),
  message: z.string().optional().default(''),
  type: z.enum(['contact', 'lead_magnet']).default('contact'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'נתונים לא תקינים', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const nataliEmail = process.env.NATALI_EMAIL || 'dev@localhost'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@natali-healing.co.il'

    // If no Resend API key — log to console (dev mode) and return success
    if (!resend) {
      console.log('\n📬 [DEV] Form submission received (no RESEND_API_KEY):', data)
      return NextResponse.json({ success: true, message: 'הפנייה נשלחה בהצלחה!' })
    }

    if (data.type === 'lead_magnet') {
      await resend.emails.send({
        from: fromEmail,
        to: nataliEmail,
        subject: `📥 ליד חדש — מדריך חינם! ${data.name}`,
        html: `
          <div dir="rtl" style="font-family: sans-serif; max-width: 600px; margin: auto; background: #FAF7F2; padding: 32px; border-radius: 16px;">
            <h2 style="color: #8FAF8A;">📥 ליד חדש — מדריך חינם!</h2>
            <p style="color: #2D2D2D;"><strong>שם:</strong> ${data.name}</p>
            <p style="color: #2D2D2D;"><strong>טלפון:</strong> ${data.phone}</p>
            <p style="margin-top: 24px; color: #888; font-size: 13px;">נשלח מאתר natali-healing</p>
          </div>
        `,
      })
      return NextResponse.json({ success: true, message: 'הפנייה נשלחה בהצלחה!' })
    }

    // Standard contact form — email to Natali
    await resend.emails.send({
      from: fromEmail,
      to: nataliEmail,
      subject: `✨ פנייה חדשה מהאתר — ${data.name}`,
      html: `
        <div dir="rtl" style="font-family: sans-serif; max-width: 600px; margin: auto; background: #FAF7F2; padding: 32px; border-radius: 16px;">
          <h2 style="color: #8FAF8A; margin-bottom: 24px;">✨ פנייה חדשה מהאתר</h2>
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden;">
            <tr style="border-bottom: 1px solid #f0ebe3;">
              <td style="padding: 14px 18px; font-weight: bold; color: #2D2D2D; width: 120px;">שם</td>
              <td style="padding: 14px 18px; color: #2D2D2D;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0ebe3;">
              <td style="padding: 14px 18px; font-weight: bold; color: #2D2D2D;">טלפון</td>
              <td style="padding: 14px 18px; color: #2D2D2D;">${data.phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0ebe3;">
              <td style="padding: 14px 18px; font-weight: bold; color: #2D2D2D;">נושא</td>
              <td style="padding: 14px 18px; color: #2D2D2D;">${data.topic}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; font-weight: bold; color: #2D2D2D;">הודעה</td>
              <td style="padding: 14px 18px; color: #2D2D2D;">${data.message || '—'}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; color: #888; font-size: 13px;">נשלח מאתר natali-healing 🌿</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, message: 'הפנייה נשלחה בהצלחה!' })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'שגיאת שרת, אנא נסי שוב' }, { status: 500 })
  }
}
