import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container, Reveal, Section } from '@/shared/components/ui'

type Props = {
  children: ReactNode
}

/** Presentational shell; blog content is composed in via children from app. */
export function LatestPostsSection({ children }: Props) {
  return (
    <Section className="relative overflow-hidden bg-soft/50">
      <div
        className="pointer-events-none absolute -right-16 top-8 size-56 rounded-full bg-white"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-0 size-64 rounded-full bg-primary/10"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                Latest Blog
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-inverse sm:text-4xl">
                Latest from the blog
              </h2>
              <p className="mt-3 text-inverse/70">
                Practical articles on nutrition, blood sugar, and living well with diabetes.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex min-h-[var(--spacing-touch)] shrink-0 items-center gap-1.5 self-start rounded-lg bg-inverse px-4 text-sm font-semibold text-white no-underline shadow-[var(--shadow-button)] transition-colors hover:bg-inverse/90 sm:self-auto"
            >
              View all articles
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          {children}
        </Reveal>
      </Container>
    </Section>
  )
}
