import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import type { ArticleHeading } from './articleContentUtils'

type Props = {
  headings: ArticleHeading[]
}

export function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '')
  const activeHeadingId = headings.some((heading) => heading.id === activeId)
    ? activeId
    : headings[0]?.id ?? ''

  useEffect(() => {
    if (headings.length < 3) return

    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target instanceof HTMLElement) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  function navigateToHeading(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <nav aria-label="On this page">
      <h2 className="font-display text-lg font-semibold text-foreground">
        On this page
      </h2>
      <ul className="mt-3 space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={activeHeadingId === heading.id ? 'location' : undefined}
              onClick={(event) => navigateToHeading(event, heading.id)}
              className="block rounded-md px-2 py-1.5 text-sm leading-relaxed text-muted-foreground underline-offset-4 hover:text-foreground hover:underline aria-[current=location]:bg-soft aria-[current=location]:font-semibold aria-[current=location]:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
