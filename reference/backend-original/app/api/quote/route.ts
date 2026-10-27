import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@sanity/client'
import { Resend } from 'resend'

const sanity = createClient({ projectId: process.env.SANITY_PROJECT_ID!, dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN, apiVersion: '2024-01-01', useCdn: false })
const resend = new Resend(process.env.RESEND_API_KEY)
const MAX = 15 * 1024 * 1024
const OK = ['application/pdf', 'image/png', 'image/jpeg', 'application/postscript', 'application/eps', 'image/eps']
const s = z.string().trim().max(2000)
const schema = z.object({ name: s.min(1), email: z.string().email(), phone: s.optional(), company: s.optional(),
  product: s.optional(), boxStyle: s.optional(), material: s.optional(), size: s.optional(), quantity: s.optional(),
  message: s.optional(), pageUrl: s.optional(), website: s.optional() /* honeypot */ })
const esc = (v = '') => v.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

export async function POST(req: Request) {
  const fd = await req.formData()
  const parsed = schema.safeParse(Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === 'string')))
  if (!parsed.success) return NextResponse.json({ error: 'Please check the form fields.' }, { status: 400 })
  const d = parsed.data
  if (d.website) return NextResponse.json({ ok: true }) // bot caught, silently accept

  let artworkUrl = ''
  const file = fd.get('artwork')
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX || !OK.includes(file.type)) return NextResponse.json({ error: 'Artwork must be PDF, EPS, PNG or JPG up to 15MB.' }, { status: 400 })
    const asset = await sanity.assets.upload('file', Buffer.from(await file.arrayBuffer()), { filename: file.name })
    artworkUrl = asset.url
  }
  const { website, ...fields } = d
  await sanity.create({ _type: 'quoteRequest', ...fields, artworkUrl, submittedAt: new Date().toISOString() })

  const rows = Object.entries({ ...fields, artwork: artworkUrl }).filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(String(v))}</td></tr>`).join('')
  const from = process.env.QUOTE_FROM_EMAIL!
  await Promise.all([
    resend.emails.send({ from, to: process.env.QUOTE_TO_EMAIL!.split(','), replyTo: d.email,
      subject: `New quote request: ${d.product || 'General'} (${d.name})`, html: `<table cellpadding="6">${rows}</table>` }),
    resend.emails.send({ from, to: d.email, subject: 'We received your quote request',
      html: `<p>Hi ${esc(d.name)},</p><p>Thanks for your enquiry. We'll reply with your price and a free digital proof.</p><p>Region Packaging</p>` }),
  ])
  return NextResponse.json({ ok: true })
}
