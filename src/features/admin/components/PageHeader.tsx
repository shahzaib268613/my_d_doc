import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import type { AdminRouteMeta } from '../types/AdminNav'

type Props = {
  title: string
  breadcrumbs?: AdminRouteMeta['breadcrumbs']
  description?: string
  actions?: ReactNode
  className?: string
}

export function PageHeader({
  title,
  breadcrumbs,
  description,
  actions,
  className,
}: Props) {
  return (
    <div className={cn('mb-4 flex flex-col gap-2 sm:mb-5', className)}>
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav aria-label="Breadcrumb">
          <ol className="flex max-w-full flex-wrap items-center gap-0.5 overflow-hidden text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-primary/80">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-0.5">
                  {index > 0 ? (
                    <ChevronRight className="size-3 shrink-0 text-border" aria-hidden="true" />
                  ) : null}
                  {crumb.to && !isLast ? (
                    <Link
                      to={crumb.to}
                      className="rounded-sm text-primary/80 no-underline transition-colors hover:text-primary"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        isLast ? 'font-semibold text-foreground normal-case tracking-normal' : null,
                      )}
                      aria-current={isLast ? 'page' : undefined}
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      ) : null}

      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap gap-1.5">{actions}</div> : null}
      </div>
    </div>
  )
}
