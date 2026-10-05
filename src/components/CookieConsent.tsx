import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Cookie consent banner. Strictly necessary cookies are always on; analytics
 * and marketing are opt-in and stay off until the visitor chooses.
 * The choice is stored locally; `window.liftrConsent` and the
 * `liftr:consent` event let analytics scripts check it before loading.
 * Policy pages and categories are placeholders until the legal copy is final.
 */
export interface Consent {
  necessary: true
  analytics: boolean
  marketing: boolean
  date: string
  version: 1
}

const KEY = 'liftr-cookie-consent'
export const OPEN_EVENT = 'liftr:cookie-settings'

function load(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const c = JSON.parse(raw) as Consent
    return c.version === 1 ? c : null
  } catch {
    return null
  }
}

function persist(c: Consent) {
  try {
    localStorage.setItem(KEY, JSON.stringify(c))
  } catch {
    /* storage unavailable — the banner will ask again next visit */
  }
  ;(window as Window & { liftrConsent?: Consent }).liftrConsent = c
  window.dispatchEvent(new CustomEvent('liftr:consent', { detail: c }))
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [manage, setManage] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const titleId = useId()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = load()
    if (saved) {
      ;(window as Window & { liftrConsent?: Consent }).liftrConsent = saved
      setAnalytics(saved.analytics)
      setMarketing(saved.marketing)
    } else {
      // appear after the hero has settled rather than on top of the first paint
      const t = window.setTimeout(() => setOpen(true), 900)
      return () => window.clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    const reopen = () => {
      const saved = load()
      setAnalytics(saved?.analytics ?? false)
      setMarketing(saved?.marketing ?? false)
      setManage(true)
      setOpen(true)
      requestAnimationFrame(() => ref.current?.querySelector<HTMLElement>('input, button')?.focus())
    }
    window.addEventListener(OPEN_EVENT, reopen)
    return () => window.removeEventListener(OPEN_EVENT, reopen)
  }, [])

  const save = (a: boolean, m: boolean) => {
    persist({ necessary: true, analytics: a, marketing: m, date: new Date().toISOString(), version: 1 })
    setOpen(false)
    setManage(false)
  }

  return (
    <div
      ref={ref}
      className={`cookie ${open ? 'is-open' : ''} ${manage ? 'is-managing' : ''}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-hidden={!open}
      inert={!open}
    >
      <h2 id={titleId} className="cookie-title">
        Cookies on Liftr
      </h2>
      <p className="cookie-text">
        We use essential cookies to make this site work. With your permission we’d also like to use analytics cookies
        to understand how it’s used. Read our <Link to="/cookies">Cookie policy</Link> and{' '}
        <Link to="/privacy">Privacy policy</Link>.
      </p>

      {manage && (
        <fieldset className="cookie-options">
          <legend className="sr-only">Cookie preferences</legend>
          <label className="cookie-opt is-locked">
            <span>
              <strong>Strictly necessary</strong>
              <small>Needed for the site to work, e.g. remembering this choice. Always on.</small>
            </span>
            <input type="checkbox" checked disabled />
            <span className="switch" aria-hidden />
          </label>
          <label className="cookie-opt">
            <span>
              <strong>Analytics</strong>
              <small>Anonymous usage statistics that help us improve the site.</small>
            </span>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            <span className="switch" aria-hidden />
          </label>
          <label className="cookie-opt">
            <span>
              <strong>Marketing</strong>
              <small>Used to measure campaigns and show relevant content elsewhere.</small>
            </span>
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            <span className="switch" aria-hidden />
          </label>
        </fieldset>
      )}

      <div className="cookie-actions">
        {manage ? (
          <button type="button" className="cookie-btn is-primary" onClick={() => save(analytics, marketing)}>
            Save preferences
          </button>
        ) : (
          <>
            <button type="button" className="cookie-btn is-primary" onClick={() => save(true, true)}>
              Accept all
            </button>
            <button type="button" className="cookie-btn" onClick={() => save(false, false)}>
              Reject non-essential
            </button>
            <button type="button" className="cookie-btn is-link" onClick={() => setManage(true)}>
              Manage preferences
            </button>
          </>
        )}
      </div>
    </div>
  )
}
