import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[85rem] px-4 sm:px-5 lg:px-6',
        className,
      )}
      {...props}
    />
  )
}
