import { ArrowUpRight, Handshake } from 'lucide-react'
import { Reveal, ReusableButton } from '@/shared/components/ui'
import { brandPartnershipsCta } from '../../../constants/ctaCards'

export function BrandPartnerships() {
  return (
    <Reveal>
      <article className="relative flex h-full min-h-72 flex-col overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-7 text-primary-foreground shadow-lg sm:p-9">
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-primary-foreground/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-14 right-8 size-48 rounded-full bg-primary-foreground/10"
          aria-hidden="true"
        />
        <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-primary-foreground/15 ring-1 ring-primary-foreground/20">
          <Handshake className="size-7" aria-hidden="true" />
        </span>
        <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/75">
          Collaborate
        </p>
        <h2 className="relative mt-2 font-display text-3xl font-bold">
          {brandPartnershipsCta.title}
        </h2>
        <p className="relative mt-3 flex-1 text-sm leading-relaxed text-primary-foreground/90 sm:text-base">
          {brandPartnershipsCta.description}
        </p>
        <ReusableButton href={brandPartnershipsCta.to} className="relative mt-8">
          {brandPartnershipsCta.ctaLabel}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </ReusableButton>
      </article>
    </Reveal>
  )
}
