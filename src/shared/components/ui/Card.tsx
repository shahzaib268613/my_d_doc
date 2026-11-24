import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

type Props = HTMLAttributes<HTMLDivElement> & {
  elevated?: boolean
}

export function Card({ className, elevated = false, ...props }: Props) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface p-4',
        elevated && 'shadow-md',
        className,
      )}
      {...props}
    />
  )
}
