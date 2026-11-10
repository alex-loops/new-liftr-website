import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scanReveals } from '../lib/motion'

/**
 * Arms reveal observers for whatever the route rendered. The title argument
 * documents the page; the document title and meta tags come from data/seo.ts.
 */
export function usePageMotion(_title: string) {
  const { pathname } = useLocation()
  useEffect(() => {
    // wait a frame so the route's DOM is committed and laid out
    const raf = requestAnimationFrame(() => scanReveals())
    return () => cancelAnimationFrame(raf)
  }, [pathname])
}
