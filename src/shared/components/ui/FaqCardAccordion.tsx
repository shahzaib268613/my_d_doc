import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { PostFaq } from '@/features/blog/types/Post'
import { cn } from '@/shared/utils/cn'

type Props = {
  faqs: PostFaq[]
}

/** Card-style FAQ accordion — one panel open at a time. */
export function FaqCardAccordion({ faqs }: Props) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (faqs.length === 0) return null

  return (
    <ul className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`

        return (
          <li key={`${faq.question}-${index}`}>
            <div
              className={cn(
                'rounded-xl border border-[#D7E6F2] bg-white shadow-[0_1px_2px_color-mix(in_srgb,#1b2f43_5%,transparent)] transition-[border-color,box-shadow,background-color] duration-[var(--duration-normal)]',
                'hover:border-primary/35 hover:shadow-[0_4px_14px_color-mix(in_srgb,#1b2f43_8%,transparent)]',
                isOpen && 'border-primary/30 shadow-[0_4px_14px_color-mix(in_srgb,#1b2f43_8%,transparent)]',
              )}
            >
              <h4 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-5 sm:py-4"
                >
                  <span className="min-w-0 flex-1 font-display text-[0.975rem] font-semibold leading-snug text-inverse sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      'inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-soft text-primary transition-transform duration-[var(--duration-normal)]',
                      isOpen && 'rotate-180',
                    )}
                    aria-hidden="true"
                  >
                    <ChevronDown className="size-4" strokeWidth={2} />
                  </span>
                </button>
              </h4>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cn(
                  'grid transition-[grid-template-rows] duration-300 ease-[var(--ease-standard)] motion-reduce:transition-none',
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <p className="mb-0 px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-5 sm:pb-5 sm:text-[0.9375rem] sm:leading-7">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
