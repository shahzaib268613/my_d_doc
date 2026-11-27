import { BadgeCheck, HeartHandshake, MessageSquareText } from 'lucide-react'
import { Container, Reveal, Section } from '@/shared/components/ui'
import { whyPartner } from '../constants/content'

const icons = {
  badge: BadgeCheck,
  heart: HeartHandshake,
  message: MessageSquareText,
} as const

export function WhyPartner() {
  return (
    <Section className="bg-white">
      <Container>
        <Reveal>
          <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Why partner
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Partner With Dr. Leibowitz
            </h2>
          </header>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {whyPartner.map((item, index) => {
            const Icon = icons[item.icon]
            return (
              <li key={item.title} className="min-w-0">
                <Reveal delayMs={index * 60}>
                  <article className="flex h-full flex-col rounded-2xl border border-border/90 bg-surface p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-[var(--duration-normal)] hover:-translate-y-1 hover:border-primary/35 hover:shadow-md motion-reduce:hover:translate-y-0">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-primary/10">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
