import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

type Props = HTMLAttributes<HTMLDivElement> & {
  label?: string
}

export function Spinner({ className, label = 'Loading', ...props }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('inline-flex items-center gap-2 text-muted-foreground', className)}
      {...props}
    >
      <span
        className="size-5 animate-spin rounded-full border-2 border-border border-t-primary"
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}
