import { useEffect, useId, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { AdminButton } from '@/features/admin/components/AdminButton'
import { FormField } from '@/features/admin/components/FormField'
import { FilterSelect, IconButton, Input, Textarea } from '@/shared/components/ui'
import { normalizeSlugInput, slugifyTitle } from './utils/slug'
import type { CategoryStatus, CategoryWriteInput, ManagedBlogCategory } from './types/category'

type Props = {
  open: boolean
  category?: ManagedBlogCategory | null
  onClose: () => void
  onSubmit: (input: CategoryWriteInput) => void
}

const empty: CategoryWriteInput = {
  name: '',
  slug: '',
  description: '',
  status: 'active',
}

export function CategoryFormModal({ open, category, onClose, onSubmit }: Props) {
  const titleId = useId()
  const isEdit = Boolean(category)
  const [form, setForm] = useState<CategoryWriteInput>(empty)
  const [slugManual, setSlugManual] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    if (category) {
      setForm({
        name: category.name,
        slug: category.slug,
        description: category.description,
        status: category.status,
      })
      setSlugManual(true)
    } else {
      setForm(empty)
      setSlugManual(false)
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
        slug: slugifyTitle(form.slug || form.name),
        description: form.description.trim(),
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
                onChange={(event) => {
                  const name = event.target.value
                  setForm((current) => ({
                    ...current,
                    name,
                    slug: slugManual ? current.slug : normalizeSlugInput(name),
                  }))
                }}
                placeholder="e.g. Blood Sugar Management"
                className="rounded-lg border-border"
              />
            </FormField>

            <FormField id="category-slug" label="Slug" required>
              <Input
                id="category-slug"
                value={form.slug}
                onChange={(event) => {
                  setSlugManual(true)
                  setForm((current) => ({
                    ...current,
                    slug: normalizeSlugInput(event.target.value),
                  }))
                }}
                placeholder="blood-sugar-management"
                className="rounded-lg border-border font-mono text-sm"
              />
            </FormField>

            <FormField id="category-description" label="Description">
              <Textarea
                id="category-description"
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({ ...current, description: event.target.value }))
                }
                rows={3}
                placeholder="Short description of this category"
                className="rounded-lg border-border"
              />
            </FormField>

            <FormField id="category-status" label="Status">
              <FilterSelect
                id="category-status"
                variant="outlined"
                hideLabel
                fullWidth
                label="Category status"
                value={form.status}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ]}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    status: value as CategoryStatus,
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
