/**
 * Contact form delivery.
 *
 * The form posts to /api/contact (api/contact.ts, a Vercel Function), which
 * emails the enquiry to hello@liftr.studio through Resend. To use a hosted
 * form service instead, set VITE_CONTACT_ENDPOINT to its URL at build time.
 *
 * Where no endpoint exists (local dev, the design preview), the form still
 * validates but tells the visitor it isn't connected instead of pretending.
 */
export const CONTACT_EMAIL = 'hello@liftr.studio'
// Production builds post to the site's own Vercel Function (api/contact.ts).
// The hosted design preview has no server, so it stays unconnected there.
export const CONTACT_ENDPOINT: string | undefined =
  import.meta.env.VITE_CONTACT_ENDPOINT ||
  (import.meta.env.PROD && !import.meta.env.VITE_PREVIEW ? '/api/contact' : undefined)

export interface Enquiry {
  name: string
  email: string
  company: string
  stage: string
  plan: string
  message: string
}

export async function sendEnquiry(data: Enquiry): Promise<void> {
  if (!CONTACT_ENDPOINT) throw new Error('not-configured')
  const res = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...data,
      _subject: `New enquiry from ${data.name}${data.company ? ` (${data.company})` : ''}`,
      _replyto: data.email,
    }),
  })
  if (!res.ok) throw new Error(`status-${res.status}`)
}
