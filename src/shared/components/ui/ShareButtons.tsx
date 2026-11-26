import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { ReusableButton } from './ReusableButton'

type Props = {
  title: string
}

export function ShareButtons({ title }: Props) {
  const [copyStatus, setCopyStatus] = useState('')

  async function copyLink() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard access is unavailable')
      }
      await navigator.clipboard.writeText(window.location.href)
      setCopyStatus('Link copied.')
    } catch {
      setCopyStatus('Could not copy the link. Copy the page URL from your browser.')
    }
  }

  const encodedUrl = encodeURIComponent(window.location.href)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <ReusableButton type="button" variant="outline" size="sm" onClick={copyLink}>
        {copyStatus === 'Link copied.' ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
        {copyStatus === 'Link copied.' ? 'Copied' : 'Copy link'}
      </ReusableButton>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="text-sm font-semibold text-foreground underline decoration-primary underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="text-sm font-semibold text-foreground underline decoration-primary underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="text-sm font-semibold text-foreground underline decoration-primary underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        LinkedIn
      </a>
      <span className="sr-only" role="status" aria-live="polite">
        {copyStatus}
      </span>
    </div>
  )
}
