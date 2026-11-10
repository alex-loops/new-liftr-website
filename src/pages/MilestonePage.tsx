import { Fragment } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Button } from '../components/Button'
import { Challenge, ContactCTA, Deliverables, Objections, ProcessSteps } from '../components/Sections'
import { getMilestone, legacySlugs } from '../data/content'
import { usePageMotion } from '../hooks/usePageMotion'
import NotFound from './NotFound'

export default function MilestonePage() {
  const { slug = '' } = useParams()
  const m = getMilestone(slug)
  usePageMotion(m ? `${m.name} · Liftr` : 'Liftr')
  if (!m && legacySlugs[slug]) return <Navigate to={`/${legacySlugs[slug]}`} replace />
  if (!m) return <NotFound />
  // keyed by plan so every section remounts when moving between plans
  // (stats re-count, reveals and accordions reset)
  return (
    <Fragment key={m.slug}>
      <Hero
        look={m.look}
        eyebrow={`Plan ${m.index} · ${m.duration}`}
        title={m.hero.title}
        intro={m.hero.intro}
        actions={
          <>
            <Button href={`/contact?plan=${m.slug}`}>Book a Discovery Call</Button>
            <Button href="#deliverables" variant="subtle" arrow={false}>
              See what you get
            </Button>
          </>
        }
      />
      <Challenge m={m} />
      <Deliverables items={m.deliverables} />
      <ProcessSteps title={m.process.title} steps={m.process.steps} note={m.processNote} plan={m.slug} />
      <Objections items={m.objections} title={m.objectionsTitle} />
      {/* Pricing intentionally hidden for now — <Pricing text={m.pricing} /> */}
      <ContactCTA look={m.look} plan={m.slug} title={m.closing.title} body={m.closing.body} cta={m.closing.cta} />
    </Fragment>
  )
}
