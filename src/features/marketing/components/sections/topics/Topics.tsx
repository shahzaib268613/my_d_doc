import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowUpRight,
  Droplets,
  HeartPulse,
  Pill,
  ShieldCheck,
  Utensils,
} from 'lucide-react'
import { Container, Reveal, Section } from '@/shared/components/ui'
import { topics } from '../../../constants/topics'

const icons = {
  droplet: Droplets,
  utensils: Utensils,
  activity: Activity,
  pill: Pill,
  shield: ShieldCheck,
  heart: HeartPulse,
} as const

export function Topics() {
  return (
    <Section className="relative overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute -left-16 top-10 size-56 rounded-full bg-soft"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 size-64 rounded-full bg-primary/10"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                Explore Diabetes Topics
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Education paths for everyday decisions
              </h2>
              <p className="mt-3 text-muted-foreground">
                Browse focused topic cards to find clear, practical articles that fit your needs.
              </p>
            </div>
            <Link
              to="/blog"
              className="ui-btn-shine inline-flex min-h-[var(--spacing-touch)] items-center justify-center self-start rounded-lg bg-inverse px-4 text-sm font-semibold text-inverse-foreground no-underline shadow-[var(--shadow-button)] transition-[box-shadow,opacity,background-color] duration-[var(--duration-normal)] hover:bg-inverse/90 hover:shadow-[var(--shadow-button-hover)] sm:self-auto"
            >
              <span className="relative z-10 inline-flex items-center gap-1.5">
                View all topics
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, index) => {
              const Icon = icons[topic.icon]
              const featured = index === 0
              return (
                <li key={topic.slug} className="min-w-0">
                  <Link
                    to={`/blog?category=${topic.slug}`}
                    className={
                      featured
                        ? 'group relative flex h-full flex-col overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-6 text-primary-foreground no-underline shadow-md transition-[transform,box-shadow] duration-[var(--duration-normal)] hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7'
                        : 'group flex h-full flex-col rounded-3xl border border-border bg-background p-6 no-underline shadow-sm transition-[transform,box-shadow,border-color] duration-[var(--duration-normal)] hover:-translate-y-1 hover:border-primary/35 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7'
                    }
                  >
                    {featured ? (
                      <>
                        <div
                          className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-white/10"
                          aria-hidden="true"
                        />
                        <div
                          className="pointer-events-none absolute -bottom-10 right-6 size-40 rounded-full bg-white/10"
                          aria-hidden="true"
                        />
                      </>
                    ) : null}
                    <span
                      className={
                        featured
                          ? 'relative inline-flex size-12 items-center justify-center rounded-2xl bg-white/15'
                          : 'inline-flex size-12 items-center justify-center rounded-2xl bg-soft text-primary transition-colors duration-[var(--duration-fast)] group-hover:bg-primary group-hover:text-primary-foreground'
                      }
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3
                      className={
                        featured
                          ? 'relative mt-6 font-display text-xl font-semibold'
                          : 'mt-6 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary'
                      }
                    >
                      {topic.title}
                    </h3>
                    <p
                      className={
                        featured
                          ? 'relative mt-2 flex-1 text-sm text-primary-foreground/85'
                          : 'mt-2 flex-1 text-sm text-muted-foreground'
                      }
                    >
                      {topic.description}
                    </p>
                    <span
                      className={
                        featured
                          ? 'relative mt-5 inline-flex items-center gap-1 text-sm font-semibold'
                          : 'mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary'
                      }
                    >
                      Browse articles
                      <ArrowUpRight
                        className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
