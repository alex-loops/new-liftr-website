# Liftr website

Marketing site for Liftr — Home plus the four milestone pages (Spark, Signal, Engine, Momentum).

**Stack:** Vite · React 19 · React Router 7 · Tailwind CSS v4 (preflight) + hand-written CSS · self-hosted fonts (`@fontsource`). No animation or 3D libraries.

## Scripts

```bash
npm install
npm run dev            # local dev server
npm run build          # type-check + production build → dist/
npm run preview        # serve the production build
npm run prepare:glass  # regenerate hero sculpture images from assets-src/
```

Deploy `dist/` as a single-page app (rewrite unknown paths to `index.html`).

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

| Page     | Theme | Layout          |
| -------- | ----- | --------------- |
| Home     | paper | center (+ grid) |
| Spark    | aqua  | center          |
| Signal   | slate | split           |
| Engine   | navy  | split-reverse   |
| Momentum | steel | split-reverse   |

## Motion

Reveals are declared with `data-reveal="up | card | rise | split"` and armed by `scanReveals()`. Only opacity, transform and clip-path animate. `prefers-reduced-motion` disables all of it, and hover effects apply only to fine pointers.

The pricing section is built (`Pricing` in `Sections.tsx`) but hidden for now — see `MilestonePage.tsx`.
