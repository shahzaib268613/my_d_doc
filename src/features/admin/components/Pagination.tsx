import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'

type Props = {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  className?: string
  /** Pin to the bottom of the admin content area */
  sticky?: boolean
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
  sticky = true,
}: Props) {
  const safeCount = Math.max(1, pageCount)
  const safePage = Math.min(Math.max(1, page), safeCount)

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE8F7]',
        sticky
          ? 'sticky bottom-0 z-20 mt-auto -mx-3 shrink-0 bg-[#F4F8FF] px-3 py-1.5 sm:-mx-5 sm:px-5 lg:-mx-6 lg:px-6'
          : 'pt-2 pb-4',
        className,
      )}
    >
      <p className="text-xs font-medium text-[#5B6B82]">
        Page {safePage} of {safeCount}
      </p>
      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="min-h-8 rounded-md border-[#DCE8F7] bg-white px-2.5 text-xs text-[#10264A] shadow-sm"
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
          className="min-h-8 rounded-md border-[#DCE8F7] bg-white px-2.5 text-xs text-[#10264A] shadow-sm"
          disabled={safePage >= safeCount}
          onClick={() => onPageChange(safePage + 1)}
          aria-label="Next page"
        >
          Next
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
