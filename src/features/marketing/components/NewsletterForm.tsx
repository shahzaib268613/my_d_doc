import { useId, useState, type CSSProperties, type FormEvent } from 'react'
import { z } from 'zod'
import { Button, Input, Label } from '@/shared/components/ui'
import {
  NewsletterStorageError,
  useNewsletter,
} from '@/features/newsletter'
import { newsletterContent } from '../constants/newsletter'
import { cn } from '@/shared/utils/cn'

const newsletterSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  company: z.string().optional(),
})

type Props = {
  variant?: 'inline' | 'band' | 'stacked'
  className?: string
  buttonClassName?: string
  buttonStyle?: CSSProperties
}

export function NewsletterForm({
  variant = 'band',
  className,
  buttonClassName,
  buttonStyle,
}: Props) {
  const { addSubscriber } = useNewsletter()
  const emailId = useId()
  const honeypotId = useId()
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setMessage(null)

    const parsed = newsletterSchema.safeParse({
      email,
      company: honeypot,
    })

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Invalid email')
      return
    }

    if (honeypot) {
      setMessage('Thanks for subscribing.')
      setEmail('')
      return
    }

    setSubmitting(true)
    try {
      addSubscriber({
        email: parsed.data.email,
        source: 'homepage',
      })
      setMessage('You are subscribed. Thank you!')
      setEmail('')
    } catch (err) {
      if (err instanceof NewsletterStorageError && err.code === 'DUPLICATE') {
        setError('This email is already subscribed.')
      } else if (err instanceof NewsletterStorageError) {
        setError(err.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const stacked = variant === 'stacked'

  return (
    <form className={cn('relative w-full', className)} onSubmit={submit} noValidate>
      <div
        className={cn(
          stacked || variant === 'inline'
            ? 'flex flex-col gap-3'
            : 'flex flex-col gap-3 sm:flex-row sm:items-end',
        )}
      >
        <div className="min-w-0 flex-1">
          <Label htmlFor={emailId} className={cn(stacked && 'sr-only')}>
            Email address
          </Label>
          <Input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={submitting}
            placeholder={newsletterContent.emailPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${emailId}-error` : undefined}
            className={cn(
              'w-full',
              stacked &&
                'border-0 bg-inverse-foreground/5 text-inverse-foreground outline-none placeholder:text-inverse-muted focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
            )}
          />
        </div>

        {buttonStyle ? (
          <button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor: '#ffffff',
              color: '#1b2f43',
              ...buttonStyle,
            }}
            className={cn(
              'inline-flex min-h-[var(--spacing-touch)] w-full shrink-0 items-center justify-center rounded-lg px-3.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50',
              !stacked && 'sm:w-auto sm:min-w-36',
              buttonClassName,
            )}
          >
            {submitting
              ? newsletterContent.submitLoadingLabel
              : newsletterContent.submitIdleLabel}
          </button>
        ) : (
          <Button
            type="submit"
            disabled={submitting}
            className={cn(
              'w-full shrink-0',
              !stacked && 'sm:w-auto sm:min-w-36',
              stacked && 'rounded-lg font-semibold',
              buttonClassName,
            )}
          >
            {submitting
              ? newsletterContent.submitLoadingLabel
              : newsletterContent.submitIdleLabel}
          </Button>
        )}
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <Label htmlFor={honeypotId}>Company</Label>
        <Input
          id={honeypotId}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="mt-2 min-h-5" aria-live="polite">
        {error ? (
          <p id={`${emailId}-error`} className="text-sm text-danger">
            {error}
          </p>
        ) : null}
        {message ? <p className="text-sm opacity-90">{message}</p> : null}
      </div>
    </form>
  )
}
