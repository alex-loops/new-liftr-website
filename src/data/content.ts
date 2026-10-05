export type MilestoneSlug = 'prove-the-pain' | 'prove-the-demand' | 'engine' | 'momentum'

/** Surface colour shared by a page's hero and its closing CTA. */
export type Theme = 'paper' | 'aqua' | 'slate' | 'navy' | 'steel'
/** Hero/CTA composition, following the wireframes. */
export type Layout = 'center' | 'split' | 'split-reverse'

export interface Look {
  theme: Theme
  layout: Layout
}

export const homeLook: Look = { theme: 'paper', layout: 'center' }

export interface Milestone {
  slug: MilestoneSlug
  /** shown in nav, homepage and routes; Engine & Momentum are paused for now */
  active: boolean
  look: Look
  index: string
  name: string
  proof: string
  duration: string
  summary: string
  hero: { title: string; intro: string }
  challenge: { title: string; body: string; stat: string }
  deliverables: string[]
  process: { title: string; steps: string[] }
  deliverablesNote: string
  processNote?: string
  objectionsTitle: string
  objections: { q: string; a: string }[]
  closing: { title: string; body: string; cta: string }
  /** kept for later; the pricing section is hidden for now */
  pricing: string
}

export const milestones: Milestone[] = [
  {
    slug: 'prove-the-pain',
    active: true,
    look: { theme: 'aqua', layout: 'center' },
    index: '01',
    name: 'Prove the pain',
    proof: 'Validate the problem',
    duration: '2–4 weeks',
    summary: 'Validate that the problem is worth solving before you commit to a build.',
    hero: {
      title: 'Build smarter. Launch faster. Win bigger.',
      intro:
        'Before you spend a single line of code, we help you validate your product direction with real users - so you launch with confidence, not guesswork.',
    },
    challenge: {
      title: 'Think you know the problem? Great. Now prove it.',
      body: 'Your instincts got you this far - now let’s make sure they hold up in the wild. We put your assumptions under the microscope through fast, structured user validation. So you’re not just building - you’re building what matters.',
      stat: '80% of first-time founders pivot after launch. Most never validated early enough.',
    },
    deliverables: [
      'Deep understanding of your users and their pain',
      'User interviews that uncover real insights',
      'A tight value-level product concept',
      'A clear map of your customer and their problem',
      'Prototype-level product concept',
      'A focused build plan for your MVP or next milestone',
    ],
    process: {
      title: 'From zero to clarity in just weeks.',
      steps: [
        'Understand what you’ve got (and what’s missing)',
        'Validate with real users',
        'Define what to build next - and why',
      ],
    },
    objections: [
      {
        q: 'I’ve lived this problem - I don’t need validation.',
        a: 'That’s your edge. We show you how others experience it, so you sharpen your instincts with evidence.',
      },
      {
        q: 'I can’t justify the spend before I raise.',
        a: 'Think of it as your investor-ready insight engine. The clarity becomes the foundation of your pitch.',
      },
      { q: 'Can’t we just start building?', a: 'You can, but correcting a wrong bet after the build starts costs far more.' },
    ],
    deliverablesNote: "Delivered in just 2–4 weeks by your dedicated Product Lead.",
    processNote: "Flexible scope. Tailored pace. Built to match your runway.",
    objectionsTitle: "What founders typically ask.",
    closing: { title: "Let’s make sure you’re building the right thing.", body: "You’ve got the vision. We add the clarity that makes it investable - and buildable.", cta: "Talk to a Product Leader" },
    pricing:
      'Prove the pain starts around £10k–£15k depending on depth and urgency. It’s a time-and-materials model - no bloated scope, no surprise fees.',
  },
  {
    slug: 'prove-the-demand',
    active: true,
    look: { theme: 'slate', layout: 'split' },
    index: '02',
    name: 'Prove the demand',
    proof: 'Validate the solution',
    duration: '4–6 weeks',
    summary: 'Turn your concept into a sharp, testable product and earn early validation.',
    hero: {
      title: 'Prototype something real enough to earn your first customer.',
      intro:
        'We turn your concept into a sharp, testable product - not a throwaway demo, but a lean build that earns validation, traction and maybe even your first revenue.',
    },
    challenge: {
      title: 'You’ve validated the problem. Now it’s time to show the solution.',
      body: 'Your early conviction is solid. Now investors, users and teammates need to see more than slides. This is where your idea becomes something concrete - credible enough to test, share and ship with confidence.',
      stat: 'Startups that validate demand early raise 30% more pre-seed capital.',
    },
    deliverables: [
      'Clickable prototype or lean working alpha',
      'Lightweight UX and brand identity',
      'Focused marketing landing page',
      'Support to pitch or demo with clarity',
      'Updated MVP roadmap',
    ],
    process: {
      title: 'From concept to clarity in 4–6 weeks.',
      steps: [
        'Scope & align - define what matters most to prove',
        'Design & prototype - lightweight, clean, credible',
        'Demo & test - show users and pitch investors',
        'Refine & roadmap - update your MVP plan',
      ],
    },
    objections: [
      { q: 'What if this doesn’t get traction?', a: 'Then you’ve learned fast and affordably - and we iterate.' },
      { q: 'Can’t I just build an MVP?', a: 'Only if you already have proof people want it. This plan earns you that proof fast.' },
      {
        q: 'A freelancer could build this cheaper.',
        a: 'Maybe. We combine delivery with strategic product thinking so you build the right thing.',
      },
    ],
    deliverablesNote: "Built in 4–6 weeks by a senior product team. Nothing generic. Nothing throwaway.",
    objectionsTitle: "Smart founders ask the tough questions.",
    closing: { title: "Ready to prove your product with something real?", body: "You get a credible, testable build to win first users, validate demand and move forward with confidence.", cta: "Talk to a Product Leader" },
    pricing:
      'Most Prove the demand builds range between £20k–£40k, depending on depth and complexity. We scope leanly, move quickly and flex to your runway.',
  },
  {
    slug: 'engine',
    active: false,
    look: { theme: 'navy', layout: 'split-reverse' },
    index: '03',
    name: 'Engine',
    proof: 'Prove the product',
    duration: '8–14 weeks',
    summary: 'Turn a validated concept into a production-ready MVP built for real users.',
    hero: {
      title: 'Build the product that wins customers again and again.',
      intro:
        'Engine takes your validated concept and turns it into a production-ready MVP - built to serve real users from day one and designed as the foundation for growth, learning and scale.',
    },
    challenge: {
      title: 'From proven idea to powerful product.',
      body: 'You’ve validated demand - now it’s time to deliver. Engine brings together the right team, tools and process to ship a working, investment-ready product. Not just a build - a launchpad for your next stage.',
      stat: 'Products that launch with a validated core see 3x faster user adoption.',
    },
    deliverables: [
      'MVP with authentication, data handling and infrastructure',
      'Core features solving your validated problem',
      'Production-ready frontend and backend',
      'Analytics and instrumentation for product learning',
      'Technical foundation for future development',
    ],
    process: {
      title: 'From concept to customer-ready in 8–14 weeks.',
      steps: [
        'Define & prioritise - scope the MVP around validated needs',
        'Design & build - create production-ready UX and code',
        'Launch & learn - deploy, track and gather insights',
        'Plan next stage - roadmap for scale and iteration',
      ],
    },
    objections: [
      {
        q: 'This is more than I planned to spend.',
        a: 'We can phase development or prioritise critical features to align with your budget.',
      },
      {
        q: 'Can I trust your team to deliver?',
        a: 'Our approach integrates product, design and engineering around a clear delivery plan.',
      },
      {
        q: 'Why not just hire freelancers?',
        a: 'Engine integrates strategy, product and engineering so you build the right thing - not just build it fast.',
      },
    ],
    deliverablesNote: "Built in 8–14 weeks by a senior, multi-disciplinary product team.",
    objectionsTitle: "Addressing founder concerns.",
    closing: { title: "Ready to launch your MVP with confidence?", body: "Engine delivers a user-ready, investment-ready product that’s built to grow.", cta: "Book an Engine Discovery Call" },
    pricing:
      'Most Engine builds range between £60k–£90k, depending on complexity. We work on time and materials - no bloat, no lock-in.',
  },
  {
    slug: 'momentum',
    active: false,
    look: { theme: 'steel', layout: 'split-reverse' },
    index: '04',
    name: 'Momentum',
    proof: 'Prove the team',
    duration: 'Flexible',
    summary: 'Add senior product, design and engineering momentum without slowing down.',
    hero: {
      title: 'Augment your team without slowing it down.',
      intro:
        'Momentum helps you scale after launch. Whether you need embedded experts or want to grow a nearshore engineering team, we provide strategic leadership and execution to keep you moving fast.',
    },
    challenge: {
      title: 'Post-launch growth creates new challenges.',
      body: 'Your MVP is live. Users are coming in. Now the pressure shifts to building and scaling without losing speed. Momentum gives you access to experienced operators who can embed quickly or help establish your own team with guidance from Liftr.',
      stat: 'Startups with the right early team structure scale 2.5x faster.',
    },
    deliverables: [
      'On-demand product, design and engineering support',
      'Strategic leadership embedded in your growth phase',
      'Setup and guidance for nearshore engineering teams',
      'Clarity on scaling without losing direction or speed',
    ],
    process: {
      title: 'Two paths. One goal: scaling with clarity.',
      steps: [
        'Embedded contributors - short-term product, design or engineering firepower',
        'Nearshore team build - establish a dedicated engineering team through a partner',
        'Liftr leadership - alignment, quality and output throughout',
      ],
    },
    objections: [
      { q: 'Why not just hire full-time staff now?', a: 'Momentum bridges the gap until the timing is right.' },
      {
        q: 'Will external contributors integrate well?',
        a: 'Our contributors are experienced at embedding quickly into startup teams.',
      },
      {
        q: 'What if I need something longer-term?',
        a: 'We can help establish a nearshore team with Liftr guiding quality, culture and alignment.',
      },
    ],
    deliverablesNote: "Flexible support models - from weeks to months.",
    objectionsTitle: "What founders ask us about scaling.",
    closing: { title: "Scale without slowing down.", body: "Momentum gives you the people and leadership to grow fast, without losing clarity.", cta: "Book a Momentum Call" },
    pricing:
      'Momentum can run from short embedded sprints starting around £15k through to nearshore team setups at scale. Every engagement flexes to your runway.',
  },
]

