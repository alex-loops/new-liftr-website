import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { alignment, howWeWork, pedigree, problem, proposition } from '../data/content'
import { ArrowRight, LiftrMark } from './Icons'
import { SplitText } from './SplitText'

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties
const i = (n: number) => ({ '--i': n }) as CSSProperties

/* The deck marks each point with the Liftr star in one of three accents. */
const accents = ['var(--aqua-deep)', 'var(--coral)', '#a8c93a']
function Star({ n }: { n: number }) {
  return <LiftrMark className="star" style={{ color: accents[n % 3] }} />
}

/* ------------------------------------------------------------ pedigree */
/** Where the founders' operating experience comes from (not a client list). */
export function Pedigree() {
  return (
    <section className="pedigree" aria-label="Operator experience">
      <p className="eyebrow" data-reveal="up">
        Our operators have built and scaled products at
      </p>
      <ul>
        {pedigree.map((name, k) => (
          <li key={name} data-reveal="up" style={d(80 + k * 60)}>
            {name}
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------- problem */
export function Problem() {
  return (
    <section className="problem-section">
      <p className="eyebrow" data-reveal="up">
        The problem
      </p>
      <SplitText text={problem.title} />
      <div className="problem-grid">
        {problem.points.map((p, k) => (
          <article key={p.title} data-reveal="card" style={i(k)}>
            <LiftrMark className="star" style={{ color: 'var(--coral)' }} />
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* --------------------------------------------------------- proposition */
export function Proposition() {
  return (
    <section id="about" className="proposition" data-reveal="rise">
      <div>
        <p className="eyebrow">What Liftr is</p>
        <SplitText text={proposition.title} />
        <p className="proposition-body">{proposition.body}</p>
      </div>
      <ul className="proposition-points">
        {proposition.points.map((p, k) => (
          <li key={p.title} data-reveal="up" style={d(140 + k * 90)}>
            <Star n={k} />
            <div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---------------------------------------------------------- how we work */
export function HowWeWork() {
  return (
    <section id="how" className="how-section">
      <div className="how-head">
        <p className="eyebrow" data-reveal="up">
          How we work
        </p>
        <SplitText text={howWeWork.title} />
      </div>
      <div className="how-grid">
        {howWeWork.points.map((p, k) => (
          <article key={p.title} data-reveal="card" style={i(k)}>
            <Star n={k} />
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------ alignment model */
export function Alignment() {
  return (
    <section className="alignment" data-reveal="rise">
      <div className="alignment-head">
        <p className="eyebrow">The alignment model</p>
        <SplitText text={alignment.title} />
        <p>{alignment.body}</p>
      </div>
      <h3 className="alignment-sub" data-reveal="up">
        {alignment.heading2}
      </h3>
      <div className="alignment-grid">
        {alignment.points.map((p, k) => (
          <article key={p.title} data-reveal="card" style={i(k)}>
            <Star n={k} />
            <h4>{p.title}</h4>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- clients */
/**
 * Featured client case study. Content is placeholder until real,
 * approved client names and outcomes are supplied.
 */
export function Clients() {
  return (
    <section id="clients" className="clients-section">
      <div className="clients-head">
        <div>
          <p className="eyebrow" data-reveal="up">
            Clients
          </p>
          <SplitText text="Founders we’ve built with." />
        </div>
        <span className="ph-tag" data-reveal="up">
          Placeholder content
        </span>
      </div>
      <Link to="/case-study" className="case-teaser" data-reveal="rise" viewTransition>
        <div className="case-teaser-copy">
          <p className="eyebrow">Case study</p>
          <h3>
            <span className="ph-inline">[Client]</span> - from <span className="ph-inline">[starting point]</span> to{' '}
            <span className="ph-inline">[outcome]</span> in <span className="ph-inline">[timeframe]</span>.
          </h3>
          <p>
            <span className="ph-inline">[One or two sentences: what we built together and the result it led to.]</span>
          </p>
          <span className="phase-link">
            Read the case study <ArrowRight />
          </span>
        </div>
        <dl className="case-teaser-stats">
          {['Timeline', 'Milestone', 'Outcome'].map((label) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd className="ph-inline">[ — ]</dd>
            </div>
          ))}
        </dl>
      </Link>
    </section>
  )
}
