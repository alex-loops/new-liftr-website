# Liftr website

Marketing site for Liftr — homepage, the two plans (**Prove the pain**, **Prove the demand**), a case study template, Get in touch, and privacy/cookie pages. Engine and Momentum are built but switched off (`active: false` in `src/data/content.ts`).

**Stack:** Vite · React 19 · React Router 7 · Tailwind CSS v4 (preflight) + hand-written CSS · self-hosted fonts (`@fontsource`). No animation or 3D libraries.

## Scripts

```bash
npm install
npm run dev            # local dev server
npm run build          # type-check + production build → dist/
npm run preview        # serve the production build
npm run prepare:glass  # regenerate hero sculpture images from assets-src/
```

## Deploy (Vercel)

1. In Vercel: **Add New → Project → Import** `alex-loops/new-liftr-website`. The Vite preset and `vercel.json` (build, output, SPA rewrites) are picked up automatically.
2. **Settings → Environment Variables** (Production + Preview):
   - `RESEND_API_KEY` — from resend.com → API Keys
   - `CONTACT_TO` — `hello@liftr.studio` (default)
   - `CONTACT_FROM` — `Liftr website <website@liftr.studio>` (default)
3. In Resend, **Domains → Add `liftr.studio`** and add the DNS records it shows (SPF/DKIM) at your DNS provider. Until the domain is verified, set `CONTACT_FROM` to `onboarding@resend.dev` for testing (Resend only delivers those to your own account email).
4. Redeploy. Every push to `main` deploys automatically; other branches get preview URLs.

## Contact form

`/contact` posts to `api/contact.ts`, a Vercel Function that validates the enquiry (plus a honeypot field and a light per-IP throttle) and emails it to `CONTACT_TO` via Resend, with **Reply-To** set to the sender. `npm run dev` has no function, so locally the form shows a "not connected" notice; use `vercel dev` to run it end to end. To use a hosted form service instead, set `VITE_CONTACT_ENDPOINT`.

## Structure

```
src/
  data/content.ts        all page copy + each page's look (theme + hero layout)
  pages/                 Home, MilestonePage (one template, four pages)
  components/
    Hero.tsx             hero card: center | split | split-reverse
    GlassStage.tsx       layered glass sculpture (ambient motion only)
    Sections.tsx         thesis, phase cards, process rails, deliverables, FAQ, CTA…
    SiteHeader.tsx       hide-on-scroll header, hover pill, dropdown, mobile sheet
    Button.tsx           magnetic pill button with arrow swap
    SplitText.tsx        masked word-by-word heading reveal
  lib/motion.ts          one IntersectionObserver + one rAF scroll loop
  styles/                tokens, base, header, hero (themes), sections, motion
assets-src/              master glass render (transparent PNG)
public/assets/glass/     generated WebP sizes (npm run prepare:glass)
```

## Page looks

Each page's hero and closing CTA share a theme, set in `content.ts`:

| Page             | Theme | Layout          |
| ---------------- | ----- | --------------- |
| Home             | paper | center (+ grid) |
| Prove the pain   | aqua  | center          |
| Prove the demand | slate | split           |
| Engine (off)     | navy  | split-reverse   |
| Momentum (off)   | steel | split-reverse   |

Dark mode follows the visitor's system setting (dark when none is stated); the footer switch (System / Light / Dark) overrides it. Cookie consent is stored in `localStorage` (`liftr-cookie-consent`); analytics scripts should check `window.liftrConsent` or listen for the `liftr:consent` event before loading.

## Motion

Reveals are declared with `data-reveal="up | card | rise | split"` and armed by `scanReveals()`. Only opacity, transform and clip-path animate. `prefers-reduced-motion` disables all of it, and hover effects apply only to fine pointers.

The pricing section is built (`Pricing` in `Sections.tsx`) but hidden for now — see `MilestonePage.tsx`. The case study and the privacy/cookie pages contain clearly marked placeholders.
