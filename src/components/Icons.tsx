import type { SVGProps } from 'react'

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
)

export const ChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path className="check-path" d="M4.5 12.5 9.5 17.5 19.5 6.5" pathLength={1} />
  </svg>
)

export const Plus = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path className="plus-h" d="M5 12h14" />
    <path className="plus-v" d="M12 5v14" />
  </svg>
)

export const LiftrMark = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16.5525 16.5525" fill="none" aria-hidden {...p}>
    <path
      d="M0 8.33855C4.5216 8.37177 8.18074 12.0309 8.21395 16.5525H8.33855C8.37177 12.0309 12.0309 8.37177 16.5525 8.33855V8.21396C12.0309 8.18074 8.37177 4.5216 8.33855 0H8.21395C8.18074 4.5216 4.5216 8.18074 0 8.21396V8.33855Z"
      fill="currentColor"
    />
  </svg>
)
