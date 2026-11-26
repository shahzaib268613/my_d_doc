import { ArrowUpRight, Mic2 } from 'lucide-react'
import { Reveal, ReusableButton } from '@/shared/components/ui'
import { speakingEngagementsCta } from '../../../constants/ctaCards'

export function SpeakingEngagements() {
  return (
    <Reveal delayMs={80}>
      <article className="relative flex h-full min-h-72 flex-col overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-md sm:p-9">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[image:var(--gradient-primary)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-10 bottom-0 size-40 rounded-full bg-soft"
          aria-hidden="true"
        />
        <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-primary/15">
          <Mic2 className="size-7" aria-hidden="true" />
        </span>
        <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Events
        </p>
        <h2 className="relative mt-2 font-display text-3xl font-bold text-foreground">
          {speakingEngagementsCta.title}
        </h2>
        <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {speakingEngagementsCta.description}
        </p>
        <ReusableButton href={speakingEngagementsCta.to} className="relative mt-8">
          {speakingEngagementsCta.ctaLabel}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </ReusableButton>
      </article>
    </Reveal>
  )
}
