import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from './components/SiteHeader'
import { Footer } from './components/Footer'
import { CookieConsent } from './components/CookieConsent'
import { prefersReducedMotion, scanReveals } from './lib/motion'

/** Hash links (/#about) scroll smoothly; new routes start at the top. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const go = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
      }
      requestAnimationFrame(() => requestAnimationFrame(go))
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('js')
    scanReveals()
  }, [])
  return (
    <main className="site">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <ScrollManager />
      <SiteHeader />
      <div id="content" className="route">
        <Outlet />
      </div>
      <Footer />
      <CookieConsent />
    </main>
  )
}
