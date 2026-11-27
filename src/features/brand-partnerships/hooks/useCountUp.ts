import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'

/** Animates from 0 to `target` when `active` becomes true. */
export function useCountUp(target: number, active: boolean, durationMs = 1400) {
  const reducedMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }

    if (reducedMotion) {
      setValue(target)
      return
    }

    let frame = 0
    const start = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target, durationMs, reducedMotion])

  return value
}
