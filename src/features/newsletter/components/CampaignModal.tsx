import { useEffect, useId } from 'react'
import { X } from 'lucide-react'
import { IconButton } from '@/shared/components/ui'
import { CampaignForm, type CampaignFormValues } from './CampaignForm'
import type { NewsletterCampaign } from '../types'

type Props = {
  open: boolean
  title?: string
  description?: string
  initial?: Partial<NewsletterCampaign>
  submitLabel: string
  onClose: () => void
  onSubmit: (values: CampaignFormValues) => void | Promise<void>
}

export function CampaignModal({
  open,
  title = 'Create campaign',
  description = 'Save a draft locally. Sending will be available after email-service integration.',
  initial,
  submitLabel,
  onClose,
  onSubmit,
}: Props) {
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-overlay"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative z-10 flex max-h-[min(92dvh,52rem)] w-full max-w-[min(48rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-lg sm:rounded-xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <h2 id={titleId} className="font-display text-lg font-semibold text-foreground">
              {title}
            </h2>
            <p id={descriptionId} className="mt-0.5 text-[0.8125rem] text-muted-foreground">
              {description}
            </p>
          </div>
          <IconButton label="Close" onClick={onClose} className="shrink-0">
            <X className="size-5" />
          </IconButton>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
          <CampaignForm
            key={`${open}-${initial?.id ?? 'new'}`}
            initial={initial}
            submitLabel={submitLabel}
            onCancel={onClose}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  )
}
