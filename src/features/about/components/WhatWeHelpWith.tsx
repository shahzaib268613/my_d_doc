import { Link } from 'react-router-dom'
import {
  Activity,
  Bone,
  Brain,
  HeartPulse,
  Scale,
  type LucideIcon,
} from 'lucide-react'
import {
  services,
  type DiabetesService,
  type RelatedService,
  type RelatedServiceIcon,
  whatWeHelpWithCopy,
} from '@/data/services'
import { Container, Section } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'

const diabetesServices = services.filter(
  (service): service is DiabetesService => service.group === 'diabetes',
)
const relatedServices = services.filter(
  (service): service is RelatedService => service.group === 'related',
)

const relatedIcons: Record<RelatedServiceIcon, LucideIcon> = {
  Activity,
  Scale,
  HeartPulse,
  Bone,
  Brain,
}

function ServiceLink({ href }: { href?: string }) {
  if (!href) return null

  return (
    <Link
      to={href}
      className="mt-4 inline-flex w-fit text-sm font-semibold text-primary no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {whatWeHelpWithCopy.learnMore}
    </Link>
  )
}

export function WhatWeHelpWith() {
  return (
    <Section className="bg-surface">
      <Container>
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {whatWeHelpWithCopy.title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {whatWeHelpWithCopy.intro}
        </p>

        <div className="mt-10">
          <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
            {whatWeHelpWithCopy.diabetesHeading}
          </h3>
          <ul className="mt-4 divide-y divide-border">
            {diabetesServices.map((service, index) => {
              const alternate = index % 2 === 1

              return (
                <li
                  key={service.title}
                  className="min-w-0 py-8 first:pt-0 last:pb-0 sm:py-10"
                >
                  <div
                    className={cn(
                      'grid grid-cols-1 items-center gap-5 sm:gap-8 md:landscape:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] md:landscape:gap-8 lg:landscape:gap-10',
                      alternate && 'md:landscape:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]',
                    )}
                  >
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      width={1200}
                      height={800}
                      className={cn(
                        'order-1 aspect-[3/2] min-w-0 w-full max-w-[34rem] justify-self-center rounded-xl object-cover md:max-w-[26rem] md:landscape:max-w-[34rem]',
                        alternate && 'md:landscape:order-2',
                      )}
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className={cn(
                        'order-2 min-w-0',
                        alternate && 'md:landscape:order-1',
                      )}
                    >
                      <h4 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                        {service.title}
                      </h4>
                      <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                      <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                        <span className="font-semibold text-foreground">
                          {whatWeHelpWithCopy.whoForLabel}{' '}
                        </span>
                        {service.whoFor}
                      </p>
                      <ServiceLink href={service.href} />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
            {whatWeHelpWithCopy.relatedHeading}
          </h3>
          <ul
            className={cn(
              'mt-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-8 xl:grid-cols-3 xl:gap-x-10',
              '[&>li]:border-b [&>li]:border-border [&>li:last-child]:border-b-0',
              'md:[&>li:nth-last-child(-n+2)]:border-b-0',
              'xl:[&>li:nth-last-child(-n+3)]:border-b-0',
            )}
          >
            {relatedServices.map((service) => {
              const Icon = relatedIcons[service.icon]
              const content = (
                <>
                  <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block font-display font-semibold text-foreground">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </span>
                  </span>
                </>
              )

              return (
                <li key={service.title} className="min-w-0 py-5 md:py-6 md:pr-6">
                  {service.href ? (
                    <Link
                      to={service.href}
                      className="flex h-full gap-3 no-underline hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="flex h-full gap-3">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
