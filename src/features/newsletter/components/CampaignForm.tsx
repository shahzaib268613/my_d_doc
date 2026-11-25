import { useId, useState, type FormEvent } from 'react'
import { Info, Mail } from 'lucide-react'
import { Button, FilterSelect, Input, Textarea } from '@/shared/components/ui'
import { FormField } from '@/features/admin/components/FormField'
import type { CampaignStatus, NewsletterCampaign } from '../types'

export type CampaignFormValues = {
  title: string
  subject: string
  content: string
  status: CampaignStatus
}

type Props = {
  initial?: Partial<NewsletterCampaign>
  submitLabel: string
  onSubmit: (values: CampaignFormValues) => void | Promise<void>
  onCancel?: () => void
}

export function CampaignForm({ initial, submitLabel, onSubmit, onCancel }: Props) {
  const titleId = useId()
  const subjectId = useId()
  const contentId = useId()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [subject, setSubject] = useState(initial?.subject ?? '')
  const [content, setContent] = useState(initial?.content ?? '')
  const [status, setStatus] = useState<CampaignStatus>(initial?.status ?? 'draft')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    if (!title.trim() || !subject.trim() || !content.trim()) {
      setError('Title, subject, and content are required.')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({
        title: title.trim(),
        subject: subject.trim(),
        content: content.trim(),
        status,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save campaign')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.85fr)]">
        <div className="space-y-3">
          <FormField id={titleId} label="Campaign title" required>
            <Input
              id={titleId}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Spring diabetes tips"
              required
            />
          </FormField>
          <FormField id={subjectId} label="Email subject" required>
            <Input
              id={subjectId}
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Practical tips for everyday glucose care"
              required
            />
          </FormField>
          <FormField
            id={contentId}
            label="Email content"
            required
            hint="Plain text or simple HTML"
          >
            <Textarea
              id={contentId}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Write your newsletter message…"
              required
              className="min-h-40"
            />
          </FormField>
          <FilterSelect
            variant="outlined"
            label="Status"
            value={status}
            onChange={(value) => setStatus(value as CampaignStatus)}
            options={[
              { value: 'draft', label: 'Draft' },
              { value: 'ready', label: 'Ready' },
              { value: 'not_sent', label: 'Not Sent' },
            ]}
          />
        </div>

        <aside className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-border bg-soft/40 shadow-sm">
            <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2.5">
              <Mail className="size-3.5 text-primary" aria-hidden="true" />
              <p className="text-[0.8125rem] font-semibold text-foreground">Live preview</p>
            </div>
            <div className="space-y-2.5 p-3">
              <div>
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Subject
                </p>
                <p className="mt-0.5 text-[0.8125rem] font-medium text-foreground">
                  {subject.trim() || 'Your subject line will appear here'}
                </p>
              </div>
              <div className="rounded-lg border border-border/80 bg-surface p-3">
                <p className="whitespace-pre-wrap text-[0.8125rem] leading-relaxed text-foreground/90">
                  {content.trim() || 'Start writing to preview the email body…'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2.5 rounded-xl border border-primary/20 bg-soft/70 p-3 text-[0.8125rem] text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <p>
              Sending is not available yet. Save drafts and mark campaigns Ready; email delivery
              will connect after backend / email-service integration.
            </p>
          </div>
        </aside>
      </div>

      {error ? (
        <p className="text-[0.8125rem] text-danger" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap justify-end gap-1.5 border-t border-border pt-3">
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
