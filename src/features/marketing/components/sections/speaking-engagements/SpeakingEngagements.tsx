import { ArrowUpRight, Mic2 } from 'lucide-react'
import { Button, Reveal } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import { speakingEngagementsCta } from '../../../constants/ctaCards'

type Props = {
  /** Deep-navy card (Home v3 only). */
  navy?: boolean
}

export function SpeakingEngagements({ navy = false }: Props) {
  return (
    <Reveal delayMs={80}>
      <article
        className={cn(
          'relative flex h-full min-h-72 flex-col overflow-hidden rounded-3xl p-7 shadow-md sm:p-9',
          navy
            ? 'border border-white/10 bg-[linear-gradient(145deg,#061d46_0%,#021b44_55%,#041633_100%)] text-white shadow-lg'
            : 'border border-border bg-surface',
        )}
      >
        {navy ? (
          <>
            <div
              className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-[#2f7fb0]/25 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-14 left-8 size-48 rounded-full bg-black/20 blur-2xl"
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[image:var(--gradient-primary)]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-10 bottom-0 size-40 rounded-full bg-soft"
              aria-hidden="true"
            />
          </>
        )}
        <span
          className={cn(
            'relative inline-flex size-14 items-center justify-center rounded-2xl ring-1',
            navy
              ? 'bg-white/15 text-white ring-white/20'
              : 'bg-soft text-primary ring-primary/15',
          )}
        >
          <Mic2 className="size-7" aria-hidden="true" />
        </span>
        <p
          className={cn(
            'relative mt-6 text-xs font-semibold uppercase tracking-[0.14em]',
            navy ? 'text-white/75' : 'text-primary',
          )}
        >
          Events
        </p>
        <h2
          className={cn(
            'relative mt-2 font-display text-3xl font-bold',
            navy ? 'text-white' : 'text-foreground',
          )}
        >
          {speakingEngagementsCta.title}
        </h2>
        <p
          className={cn(
            'relative mt-3 flex-1 text-sm leading-relaxed sm:text-base',
            navy ? 'text-white/85' : 'text-muted-foreground',
          )}
        >
          {speakingEngagementsCta.description}
        </p>
        <Button
          href={speakingEngagementsCta.to}
          className={cn(
            'relative mt-8',
            navy && 'bg-white text-[#021b44] hover:bg-white/90',
          )}
        >
          {speakingEngagementsCta.ctaLabel}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Button>
      </article>
    </Reveal>
  )
}
