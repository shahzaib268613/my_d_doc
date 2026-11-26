import { useEffect, useId, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { AdminButton } from '@/features/admin/components/AdminButton'
import { FormField } from '@/features/admin/components/FormField'
import { FilterSelect, IconButton, Input } from '@/shared/components/ui'
import type { CategoryWriteInput, ManagedBlogCategory } from './types/category'

type Props = {
  open: boolean
  category?: ManagedBlogCategory | null
  onClose: () => void
  onSubmit: (input: CategoryWriteInput) => void
}

const empty: CategoryWriteInput = {
  name: '',
  status: 'active',
}

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

export function CategoryFormModal({ open, category, onClose, onSubmit }: Props) {
  const titleId = useId()
  const isEdit = Boolean(category)
  const [form, setForm] = useState<CategoryWriteInput>(empty)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    if (category) {
      setForm({
        name: category.name,
        status: category.status,
      })
    } else {
      setForm(empty)
    }
    setError(null)
  }, [open, category])

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

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      onSubmit({
        name: form.name.trim(),
        status: form.status,
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save category')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-overlay backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(90dvh,36rem)] w-full max-w-[min(32rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-lg sm:rounded-xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
          <h2 id={titleId} className="text-lg font-bold text-inverse">
            {isEdit ? 'Edit Category' : 'Create Category'}
          </h2>
          <IconButton
            label="Close"
            onClick={onClose}
            className="shrink-0 text-muted-foreground hover:bg-soft hover:text-inverse"
          >
            <X className="size-5" />
          </IconButton>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
            {error ? (
              <p className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
                {error}
              </p>
            ) : null}

            <FormField id="category-name" label="Name" required>
              <Input
                id="category-name"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="e.g. Blood Sugar Management"
                className="rounded-lg border-border"
              />
            </FormField>

            <FormField id="category-status" label="Status" required>
              <FilterSelect
                id="category-status"
                label="Status"
                hideLabel
                fullWidth
                variant="outlined"
                value={form.status}
                options={STATUS_OPTIONS}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    status: value === 'inactive' ? 'inactive' : 'active',
                  }))
                }
              />
            </FormField>
          </div>

          <div className="flex shrink-0 justify-end gap-2 border-t border-border px-4 py-3 sm:px-5">
            <AdminButton type="button" variant="outline" onClick={onClose}>
              Cancel
            </AdminButton>
            <AdminButton type="submit">{isEdit ? 'Save Changes' : 'Create Category'}</AdminButton>
          </div>
        </form>
      </div>
    </div>
  )
}
