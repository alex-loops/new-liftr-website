import { Hero } from '../components/Hero'
import { Button } from '../components/Button'
import { ContactCTA, PhaseCard } from '../components/Sections'
import { Alignment, Clients, HowWeWork, Pedigree, Problem, Proposition } from '../components/HomeSections'
import { SplitText } from '../components/SplitText'
import { activeMilestones, homeClosing, homeHero, homeLook } from '../data/content'
import { usePageMotion } from '../hooks/usePageMotion'

/**
 * Simplified homepage, structured after the pitch deck:
 * hero → pedigree → problem → what Liftr is → where to start → how we work
 * → alignment model → clients & case study → closing CTA.
 */
export default function Home() {
  usePageMotion('Liftr — Senior operators who help you build the right product')
  return (
    <>
      <Hero
        look={homeLook}
        grid
        title={homeHero.title}
        intro={homeHero.intro}
        actions={
          <>
            <Button href="/contact">Talk to a Product Leader</Button>
            <Button href="#how" variant="subtle" arrow={false}>
              How we work
            </Button>
          </>
        }
      />
      <Pedigree />
      <Problem />
      <Proposition />
      <section id="milestones" className="milestones-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow" data-reveal="up">
              Where to start
            </p>
            <SplitText text="Prove the pain. Then prove the demand." />
          </div>
          <span data-reveal="up">2–6 weeks of focused progress</span>
        </div>
        <div className="phase-grid">
          {activeMilestones.map((m, n) => (
            <PhaseCard key={m.slug} m={m} n={n} />
          ))}
        </div>
      </section>
      <HowWeWork />
      <Alignment />
      <Clients />
      <ContactCTA look={homeLook} title={homeClosing.title} body={homeClosing.body} cta={homeClosing.cta} />
    </>
  )
}
