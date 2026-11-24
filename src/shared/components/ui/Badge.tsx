import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

type BadgeVariant = 'soft' | 'primary' | 'outline'

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
        className,
      )}
      {...props}
    />
  )
}
