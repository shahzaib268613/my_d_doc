import { ArrowUpRight, Handshake, Mic2 } from 'lucide-react'
import { Button, Reveal } from '@/shared/components/ui'
import { brandPartnershipsCta, speakingEngagementsCta } from '../../constants/ctaCards'

export function CollaborateV2() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <Reveal>
          <article className="relative flex min-h-[22rem] flex-col justify-between overflow-hidden bg-[image:var(--gradient-inverse)] px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-12 lg:py-16">
            <div
              className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-soft/15"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-16 left-10 size-56 rounded-full bg-primary/25"
              aria-hidden="true"
            />
            <div className="relative">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                <Handshake className="size-7" aria-hidden="true" />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-soft">
                Brand Partnerships
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                {brandPartnershipsCta.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
                {brandPartnershipsCta.description}
              </p>
            </div>
            <Button
              href={brandPartnershipsCta.to}
              className="relative mt-8 w-fit border-0 bg-white text-inverse hover:bg-soft"
            >
              {brandPartnershipsCta.ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Button>
          </article>
        </Reveal>

        <Reveal delayMs={80}>
          <article className="relative flex min-h-[22rem] flex-col justify-between overflow-hidden bg-white px-6 py-12 text-inverse sm:px-10 sm:py-14 lg:px-12 lg:py-16">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-inverse"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-12 bottom-0 size-48 rounded-full bg-soft"
              aria-hidden="true"
            />
            <div className="relative">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-soft text-inverse ring-1 ring-inverse/15">
                <Mic2 className="size-7" aria-hidden="true" />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-inverse/70">
                Speaking Engagements
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-inverse sm:text-4xl">
                {speakingEngagementsCta.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-inverse/70 sm:text-base">
                {speakingEngagementsCta.description}
              </p>
            </div>
            <Button
              href={speakingEngagementsCta.to}
              className="relative mt-8 w-fit bg-inverse text-white hover:bg-inverse/90"
            >
              {speakingEngagementsCta.ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Button>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
