import type React from 'react'
import { useEffect, useState } from 'react'

type Choice = 'system' | 'light' | 'dark'
type Mode = 'light' | 'dark'
const KEY = 'liftr-mode'

/** System setting, with dark as the default when the system states none. */
const systemMode = (): Mode => (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')

function readChoice(): Choice {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'light' || v === 'dark') return v
  } catch {
    /* storage unavailable */
  }
  return 'system'
}

function writeChoice(c: Choice) {
  try {
    if (c === 'system') localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, c)
  } catch {
    /* storage unavailable — the choice lasts for this visit */
  }
}

function apply(mode: Mode, animate: boolean) {
  const run = () => {
    document.documentElement.dataset.mode = mode
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', mode === 'dark' ? '#070c18' : '#ffffff')
  }
  const d = document as Document & { startViewTransition?: (cb: () => void) => unknown }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (animate && d.startViewTransition && !reduce) d.startViewTransition(run)
  else run()
}

const icon = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const
const SystemIcon = () => (
  <svg {...icon}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </svg>
)
const SunIcon = () => (
  <svg {...icon}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)
const MoonIcon = () => (
  <svg {...icon}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </svg>
)

const OPTIONS: { value: Choice; label: string; Icon: () => React.JSX.Element }[] = [
  { value: 'system', label: 'Match system theme', Icon: SystemIcon },
  { value: 'light', label: 'Light theme', Icon: SunIcon },
  { value: 'dark', label: 'Dark theme', Icon: MoonIcon },
]

/**
 * Footer theme switch: System (default) / Light / Dark. The initial mode is
 * applied before first paint by the inline script in index.html; this keeps
 * following the system setting while "System" is selected.
 */
export function ModeSwitch() {
  const [choice, setChoice] = useState<Choice>(() => (typeof window === 'undefined' ? 'system' : readChoice()))

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      if (readChoice() === 'system') apply(systemMode(), true)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const select = (c: Choice) => {
    setChoice(c)
    writeChoice(c)
    apply(c === 'system' ? systemMode() : c, true)
  }

  return (
    <div className="mode-switch" role="radiogroup" aria-label="Colour theme">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={choice === o.value}
          className={choice === o.value ? 'is-on' : ''}
          aria-label={o.label}
          title={o.label}
          onClick={() => select(o.value)}
        >
          <o.Icon />
        </button>
      ))}
    </div>
  )
}
