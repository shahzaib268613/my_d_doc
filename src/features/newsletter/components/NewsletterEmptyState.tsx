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
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-gradient-to-b from-soft/40 to-surface text-center',
        compact ? 'px-3 py-6' : 'px-4 py-8 sm:py-10',
        className,
      )}
    >
      <span className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-soft text-primary shadow-sm ring-1 ring-border/60">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <h2 className="font-display text-base font-semibold text-foreground sm:text-lg">{title}</h2>
      {description ? (
        <p className="mt-1.5 max-w-sm text-[0.8125rem] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
