import { cn } from '@/shared/utils/cn'

export type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

type Props = {
  label: string
  tone?: StatusTone
  className?: string
}

const toneClasses: Record<StatusTone, string> = {
  neutral: 'bg-muted text-foreground',
  success: 'bg-success/15 text-success',
  warning: 'bg-accent/15 text-accent-foreground',
  danger: 'bg-danger/10 text-danger',
  info: 'bg-soft text-primary',
}

export function StatusBadge({ label, tone = 'neutral', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold',
        toneClasses[tone],
        className,
      )}
    >
      {label}
    </span>
  )
}
