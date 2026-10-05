import { Link } from 'react-router-dom'
import { Logo } from './SiteHeader'
import { ModeSwitch } from './ModeToggle'
import { openCookieSettings } from './CookieConsent'

export function Footer() {
  return (
    <footer className="footer footer-v3" data-reveal="up">
      <div className="footer-top">
        <Logo />
        <p>A product-led development studio for ambitious pre-seed and seed founders.</p>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Liftr</p>
        <nav className="footer-links" aria-label="Legal">
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/cookies">Cookie policy</Link>
          <button type="button" onClick={openCookieSettings}>
            Cookie settings
          </button>
        </nav>
        <ModeSwitch />
      </div>
    </footer>
  )
}
