import {
  BookOpen,
  ClipboardPlus,
  PlayCircle,
  Users,
} from 'lucide-react'
import { Container, Reveal, Section } from '@/shared/components/ui'
import { highlights } from '../../constants/highlights'

const icons = {
  book: ClipboardPlus,
  users: Users,
  share: PlayCircle,
  compass: BookOpen,
} as const

export function HighlightsV2() {
  return (
    <Section className="relative overflow-hidden bg-soft/70 py-10 sm:py-12">
      <Container>
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-inverse/70">
              Brand Highlights
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-inverse sm:text-3xl">
              Why patients and partners trust this voice
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item, index) => {
              const Icon = icons[item.icon]
              return (
                <li key={item.title}>
                  <article className="group flex h-full flex-col rounded-2xl border border-soft bg-white p-5 shadow-sm transition-[transform,box-shadow,border-color] duration-[var(--duration-normal)] hover:-translate-y-1 hover:border-inverse/30 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-soft text-inverse ring-1 ring-inverse/10 transition-colors duration-[var(--duration-fast)] group-hover:bg-inverse group-hover:text-white">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-2xl font-bold text-inverse/20">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-inverse">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-inverse/70">
                      {item.description}
                    </p>
                  </article>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
