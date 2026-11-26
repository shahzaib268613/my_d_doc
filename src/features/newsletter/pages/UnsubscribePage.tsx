import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Section, Spinner } from '@/shared/components/ui'
import { getApiErrorMessage } from '@/shared/api/axiosInstance'
import { newsletterApi } from '../api/newsletterApi'

export function UnsubscribePage() {
  const [params] = useSearchParams()
  const token = params.get('token')?.trim() ?? ''
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    async function run() {
      if (!token) {
        setStatus('error')
        setMessage('Missing unsubscribe token.')
        return
      }
      try {
        const result = await newsletterApi.unsubscribe(token)
        if (cancelled) return
        setStatus('ok')
        setMessage(
          result.alreadyUnsubscribed
            ? `${result.email} was already unsubscribed.`
            : `${result.email} has been unsubscribed.`,
        )
      } catch (error) {
        if (cancelled) return
        setStatus('error')
        setMessage(getApiErrorMessage(error, 'Unable to unsubscribe.'))
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [token])

  return (
    <Section>
      <Container className="mx-auto max-w-lg py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Unsubscribe
        </h1>
        {status === 'loading' ? (
          <div className="mt-8 flex justify-center">
            <Spinner label="Updating subscription" />
          </div>
        ) : (
          <p
            className={`mt-4 text-base ${status === 'error' ? 'text-danger' : 'text-muted-foreground'}`}
          >
            {message}
          </p>
        )}
        {status === 'ok' ? (
          <p className="mt-6 text-sm text-muted-foreground">
            You will no longer receive newsletter emails from My Diabetes Doc.
          </p>
        ) : null}
      </Container>
    </Section>
  )
}
