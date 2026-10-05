import { Link } from 'react-router-dom'
import { usePageMotion } from '../hooks/usePageMotion'
import { openCookieSettings } from '../components/CookieConsent'

interface Props {
  kind: 'privacy' | 'cookies'
}

const COPY = {
  privacy: {
    title: 'Privacy policy',
    sections: [
      'Who we are and how to contact us',
      'What personal data we collect',
      'How and why we use it (lawful basis)',
      'Who we share it with',
      'How long we keep it',
      'International transfers',
      'Your rights under UK GDPR',
      'How to complain',
    ],
  },
  cookies: {
    title: 'Cookie policy',
    sections: [
      'What cookies are',
      'Strictly necessary cookies we use',
      'Analytics cookies (with your consent)',
      'Marketing cookies (with your consent)',
      'Managing or withdrawing consent',
      'Changes to this policy',
    ],
  },
} as const

/** Placeholder legal pages — structure only, to be replaced with approved copy. */
export default function LegalPage({ kind }: Props) {
  const c = COPY[kind]
  usePageMotion(`${c.title} · Liftr`)
  return (
    <article className="legal">
      <p className="eyebrow">Legal</p>
      <h1>{c.title}</h1>
      <p className="legal-note">
        <span className="ph-tag">Placeholder</span> This page will be replaced with Liftr’s approved {c.title.toLowerCase()}.
        For questions in the meantime, <Link to="/contact">get in touch</Link>.
      </p>
      <ol className="legal-sections">
        {c.sections.map((s) => (
          <li key={s}>
            <h2>{s}</h2>
            <p>
              <span className="ph-inline">[To be written.]</span>
            </p>
          </li>
        ))}
      </ol>
      <p className="legal-foot">
        {kind === 'cookies' ? (
          <button type="button" className="text-link" onClick={openCookieSettings}>
            Change your cookie settings
          </button>
        ) : (
          <Link to="/cookies" className="text-link">
            Read the cookie policy
          </Link>
        )}
      </p>
    </article>
  )
}
