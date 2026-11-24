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
  const [featured, ...rest] = topics
  const sideTopics = rest.slice(0, 2)
  const bottomTopics = rest.slice(2)

  if (!featured) return null

  const FeaturedIcon = icons[featured.icon]

  return (
    <Section className="relative overflow-hidden bg-[image:var(--gradient-inverse)] text-inverse-foreground">
      <div
        className="pointer-events-none absolute -left-20 top-0 size-64 rounded-full bg-primary/30 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-0 size-72 rounded-full bg-primary/25 blur-2xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                Explore
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-inverse-foreground sm:text-4xl">
                Explore Diabetes Topics
              </h2>
              <p className="mt-3 text-inverse-muted">
                Choose a focus area to browse related education articles—clear guidance without the
                jargon.
              </p>
            </div>
            <Link
              to="#"
              className="inline-flex min-h-[var(--spacing-touch)] items-center gap-1.5 self-start rounded-lg border border-inverse-foreground/15 bg-inverse-foreground/5 px-4 text-sm font-semibold text-primary no-underline transition-colors duration-[var(--duration-fast)] hover:bg-inverse-foreground/10 sm:self-auto"
            >
              View All Topics
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
            <Link
              to="#"
              className="group relative overflow-hidden rounded-3xl bg-primary p-7 text-primary-foreground no-underline shadow-md transition-[transform,box-shadow] duration-[var(--duration-normal)] ease-out hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-inverse motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-9 lg:col-span-7 lg:row-span-2 lg:min-h-[24rem]"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-primary-foreground/10 transition-transform duration-[var(--duration-slow)] group-hover:scale-110"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-16 right-8 size-56 rounded-full bg-primary-foreground/10 transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
                aria-hidden="true"
              />
              <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-primary-foreground/15 transition-colors duration-[var(--duration-fast)] group-hover:bg-primary-foreground/25">
                <FeaturedIcon className="size-7" aria-hidden="true" />
              </span>
              <div className="relative mt-8 flex min-h-[12rem] flex-col justify-end lg:mt-0 lg:h-[calc(100%-5rem)]">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/75">
                  Featured topic
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-md text-base text-primary-foreground/85">
                  {featured.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">
                  Browse articles
                  <ArrowUpRight
                    className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>

            {sideTopics.map((topic) => {
              const Icon = icons[topic.icon]
              return (
                <Link
                  key={topic.slug}
                  to="#"
                  className="group flex flex-col justify-between rounded-3xl border border-inverse-foreground/10 bg-surface p-6 no-underline shadow-sm transition-[transform,box-shadow,border-color] duration-[var(--duration-normal)] ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-inverse motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:col-span-5"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-soft text-primary transition-colors duration-[var(--duration-fast)] group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="mt-8">
                    <h3 className="font-display text-xl font-semibold text-foreground transition-colors duration-[var(--duration-fast)] group-hover:text-primary">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bottomTopics.map((topic) => {
              const Icon = icons[topic.icon]
              return (
                <li key={topic.slug} className="min-w-0">
                  <Link
                    to="#"
                    className="group flex h-full items-start gap-4 rounded-2xl border border-inverse-foreground/10 bg-surface p-5 no-underline shadow-sm transition-[transform,box-shadow,border-color] duration-[var(--duration-normal)] ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-inverse motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-soft text-primary transition-colors duration-[var(--duration-fast)] group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold text-foreground transition-colors duration-[var(--duration-fast)] group-hover:text-primary">
                        {topic.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{topic.description}</p>
                    </div>
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
