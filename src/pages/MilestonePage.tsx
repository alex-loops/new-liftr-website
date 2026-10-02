import { Navigate, useParams } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Button } from '../components/Button'
import { Challenge, ContactCTA, Deliverables, Objections, ProcessSteps } from '../components/Sections'
import { getMilestone } from '../data/content'
import { usePageMotion } from '../hooks/usePageMotion'

export default function MilestonePage() {
  const { slug = '' } = useParams()
  const m = getMilestone(slug)
  usePageMotion(m ? `${m.name} — ${m.proof} · Liftr` : 'Liftr')
  if (!m) return <Navigate to="/" replace />
  return (
    <>
      <Hero
        key={m.slug}
        look={m.look}
        eyebrow={`Milestone ${m.index} · ${m.proof}`}
        title={m.hero.title}
        intro={m.hero.intro}
        actions={
          <>
            <Button href="#contact">Book a Discovery Call</Button>
            <Button href="#deliverables" variant="subtle" arrow={false}>
              See what you get
            </Button>
          </>
        }
      />
      <Challenge m={m} />
      <Deliverables items={m.deliverables} note={m.deliverablesNote} />
      <ProcessSteps title={m.process.title} steps={m.process.steps} note={m.processNote} />
      <Objections items={m.objections} title={m.objectionsTitle} />
      {/* Pricing intentionally hidden for now — <Pricing text={m.pricing} /> */}
      <ContactCTA look={m.look} title={m.closing.title} body={m.closing.body} cta={m.closing.cta} />
    </>
  )
}
