import { Mail, UserCheck, UserMinus, Users, type LucideIcon } from 'lucide-react'
import { Card } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import type { NewsletterStats as Stats } from '../types'

type Props = {
  stats: Stats
}

type StatItem = {
  label: string
  value: number
  hint: string
  icon: LucideIcon
  accent: string
  iconWrap: string
}

export function NewsletterStats({ stats }: Props) {
  const items: StatItem[] = [
    {
      label: 'Total subscribers',
      value: stats.total,
      hint: 'All records',
      icon: Users,
      accent: 'from-primary/10 via-surface to-surface',
      iconWrap: 'bg-primary/15 text-primary',
    },
    {
      label: 'Active',
      value: stats.active,
      hint: 'Can receive mail',
      icon: UserCheck,
      accent: 'from-success/10 via-surface to-surface',
      iconWrap: 'bg-success/15 text-success',
    },
    {
      label: 'Unsubscribed',
      value: stats.unsubscribed,
      hint: 'Opted out',
      icon: UserMinus,
      accent: 'from-muted/80 via-surface to-surface',
      iconWrap: 'bg-muted text-foreground',
    },
    {
      label: 'Engagement pool',
      value: stats.active,
      hint: 'Active only',
      icon: Mail,
      accent: 'from-soft via-surface to-surface',
      iconWrap: 'bg-soft text-primary',
    },
  ]

  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <li key={item.label}>
            <Card
              className={cn(
                'relative overflow-hidden border-border/80 p-0 shadow-sm transition-shadow duration-[var(--duration-fast)] hover:shadow-md',
              )}
            >
              <div
                className={cn('absolute inset-0 bg-gradient-to-br opacity-90', item.accent)}
                aria-hidden="true"
              />
              <div className="relative flex items-start gap-3 p-3.5">
                <span
                  className={cn(
                    'inline-flex size-9 shrink-0 items-center justify-center rounded-xl',
                    item.iconWrap,
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                  <p className="mt-0.5 font-display text-2xl font-bold tracking-tight text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-0.5 text-[0.6875rem] text-muted-foreground">{item.hint}</p>
                </div>
              </div>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}
