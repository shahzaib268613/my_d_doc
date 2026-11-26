import { useEffect, useId, useMemo, useState, type FormEvent } from 'react'
import { Mail, X } from 'lucide-react'
import { IconButton, Input, ReusableButton } from '@/shared/components/ui'
import { FormField } from '@/features/admin/components/FormField'
import { sanitizeBasicHtml } from '@/features/blog/api/sanitizeHtml'
import type { ComposeMode } from '../types'
import { EmailRichTextEditor, isRichTextEmpty } from './EmailRichTextEditor'

type Props = {
  open: boolean
  mode: ComposeMode | null
  sending?: boolean
  progress?: { sent: number; failed: number; total: number } | null
  onClose: () => void
  onSend: (values: { subject: string; html: string }) => void | Promise<void>
}

const SUBJECT_MAX = 200

function recipientSummary(mode: ComposeMode) {
  if (mode.type === 'single') return mode.subscriber.email
  if (mode.type === 'selected') {
    return `${mode.count} selected subscriber${mode.count === 1 ? '' : 's'}`
  }
  return `All ${mode.total} active subscriber${mode.total === 1 ? '' : 's'}`
}

function previewSampleName(mode: ComposeMode | null) {
  if (mode?.type === 'single') return mode.subscriber.name?.trim() || 'there'
  return 'there'
}

function previewHtml(html: string, mode: ComposeMode | null) {
  return sanitizeBasicHtml(
    html.replaceAll(/\{\{\s*name\s*\}\}/gi, previewSampleName(mode)),
  )
}

export function ComposeEmailModal({
  open,
  mode,
  sending = false,
  progress = null,
  onClose,
  onSend,
}: Props) {
  const titleId = useId()
  const subjectId = useId()
  const bodyId = useId()
  const [subject, setSubject] = useState('')
  const [html, setHtml] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [editorKey, setEditorKey] = useState(0)

  function resetForm() {
    setSubject('')
    setHtml('')
    setError(null)
  }

  function handleClose() {
    if (sending) return
    resetForm()
    onClose()
  }

  useEffect(() => {
    if (!open) {
      resetForm()
      return
    }
    resetForm()
    setEditorKey((key) => key + 1)
  }, [open, mode])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !sending) handleClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, sending])

  const preview = useMemo(() => previewHtml(html, mode), [html, mode])

  if (!open || !mode) return null

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    if (!subject.trim()) {
      setError('Subject is required')
      return
    }
    if (isRichTextEmpty(html)) {
      setError('Message is required')
      return
    }
    try {
      await onSend({ subject: subject.trim(), html: html.trim() })
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send email')
    }
  }

  const progressDone = progress ? progress.sent + progress.failed : 0
  const progressPct =
    progress && progress.total > 0
      ? Math.min(100, Math.round((progressDone / progress.total) * 100))
      : 0

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      {/* Backdrop only — clicking outside does not close the modal */}
      <div className="absolute inset-0 bg-overlay" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(94dvh,46rem)] w-full max-w-[min(42rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-t-2xl border border-border/80 bg-surface shadow-lg sm:rounded-[1rem]"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border/80 px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-start gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[0.75rem] bg-primary/10 text-primary">
              <Mail className="size-4" aria-hidden="true" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <h2
                id={titleId}
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                Compose email
              </h2>
              <p className="mt-0.5 truncate text-[0.8125rem] text-muted-foreground">
                To: {recipientSummary(mode)}
              </p>
            </div>
          </div>
          <IconButton
            label="Close"
            onClick={handleClose}
            className="shrink-0"
            disabled={sending}
          >
            <X className="size-5" />
          </IconButton>
        </div>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 sm:p-5">
            <FormField id={subjectId} label="Subject" required>
              <div className="space-y-1.5">
                <Input
                  id={subjectId}
                  value={subject}
                  maxLength={SUBJECT_MAX}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="Newsletter update"
                  disabled={sending}
                />
                <p className="text-right text-[0.6875rem] text-muted-foreground">
                  {subject.length}/{SUBJECT_MAX}
                </p>
              </div>
            </FormField>

            <FormField id={bodyId} label="Message" required>
              <EmailRichTextEditor
                key={editorKey}
                id={bodyId}
                value={html}
                onChange={setHtml}
                disabled={sending}
                placeholder="Write your email message…"
              />
            </FormField>

            <div className="rounded-[0.875rem] border border-primary/15 bg-soft/70 p-3.5 sm:p-4">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-primary">
                Live preview
              </p>
              {isRichTextEmpty(html) ? (
                <p className="mt-2.5 text-[0.8125rem] text-muted-foreground">
                  Your message preview will appear here.
                </p>
              ) : (
                <div
                  className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground [&_a]:text-primary [&_a]:underline [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
                  dangerouslySetInnerHTML={{ __html: preview }}
                />
              )}
            </div>

            {progress ? (
              <div className="space-y-2 rounded-[0.875rem] border border-border bg-surface p-3.5">
                <div className="flex items-center justify-between gap-3 text-[0.8125rem]">
                  <span className="text-muted-foreground">Sending progress</span>
                  <span className="font-medium text-foreground">
                    {progress.sent} sent · {progress.failed} failed · {progress.total}{' '}
                    total
                    <span className="ml-2 tabular-nums text-inverse">{progressPct}%</span>
                  </span>
                </div>
                <div
                  className="h-2.5 overflow-hidden rounded-full bg-soft"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progressPct}
                  aria-label="Sending progress"
                >
                  <div
                    className="ui-progress-bar h-full min-w-0 rounded-full"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            ) : null}

            {error ? (
              <p className="text-sm text-danger" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-wrap justify-end gap-2 border-t border-border/80 bg-surface px-4 py-3.5 sm:px-5">
            <ReusableButton
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={sending}
            >
              Cancel
            </ReusableButton>
            <ReusableButton type="submit" variant="navy" disabled={sending}>
              <Mail className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
              {sending ? 'Sending…' : 'Send Email'}
            </ReusableButton>
          </div>
        </form>
      </div>
    </div>
  )
}
