import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { writeClient } from '@/lib/sanity/client'

// Adapted from region-backend.zip: zod validation, honeypot, artwork upload to Sanity,
// team + customer emails via Resend. Without credentials (local preview) it logs the
// enquiry instead, so the form can be tried end to end before accounts exist.

const MAX = 15 * 1024 * 1024
const OK_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'application/postscript', 'application/eps', 'image/eps', 'image/x-eps']
const OK_EXT = /\.(pdf|eps|png|jpe?g)$/i
const s = z.string().trim().max(2000)
const schema = z.object({
  name: s.min(1),
  email: z.email().max(200),
  phone: s.optional(),
  company: s.optional(),
  product: s.optional(),
  material: s.optional(),
  size: s.optional(),
  printing: s.optional(),
  productionSpeed: s.optional(),
  quantity: s.optional(),
  design: s.optional(),
  message: s.optional(),
  pageUrl: s.optional(),
  artworkUrl: s.optional(),
  website: s.optional(), // honeypot
})

const esc = (v = '') => v.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/** Only accept artwork links that our own Blob store issued. */
const isBlobUrl = (u: string) => {
  try {
    const url = new URL(u)
    return url.protocol === 'https:' && url.hostname.endsWith('.public.blob.vercel-storage.com')
  } catch {
    return false
  }
}

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
  const { website, artworkUrl: clientArtworkUrl, ...fields } = parsed.data
  if (website) return NextResponse.json({ ok: true }) // bot caught, silently accept

  const sanity = writeClient()
  const resendKey = process.env.RESEND_API_KEY
  const to = process.env.QUOTE_TO_EMAIL
  const from = process.env.QUOTE_FROM_EMAIL
  const emailReady = !!(resendKey && to && from)

  if (!sanity && !emailReady && process.env.NODE_ENV === 'production') {
    console.error('[quote] No Sanity write token and no Resend settings: enquiry could not be delivered.')
    return NextResponse.json({ error: 'Sorry, our quote form is not available right now. Please email or call us.' }, { status: 503 })
  }

  let artworkUrl = ''
  if (clientArtworkUrl) {
    if (!isBlobUrl(clientArtworkUrl)) return NextResponse.json({ error: 'Artwork upload failed. Please try again.' }, { status: 400 })
    artworkUrl = clientArtworkUrl
  }
  const file = fd.get('artwork')
  if (!artworkUrl && file instanceof File && file.size > 0) {
    if (file.size > MAX || !(OK_TYPES.includes(file.type) || OK_EXT.test(file.name)))
      return NextResponse.json({ error: 'Artwork must be PDF, EPS, PNG or JPG up to 15MB.' }, { status: 400 })
    if (sanity) {
      const asset = await sanity.assets.upload('file', Buffer.from(await file.arrayBuffer()), { filename: file.name })
      artworkUrl = asset.url
    } else {
      artworkUrl = `(not stored: ${file.name}, ${(file.size / 1024 / 1024).toFixed(1)}MB; no Sanity token set)`
    }
  }

  const record = { ...fields, artworkUrl, submittedAt: new Date().toISOString() }

  if (!sanity && !emailReady) {
    console.info('[quote] Preview mode, enquiry not delivered anywhere:', record)
    return NextResponse.json({ ok: true, preview: true })
  }

  try {
    if (sanity) await sanity.create({ _type: 'quoteRequest', ...record, handled: false })
    if (emailReady) {
      const resend = new Resend(resendKey)
      const rows = Object.entries({ ...fields, artwork: artworkUrl })
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(String(v))}</td></tr>`)
        .join('')
      await Promise.all([
        resend.emails.send({
          from: from!,
          to: to!.split(',').map((x) => x.trim()),
          replyTo: fields.email,
          subject: `New quote request: ${fields.product || 'General'} (${fields.name})`,
          html: `<table cellpadding="6">${rows}</table>`,
        }),
        resend.emails.send({
          from: from!,
          to: fields.email,
          subject: 'We received your quote request',
          html: `<p>Hi ${esc(fields.name)},</p><p>Thanks for your enquiry. We'll reply with your price and a free digital proof.</p><p>Region Packaging</p>`,
        }),
      ])
    }
  } catch (err) {
    console.error('[quote] delivery failed', err)
    return NextResponse.json({ error: 'Sorry, something went wrong sending your inquiry. Please try again or email us.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
