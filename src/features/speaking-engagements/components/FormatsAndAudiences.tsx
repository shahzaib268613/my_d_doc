import { Building2, MonitorPlay, Stethoscope, Users } from 'lucide-react'
import { Container, Reveal, Section } from '@/shared/components/ui'
import { formatsAndAudiences } from '../constants/content'

const icons = {
  stethoscope: Stethoscope,
  users: Users,
  building: Building2,
  monitor: MonitorPlay,
} as const

export function FormatsAndAudiences() {
  return (
    <Section className="bg-background">
      <Container>
        <Reveal>
          <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Formats
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Formats &amp; Audiences
            </h2>
          </header>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {formatsAndAudiences.map((item, index) => {
            const Icon = icons[item.icon]
            return (
              <li key={item.title} className="min-w-0">
                <Reveal delayMs={index * 50}>
                  <article className="flex h-full flex-col rounded-2xl border border-border/90 bg-surface p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-[var(--duration-normal)] hover:-translate-y-1 hover:border-primary/35 hover:shadow-md motion-reduce:hover:translate-y-0">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-soft text-primary">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground sm:text-xl">
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
