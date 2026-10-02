/**
 * Tiny motion runtime shared by every component:
 *  - one IntersectionObserver for all [data-reveal] elements
 *  - one rAF-throttled scroll/resize loop for scroll-linked effects
 *  - media helpers (reduced motion, fine pointer)
 * No animation library: transitions live in CSS, JS only flips state/vars.
 */

export const mq = (q: string) => (typeof window !== 'undefined' ? window.matchMedia(q) : null)
export const prefersReducedMotion = () => !!mq('(prefers-reduced-motion: reduce)')?.matches
export const hasFinePointer = () => !!mq('(hover: hover) and (pointer: fine)')?.matches

/* ---------------------------------------------------------------- reveal */

let io: IntersectionObserver | null = null

function getObserver() {
  if (io) return io
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const el = e.target
          el.classList.add('is-in')
          io!.unobserve(el)
          // drop reveal delays once arrived so hover/press feel instant
          window.setTimeout(() => el.classList.add('is-settled'), 1800)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  return io
}

/** Observe every not-yet-revealed [data-reveal] inside root. Idempotent. */
export function scanReveals(root: ParentNode = document) {
  const els = root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'))
    return
  }
  const obs = getObserver()
  els.forEach((el) => obs.observe(el))
}

/* ---------------------------------------------------------------- scroll */

type Sub = () => void
const subs = new Set<Sub>()
let ticking = false
let bound = false

function tick() {
  ticking = false
  subs.forEach((fn) => fn())
}
function request() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(tick)
  }
}

/** Subscribe to a once-per-frame callback on scroll/resize. Returns unsubscribe. */
export function onFrameScroll(fn: Sub) {
  subs.add(fn)
  if (!bound) {
    bound = true
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request, { passive: true })
  }
  request()
  return () => {
    subs.delete(fn)
  }
}

/**
 * Progress of an element travelling through the viewport.
 * 0 when its top meets the viewport bottom (+start offset), 1 when its
 * bottom meets the viewport top (−end offset).
 */
export function viewProgress(el: Element, start = 0, end = 0) {
  const r = el.getBoundingClientRect()
  const vh = window.innerHeight
  const total = r.height + vh - start - end
  const p = (vh - start - r.top) / total
  return Math.min(1, Math.max(0, p))
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