export const homeProcess = [
  { title: 'Understand', body: 'Find the sharpest version of the problem and the highest-value question.' },
  { title: 'Validate', body: 'Put assumptions in front of the people who matter before they become build cost.' },
  { title: 'Build with proof', body: 'Turn evidence into a focused product move that earns its next investment.' },
]

export const sparkPoints = [
  'Deep understanding of your users and their pain',
  'User interviews that uncover real insights',
  'A tight value-level product concept',
  'A clear map of your customer and their problem',
  'Prototype-level product concept',
  'A focused build plan for your next milestone',
]

export const activeMilestones = milestones.filter((m) => m.active)
export const getMilestone = (slug: string) => activeMilestones.find((m) => m.slug === slug)
/** old URLs from before the plans were renamed */
export const legacySlugs: Record<string, MilestoneSlug> = { spark: 'prove-the-pain', signal: 'prove-the-demand' }

/* ------------------------------------------------------------------ home */
/* Copy adapted from the Liftr pitch deck (2026). */

export const homeHero = {
  title: 'Senior operators who help you build the right product - then build it.',
  intro: 'A product-led development studio for ambitious pre-seed and seed founders.',
}

/** Where the founders' operating experience comes from — not Liftr clients. */
export const pedigree = ['Funding Circle', 'Depop', 'Spendesk', 'ClearScore', 'Google']

