// WhatsApp integration is handled via direct wa.me links — no Twilio required.
// The floating WhatsApp button links directly to Natali's number.
// All form submissions are sent via email (Resend).

export const WA_NUMBER = process.env.NEXT_PUBLIC_NATALI_WHATSAPP || '972000000000'

export function buildWaLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}
