import { MessageSquareQuote, Star, Trophy } from 'lucide-react'
import { Container, Reveal, Section } from '@/shared/components/ui'
import { trustStats } from '../constants/content'

const icons = {
  star: Star,
  reviews: MessageSquareQuote,
  trophy: Trophy,
} as const

export function TrustStats() {
  return (
    <Section className="bg-[#ECF3F8] py-9 sm:py-11">
      <Container>
        <Reveal>
          <ul className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-center sm:gap-8 lg:gap-12">
            {trustStats.map((stat, index) => {
              const Icon = icons[stat.icon] ?? Star
              return (
                <li
                  key={stat.label}
                  className="flex items-center gap-3.5 sm:max-w-xs sm:justify-center"
                >
                  {index > 0 ? (
                    <span
                      className="mr-1 hidden h-12 w-px bg-border sm:block"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-soft text-primary">
                    <Icon className="size-5" strokeWidth={2} fill="none" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-xl font-semibold text-foreground sm:text-[1.35rem]">
                      {stat.label}
                    </p>
                    <p className="mt-0.5 text-[0.9375rem] text-muted-foreground">{stat.detail}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
