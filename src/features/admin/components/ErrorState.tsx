import type { ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

type Props = {
  title?: string
  description?: string
  action?: ReactNode
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again. If the problem continues, contact support.',
  action,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-danger/25 bg-surface px-6 py-12 text-center',
        className,
      )}
      role="alert"
    >
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-danger/10 text-danger">
        <AlertTriangle className="size-6" aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-display text-xl font-semibold text-foreground">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
