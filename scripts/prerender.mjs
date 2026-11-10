/**
 * Pre-renders every page to static HTML after `vite build`, so search engines,
 * AI crawlers and agents get real content and metadata without running
 * JavaScript. Also writes sitemap.xml, llms.txt and llms-full.txt.
 *
 *   vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = 'dist'
const server = await import(pathToFileURL(join(process.cwd(), 'dist-ssr/entry-server.js')).href)
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const text = (html) =>
  html
    .replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(h[1-6]|p|li|dt|dd|blockquote|tr)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

const full = []
for (const url of server.paths) {
  const body = await server.render(url)
  const { title, tags } = server.head(url)
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/\s*<meta name="description"[^>]*>/, '')
    .replace('</head>', `    ${tags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  // /foo → dist/foo.html (served at /foo via cleanUrls); / → dist/index.html
  const file = url === '/' ? join(dist, 'index.html') : join(dist, `${url.slice(1)}.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
  if (url !== '/404') {
    const main = body.match(/<div id="content"[^>]*>([\s\S]*)<\/div>\s*<footer/)?.[1] ?? body
    full.push(`# ${title.replace(/&amp;/g, '&')}\nURL: https://www.liftr.studio${url}\n\n${text(main)}`)
  }
  console.log(`prerender: ${url} → ${file}`)
}

const today = new Date().toISOString().slice(0, 10)
writeFileSync(join(dist, 'sitemap.xml'), server.sitemap(today))
writeFileSync(join(dist, 'llms.txt'), server.llms())
writeFileSync(join(dist, 'llms-full.txt'), full.join('\n\n---\n\n') + '\n')
rmSync('dist-ssr', { recursive: true, force: true })
console.log('prerender: sitemap.xml, llms.txt, llms-full.txt')
