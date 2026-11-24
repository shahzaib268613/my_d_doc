import { useId, useState, type FormEvent } from 'react'
import { Button, Input } from '@/shared/components/ui'
import { FormField } from '@/features/admin/components/FormField'
import { FilterDropdown } from '@/features/admin/components/FilterDropdown'
import type { NewsletterSubscriber, SubscriberStatus } from '../types'

export type SubscriberFormValues = {
  name: string
  email: string
  status: SubscriberStatus
}

type Props = {
  initial?: Partial<NewsletterSubscriber>
  submitLabel: string
  showStatus?: boolean
  onSubmit: (values: SubscriberFormValues) => void | Promise<void>
  onCancel?: () => void
}

export function SubscriberForm({
  initial,
  submitLabel,
  showStatus = true,
  onSubmit,
  onCancel,
}: Props) {
  const nameId = useId()
  const emailId = useId()
  const [name, setName] = useState(initial?.name ?? '')
  const [email, setEmail] = useState(initial?.email ?? '')
  const [status, setStatus] = useState<SubscriberStatus>(initial?.status ?? 'active')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        status,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save subscriber')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id={nameId} label="Name" hint="Optional">
          <Input
            id={nameId}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </FormField>
        <FormField id={emailId} label="Email" required error={error ?? undefined}>
          <Input
            id={emailId}
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
            aria-invalid={Boolean(error)}
          />
        </FormField>
      </div>
      {showStatus ? (
        <FilterDropdown
          label="Status"
          value={status}
          onChange={(value) => setStatus(value as SubscriberStatus)}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'unsubscribed', label: 'Unsubscribed' },
          ]}
        />
      ) : null}
      <div className="flex flex-wrap justify-end gap-2 border-t border-border pt-4">
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
