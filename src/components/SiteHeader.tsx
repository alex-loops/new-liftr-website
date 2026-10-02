import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { milestones } from '../data/content'
import { Button } from './Button'
import { ChevronDown, LiftrMark } from './Icons'
import { onFrameScroll } from '../lib/motion'

function Logo() {
  return (
    <Link to="/" aria-label="Liftr home" className="logo" viewTransition>
      <LiftrMark className="logo-mark" />
      <img src={`${import.meta.env.BASE_URL}assets/liftr-wordmark.svg`} alt="Liftr" className="logo-word" width={47} height={20} />
    </Link>
  )
}

export { Logo }

export function SiteHeader() {
  const { pathname } = useLocation()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [section, setSection] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const lastY = useRef(0)

  const onMilestone = milestones.some((m) => pathname === `/${m.slug}`)

  /* hide on scroll down, reveal on scroll up; compact once scrolled */
  useEffect(() => {
    return onFrameScroll(() => {
      const y = window.scrollY
      const dy = y - lastY.current
      setScrolled(y > 12)
      if (Math.abs(dy) > 6) {
        setHidden(dy > 0 && y > 160)
        lastY.current = y
      }
      // scroll-spy for in-page sections on the home page
      if (pathname === '/') {
        const probe = window.innerHeight * 0.35
        let current: string | null = null
        for (const id of ['about', 'process']) {
          const el = document.getElementById(id)
          if (!el) continue
          const r = el.getBoundingClientRect()
          if (r.top <= probe && r.bottom > probe) current = id
        }
        setSection(current)
      } else setSection(null)
    })
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
    setDropOpen(false)
  }, [pathname])

  /* mobile sheet: lock scroll + Esc */
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen)
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  /* dropdown: close on outside click / Esc */
  useEffect(() => {
    if (!dropOpen) return
    const onDoc = (e: MouseEvent) => {
      if (!dropRef.current?.contains(e.target as Node)) setDropOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropOpen(false)
        dropRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
      }
    }
    document.addEventListener('mousedown', onDoc)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      window.removeEventListener('keydown', onKey)
    }
  }, [dropOpen])

  /* hover pill that glides between nav items */
  const movePill = useCallback((target: HTMLElement | null) => {
    const nav = navRef.current
    const pill = pillRef.current
    if (!nav || !pill) return
    if (!target) {
      pill.style.opacity = '0'
      return
    }
    const n = nav.getBoundingClientRect()
    const r = target.getBoundingClientRect()
    pill.style.opacity = '1'
    pill.style.setProperty('--x', `${r.left - n.left}px`)
    pill.style.setProperty('--w', `${r.width}px`)
  }, [])

  const hoverProps = {
    onPointerEnter: (e: React.PointerEvent<HTMLElement>) => movePill(e.currentTarget),
    onFocus: (e: React.FocusEvent<HTMLElement>) => movePill(e.currentTarget),
  }

  const cls = ['site-header', hidden && !menuOpen && !dropOpen && 'is-hidden', scrolled && 'is-scrolled', menuOpen && 'is-menu']
    .filter(Boolean)
    .join(' ')

  return (
    <header className={cls}>
      <div className="nav-shell">
        <Logo />
        <nav className="desktop-nav" ref={navRef} aria-label="Primary" onPointerLeave={() => movePill(null)}>
          <span className="nav-pill" ref={pillRef} aria-hidden />
          <Link to="/#about" className={`nav-link ${section === 'about' ? 'is-active' : ''}`} {...hoverProps}>
            About Liftr
          </Link>
          <Link to="/#process" className={`nav-link ${section === 'process' ? 'is-active' : ''}`} {...hoverProps}>
            Process
          </Link>
          <div
            className={`nav-dropdown ${dropOpen ? 'is-open' : ''}`}
            ref={dropRef}
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') setDropOpen(true)
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') setDropOpen(false)
            }}
          >
            <button
              type="button"
              className={`nav-link nav-trigger ${onMilestone ? 'is-active' : ''}`}
              aria-expanded={dropOpen}
              aria-controls="milestone-menu"
              onClick={() => setDropOpen((v) => !v)}
              {...hoverProps}
            >
              Validate your startup <ChevronDown className="nav-chevron" />
            </button>
            <div className="dropdown-panel" id="milestone-menu" role="menu">
              {milestones.map((m, i) => (
                <Link
                  key={m.slug}
                  to={`/${m.slug}`}
                  role="menuitem"
                  viewTransition
                  className={pathname === `/${m.slug}` ? 'is-current' : ''}
                  style={{ '--i': i } as CSSProperties}
                  tabIndex={dropOpen ? 0 : -1}
                >
                  <span className="dd-index">{m.index}</span>
                  <span className="dd-text">
                    {m.name}
                    <small>{m.proof}</small>
                  </span>
                  <span className="dd-meta">{m.duration}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
        <div className="desktop-cta">
          <Button href="#contact" size="sm">
            Talk to a Product Leader
          </Button>
        </div>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-sheet"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
      <div
        className="mobile-sheet"
        id="mobile-sheet"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) setMenuOpen(false)
        }}
      >
        <nav aria-label="Mobile">
          {[
            { to: '/#about', label: 'About Liftr' },
            { to: '/#process', label: 'Process' },
            ...milestones.map((m) => ({ to: `/${m.slug}`, label: m.name, meta: m.proof })),
          ].map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              style={{ '--i': i } as CSSProperties}
              onClick={() => setMenuOpen(false)}
              className={pathname === l.to ? 'is-current' : ''}
            >
              <span>{l.label}</span>
              {'meta' in l && l.meta ? <small>{l.meta}</small> : null}
            </Link>
          ))}
        </nav>
        <div className="mobile-sheet-cta" style={{ '--i': 7 } as CSSProperties}>
          <Button href="#contact">Talk to a Product Leader</Button>
          <a href="mailto:hello@liftr.studio" className="contact-link">
            hello@liftr.studio
          </a>
        </div>
      </div>
    </header>
  )
}
