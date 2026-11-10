import { Button } from '../components/Button'
import { usePageMotion } from '../hooks/usePageMotion'

export default function NotFound() {
  usePageMotion('Page not found · Liftr')
  return (
    <article className="legal not-found">
      <p className="eyebrow">404</p>
      <h1>This page doesn’t exist.</h1>
      <p className="legal-intro">The link may be out of date, or the page may have moved.</p>
      <div className="not-found-actions">
        <Button href="/">Back to the homepage</Button>
        <Button href="/contact" variant="subtle" arrow={false}>
          Get in touch
        </Button>
      </div>
    </article>
  )
}
