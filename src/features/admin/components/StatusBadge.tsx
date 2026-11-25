import { Badge, type BadgeVariant } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'

/** @deprecated Prefer Badge with tone variants; kept as a thin shared wrapper. */
export type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

type Props = {
  label: string
  tone?: StatusTone
  className?: string
}

const toneToVariant: Record<StatusTone, BadgeVariant> = {
  neutral: 'neutral',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
}

export function StatusBadge({ label, tone = 'neutral', className }: Props) {
  return (
    <Badge
      variant={toneToVariant[tone]}
      className={cn('px-2 py-0.5 text-[0.6875rem]', className)}
    >
      {label}
    </Badge>
  )
}
