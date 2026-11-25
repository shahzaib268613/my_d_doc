import { Link } from 'react-router-dom'
import { services } from '@/data/services'
import { Card, Container, Reveal, Section } from '@/shared/components/ui'

const diabetesServices = services.filter((service) => service.group === 'diabetes')
const relatedServices = services.filter((service) => service.group === 'related')

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

          <div className="mt-10">
            <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              Diabetes care
            </h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {diabetesServices.map((service) => (
                <li key={service.title} className="min-w-0">
                  <Card elevated className="flex h-full flex-col rounded-2xl p-6 sm:p-7">
                    <h4 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                      {service.title}
                    </h4>
                    <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    {service.href ? (
                      <Link
                        to={service.href}
                        className="mt-5 inline-flex w-fit text-sm font-semibold text-primary no-underline hover:underline"
                      >
                        Learn more
                      </Link>
                    ) : null}
                  </Card>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              Related endocrine care
            </h3>
            <ul className="mt-5 grid gap-0 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service) => (
                <li
                  key={service.title}
                  className="min-w-0 border-b border-border py-5 sm:pr-6 lg:pr-8"
                >
                  <h4 className="font-display text-lg font-semibold text-foreground">
                    {service.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  {service.href ? (
                    <Link
                      to={service.href}
                      className="mt-3 inline-flex w-fit text-sm font-semibold text-primary no-underline hover:underline"
                    >
                      Learn more
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
