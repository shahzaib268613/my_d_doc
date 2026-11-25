import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { Button } from './Button'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  /** Show “Page X of Y” text. */
  showPageInfo?: boolean
  /** Sticky footer bar (admin lists). */
  sticky?: boolean
  /**
   * `numbered` — page buttons + ellipsis (public Blog).
   * `simple` — Previous / Next only (admin lists).
   */
  mode?: 'numbered' | 'simple'
  /** Hide the control when there is only one page. Default: true for numbered, false for simple. */
  hideWhenSinglePage?: boolean
}

function buildPageItems(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const items: Array<number | 'ellipsis'> = [1]
  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  if (start > 2) items.push('ellipsis')
  for (let page = start; page <= end; page += 1) items.push(page)
  if (end < totalPages - 1) items.push('ellipsis')
  items.push(totalPages)

  return items
}

/** Shared pagination for marketing and admin list pages. */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showPageInfo = false,
  sticky = false,
  mode = 'numbered',
  hideWhenSinglePage,
}: Props) {
  const hideSingle = hideWhenSinglePage ?? mode === 'numbered'
  const safeTotal = Math.max(1, totalPages)
  const safePage = Math.min(Math.max(1, currentPage), safeTotal)

  if (hideSingle && safeTotal <= 1) return null

  if (mode === 'simple') {
    return (
      <nav
        aria-label="Pagination"
        className={cn(
          'flex flex-wrap items-center justify-between gap-3 border-t border-border',
          sticky
            ? 'sticky bottom-0 z-20 mt-auto -mx-3 shrink-0 bg-background px-3 py-1.5 sm:-mx-5 sm:px-5 lg:-mx-6 lg:px-6'
            : 'pt-2 pb-4',
          className,
        )}
      >
        {showPageInfo ? (
          <p className="text-xs font-medium text-muted-foreground">
            Page {safePage} of {safeTotal}
          </p>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-h-8 rounded-md px-2.5 text-xs shadow-sm"
            disabled={safePage <= 1}
            onClick={() => onPageChange(safePage - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-3.5" aria-hidden="true" />
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-h-8 rounded-md px-2.5 text-xs shadow-sm"
            disabled={safePage >= safeTotal}
            onClick={() => onPageChange(safePage + 1)}
            aria-label="Next page"
          >
            Next
            <ChevronRight className="size-3.5" aria-hidden="true" />
          </Button>
        </div>
      </nav>
    )
  }

  const items = buildPageItems(safePage, safeTotal)

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex flex-wrap items-center justify-center gap-2', className)}
    >
      {showPageInfo ? (
        <p className="mr-2 w-full text-center text-sm text-muted-foreground sm:mr-3 sm:w-auto sm:text-left">
          Page {safePage} of {safeTotal}
        </p>
      ) : null}
      <button
        type="button"
        className={cn(
          'inline-flex min-h-[var(--spacing-touch)] min-w-[var(--spacing-touch)] items-center justify-center gap-1 rounded-md px-3 text-sm font-semibold text-foreground',
          'bg-soft hover:bg-muted disabled:pointer-events-none disabled:opacity-45',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        )}
        disabled={safePage <= 1}
        onClick={() => onPageChange(safePage - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Previous
      </button>

      <ul className="flex flex-wrap items-center justify-center gap-1.5">
        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <li
              key={`ellipsis-${index}`}
              className="inline-flex min-h-[var(--spacing-touch)] min-w-8 items-center justify-center px-1 text-sm text-muted-foreground"
              aria-hidden="true"
            >
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={cn(
                  'inline-flex min-h-[var(--spacing-touch)] min-w-[var(--spacing-touch)] items-center justify-center rounded-md px-3 text-sm font-semibold',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  item === safePage
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-soft text-foreground hover:bg-muted',
                )}
                aria-label={`Page ${item}`}
                aria-current={item === safePage ? 'page' : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        className={cn(
          'inline-flex min-h-[var(--spacing-touch)] min-w-[var(--spacing-touch)] items-center justify-center gap-1 rounded-md px-3 text-sm font-semibold text-foreground',
          'bg-soft hover:bg-muted disabled:pointer-events-none disabled:opacity-45',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        )}
        disabled={safePage >= safeTotal}
        onClick={() => onPageChange(safePage + 1)}
        aria-label="Next page"
      >
        Next
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </nav>
  )
}
