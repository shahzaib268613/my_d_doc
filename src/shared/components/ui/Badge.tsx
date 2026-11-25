import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

export type BadgeVariant =
  | 'soft'
  | 'primary'
  | 'outline'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
}

export function Badge({ className, variant = 'soft', ...props }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        variant === 'soft' && 'bg-soft text-primary',
        variant === 'primary' && 'bg-primary text-primary-foreground',
        variant === 'outline' && 'border border-border bg-transparent text-foreground',
        variant === 'neutral' && 'bg-muted text-foreground',
        variant === 'success' && 'bg-success/15 text-success',
        variant === 'warning' && 'bg-accent/15 text-accent-foreground',
        variant === 'danger' && 'bg-danger/10 text-danger',
        variant === 'info' && 'bg-soft text-primary',
        className,
      )}
      {...props}
    />
  )
}
