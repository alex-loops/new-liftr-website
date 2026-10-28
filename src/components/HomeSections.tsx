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
        What to expect
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

/* ------------------------------------------------------ founder stories */
/** Founder stories: the featured case study (Pippa Labs). */
export function Clients() {
  return (
    <section id="clients" className="clients-section">
      <div className="clients-head">
        <div>
          <p className="eyebrow" data-reveal="up">
            Founder stories
          </p>
          <SplitText text="Founders we build with, and back." />
        </div>
      </div>
      <Link to="/case-study" className="case-teaser" data-reveal="rise" viewTransition>
        <div className="case-teaser-copy">
          <p className="eyebrow">Case study · Pippa Labs</p>
          <h3>Pippa Labs - from product proposition to an oversubscribed pre-seed round.</h3>
          <p>
            We helped Pippa Labs shape its proposition and raise its pre-seed round, then built the first version of its
            product with a dedicated Liftr team.
          </p>
          <span className="phase-link">
            Read the case study <ArrowRight />
          </span>
        </div>
        <dl className="case-teaser-stats">
          {[
            ['Sector', 'AI infrastructure'],
            ['Raised', '£505k pre-seed'],
            ['Team', '7 senior specialists'],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </Link>
    </section>
  )
}
