'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { upload } from '@vercel/blob/client'
import type { FormOptions } from '@/lib/types'
import { ArrowRight } from '@/components/ui/glyphs'

export const MAX_ARTWORK_BYTES = 15 * 1024 * 1024
const ACCEPT = '.pdf,.eps,.png,.jpg,.jpeg,application/pdf,application/postscript,image/png,image/jpeg'
const ALLOWED_EXT = /\.(pdf|eps|png|jpe?g)$/i

const SELECTS: { key: keyof FormOptions; label: string; icon: string }[] = [
  { key: 'material', label: 'Material', icon: '/icons/feature-layers.svg' },
  { key: 'size', label: 'Size', icon: '/icons/feature-box-search.svg' },
  { key: 'printing', label: 'Printing', icon: '/icons/feature-print.svg' },
  { key: 'productionSpeed', label: 'Production Speed', icon: '/icons/feature-fast.svg' },
  { key: 'quantity', label: 'Quantity', icon: '/icons/feature-boxes.svg' },
  { key: 'design', label: 'Design', icon: '/icons/feature-box-design.svg' },
]

type Props = {
  product?: string
  /** Shown as a "Product" select on the standalone /quote page. */
  productChoices?: string[]
  options: FormOptions
  sampleLinkLabel?: string
  note?: string
  defaultMessage?: string
}

type Status = { state: 'idle' | 'sending' | 'sent' } | { state: 'error'; message: string }

/** Try a direct-to-storage upload (needed for files over Vercel's 4.5MB request limit). */
async function uploadArtwork(file: File): Promise<string | null> {
  try {
    const safeName = file.name.replace(/[^\w.-]+/g, '-')
    const blob = await upload(`artwork/${safeName}`, file, { access: 'public', handleUploadUrl: '/api/artwork' })
    return blob.url
  } catch {
    return null // storage not configured: the file goes with the form instead
  }
}

export function QuoteForm({ product, productChoices, options, sampleLinkLabel, note, defaultMessage }: Props) {
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')
  const [dragging, setDragging] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function pickFile(f: File | undefined) {
    setFileError('')
    if (!f) return setFile(null)
    if (!ALLOWED_EXT.test(f.name)) return setFileError('Supported formats: PDF, EPS, PNG or JPG.')
    if (f.size > MAX_ARTWORK_BYTES) return setFileError('Maximum size is 15MB.')
    setFile(f)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status.state === 'sending') return
    setStatus({ state: 'sending' })
    const fd = new FormData(e.currentTarget)
    fd.delete('artwork')
    fd.set('pageUrl', window.location.href)
    if (file) {
      const url = await uploadArtwork(file)
      if (url) fd.set('artworkUrl', url)
      else fd.set('artwork', file)
    }
    try {
      const res = await fetch('/api/quote', { method: 'POST', body: fd })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || (res.status === 413 ? 'That file is too large to send. Please email it to us instead.' : 'Something went wrong. Please try again.'))
      setStatus({ state: 'sent' })
      formRef.current?.reset()
      setFile(null)
    } catch (err) {
      setStatus({ state: 'error', message: err instanceof Error ? err.message : 'Something went wrong. Please try again.' })
    }
  }

  if (status.state === 'sent') {
    return (
      <div className="quote-form__done" role="status">
        <p className="quote-form__done-title">Thanks for your enquiry.</p>
        <p>We&rsquo;ll reply with your price and a free digital proof.</p>
        <button type="button" className="btn btn--outline btn--sm" onClick={() => setStatus({ state: 'idle' })}>
          Send another inquiry
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} className="quote-form" onSubmit={onSubmit}>
      {product && <input type="hidden" name="product" value={product} />}
      {/* Honeypot: hidden from people, bots fill it in. */}
      <div className="hp" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="quote-form__grid">
        {productChoices && (
          <label className="field field--wide">
            <span className="field__label">Product</span>
            <span className="select">
              <select name="product" defaultValue="">
                <option value="">Not sure yet</option>
                {productChoices.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </span>
          </label>
        )}
        {SELECTS.map(({ key, label, icon }) =>
          options[key]?.length ? (
            <label key={key} className="field">
              <span className="field__label">{label}</span>
              <span className="select">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="select__icon" src={icon} alt="" width={18} height={18} />
                <select name={key} defaultValue={options[key][0]}>
                  {options[key].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </span>
            </label>
          ) : null,
        )}
      </div>

      <label
        className={`dropzone ${dragging ? 'is-dragging' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          pickFile(e.dataTransfer.files[0])
        }}
      >
        <input type="file" name="artwork" accept={ACCEPT} className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/upload.svg" alt="" width={34} height={34} />
        {file ? (
          <span className="dropzone__file">
            {file.name} ({(file.size / 1024 / 1024).toFixed(1)}MB) <span className="dropzone__change">Change</span>
          </span>
        ) : (
          <span>
            <u>Choose a file</u> or drag &amp; drop
          </span>
        )}
      </label>
      <div className="dropzone__meta">
        <span>Supported formates: PDF, EPS, PNG or JPG</span>
        <span>Maximum Size: 15mb</span>
      </div>
      {fileError && <p className="field__error">{fileError}</p>}

      <p className="quote-form__heading">Your Details</p>
      <div className="quote-form__grid">
        <label className="field">
          <span className="sr-only">Full name</span>
          <input className="input input--name" name="name" placeholder="Full name" required autoComplete="name" maxLength={200} />
        </label>
        <label className="field">
          <span className="sr-only">Phone/mobile number</span>
          <input className="input input--phone" name="phone" type="tel" placeholder="Phone/mobile number" autoComplete="tel" maxLength={50} />
        </label>
        <label className="field field--wide">
          <span className="sr-only">Email Address</span>
          <input className="input input--email" name="email" type="email" placeholder="Email Address" required autoComplete="email" maxLength={200} />
        </label>
        <label className="field field--wide">
          <span className="sr-only">Message</span>
          <textarea className="input textarea" name="message" placeholder="Tell us about your packaging needs!" rows={4} maxLength={2000} defaultValue={defaultMessage} />
        </label>
      </div>

      {status.state === 'error' && (
        <p className="field__error" role="alert">
          {status.message}
        </p>
      )}

      <div className="quote-form__actions">
        <button type="submit" className="btn btn--primary btn--sm" disabled={status.state === 'sending'}>
          {status.state === 'sending' ? 'Sending…' : 'Send Inquiry'}
        </button>
        {sampleLinkLabel && (
          <Link href="/quote?type=sample" className="quote-form__sample">
            {sampleLinkLabel} <ArrowRight />
          </Link>
        )}
      </div>
      {note && <p className="quote-form__note">{note}</p>}
    </form>
  )
}
