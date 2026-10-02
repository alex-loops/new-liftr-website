import { Logo } from './SiteHeader'

export function Footer() {
  return (
    <footer className="footer" data-reveal="up">
      <Logo />
      <p>Product clarity for teams with momentum.</p>
      <p>© {new Date().getFullYear()} Liftr</p>
    </footer>
  )
}
