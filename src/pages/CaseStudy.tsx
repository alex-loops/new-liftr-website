import type { CSSProperties } from 'react'
import { Hero } from '../components/Hero'
import { Button } from '../components/Button'
import { ContactCTA } from '../components/Sections'
import { SplitText } from '../components/SplitText'
import type { Look } from '../data/content'
import { usePageMotion } from '../hooks/usePageMotion'

const look: Look = { theme: 'navy', layout: 'split' }
const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties
const P = ({ children }: { children: string }) => <span className="ph-inline">{children}</span>

/**
 * Case study template. Every bracketed field is a placeholder to be replaced
 * with an approved, real client story (named or anonymised).
 */
export default function CaseStudy() {
  usePageMotion('Case study · Liftr')
  return (
    <>
      <Hero
        look={look}
        eyebrow="Case study · Placeholder"
        title="[Client] - from [starting point] to [outcome] in [timeframe]."
        intro="[One-sentence summary: who the client is, what we built together and the result it led to.]"
        actions={
          <>
            <Button href="/contact">Talk to a Product Leader</Button>
            <Button href="/#clients" variant="subtle" arrow={false}>
              Back to clients
            </Button>
          </>
        }
      />

      <section className="case-glance" aria-label="At a glance">
        {[
          ['Client', '[Sector · stage]'],
          ['Engagement', '[Prove the pain → Prove the demand]'],
          ['Timeline', '[x weeks]'],
          ['Outcome', '[e.g. seed round raised]'],
        ].map(([k, v], n) => (
          <div key={k} data-reveal="up" style={d(n * 70)}>
            <dt>{k}</dt>
            <dd>
              <P>{v}</P>
            </dd>
          </div>
        ))}
      </section>

      <section className="case-body">
        <div className="case-block">
          <p className="eyebrow" data-reveal="up">
            The challenge
          </p>
          <SplitText text="What the founders were up against." />
          <p data-reveal="up" style={d(160)}>
            <P>[The problem, the stakes and why it mattered now. Two or three sentences.]</P>
          </p>
        </div>
        <div className="case-block">
          <p className="eyebrow" data-reveal="up">
            What we did
          </p>
          <SplitText text="How we approached it." />
          <ol className="case-steps">
            {['[Step one — e.g. user interviews and problem framing]', '[Step two — e.g. prototype and demand test]', '[Step three — e.g. MVP build and launch]'].map(
              (s, n) => (
                <li key={s} data-reveal="up" style={d(120 + n * 80)}>
                  <span className="step-num">0{n + 1}</span>
                  <P>{s}</P>
                </li>
              ),
            )}
          </ol>
        </div>
        <div className="case-block">
          <p className="eyebrow" data-reveal="up">
            The outcome
          </p>
          <SplitText text="What changed." />
          <p data-reveal="up" style={d(160)}>
            <P>[Measurable results: users, revenue, time to market, funding raised.]</P>
          </p>
        </div>
        <figure className="case-quote" data-reveal="rise">
          <blockquote>
            <P>“[Quote from the founder about working with Liftr.]”</P>
          </blockquote>
          <figcaption>
            <P>[Name, role, company]</P>
          </figcaption>
        </figure>
      </section>

      <ContactCTA
        look={look}
        title="Let’s build something worth building."
        body="Senior product and engineering operators, invested in your outcome."
      />
    </>
  )
}
