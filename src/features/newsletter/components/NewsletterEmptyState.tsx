import type { ReactNode } from 'react'
import { Inbox, type LucideIcon } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

type Props = {
  title: string
  description?: string
  action?: ReactNode
  icon?: LucideIcon
  className?: string
  compact?: boolean
}

export function NewsletterEmptyState({
  title,
  description,
  action,
  icon: Icon = Inbox,
  className,
  compact = false,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-[0.875rem] border border-dashed border-border/70 bg-soft/20 text-center',
        compact ? 'px-3 py-8' : 'px-4 py-10 sm:py-12',
        className,
      )}
    >
      <span className="mb-3 inline-flex size-11 items-center justify-center rounded-[0.75rem] bg-surface text-primary ring-1 ring-border/70">
        <Icon className="size-4" aria-hidden="true" strokeWidth={1.75} />
      </span>
      <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
      {description ? (
        <p className="mt-1.5 max-w-sm text-[0.8125rem] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
