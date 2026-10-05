import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Look, Milestone } from '../data/content'
import { Button } from './Button'
import { ArrowRight, ArrowUpRight, Check, Plus } from './Icons'
import { GlassStage } from './GlassStage'
import { SplitText } from './SplitText'
import { hasFinePointer, onFrameScroll, prefersReducedMotion, viewProgress } from '../lib/motion'

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties
const i = (n: number) => ({ '--i': n }) as CSSProperties

/* ------------------------------------------------------------ spotlight */

/** Writes the pointer position into --mx/--my so CSS can draw a border light. */
function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !hasFinePointer()) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('pointermove', move)
    return () => el.removeEventListener('pointermove', move)
  }, [])
  return ref
}

/* ---------------------------------------------------------------- thesis */

/** Statement whose words light up as it scrolls through the reading line. */
export function Thesis() {
  const ref = useRef<HTMLHeadingElement>(null)
  const text =
    'Products don’t fail because founders lack ideas. They fail when conviction gets mistaken for proof.'
  const words = text.split(' ')
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.style.setProperty('--p', '1')
      return
    }
    return onFrameScroll(() => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // starts when the heading enters the lower third, done by the upper third
      const p = (vh * 0.82 - r.top) / (r.height + vh * 0.4)
      el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4))
    })
  }, [])
  return (
    <section id="about" className="thesis-section">
      <div>
        <p className="eyebrow" data-reveal="up">
          The Liftr thesis
        </p>
      </div>
      <div>
        <h2 ref={ref} className="thesis-words" style={{ '--n': words.length } as CSSProperties}>
          {words.map((w, k) => (
            <span key={k}>
              <span className="tw" style={i(k)}>
                {w}
              </span>
              {k < words.length - 1 ? ' ' : null}
            </span>
          ))}
        </h2>
        <p data-reveal="up" style={d(120)}>
          We pair strategic product thinking with rapid, deliberate execution - matching the work to the evidence you
          need at each stage.
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ phase card */

export function PhaseCard({ m, n }: { m: Milestone; n: number }) {
  const ref = useSpotlight<HTMLAnchorElement>()
  return (
    <Link
      ref={ref}
      to={`/${m.slug}`}
      className="phase-card spot"
      data-reveal="card"
      style={i(n)}
      viewTransition
    >
      <div>
        <span>{m.index}</span>
        <small>{m.duration}</small>
      </div>
      <span className="phase-corner" aria-hidden>
        <ArrowUpRight />
      </span>
      <h3>{m.name}</h3>
      <p className="phase-label">{m.proof}</p>
      <p>{m.summary}</p>
      <span className="phase-link">
        See the plan <ArrowRight />
      </span>
    </Link>
  )
}

/* ------------------------------------------------- process (home, 3 steps) */

/**
 * Three steps joined by a rail that fills as the section scrolls into view;
 * each step activates when the fill reaches it.
 */
export function useRailProgress<T extends HTMLElement>(steps: number) {
  const ref = useRef<T>(null)
  const [active, setActive] = useState(-1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.style.setProperty('--rail', '1')
      setActive(steps - 1)
      return
    }
    return onFrameScroll(() => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.55)))
      el.style.setProperty('--rail', p.toFixed(4))
      setActive(Math.min(steps - 1, Math.floor(p * steps - 0.0001 + 0.35)))
    })
  }, [steps])
  return { ref, active }
}

