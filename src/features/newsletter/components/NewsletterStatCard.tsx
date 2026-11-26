import type { LucideIcon } from 'lucide-react'
import { Card } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'

type Props = {
  label: string
  value: number | string
  icon: LucideIcon
  hint?: string
  className?: string
}

export function NewsletterStatCard({
  label,
  value,
  icon: Icon,
  hint,
  className,
}: Props) {
  return (
    <Card
      className={cn(
        'flex items-center gap-3.5 border-border/70 p-3.5 shadow-none sm:p-4',
        className,
      )}
    >
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[0.75rem] bg-primary/10 text-primary">
        <Icon className="size-4" aria-hidden="true" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-[0.75rem] font-medium leading-none text-muted-foreground">
          {label}
        </p>
        <p className="mt-1.5 font-display text-2xl font-bold tracking-tight text-foreground">
          {value}
        </p>
        {hint ? (
          <p className="mt-1 text-[0.6875rem] text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    </Card>
  )
}
