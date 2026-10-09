/**
 * POST /api/contact — Vercel Function (Node.js runtime, Web API signature).
 *
 * Validates the enquiry and emails it to contact@liftr.studio via Resend
 * (https://resend.com). No SDK: a single HTTPS call to Resend's API.
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY   required  Resend API key (keep it out of the code)
 *   CONTACT_TO       optional  where enquiries go          (default contact@liftr.studio)
 *   CONTACT_FROM     optional  sender, on a domain verified in Resend
 *                              (default "Liftr website <website@liftr.studio>")
 */

const MAX = { name: 120, email: 200, company: 160, stage: 60, plan: 60, message: 5000 }
const PLANS: Record<string, string> = {
  'prove-the-pain': 'Prove the pain',
  'prove-the-demand': 'Prove the demand',
  'not-sure': 'Not sure yet',
}

// Best-effort throttle per warm instance: 5 enquiries per IP per 10 minutes.
const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export async function POST(request: Request): Promise<Response> {
  const key = process.env.RESEND_API_KEY
  if (!key) return json(500, { error: 'not-configured' })

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  if (limited(ip)) return json(429, { error: 'too-many-requests' })

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return json(400, { error: 'invalid-json' })
  }

  // honeypot: real visitors never fill this — pretend success, send nothing
  if (typeof body.website === 'string' && body.website.trim()) return json(200, { ok: true })

  const field = (k: keyof typeof MAX) => String(body[k] ?? '').trim().slice(0, MAX[k])
  const data = {
    name: field('name'),
    email: field('email'),
    company: field('company'),
    stage: field('stage'),
    plan: PLANS[field('plan')] ?? '',
    message: field('message'),
  }
  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.message.length < 10) {
    return json(422, { error: 'invalid-fields' })
  }

  const rows: [string, string][] = [
    ['Name', data.name],
    ['Email', data.email],
    ['Company', data.company || '—'],
    ['Stage', data.stage || '—'],
    ['Plan', data.plan || '—'],
  ]
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${data.message}\n`
  const html = `<table style="font:14px/1.5 sans-serif">${rows
    .map(([k, v]) => `<tr><td style="color:#6a7587;padding-right:16px">${k}</td><td>${esc(v)}</td></tr>`)
    .join('')}</table><p style="font:15px/1.6 sans-serif;white-space:pre-wrap">${esc(data.message)}</p>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'Liftr website <website@liftr.studio>',
      to: [process.env.CONTACT_TO || 'contact@liftr.studio'],
      reply_to: data.email,
      subject: `New enquiry: ${data.name}${data.company ? ` (${data.company})` : ''}${data.plan ? ` · ${data.plan}` : ''}`,
      text,
      html,
    }),
  })
  if (!res.ok) {
    console.error('resend failed', res.status, await res.text().catch(() => ''))
    return json(502, { error: 'send-failed' })
  }
  return json(200, { ok: true })
}
