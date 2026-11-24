import { useEffect, useId } from 'react'
import { X } from 'lucide-react'
import { BlogFormPage } from './BlogFormPage'

type Props = {
  open: boolean
  onClose: () => void
}

export function BlogCreateModal({ open, onClose }: Props) {
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-[#021b44]/55 backdrop-blur-[2px]" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(92dvh,56rem)] w-full max-w-5xl flex-col overflow-hidden rounded-t-lg border border-[#DCE8F7] bg-[#F4F8FF] shadow-2xl sm:rounded-lg"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#DCE8F7] bg-white px-4 py-3.5 sm:px-6">
          <div>
            <h2 id={titleId} className="text-lg font-bold text-[#021b44] sm:text-xl">
              Add New Blog
            </h2>
            <p className="text-sm text-[#71839F]">Create and publish a new article.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-lg text-[#5B6B82] transition-colors hover:bg-[#EAF3FF] hover:text-[#021b44]"
            aria-label="Close"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          <BlogFormPage mode="modal" onCancel={onClose} onSuccess={onClose} />
        </div>
      </div>
    </div>
  )
}
