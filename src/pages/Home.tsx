import { Hero } from '../components/Hero'
import { Button } from '../components/Button'
import { ContactCTA, HomeSpark, PhaseCard, ProcessHome, Thesis } from '../components/Sections'
import { SplitText } from '../components/SplitText'
import { homeLook, homeProcess, milestones, sparkPoints } from '../data/content'
import { usePageMotion } from '../hooks/usePageMotion'

export default function Home() {
  usePageMotion('Liftr — Validate twice. Build once.')
  return (
    <>
      <Hero
        look={homeLook}
        grid
        title="You already have the vision. Validate twice so you can build once."
        intro="De-risk your product decisions with experienced Product Leaders."
        actions={
          <>
            <Button href="#contact">Ship products faster</Button>
            <Button href="#process" variant="subtle" arrow={false}>
              How we work
            </Button>
          </>
        }
      />
      <Thesis />
      <section id="milestones" className="milestones-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow" data-reveal="up">
              One system, four proofs
            </p>
            <SplitText text="Meet your product where it is. Move it where it needs to go." />
          </div>
          <span data-reveal="up">2–14 weeks of focused progress</span>
        </div>
        <div className="phase-grid">
          {milestones.map((m, n) => (
            <PhaseCard key={m.slug} m={m} n={n} />
          ))}
        </div>
      </section>
      <ProcessHome steps={homeProcess} />
      <HomeSpark points={sparkPoints} />
      <ContactCTA look={homeLook} />
    </>
  )
}
