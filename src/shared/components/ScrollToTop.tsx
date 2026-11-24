import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type Props = {
  /** Nested scroll container selector (e.g. admin main). Defaults to window. */
  containerSelector?: string
}

/** Resets scroll to top on every route change (keeps hash targets). */
export function ScrollToTop({ containerSelector }: Props) {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView()
        return
      }
    }

    if (containerSelector) {
      const container = document.querySelector(containerSelector)
      if (container instanceof HTMLElement) {
        container.scrollTo(0, 0)
        return
      }
    }

    window.scrollTo(0, 0)
  }, [pathname, search, hash, containerSelector])

  return null
}
