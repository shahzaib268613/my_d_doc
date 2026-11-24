import type { InputHTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'min-h-[var(--spacing-touch)] w-full rounded-md border border-border bg-surface px-3 text-foreground outline-none ring-0 placeholder:text-muted-foreground focus:border-border focus:outline-none focus:ring-0',
        className,
      )}
      {...props}
    />
  )
}
