import { Link } from 'react-router-dom'
import {
  Activity,
  Bone,
  Brain,
  FlaskConical,
  HeartPulse,
  Scale,
  type LucideIcon,
} from 'lucide-react'
import { services, type Service } from '@/data/services'
import { Card, Container, Reveal, Section } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'

const diabetesServices = services.filter((service) => service.group === 'diabetes')
const relatedServices = services.filter((service) => service.group === 'related')

const relatedIcons: Record<NonNullable<Service['icon']>, LucideIcon> = {
  Activity,
  Scale,
  HeartPulse,
  FlaskConical,
  Bone,
  Brain,
}

function ServiceLink({ href, className }: { href?: string; className?: string }) {
  if (!href) return null
  return (
    <Link
      to={href}
      className={cn(
        'mt-4 inline-flex w-fit text-sm font-semibold text-primary no-underline hover:underline',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className,
      )}
    >
      Learn more
    </Link>
  )
}

export function WhatWeHelpWith() {
  return (
    <Section className="bg-surface">
      <Container>
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What we help with
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Our focus is diabetes care, along with related hormone conditions that affect blood
            sugar and overall health.
          </p>
        </Reveal>

        <div className="mt-10">
          <Reveal>
            <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              Diabetes care
            </h3>
          </Reveal>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-6">
            {diabetesServices.map((service, index) => (
              <li key={service.title} className="min-w-0">
                <Reveal delayMs={index * 80}>
                  <Card
                    elevated
                    className="flex h-full flex-col overflow-hidden rounded-2xl p-0 transition-[transform,box-shadow,border-color] duration-[var(--duration-normal)] hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md motion-reduce:transform-none"
                  >
                    {service.image ? (
                      <div className="aspect-[16/10] w-full overflow-hidden bg-soft">
                        <img
                          src={service.image}
                          alt={service.imageAlt ?? ''}
                          width={1200}
                          height={750}
                          className="size-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex aspect-[16/10] w-full items-center justify-center bg-soft"
                        aria-hidden="true"
                      >
                        <Activity className="size-10 text-primary" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h4 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                        {service.title}
                      </h4>
                      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                      {service.whoFor ? (
                        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                          <span className="font-semibold text-foreground">Who it&apos;s for: </span>
                          {service.whoFor}
                        </p>
                      ) : null}
                      <ServiceLink href={service.href} />
                    </div>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <Reveal>
            <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              Related endocrine care
            </h3>
          </Reveal>
          <ul className="mt-5 grid grid-cols-1 gap-0 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((service, index) => {
              const Icon = service.icon ? relatedIcons[service.icon] : Activity
              const body = (
                <>
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-soft text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-semibold text-foreground">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </span>
                  </span>
                </>
              )

              return (
                <li
                  key={service.title}
                  className="min-w-0 border-b border-border py-5 sm:pr-6 lg:pr-8"
                >
                  <Reveal delayMs={(index % 3) * 60}>
                    {service.href ? (
                      <Link
                        to={service.href}
                        className={cn(
                          'flex gap-3 no-underline transition-colors hover:text-primary',
                          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                        )}
                      >
                        {body}
                      </Link>
                    ) : (
                      <div className="flex gap-3">{body}</div>
                    )}
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
