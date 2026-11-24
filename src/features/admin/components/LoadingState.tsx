import { Spinner } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'

type Props = {
  label?: string
  className?: string
}

export function LoadingState({ label = 'Loading', className }: Props) {
  return (
    <div
      className={cn(
        'flex min-h-48 flex-col items-center justify-center rounded-xl border border-border bg-surface px-6 py-12',
        className,
      )}
    >
      <Spinner label={label} />
      <p className="mt-3 text-sm text-muted-foreground">{label}…</p>
    </div>
  )
}
