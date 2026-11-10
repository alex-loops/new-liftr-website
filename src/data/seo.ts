import { activeMilestones, getMilestone, type Milestone } from './content'

/**
 * Search and AI metadata for every page: titles, descriptions, canonical URLs
 * and schema.org structured data. Used by the build-time pre-renderer (static
 * <head> for crawlers) and by the app on client-side navigation.
 */

export const SITE = 'https://www.liftr.studio'
export const SITE_NAME = 'Liftr'
export const OG_IMAGE = `${SITE}/og-image.jpg`

export interface PageSeo {
  path: string
  title: string
  description: string
  /** schema.org JSON-LD objects for this page (the organisation is added to every page) */
  schema?: object[]
  noindex?: boolean
}

const ORG_ID = `${SITE}/#organization`

export const organization = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: SITE_NAME,
  legalName: 'Liftr Limited',
  url: `${SITE}/`,
  logo: `${SITE}/logo.png`,
  image: OG_IMAGE,
  description:
    'Liftr is a product-led development studio for ambitious pre-seed and seed founders. Senior product and engineering operators help founders prove the pain, prove the demand and build the right product - and can take part of their fee in equity.',
  email: 'contact@liftr.studio',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '71 to 75 Shelton Street',
    addressLocality: 'London',
    postalCode: 'WC2H 9JQ',
    addressCountry: 'GB',
  },
  identifier: { '@type': 'PropertyValue', propertyID: 'Companies House', value: '14052657' },
  areaServed: ['GB', 'Europe'],
  knowsAbout: [
    'Product discovery',
    'Startup validation',
    'MVP development',
    'Product management',
    'Software engineering',
    'AI product development',
  ],
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: `${SITE}/`,
  name: SITE_NAME,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-GB',
}

const breadcrumb = (name: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name, item: `${SITE}${path}` },
  ],
})

function milestoneSeo(m: Milestone): PageSeo {
  const path = `/${m.slug}`
  return {
    path,
    title: `${m.name}: ${m.proof.toLowerCase()} in ${m.duration.replace(' · ', ', ').toLowerCase()} · Liftr`,
    description: `${m.summary} ${m.duration.split(' · ')[0]} with senior product and engineering operators from Liftr.`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${SITE}${path}#service`,
        name: `${m.name} (${m.proof})`,
        serviceType: m.proof,
        description: `${m.summary} ${m.challenge.body}`,
        provider: { '@id': ORG_ID },
        areaServed: ['GB', 'Europe'],
        audience: { '@type': 'BusinessAudience', name: 'Pre-seed and seed startup founders' },
        termsOfService: `${SITE}/privacy`,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'What you walk away with',
          itemListElement: m.deliverables.map((d) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: d },
          })),
        },
        url: `${SITE}${path}`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: m.objections.map((o) => ({
          '@type': 'Question',
          name: o.q,
          acceptedAnswer: { '@type': 'Answer', text: o.a },
        })),
      },
      breadcrumb(m.name, path),
    ],
  }
}

const PAGES: PageSeo[] = [
  {
    path: '/',
    title: 'Liftr - Senior product partner for pre-seed and seed founders',
    description:
      'Product-led development studio for pre-seed and seed founders. Senior operators help you prove the pain, prove the demand and build the right product.',
    schema: [
      website,
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Liftr plans',
        itemListElement: activeMilestones.map((m, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE}/${m.slug}`,
          name: `${m.name} - ${m.proof} (${m.duration})`,
        })),
      },
    ],
  },
  ...activeMilestones.map(milestoneSeo),
  {
    path: '/case-study',
    title: 'Pippa Labs case study: a £500k pre-seed round · Liftr',
    description:
      'How Liftr helped Pippa Labs, an AI infrastructure startup, shape its proposition, raise an oversubscribed £500k pre-seed round and build its first product.',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Pippa Labs - from product proposition to an oversubscribed pre-seed round',
        description:
          'Liftr helped Pippa Labs shape its proposition, raise £500,000 and build the first version of its product with a dedicated Liftr team.',
        about: { '@type': 'Organization', name: 'Pippa Labs' },
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        image: OG_IMAGE,
        mainEntityOfPage: `${SITE}/case-study`,
        inLanguage: 'en-GB',
      },
      breadcrumb('Case study: Pippa Labs', '/case-study'),
    ],
  },
  {
    path: '/contact',
    title: 'Get in touch · Liftr',
    description:
      'Talk to a Liftr product leader about your startup: where you are, what you are building and which plan fits.',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        url: `${SITE}/contact`,
        about: { '@id': ORG_ID },
      },
      breadcrumb('Get in touch', '/contact'),
    ],
  },
  {
    path: '/privacy',
    title: 'Privacy policy · Liftr',
    description: 'What personal information Liftr collects, why we use it, who we share it with and the rights you have.',
  },
  {
    path: '/cookies',
    title: 'Cookie policy · Liftr',
    description: 'The cookies and browser storage the Liftr website uses, why, and how to change your choice.',
  },
  {
    path: '/404',
    title: 'Page not found · Liftr',
    description: 'This page does not exist.',
    noindex: true,
  },
]

export const seoPages = PAGES

/** Paths to pre-render and list in the sitemap. */
export const indexablePaths = PAGES.filter((p) => !p.noindex).map((p) => p.path)

export function getSeo(pathname: string): PageSeo {
  const clean = pathname.replace(/\/+$/, '') || '/'
  return (
    PAGES.find((p) => p.path === clean) ??
    (getMilestone(clean.slice(1)) ? milestoneSeo(getMilestone(clean.slice(1))!) : PAGES[PAGES.length - 1])
  )
}

/** Organisation on every page, plus the page's own structured data. */
export const pageSchema = (seo: PageSeo) => [organization, ...(seo.schema ?? [])]
