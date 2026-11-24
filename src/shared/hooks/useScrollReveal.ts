import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'

type Options = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollReveal<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null)
  const reducedMotion = useReducedMotion()
  const [revealed, setRevealed] = useState(false)
  const visible = reducedMotion || revealed

  useEffect(() => {
    if (reducedMotion) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          setRevealed(true)
          if (once) observer.unobserve(node)
          return
        }
        if (!once) setRevealed(false)
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion, threshold, rootMargin, once])

  return { ref, visible, reducedMotion }
}
