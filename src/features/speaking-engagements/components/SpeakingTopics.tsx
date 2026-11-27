import {
  Activity,
  Bone,
  Brain,
  Droplets,
  Heart,
  HeartPulse,
  Scale,
  Syringe,
} from 'lucide-react'
import { Container, Reveal, Section } from '@/shared/components/ui'
import { speakingTopics } from '../constants/content'

const icons = {
  bone: Bone,
  activity: Activity,
  scale: Scale,
  heart: Heart,
  droplets: Droplets,
  brain: Brain,
  syringe: Syringe,
  heartPulse: HeartPulse,
} as const

export function SpeakingTopics() {
  return (
    <Section id="topics" className="bg-surface">
      <Container>
        <Reveal>
          <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Topics
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Speaking Topics
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Talk-ready sessions covering core areas of endocrine and metabolic health.
            </p>
          </header>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {speakingTopics.map((topic, index) => {
            const Icon = icons[topic.icon]
            return (
              <li key={topic.title} className="min-w-0">
                <Reveal delayMs={(index % 4) * 50}>
                  <article className="flex h-full flex-col rounded-2xl border border-border/90 bg-background p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-[var(--duration-normal)] hover:-translate-y-1 hover:border-primary/35 hover:shadow-md motion-reduce:hover:translate-y-0">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-soft text-primary">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {topic.description}
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
