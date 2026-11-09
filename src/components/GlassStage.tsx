import { useEffect, useRef } from 'react'
import { onFrameScroll, prefersReducedMotion } from '../lib/motion'

interface Props {
  /** eager for the hero (above the fold), lazy for the closing CTA */
  eager?: boolean
  /** rendered width hint for srcset selection */
  sizes?: string
  className?: string
  /** 'clear' = the colourless glass render (Prove the product) */
  variant?: 'default' | 'clear'
}

const RENDERS = {
  default: { base: `${import.meta.env.BASE_URL}assets/glass/liftr-glass`, widths: [800, 1200, 1800, 2400], w: 3729, h: 3326 },
  clear: { base: `${import.meta.env.BASE_URL}assets/glass-clear/liftr-glass-clear`, widths: [800, 1200, 1800], w: 2076, h: 1852 },
}

/**
 * The glass sculpture: a transparent master render, layered so it can move.
 *
 *   glow   – soft colour the glass throws onto the surface behind it
 *   object – the render itself (true alpha, no blend modes)
 *   sheen  – an occasional specular sweep, masked to the glass silhouette
 *
 * Motion is ambient only: a slow breathing drift and a slight lag against the
 * type on scroll. There is deliberately no pointer/hover response.
 */
export function GlassStage({ eager = false, sizes = '(max-width: 640px) 100vw, 640px', className, variant = 'default' }: Props) {
  const r = RENDERS[variant]
  const mask = `url(${r.base}-800.webp)`
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const off = onFrameScroll(() => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // -1 below the fold … 0 centred … 1 scrolled past
      const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)))
      el.style.setProperty('--sp', p.toFixed(4))
    })
    // pause ambient animation while off-screen
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-offscreen', !e.isIntersecting))
    io.observe(el)
    return () => {
      off()
      io.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      className={['glass-stage', variant === 'clear' && 'is-clear', className].filter(Boolean).join(' ')}
      style={{ ['--glass-mask' as string]: mask }}
      aria-hidden
    >
      <div className="glass-float">
        <div className="glass-layer glass-glow" />
        <div className="glass-layer glass-object">
          {(variant === 'clear' ? ['light', 'dark'] : ['any']).map((tone) => {
            // the clear render has a second cut for dark surfaces; only the
            // visible one is fetched (the other is display:none + lazy)
            const base = tone === 'dark' ? `${r.base}-dark` : r.base
            return (
              <img
                key={tone}
                className={tone === 'any' ? undefined : `glass-tone-${tone}`}
                src={`${base}-1200.webp`}
                srcSet={r.widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ')}
                sizes={sizes}
                alt=""
                width={r.w}
                height={r.h}
                decoding="async"
                loading={eager && tone === 'any' ? 'eager' : 'lazy'}
                fetchPriority={eager ? 'high' : 'low'}
                draggable={false}
              />
            )
          })}
          <span className="glass-sheen" />
        </div>
      </div>
    </div>
  )
}
