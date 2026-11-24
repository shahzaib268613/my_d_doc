import type { LucideIcon } from 'lucide-react'
import { Card } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'

type Props = {
  label: string
  value: string | number
  hint?: string
  icon?: LucideIcon
  className?: string
}

export function StatCard({ label, value, hint, icon: Icon, className }: Props) {
  return (
    <Card
      className={cn(
        'flex min-w-0 items-start gap-4 p-5 shadow-sm transition-shadow duration-[var(--duration-fast)] hover:shadow-md',
        className,
      )}
    >
      {Icon ? (
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-soft text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      ) : null}
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground">
          {value}
        </p>
        {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      </div>
    </Card>
  )
}
