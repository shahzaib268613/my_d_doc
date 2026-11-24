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
        // Fill the admin main pane so page footers (pagination) can sit at the bottom.
        'mx-auto flex w-full min-h-[calc(100dvh-6rem)] min-w-0 max-w-full flex-1 flex-col',
        narrow ? 'max-w-3xl' : 'max-w-[90rem]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