export const problem = {
  title: 'Most teams build what you ask. Few help you know what’s worth building.',
  points: [
    {
      title: 'Built the wrong thing',
      body: 'Agencies and freelancers execute the brief - even when the brief is wrong. Founders burn a runway proving it.',
    },
    {
      title: 'Slow and unreliable delivery',
      body: 'Quality and pace slip once the contract is signed. Timelines drift and trust erodes.',
    },
    {
      title: 'No real partnership',
      body: 'The team disappears after launch. No skin in the game, no continuity, no ownership of the outcome.',
    },
  ],
}

export const proposition = {
  title: 'A product partner, not a dev shop.',
  body: 'We embed senior product and engineering leadership into your build - the same calibre that scaled Funding Circle, Depop and Spendesk - so the team shaping what to build is the team that ships it.',
  points: [
    { title: 'Product judgement', body: 'We pressure-test what to build before we write a line of code.' },
    { title: 'Senior, hands-on', body: 'Operators who’ve built and scaled real products - not a junior bench.' },
    { title: 'Invested in outcomes', body: 'We can take part of our fee in equity and back our own calls.' },
  ],
}

export const howWeWork = {
  title: 'Senior teams, embedded and AI-native.',
  points: [
    {
      title: 'Embedded teams',
      body: 'We grow a team that thinks alongside yours - and hand skills in-house over time.',
    },
    {
      title: 'Vertical ownership',
      body: 'We design it, code it, ship it and grow it. Always your product - but we care about it like our own.',
    },
    {
      title: 'AI-native delivery',
      body: 'Modern AI tooling lets a small senior team ship at a pace a larger one used to.',
    },
    {
      title: 'Flexible ramp',
      body: 'Scale the team up or down around your runway and your product-market-fit evidence. No lock-in.',
    },
  ],
}

export const alignment = {
  title: 'We can invest alongside you.',
  body: 'Convert part of our fee into equity. We reduce your cash burn, share the risk and stay invested in the outcome - not just the invoice. A development-for-equity partnership is already underway.',
  heading2: 'Three ways we protect your runway.',
  points: [
    {
      title: 'Leadership included',
      body: 'VP / CPO-level product guidance is included in every partnership.',
    },
    {
      title: 'Equity for rate',
      body: 'Trade 10–15% of our cash rate for an aligned equity stake - preserving runway when it matters most.',
    },
    {
      title: 'Patient exit',
      body: 'We come on as a long-term partner and sell down at a later round - never a drag on your raise.',
    },
  ],
}

export const homeClosing = {
  title: 'Let’s build something worth building.',
  body: 'Senior product and engineering operators, invested in your outcome.',
  cta: 'Talk to a Product Leader',
}
