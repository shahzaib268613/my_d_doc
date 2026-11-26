import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

export type StatsCardTone = 'primary' | 'muted' | 'success' | 'danger' | 'warning'

const toneClasses: Record<StatsCardTone, string> = {
  primary: 'bg-soft text-primary',
  muted: 'bg-muted text-muted-foreground',
  success: 'bg-success/15 text-success',
  danger: 'bg-danger/15 text-danger',
  warning: 'bg-warning/15 text-warning',
}

type Props = {
  label: string
  value: string | number
  icon: LucideIcon
  tone?: StatsCardTone
  hint?: string
  className?: string
}

/** Compact admin/marketing stat tile — label + value left, tinted icon right. */
export function StatsCard({
  label,
  value,
  icon: Icon,
  tone = 'primary',
  hint,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'min-w-0 rounded-[14px] border border-border bg-surface p-3.5 shadow-sm sm:p-4',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2.5 sm:gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {value}
          </p>
          {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        <span
          className={cn(
            'inline-flex size-9 shrink-0 items-center justify-center rounded-[12px] sm:size-11',
            toneClasses[tone],
          )}
        >
          <Icon className="size-4 sm:size-5" aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}

type GridProps = {
  children: ReactNode
  className?: string
}

/** Responsive row for one or more StatsCards. */
export function StatsCardGrid({ children, className }: GridProps) {
  return (
    <ul className={cn('grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {children}
    </ul>
  )
}
