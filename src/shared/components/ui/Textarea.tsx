import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'min-h-28 w-full resize-none rounded-md border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}
