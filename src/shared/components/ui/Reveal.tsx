import type { HTMLAttributes, ReactNode } from 'react'
import { useScrollReveal } from '@/shared/hooks/useScrollReveal'
import { cn } from '@/shared/utils/cn'

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  delayMs?: number
}

export function Reveal({ children, className, delayMs = 0, style, ...props }: Props) {
  const { ref, visible, reducedMotion } = useScrollReveal<HTMLDivElement>({
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px',
  })

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-[var(--duration-reveal)] ease-[var(--ease-reveal)] will-change-[opacity,transform]',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className,
      )}
      style={{
        ...style,
        transitionDelay: reducedMotion || !visible ? '0ms' : `${delayMs}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
