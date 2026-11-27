import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  children: ReactNode
}

export function IconButton({ label, className, children, ...props }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'inline-flex size-[var(--spacing-touch)] cursor-pointer items-center justify-center rounded-md text-foreground transition-colors duration-[var(--duration-fast)] hover:bg-soft disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
