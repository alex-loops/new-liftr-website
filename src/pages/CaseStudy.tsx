import type { CSSProperties } from 'react'
import { Hero } from '../components/Hero'
import { PartnerMarks } from '../components/PartnerMarks'
import { Button } from '../components/Button'
import { ContactCTA } from '../components/Sections'
import { SplitText } from '../components/SplitText'
import type { Look } from '../data/content'
import { usePageMotion } from '../hooks/usePageMotion'

const look: Look = { theme: 'navy', layout: 'split' }
const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties
const steps = [
  {
    title: 'Shaped the proposition',
    body: 'We helped the founders crystallise the product direction and its main monetisation strategy.',
  },
  {
    title: 'Invested alongside them',
    body: 'Liftr put £27,000 into the oversubscribed pre-seed round and took part of its fee in equity. That gave Pippa Labs a healthier runway and tied us to the founders’ goals, not a client–supplier contract.',
  },
  {
    title: 'Built the product',
    body: 'A dedicated Liftr team of five senior engineers and two product designers built the first version, covering devops, data, backend, frontend, AI (two of our engineers hold PhDs in the field), UX and visual design. We’re now helping Pippa Labs onboard its first users and customers.',
  },
]
const P = ({ children }: { children: string }) => <span className="ph-inline">{children}</span>

/**
 * Pippa Labs case study. Content supplied by Claudiu (Oct 2026); Pippa Labs
 * agreed to be named. The founder quote is still a placeholder until it is
 * taken from the Pippa Labs PR announcement.
 */
export default function CaseStudy() {
  usePageMotion('Case study · Liftr')
  return (
    <>
      <Hero
        look={look}
        compact
        art={<PartnerMarks />}
        eyebrow="Case study · Pippa Labs"
        title="Pippa Labs - from product proposition to an oversubscribed pre-seed round."
        intro="We helped Pippa Labs shape its proposition, raise £505,000 and build the first version of its product with a dedicated Liftr team."
        actions={<Button href="/contact">Talk to a Product Leader</Button>}
      />

      <section className="case-glance" aria-label="At a glance">
        {[
          ['Sector', 'AI infrastructure'],
          ['Working together', 'Since August 2025'],
          ['Outcome', '£505k pre-seed raised'],
        ].map(([k, v], n) => (
          <div key={k} data-reveal="up" style={d(n * 70)}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </section>

      <section className="case-body">
        <div className="case-block">
          <p className="eyebrow" data-reveal="up">
            The challenge
          </p>
          <SplitText text="A big idea for the agentic web." />
          <p data-reveal="up" style={d(160)}>
            Pippa Labs is building the trusted infrastructure for the agentic web: the place where AI agents meet,
            transact and collaborate. When founders Carl Coddington and Dafydd Biffen started working with us in August
            2025, they needed a sharp product proposition, the confidence to approach pre-seed investors and a team to
            build it.
          </p>
        </div>
        <div className="case-block">
          <p className="eyebrow" data-reveal="up">
            What we did
          </p>
          <SplitText text="Strategy, investment and a dedicated team." />
          <ol className="case-steps">
            {steps.map((step, n) => (
              <li key={step.title} data-reveal="up" style={d(120 + n * 80)}>
                <span className="step-num">0{n + 1}</span>
                <span>
                  <strong>{step.title}.</strong> {step.body}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="case-block">
          <p className="eyebrow" data-reveal="up">
            The outcome
          </p>
          <SplitText text="An oversubscribed pre-seed round." />
          <p data-reveal="up" style={d(160)}>
            Pippa Labs raised £505,000 in an oversubscribed pre-seed round and plans to move on to a seed round within six
            months.
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
