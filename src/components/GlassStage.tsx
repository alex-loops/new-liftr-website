import { useEffect, useRef } from 'react'
import { onFrameScroll, prefersReducedMotion } from '../lib/motion'

interface Props {
  /** eager for the hero (above the fold), lazy for the closing CTA */
  eager?: boolean
  /** rendered width hint for srcset selection */
  sizes?: string
  className?: string
}

const BASE = `${import.meta.env.BASE_URL}assets/glass/liftr-glass`
const srcSet = [800, 1200, 1800, 2400].map((w) => `${BASE}-${w}.webp ${w}w`).join(', ')
const mask = `url(${BASE}-800.webp)`

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
export function GlassStage({ eager = false, sizes = '(max-width: 640px) 100vw, 640px', className }: Props) {
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
      className={['glass-stage', className].filter(Boolean).join(' ')}
      style={{ ['--glass-mask' as string]: mask }}
      aria-hidden
    >
      <div className="glass-float">
        <div className="glass-layer glass-glow" />
        <div className="glass-layer glass-object">
          <img
            src={`${BASE}-1200.webp`}
            srcSet={srcSet}
            sizes={sizes}
            alt=""
            width={3729}
            height={3326}
            decoding="async"
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'low'}
            draggable={false}
          />
          <span className="glass-sheen" />
        </div>
      </div>
    </div>
  )
}
