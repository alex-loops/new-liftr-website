import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { SITE, OG_IMAGE, SITE_NAME, getSeo, pageSchema, indexablePaths, seoPages } from './data/seo'
import { activeMilestones, homeHero, proposition, howWeWork, alignment, problem } from './data/content'

/**
 * Build-time renderer (see scripts/prerender.mjs): turns each route into real
 * HTML so search engines, AI crawlers and agents that don't run JavaScript can
 * read the page. The browser app then takes over as normal.
 */
export async function render(url: string) {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(`${SITE}${url}`))
  if (context instanceof Response) throw new Error(`Unexpected redirect while rendering ${url}`)
  const router = createStaticRouter(handler.dataRoutes, context)
  return renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>,
  )
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** <head> tags for one page. */
export function head(url: string) {
  const seo = getSeo(url)
  const canonical = `${SITE}${seo.path === '/' ? '/' : seo.path}`
  const json = pageSchema(seo)
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ')
  return {
    title: esc(seo.title),
    tags: [
      `<meta name="description" content="${esc(seo.description)}" />`,
      seo.noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${canonical}" />`,
      `<meta property="og:type" content="${seo.path === '/case-study' ? 'article' : 'website'}" />`,
      `<meta property="og:site_name" content="${SITE_NAME}" />`,
      `<meta property="og:locale" content="en_GB" />`,
      `<meta property="og:title" content="${esc(seo.title)}" />`,
      `<meta property="og:description" content="${esc(seo.description)}" />`,
      `<meta property="og:url" content="${canonical}" />`,
      `<meta property="og:image" content="${OG_IMAGE}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="Liftr - Senior operators who help you build the right product, then build it." />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(seo.title)}" />`,
      `<meta name="twitter:description" content="${esc(seo.description)}" />`,
      `<meta name="twitter:image" content="${OG_IMAGE}" />`,
      json,
    ].join('\n    '),
  }
}

export const paths = [...indexablePaths, '/404']

export function sitemap(date: string) {
  const urls = indexablePaths
    .map(
      (p) =>
        `  <url><loc>${SITE}${p === '/' ? '/' : p}</loc><lastmod>${date}</lastmod><priority>${p === '/' ? '1.0' : p === '/privacy' || p === '/cookies' ? '0.3' : '0.8'}</priority></url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/** llms.txt: a plain summary of the site for AI assistants and agents (llmstxt.org). */
export function llms() {
  const page = (p: string) => seoPages.find((s) => s.path === p)!
  const lines = [
    `# Liftr`,
    ``,
    `> ${homeHero.intro} Senior product and engineering operators help founders prove the pain, prove the demand and build the right product - and can take part of their fee in equity.`,
    ``,
    `Liftr Limited is registered in England and Wales (company number 14052657), 71 to 75 Shelton Street, London, WC2H 9JQ. Contact: contact@liftr.studio or ${SITE}/contact.`,
    ``,
    `## Who it is for`,
    ``,
    `Ambitious pre-seed and seed founders who want to know what is worth building before they spend their runway, and a senior team to build it.`,
    ``,
    `## Why Liftr`,
    ``,
    `- ${problem.title} ${problem.points.map((p) => `${p.title}: ${p.body}`).join(' ')}`,
    `- ${proposition.title} ${proposition.body}`,
    `- ${howWeWork.title} ${howWeWork.points.map((p) => `${p.title}: ${p.body}`).join(' ')}`,
    `- ${alignment.title} ${alignment.body}`,
    ``,
    `## Plans`,
    ``,
    ...activeMilestones.map(
      (m) =>
        `- [${m.name}](${SITE}/${m.slug}) (${m.proof}, ${m.duration}): ${m.summary} Deliverables: ${m.deliverables.join('; ')}.`,
    ),
    ``,
    `## Case study`,
    ``,
    `- [Pippa Labs](${SITE}/case-study): ${page('/case-study').description}`,
    ``,
    `## Pages`,
    ``,
    ...seoPages.filter((p) => !p.noindex).map((p) => `- [${p.title}](${SITE}${p.path}): ${p.description}`),
    ``,
    `## Optional`,
    ``,
    `- [Full text of every page](${SITE}/llms-full.txt)`,
    ``,
  ]
  return lines.join('\n')
}
