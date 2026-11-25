import type { PostFaq } from '@/features/blog/types/Post'

type Props = {
  faqs: PostFaq[]
}

export function FaqAccordion({ faqs }: Props) {
  if (faqs.length === 0) return null

  return (
    <div className="divide-y divide-border border-y border-border">
      {faqs.map((faq, index) => (
        <details key={`${faq.question}-${index}`} className="group py-4">
          <summary className="cursor-pointer rounded-sm font-semibold text-foreground marker:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            {faq.question}
          </summary>
          <p className="mb-0 mt-3 text-base leading-relaxed text-muted-foreground">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
