import { NextResponse } from 'next/server'
import { z } from 'zod'
import { cmsEnabled } from '@/lib/data'

// Adapted from region-backend.zip: zod validation and honeypot. Each enquiry, from the quote forms
// or the Contact Us form (which sends a `topic`), is saved in the Payload admin (Quote requests,
// with the artwork as a private file) and emailed to the team
// and the customer over SMTP. Without a database (local preview) it logs the enquiry instead,
// so the form can be tried end to end.

const MAX = 15 * 1024 * 1024
const OK_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'application/postscript', 'application/eps', 'image/eps', 'image/x-eps']
const OK_EXT = /\.(pdf|eps|png|jpe?g)$/i
const s = z.string().trim().max(2000)
const schema = z.object({
  name: s.min(1),
  email: z.email().max(200),
  phone: s.optional(),
  company: s.optional(),
  topic: s.optional(),
  product: s.optional(),
  material: s.optional(),
  size: s.optional(),
  printing: s.optional(),
  productionSpeed: s.optional(),
  quantity: s.optional(),
  design: s.optional(),
  message: s.optional(),
  pageUrl: s.optional(),
  website: s.optional(), // honeypot
})

const esc = (v = '') => v.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export async function POST(req: Request) {
  let fd: FormData
  try {
    fd = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Please check the form fields.' }, { status: 400 })
  }
  const parsed = schema.safeParse(Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === 'string' && v !== '')))
  if (!parsed.success) {
    const emailBad = parsed.error.issues.some((i) => i.path[0] === 'email')
    return NextResponse.json({ error: emailBad ? 'Please enter a valid email address.' : 'Please fill in your name and email.' }, { status: 400 })
  }
  const { website, ...fields } = parsed.data
  if (fields.topic && !fields.message) return NextResponse.json({ error: 'Please write your message.' }, { status: 400 })
  if (website) return NextResponse.json({ ok: true }) // bot caught, silently accept

  const file = fd.get('artwork')
  const artwork = file instanceof File && file.size > 0 ? file : null
  if (artwork && (artwork.size > MAX || !(OK_TYPES.includes(artwork.type) || OK_EXT.test(artwork.name))))
    return NextResponse.json({ error: 'Artwork must be PDF, EPS, PNG or JPG up to 15MB.' }, { status: 400 })

  if (!cmsEnabled) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[quote] No database configured: enquiry could not be saved.')
      return NextResponse.json({ error: 'Sorry, our quote form is not available right now. Please email or call us.' }, { status: 503 })
    }
    console.info('[quote] Preview mode (no DATABASE_URI), enquiry not saved:', { ...fields, artwork: artwork?.name })
    return NextResponse.json({ ok: true, preview: true })
  }

  try {
    const [{ getPayload }, { default: config }] = await Promise.all([import('payload'), import('@payload-config')])
    const payload = await getPayload({ config })

    let art: { id: number } | null = null
    if (artwork) {
      try {
        art = await payload.create({
          collection: 'artwork',
          data: {},
          file: { data: Buffer.from(await artwork.arrayBuffer()), mimetype: artwork.type || 'application/octet-stream', name: artwork.name, size: artwork.size },
        })
      } catch (err) {
        // Payload checks the file's real contents, so a renamed or damaged file lands here.
        console.warn('[quote] artwork rejected', err)
        return NextResponse.json({ error: 'We could not read that file. Please upload a PDF, EPS, PNG or JPG.' }, { status: 400 })
      }
    }
    const quote = await payload.create({ collection: 'quote-requests', data: { ...fields, artwork: art?.id } })

    const to = process.env.QUOTE_TO_EMAIL
    if (to && process.env.SMTP_HOST) {
      const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/collections/quote-requests/${quote.id}`
      const rows = Object.entries({ ...fields, artwork: art ? `${artwork!.name} (open the request in the admin)` : '' })
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(String(v))}</td></tr>`)
        .join('')
      // The enquiry is already saved, so a mail problem is logged rather than shown to the customer.
      await Promise.all([
        payload.sendEmail({
          to: to.split(',').map((x) => x.trim()),
          replyTo: fields.email,
          subject: fields.topic ? `New message: ${fields.topic} (${fields.name})` : `New quote request: ${fields.product || 'General'} (${fields.name})`,
          html: `<table cellpadding="6">${rows}</table><p><a href="${esc(adminUrl)}">Open in the admin</a></p>`,
        }),
        payload.sendEmail({
          to: fields.email,
          subject: fields.topic ? 'We received your message' : 'We received your quote request',
          html: `<p>Hi ${esc(fields.name)},</p><p>${fields.topic ? "Thanks for your message. We'll get back to you soon." : "Thanks for your enquiry. We'll reply with your price and a free digital proof."}</p><p>Region Packaging</p>`,
        }),
      ]).catch((err) => console.error('[quote] saved, but the email failed', err))
    }
  } catch (err) {
    console.error('[quote] saving or emailing failed', err)
    return NextResponse.json({ error: 'Sorry, something went wrong sending your inquiry. Please try again or email us.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
