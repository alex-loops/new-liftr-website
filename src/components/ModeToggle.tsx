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

const OPTIONS: { value: Choice; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
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
          onClick={() => select(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
