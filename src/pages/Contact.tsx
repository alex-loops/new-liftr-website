import { useId, useRef, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { activeMilestones } from '../data/content'
import { CONTACT_EMAIL, CONTACT_ENDPOINT, sendEnquiry, type Enquiry } from '../lib/contact'
import { usePageMotion } from '../hooks/usePageMotion'
import { SplitText } from '../components/SplitText'
import { ArrowRight, Check } from '../components/Icons'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'not-configured'
type Errors = Partial<Record<keyof Enquiry | 'consent', string>>

const STAGES = ['Idea / pre-product', 'Pre-seed', 'Seed', 'Series A or later']

export default function Contact() {
  usePageMotion('Get in touch · Liftr')
  const [params] = useSearchParams()
  const initialPlan = activeMilestones.some((m) => m.slug === params.get('plan')) ? params.get('plan')! : ''
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const formRef = useRef<HTMLFormElement>(null)
  const uid = useId()
  const id = (n: string) => `${uid}-${n}`

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('website')) return // honeypot: bots fill hidden fields
    const data: Enquiry = {
      name: String(f.get('name') ?? '').trim(),
      email: String(f.get('email') ?? '').trim(),
      company: String(f.get('company') ?? '').trim(),
      stage: String(f.get('stage') ?? ''),
      plan: String(f.get('plan') ?? ''),
      message: String(f.get('message') ?? '').trim(),
    }
    const next: Errors = {}
    if (!data.name) next.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'Enter a valid email address, like you@company.com.'
    if (data.message.length < 10) next.message = 'Tell us a little about what you’re building (at least a sentence).'
    if (!f.get('consent')) next.consent = 'Please confirm we can use these details to reply to you.'
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    if (!CONTACT_ENDPOINT) {
      setStatus('not-configured')
      return
    }
    setStatus('sending')
    try {
      await sendEnquiry(data)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p className="field-error" id={id(`${k}-err`)}>
        {errors[k]}
      </p>
    ) : null
  const aria = (k: keyof Errors) =>
    errors[k] ? { 'aria-invalid': true, 'aria-describedby': id(`${k}-err`) } : {}

  return (
    <section className="contact-page">
      <div className="contact-page-intro">
        <p className="eyebrow" data-reveal="up">
          Get in touch
        </p>
        <SplitText as="h1" text="Tell us what you’re building." />
        <p className="contact-page-lead" data-reveal="up" style={{ ['--d' as string]: '200ms' }}>
          A senior product leader will read your message and reply by email to arrange a call. No sales team, no
          obligation.
        </p>
        <ul className="contact-next" data-reveal="up" style={{ ['--d' as string]: '280ms' }}>
          <li>
            <Check /> Share where you are and what you need
          </li>
          <li>
            <Check /> We reply to set up a short call
          </li>
          <li>
            <Check /> You get an honest view of the right next step
          </li>
        </ul>
        <p className="contact-page-alt" data-reveal="up" style={{ ['--d' as string]: '340ms' }}>
          Prefer email? Write to <span className="select-all">{CONTACT_EMAIL}</span>
        </p>
      </div>

      <div className="contact-card" data-reveal="rise">
        {status === 'sent' ? (
          <div className="form-done" role="status">
            <span className="form-done-icon">
              <Check />
            </span>
            <h2>Thanks - we’ve got it.</h2>
            <p>We’ll reply to the email you gave us to arrange a call.</p>
            <Link to="/" className="phase-link">
              Back to the homepage <ArrowRight />
            </Link>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={id('req')}>
            <p className="form-req" id={id('req')}>
              Fields marked * are required.
            </p>
            <div className="form-row">
              <div className="field">
                <label htmlFor={id('name')}>Name *</label>
                <input id={id('name')} name="name" autoComplete="name" {...aria('name')} />
                {err('name')}
              </div>
              <div className="field">
                <label htmlFor={id('email')}>Work email *</label>
                <input id={id('email')} name="email" type="email" autoComplete="email" {...aria('email')} />
                {err('email')}
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor={id('company')}>Company</label>
                <input id={id('company')} name="company" autoComplete="organization" />
              </div>
              <div className="field">
                <label htmlFor={id('stage')}>Stage</label>
                <select id={id('stage')} name="stage" defaultValue="">
                  <option value="">Select…</option>
                  {STAGES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <fieldset className="field plan-pick">
              <legend>Which plan are you interested in?</legend>
              <div className="plan-options">
                {[...activeMilestones.map((m) => ({ value: m.slug, label: m.name, meta: m.duration })), { value: 'not-sure', label: 'Not sure yet', meta: 'Help me choose' }].map((o) => (
                  <label key={o.value} className="plan-option">
                    <input type="radio" name="plan" value={o.value} defaultChecked={o.value === (initialPlan || 'not-sure')} />
                    <span>
                      <strong>{o.label}</strong>
                      <small>{o.meta}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor={id('message')}>What are you building? *</label>
              <textarea id={id('message')} name="message" rows={5} {...aria('message')} />
              {err('message')}
            </div>
            <div className="hp" aria-hidden>
              <label>
                Website <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="field">
              <label className="consent">
                <input type="checkbox" name="consent" {...aria('consent')} />
                <span>
                  I agree to Liftr using these details to reply to my enquiry, as described in the{' '}
                  <Link to="/privacy">Privacy policy</Link>.
                </span>
              </label>
              {err('consent')}
            </div>

            {status === 'not-configured' && (
              <p className="form-notice" role="status">
                This form isn’t connected yet, so nothing was sent. Once it’s live, messages go to {CONTACT_EMAIL}.
              </p>
            )}
            {status === 'error' && (
              <p className="form-notice is-error" role="alert">
                Your message didn’t send. Check your connection and try again, or email {CONTACT_EMAIL}.
              </p>
            )}

            <button type="submit" className="button form-submit" disabled={status === 'sending'}>
              <span className="button-label">{status === 'sending' ? 'Sending…' : 'Send message'}</span>
              <span className="button-icon" aria-hidden>
                <ArrowRight className="button-arrow a1" />
                <ArrowRight className="button-arrow a2" />
              </span>
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
