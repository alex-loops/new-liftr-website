import { createElement, type CSSProperties, type ElementType } from 'react'

interface Props {
  text: string
  as?: ElementType
  className?: string
  /** ms before the first word moves */
  delay?: number
  /** ms between words */
  stagger?: number
  id?: string
}

/**
 * Masked word-by-word reveal. Each word rises out of its own clip box,
 * so a multi-line heading reads as lines sliding up rather than a block fade.
 * Real spaces stay in the DOM, so screen readers and copy/paste get plain text.
 */
export function SplitText({ text, as = 'h2', className, delay = 0, stagger = 32, id }: Props) {
  const words = text.split(' ')
  return createElement(
    as,
    {
      className: ['split', className].filter(Boolean).join(' '),
      'data-reveal': 'split',
      style: { '--d': `${delay}ms` } as CSSProperties,
      id,
    },
    words.map((w, i) => (
      <span key={i}>
        <span className="split-w">
          <span className="split-i" style={{ '--i': i, '--s': `${stagger}ms` } as CSSProperties}>
            {w}
          </span>
        </span>
        {i < words.length - 1 ? ' ' : null}
      </span>
    )),
  )
}
