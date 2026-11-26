import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { ADMIN_BASE } from '@/features/admin/constants/adminNav'
import { cn } from '@/shared/utils/cn'
import newsletterHero from '../assets/newsletter-hero.jpg'

/** Brand inverse → transparent overlay (same pattern as blog admin heroes). */
const SEAMLESS_OVERLAY =
  'linear-gradient(90deg, var(--inverse) 0%, var(--inverse) 38%, color-mix(in srgb, var(--inverse) 90%, transparent) 48%, color-mix(in srgb, var(--inverse) 55%, transparent) 58%, color-mix(in srgb, var(--inverse) 22%, transparent) 72%, transparent 88%)'

const IMAGE_MASK =
  'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 18%, #000 42%, #000 100%)'

type Crumb = { label: string; to?: string }

type Props = {
  title?: string
  description?: string
  breadcrumbs?: Crumb[]
  className?: string
}

export function NewsletterPageHero({
  title = 'Newsletter',
  description = 'Manage subscribers and send newsletter emails from one place.',
  breadcrumbs,
  className,
}: Props) {
  const crumbs: Crumb[] = breadcrumbs ?? [
    { label: 'Dashboard', to: ADMIN_BASE },
    { label: 'Newsletter' },
  ]

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl bg-inverse shadow-sm ring-1 ring-white/10',
        className,
      )}
    >
      <div className="relative min-h-[200px] sm:min-h-[240px] md:min-h-[260px]">
        <img
          src={newsletterHero}
          alt=""
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[58%] object-cover object-right md:block"
          style={{
            WebkitMaskImage: IMAGE_MASK,
            maskImage: IMAGE_MASK,
          }}
        />

        <img
          src={newsletterHero}
          alt=""
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full object-cover object-right opacity-25 md:hidden"
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: SEAMLESS_OVERLAY }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 45% 70% at 78% 50%, color-mix(in srgb, var(--primary) 15%, transparent) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full min-h-[200px] max-w-xl flex-col justify-center px-5 py-5 sm:min-h-[240px] sm:px-7 sm:py-7 md:min-h-[260px] md:max-w-[52%] md:py-8 lg:max-w-[48%]">
          <nav aria-label="Breadcrumb" className="mb-3.5 sm:mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-inverse-muted sm:text-[0.95rem]">
              {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                    {index > 0 ? (
                      <ChevronRight className="size-4 shrink-0 opacity-70" aria-hidden="true" />
                    ) : null}
                    {crumb.to && !isLast ? (
                      <Link
                        to={crumb.to}
                        className="text-inverse-muted no-underline hover:text-inverse-foreground hover:underline"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className={cn(isLast && 'font-semibold text-inverse-foreground')}
                      >
                        {crumb.label}
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
          <h1 className="font-display text-3xl font-bold tracking-tight text-inverse-foreground sm:text-4xl md:text-[2.5rem] md:leading-tight">
            {title}
          </h1>
          <p className="mt-2.5 max-w-lg text-base leading-relaxed text-inverse-muted sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
