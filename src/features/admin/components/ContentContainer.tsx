import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  /** Optional max width for form-style pages */
  narrow?: boolean
}

/** Consistent padding/width wrapper for admin page bodies. */
export function ContentContainer({ children, className, narrow = false, ...props }: Props) {
  return (
    <div
      className={cn(
        'mx-auto w-full min-w-0 max-w-full',
        narrow ? 'max-w-3xl' : 'max-w-[90rem]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