export function ProcessHome({ steps }: { steps: { title: string; body: string }[] }) {
  const { ref, active } = useRailProgress<HTMLDivElement>(steps.length)
  return (
    <section id="process" className="process-home">
      <div className="process-intro" data-reveal="rise">
        <p className="eyebrow">How we work</p>
        <SplitText text="Direction before delivery." />
        <p>A lean approach that keeps leadership close, decisions visible and waste out of the roadmap.</p>
        <span className="process-intro-mark" aria-hidden />
      </div>
      <div className="process-home-grid" ref={ref} style={{ '--steps': steps.length } as CSSProperties}>
        <span className="rail" aria-hidden>
          <span className="rail-fill" />
        </span>
        {steps.map((s, k) => (
          <article key={s.title} className={k <= active ? 'is-active' : ''} style={i(k)}>
            <span className="step-num">
              <span className="step-dot" aria-hidden />
              0{k + 1}
            </span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- home spark */

export function HomeSpark({ points }: { points: string[] }) {
  return (
    <section className="home-spark" data-reveal="rise">
      <div>
        <p className="eyebrow">Start with Spark</p>
        <SplitText text="Build smarter. Launch faster. Win bigger." />
        <p>
          Before you spend a single line of code, Spark validates your product direction with real users - so you
          launch with confidence, not guesswork.
        </p>
        <Button href="#contact">Book a Discovery Call</Button>
      </div>
      <ul className="spark-points">
        {points.map((p, k) => (
          <li key={p} data-reveal="up" style={{ ...i(k), ...d(120 + k * 70) }}>
            <span className="check">
              <Check />
            </span>
            {p}
          </li>
        ))}
      </ul>
    </section>
  )
}

/* -------------------------------------------------------- challenge + stat */

/** Counts up the first number in the sentence once it is on screen. */
function StatCard({ text }: { text: string }) {
  const m = text.match(/(\d+(?:\.\d+)?)(%|x)?/)
  const target = m ? parseFloat(m[1]) : 0
  const decimals = m && m[1].includes('.') ? 1 : 0
  const [val, setVal] = useState(prefersReducedMotion() ? target : 0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !m || prefersReducedMotion()) return
    let raf = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const dur = 1100
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / dur)
          const eased = 1 - Math.pow(1 - t, 4)
          setVal(target * eased)
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!m) return null
  const before = text.slice(0, m.index)
  const after = text.slice((m.index ?? 0) + m[0].length)
  return (
    <div className="stat-card" ref={ref} data-reveal="rise" style={d(160)}>
      <span>Proof point</span>
      <p className="stat-figure" aria-hidden>
        {val.toFixed(decimals)}
        <em>{m[2] ?? ''}</em>
      </p>
      <strong>
        {before}
        {m[0]}
        {after}
      </strong>
    </div>
  )
}

export function Challenge({ m }: { m: Milestone }) {
  return (
    <section className="challenge-section">
      <div>
        <p className="eyebrow" data-reveal="up">
          Founder challenge
        </p>
        <SplitText text={m.challenge.title} />
        <p data-reveal="up" style={d(200)}>
          {m.challenge.body}
        </p>
      </div>
      <StatCard text={m.challenge.stat} />
    </section>
  )
}

/* ----------------------------------------------------------- deliverables */

export function Deliverables({ items, note }: { items: string[]; note?: string }) {
  return (
    <section id="deliverables" className="content-section">
      <p className="eyebrow" data-reveal="up">
        Deliverables
      </p>
      <SplitText text="What you walk away with." />
      <div className="deliverable-grid">
        {items.map((t, k) => (
          <DeliverableCard key={t} text={t} n={k} />
        ))}
      </div>
      {note && (
        <p className="section-note" data-reveal="up" style={d(120)}>
          <span className="note-rule" aria-hidden />
          {note}
        </p>
      )}
    </section>
  )
}

function DeliverableCard({ text, n }: { text: string; n: number }) {
  const ref = useSpotlight<HTMLElement>()
  return (
    <article ref={ref} className="spot" data-reveal="card" style={i(n)}>
      <div className="deliv-top">
        <span>0{n + 1}</span>
        <span className="check">
          <Check />
        </span>
      </div>
      <h3>{text}</h3>
    </article>
  )
}

/* ---------------------------------------------- process (milestone pages) */

export function ProcessSteps({ title, steps, note, plan }: { title: string; steps: string[]; note?: string; plan?: string }) {
  const { ref, active } = useRailProgress<HTMLDivElement>(steps.length)
  return (
    <section className="process-section">
      <p className="eyebrow" data-reveal="up">
        Process
      </p>
      <SplitText text={title} />
      <div className="process-grid" ref={ref} style={{ '--steps': steps.length } as CSSProperties}>
        <span className="rail" aria-hidden>
          <span className="rail-fill" />
        </span>
        {steps.map((s, k) => {
          const [head, ...rest] = s.split(' - ')
          return (
            <article key={s} className={k <= active ? 'is-active' : ''} style={i(k)}>
              <span className="step-num">
                <span className="step-dot" aria-hidden />
                0{k + 1}
              </span>
              <p>
                {head}
                {rest.length > 0 && <span className="step-detail"> - {rest.join(' - ')}</span>}
              </p>
            </article>
          )
        })}
      </div>
      <div className="process-foot" data-reveal="up" style={d(160)}>
        {note && <p>{note}</p>}
        <Button href={plan ? `/contact?plan=${plan}` : '/contact'}>Book a Discovery Call</Button>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- FAQ */

function AccordionItem({ q, a, defaultOpen, n }: { q: string; a: string; defaultOpen?: boolean; n: number }) {
  const [open, setOpen] = useState(!!defaultOpen)
  const id = useId()
  return (
    <div className={`faq-item ${open ? 'is-open' : ''}`} data-reveal="up" style={d(n * 80)}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{q}</span>
          <span className="faq-icon" aria-hidden>
            <Plus />
          </span>
        </button>
      </h3>
      <div className="faq-panel" id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} inert={!open}>
        <div>
          <p>{a}</p>
        </div>
      </div>
    </div>
  )
}

export function Objections({ items, title = 'What founders typically ask.' }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="objections-section">
      <div className="objections-inner">
        <p className="eyebrow" data-reveal="up">
          Objections
        </p>
        <SplitText text={title} />
        <div className="faq-list">
          {items.map((o, k) => (
            <AccordionItem key={o.q} q={o.q} a={o.a} defaultOpen={k === 0} n={k} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- pricing */

export function Pricing({ text }: { text: string }) {
  return (
    <section className="pricing-section">
      <p className="eyebrow" data-reveal="up">
        Pricing
      </p>
      <SplitText text="Flexible scope. Clear investment." />
      <p data-reveal="up" style={d(180)}>
        {text}
      </p>
      <div data-reveal="up" style={d(260)}>
        <Button href="/contact">Talk to a Product Leader</Button>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ contact CTA */

/**
 * The closing CTA opens up as it arrives: the dark panel grows from an inset
 * to its full width and its corners relax, so the page lands rather than stops.
 */
interface ClosingProps {
  look: Look
  plan?: string
  title?: string
  body?: string
  cta?: string
}

export function ContactCTA({
  title = 'Let’s make sure you’re building the right thing.',
  body = 'You’ve got the vision. Liftr adds the clarity that makes it investable - and buildable.',
  cta = 'Talk to a Product Leader',
  look,
  plan,
}: ClosingProps) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.style.setProperty('--open', '1')
      return
    }
    return onFrameScroll(() => {
      const p = viewProgress(el, 0, 0)
      // fully open by the time the section is ~45% into its travel
      el.style.setProperty('--open', Math.min(1, p / 0.42).toFixed(4))
    })
  }, [])
  return (
    <section id="contact" className={`contact-section theme-${look.theme} layout-${look.layout}`} ref={ref}>
      <div className="contact-bg" aria-hidden>
        <span className="contact-sweep" />
        <span className="contact-grain" />
      </div>
      <div className="contact-copy">
        <p className="eyebrow" data-reveal="up">
          Try Liftr
        </p>
        <SplitText text={title} />
        <p data-reveal="up" style={d(220)}>
          {body}
        </p>
        <div className="contact-actions" data-reveal="up" style={d(320)}>
          <Button href={plan ? `/contact?plan=${plan}` : '/contact'}>{cta}</Button>
        </div>
      </div>
      <div className="contact-art">
        <GlassStage sizes="(max-width: 640px) 120vw, 620px" />
      </div>
    </section>
  )
}
