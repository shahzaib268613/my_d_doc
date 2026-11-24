import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type Props = {
  children: ReactNode
  className?: string
}

/** Horizontal toolbar row for search/filters/actions above tables. */
export function AdminToolbar({ children, className }: Props) {
  return (
    <div
      className={cn(
        'mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between',
        className,
      )}
    >
      {children}
    </div>
  )
}
