import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  HeartHandshake,
  Lightbulb,
} from 'lucide-react'
import { siteConfig } from '@/shared/config/site'
import { Container, Reveal, Section } from '@/shared/components/ui'
import { whyFeatures } from '../../../constants/whyMyDiabetesDoc'

const icons = {
  book: BookOpen,
  badge: BadgeCheck,
  heart: HeartHandshake,
  insights: Lightbulb,
} as const

export function WhyMyDiabetesDoc() {
  return (
    <Section className="relative overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute -left-20 top-10 size-56 rounded-full bg-soft"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 size-64 rounded-full bg-primary/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 top-24 size-28 rounded-full border border-primary/15"
        aria-hidden="true"
      />

      <Container className="relative">
        <Reveal>
          <header className="mb-10 max-w-3xl sm:mb-12 lg:mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Why My Diabetes Doc
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Diabetes Education That Makes Sense
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Clear, practical, and accessible information to help you better understand diabetes and
              everyday health decisions.
            </p>
          </header>

          <div className="grid items-stretch gap-5 lg:grid-cols-12 lg:gap-7">
            <aside className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-inverse)] p-8 text-inverse-foreground shadow-lg sm:p-10 lg:col-span-5 lg:min-h-[28rem]">
              <div
                className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-primary/30"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-16 left-10 size-52 rounded-full bg-primary/20"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute right-10 top-1/3 size-20 rounded-full border border-inverse-foreground/15"
                aria-hidden="true"
              />

              <div className="relative flex h-full min-h-[18rem] flex-col justify-between gap-10">
                <div>
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-inverse-foreground/10 text-inverse-foreground ring-1 ring-inverse-foreground/15">
                    <BookOpen className="size-6" aria-hidden="true" />
                  </span>
                  <p className="mt-8 font-display text-2xl font-semibold leading-snug sm:text-3xl">
                    Education designed for real life—not jargon-heavy pages.
                  </p>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-inverse-muted sm:text-base">
                    {siteConfig.name} helps visitors explore diabetes topics with clarity, calm
                    pacing, and practical takeaways they can use in everyday decisions.
                  </p>
                </div>

                <Link
                  to="/blog"
                  className="inline-flex min-h-[var(--spacing-touch)] w-fit items-center gap-1.5 text-sm font-semibold text-inverse-foreground no-underline transition-opacity duration-[var(--duration-fast)] hover:opacity-85"
                >
                  Explore education resources
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </aside>

            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7">
              {whyFeatures.map((feature) => {
                const Icon = icons[feature.icon]
                return (
                  <li key={feature.title} className="min-w-0">
                    <article className="group flex h-full flex-col rounded-2xl border border-border/90 bg-surface p-6 shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-[var(--duration-normal)] ease-out hover:-translate-y-1 hover:border-primary/35 hover:bg-gradient-to-br hover:from-surface hover:to-soft/80 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7">
                      <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-primary/10 transition-[background-color,color,box-shadow] duration-[var(--duration-fast)] group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-sm group-hover:ring-primary/20">
                        <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                      <span
                        className="mt-5 h-px w-10 bg-primary/25 transition-[width,background-color] duration-[var(--duration-normal)] group-hover:w-16 group-hover:bg-primary/50"
                        aria-hidden="true"
                      />
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
