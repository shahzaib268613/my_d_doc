import { useEffect, useId } from 'react'
import { Button } from '@/shared/components/ui/Button'
import { cn } from '@/shared/utils/cn'

type Props = {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}: Props) {
  const titleId = useId()
  const descriptionId = useId()
  const cancelId = useId()

  useEffect(() => {
    if (!open) return

    document.getElementById(cancelId)?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onCancel()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onCancel, cancelId])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-overlay"
        onClick={onCancel}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative z-10 w-full max-w-[min(28rem,calc(100vw-2rem))] rounded-xl border border-border bg-surface p-6 shadow-lg"
      >
        <h2 id={titleId} className="font-display text-xl font-semibold">
          {title}
        </h2>
        <p id={descriptionId} className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button id={cancelId} variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            className={cn(danger && 'bg-danger text-primary-foreground hover:opacity-90')}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
