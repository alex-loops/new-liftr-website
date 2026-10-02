import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons'
import { hasFinePointer, prefersReducedMotion } from '../lib/motion'

interface Props {
  href: string
  children: ReactNode
  variant?: 'primary' | 'subtle'
  size?: 'md' | 'sm'
  arrow?: boolean
  className?: string
}

/**
 * Pill button with a restrained magnetic pull (max ~6px), a cursor-following
 * sheen, an arrow that swaps out/in on hover and a short press state.
 */
export function Button({ href, children, variant = 'primary', size = 'md', arrow = true, className }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !hasFinePointer() || prefersReducedMotion()) return
    let raf = 0
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const k = Math.min(1, 46 / Math.max(r.width, 1))
        el.style.setProperty('--tx', `${(x * k * 0.32).toFixed(2)}px`)
        el.style.setProperty('--ty', `${(y * 0.22).toFixed(2)}px`)
        el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
        el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
      })
    }
    const leave = () => {
      cancelAnimationFrame(raf)
      el.style.setProperty('--tx', '0px')
      el.style.setProperty('--ty', '0px')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [])

  const cls = ['button', variant === 'subtle' && 'button-subtle', size === 'sm' && 'button-sm', className]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <span className="button-sheen" aria-hidden />
      <span className="button-label">{children}</span>
      {arrow && (
        <span className="button-icon" aria-hidden>
          <ArrowRight className="button-arrow a1" />
          <ArrowRight className="button-arrow a2" />
        </span>
      )}
    </>
  )

  const isRoute = href.startsWith('/') && !href.startsWith('//')
  if (isRoute)
    return (
      <Link ref={ref} to={href} className={cls} viewTransition>
        {inner}
      </Link>
    )
  return (
    <a ref={ref} href={href} className={cls}>
      {inner}
    </a>
  )
}
