import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scanReveals } from '../lib/motion'

/** Sets the title and arms reveal observers for whatever the route rendered. */
export function usePageMotion(title: string) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = title
    // wait a frame so the route's DOM is committed and laid out
    const raf = requestAnimationFrame(() => scanReveals())
    return () => cancelAnimationFrame(raf)
  }, [pathname, title])
}
