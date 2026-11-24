import { ArrowUpRight, Handshake } from 'lucide-react'
import { Button, Reveal } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import { brandPartnershipsCta } from '../../../constants/ctaCards'

type Props = {
  /** Deep-navy card (Home v3 only). */
  navy?: boolean
}

export function BrandPartnerships({ navy = false }: Props) {
  return (
    <Reveal>
      <article
        className={cn(
          'relative flex h-full min-h-72 flex-col overflow-hidden rounded-3xl p-7 shadow-lg sm:p-9',
          navy
            ? 'bg-[linear-gradient(145deg,#021b44_0%,#041633_48%,#061d46_100%)] text-white'
            : 'bg-[image:var(--gradient-primary)] text-primary-foreground',
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute -right-8 -top-8 size-40 rounded-full',
            navy ? 'bg-[#2f7fb0]/30 blur-2xl' : 'bg-primary-foreground/10',
          )}
          aria-hidden="true"
        />
        <div
          className={cn(
            'pointer-events-none absolute -bottom-14 right-8 size-48 rounded-full',
            navy ? 'bg-black/25 blur-2xl' : 'bg-primary-foreground/10',
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            'relative inline-flex size-14 items-center justify-center rounded-2xl ring-1',
            navy
              ? 'bg-white/15 ring-white/20'
              : 'bg-primary-foreground/15 ring-primary-foreground/20',
          )}
        >
          <Handshake className="size-7" aria-hidden="true" />
        </span>
        <p
          className={cn(
            'relative mt-6 text-xs font-semibold uppercase tracking-[0.14em]',
            navy ? 'text-white/75' : 'text-primary-foreground/75',
          )}
        >
          Collaborate
        </p>
        <h2 className="relative mt-2 font-display text-3xl font-bold">
          {brandPartnershipsCta.title}
        </h2>
        <p
          className={cn(
            'relative mt-3 flex-1 text-sm leading-relaxed sm:text-base',
            navy ? 'text-white/85' : 'text-primary-foreground/90',
          )}
        >
          {brandPartnershipsCta.description}
        </p>
        <Button
          href={brandPartnershipsCta.to}
          className={cn(
            'relative mt-8',
            navy && 'bg-white text-[#021b44] hover:bg-white/90',
          )}
        >
          {brandPartnershipsCta.ctaLabel}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Button>
      </article>
    </Reveal>
  )
}
