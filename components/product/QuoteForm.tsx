'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { isStaticPreview, withBase } from '@/lib/asset'
import { ArrowRight } from '@/components/ui/glyphs'

export const MAX_ARTWORK_BYTES = 15 * 1024 * 1024
const ACCEPT = '.pdf,.eps,.png,.jpg,.jpeg,application/pdf,application/postscript,image/png,image/jpeg'
const ALLOWED_EXT = /\.(pdf|eps|png|jpe?g)$/i

// Fields, labels and placeholders follow the SEO team's form exactly (17 Nov 2026).
const SIZE_FIELDS = [
  { name: 'length', label: 'Length', placeholder: 'Length' },
  { name: 'width', label: 'Width', placeholder: 'Width' },
  { name: 'depth', label: 'Depth / Height', placeholder: 'Depth' },
] as const
// Category pages only (SEO team's sample form, 18 Nov 2026): a unit after the size, printing after quantity.
const UNITS = ['in', 'cm', 'mm']
const PRINTING = ['Outside Only', 'Inside & Outside']

type Props = {
  product?: string
  sampleLinkLabel?: string
  note?: string
  defaultMessage?: string
  /** Category pages: also ask for the size unit and where the box is printed. */
  categoryFields?: boolean
}

type Status = { state: 'idle' | 'sending' | 'sent' } | { state: 'error'; message: string }

const Req = () => (
  <span className="field__req" aria-hidden="true">
    *
  </span>
)

export function QuoteForm({ product, sampleLinkLabel, note, defaultMessage, categoryFields = false }: Props) {
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
    if (isStaticPreview) {
      return setStatus({ state: 'error', message: 'This is a design preview, so the form does not send yet. It will work on the live site.' })
    }
    setStatus({ state: 'sending' })
    const fd = new FormData(e.currentTarget)
    fd.delete('artwork')
    fd.set('pageUrl', window.location.href)
    if (file) fd.set('artwork', file)
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

      <div className="quote-form__grid quote-form__grid--pairs">
        <label className="field field--phone-wide">
          <span className="field__label">Name</span>
          <input className="input input--name" name="name" placeholder="Name*" required autoComplete="name" maxLength={200} />
        </label>
        <label className="field field--phone-wide">
          <span className="field__label">Email</span>
          <input className="input input--email" name="email" type="email" placeholder="Email*" required autoComplete="email" maxLength={200} />
        </label>
        {SIZE_FIELDS.map((f) => (
          <label key={f.name} className="field">
            <span className="field__label">
              {f.label} <Req />
            </span>
            <input className="input input--plain" name={f.name} type="number" inputMode="decimal" min="0" step="any" placeholder={f.placeholder} required />
          </label>
        ))}
        {categoryFields && <ChoiceField name="unit" label="Unit" options={UNITS} />}
        {/* On phones, Quantity and Printing get a row each so "Inside & Outside" fits. */}
        <label className={categoryFields ? 'field field--phone-wide' : 'field'}>
          <span className="field__label">
            Quantity <Req />
          </span>
          <input className="input input--plain" name="quantity" type="number" inputMode="numeric" min="1" step="1" placeholder="Quantity" required />
        </label>
        {categoryFields && <ChoiceField name="printing" label="Printing" options={PRINTING} wide />}

        <div className="field field--wide">
          <span className="field__label">Upload File / Design</span>
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
            <img src={withBase('/icons/upload.svg')} alt="" width={34} height={34} />
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
            <span>Supported formats: PDF, EPS, PNG or JPG</span>
            <span>Maximum Size: 15mb</span>
          </div>
          {fileError && <p className="field__error">{fileError}</p>}
        </div>

        <label className="field field--wide">
          <span className="field__label">Message / Project Details</span>
          <textarea className="input textarea" name="message" placeholder="Any special instructions or requirements…" rows={4} maxLength={2000} defaultValue={defaultMessage} />
        </label>
      </div>

      {status.state === 'error' && (
        <p className="field__error" role="alert">
          {status.message}
        </p>
      )}

      <div className="quote-form__actions">
        <button type="submit" className="btn btn--primary btn--sm" disabled={status.state === 'sending'}>
          {status.state === 'sending' ? 'Sending…' : 'Submit'}
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

/** A dropdown in the same pill style as the other fields. The first option is preselected. */
function ChoiceField({ name, label, options, wide = false }: { name: string; label: string; options: string[]; wide?: boolean }) {
  return (
    <label className={wide ? 'field field--phone-wide' : 'field'}>
      <span className="field__label">{label}</span>
      <span className="select">
        <select name={name} defaultValue={options[0]}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </span>
    </label>
  )
}
