'use client'

import { useState } from 'react'
import { isStaticPreview } from '@/lib/asset'
import type { ContactPage } from '@/lib/types'

type Status = { state: 'idle' | 'sending' | 'sent' } | { state: 'error'; message: string }

/** The Contact Us form. Messages go to /api/quote with a `topic`, so they land under Quote requests. */
export function ContactForm({ topics, buttonLabel }: Pick<ContactPage, 'topics' | 'buttonLabel'>) {
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status.state === 'sending') return
    if (isStaticPreview) {
      return setStatus({ state: 'error', message: 'This is a design preview, so the form does not send yet. It will work on the live site.' })
    }
    setStatus({ state: 'sending' })
    const form = e.currentTarget
    const fd = new FormData(form)
    fd.set('pageUrl', window.location.href)
    try {
      const res = await fetch('/api/quote', { method: 'POST', body: fd })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.')
      setStatus({ state: 'sent' })
      form.reset()
    } catch (err) {
      setStatus({ state: 'error', message: err instanceof Error ? err.message : 'Something went wrong. Please try again.' })
    }
  }

  if (status.state === 'sent') {
    return (
      <div className="quote-form__done" role="status">
        <p className="quote-form__done-title">Thanks for your message.</p>
        <p>We&rsquo;ll get back to you soon.</p>
        <button type="button" className="btn btn--outline btn--sm" onClick={() => setStatus({ state: 'idle' })}>
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      {/* Honeypot: hidden from people, bots fill it in. */}
      <div className="hp" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="quote-form__grid">
        <label className="field">
          <span className="contact-form__label">
            Full Name <span className="contact-form__req">*</span>
          </span>
          <input className="input" name="name" placeholder="e.g. John Doe" required autoComplete="name" maxLength={200} />
        </label>
        <label className="field">
          <span className="contact-form__label">
            Email <span className="contact-form__req">*</span>
          </span>
          <input className="input" name="email" type="email" placeholder="you@company.com" required autoComplete="email" maxLength={200} />
        </label>
        <label className="field field--wide">
          <span className="contact-form__label">Phone</span>
          <input className="input" name="phone" type="tel" placeholder="+123 - 456 - 789" autoComplete="tel" maxLength={50} />
        </label>
        {topics.length > 0 ? (
          <label className="field field--wide">
            <span className="contact-form__label">Topic</span>
            <span className="select">
              <select name="topic" defaultValue={topics[0]}>
                {topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </span>
          </label>
        ) : (
          <input type="hidden" name="topic" value="Contact form" />
        )}
        <label className="field field--wide">
          <span className="contact-form__label">
            Message <span className="contact-form__req">*</span>
          </span>
          <textarea className="input textarea" name="message" placeholder="How can we help?" rows={4} required maxLength={2000} />
        </label>
      </div>

      {status.state === 'error' && (
        <p className="field__error" role="alert">
          {status.message}
        </p>
      )}

      <button type="submit" className="btn btn--primary contact-form__submit" disabled={status.state === 'sending'}>
        {status.state === 'sending' ? 'Sending…' : buttonLabel || 'Send Message'}
      </button>
    </form>
  )
}
