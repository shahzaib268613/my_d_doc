import {
  BookOpen,
  MessageSquareText,
  MonitorPlay,
  Package,
  Users,
  Video,
} from 'lucide-react'
import { Container, Reveal, Section } from '@/shared/components/ui'
import { collaborateWays } from '../constants/content'

const icons = {
  book: BookOpen,
  message: MessageSquareText,
  video: Video,
  package: Package,
  users: Users,
  monitor: MonitorPlay,
} as const

export function CollaborateWays() {
  return (
    <Section id="collaborate" className="bg-[#ECF3F8]">
      <Container>
        <Reveal>
          <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Collaboration
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ways We Can Collaborate
            </h2>
          </header>
        </Reveal>

        <ul className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {collaborateWays.map((item, index) => {
            const Icon = icons[item.icon]
            return (
              <li key={item.title} className="flex min-h-0 min-w-0">
                <Reveal delayMs={(index % 3) * 60} className="flex h-full w-full">
                  <article className="flex h-full w-full flex-col rounded-2xl border border-border/90 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-[var(--duration-normal)] hover:-translate-y-1 hover:border-primary/35 hover:shadow-md motion-reduce:hover:translate-y-0 sm:p-7">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-soft text-primary">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
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
