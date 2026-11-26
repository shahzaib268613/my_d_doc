import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'
import { Pagination } from './Pagination'

export type ReusableTableColumn<T> = {
  id: string
  header: ReactNode
  className?: string
  cell: (row: T) => ReactNode
}

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPageInfo?: boolean
}

type Props<T> = {
  columns: ReusableTableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string
  emptyMessage?: ReactNode
  className?: string
  /** Classes applied to the inner `<table>` element. */
  tableClassName?: string
  /** Fixed scroll body height so empty states keep the same footprint. */
  bodyMinHeightClassName?: string
  /** When set, renders Previous/Next inside the table footer. */
  pagination?: PaginationProps
  /**
   * Newsletter-style outer card + padding.
   * Set false when the parent already provides that wrapper (e.g. NewsletterPage Card).
   */
  shell?: boolean
  /** Optional toolbar rendered in the shell header strip (search/filters/actions). */
  toolbar?: ReactNode
}

/** Admin/newsletter data table — matches newsletter page card + inner table design. */
export function ReusableTable<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = 'No records found.',
  className,
  tableClassName,
  bodyMinHeightClassName = 'min-h-[22rem]',
  pagination,
  shell = true,
  toolbar,
}: Props<T>) {
  const table = (
    <div
      className={cn(
        'flex max-w-full flex-col overflow-hidden rounded-[0.875rem] border border-border/70 bg-surface shadow-none',
        className,
      )}
    >
      {/* Vertical scroll stays on admin main; only allow horizontal overflow here. */}
      <div className={cn('max-w-full overflow-x-auto', bodyMinHeightClassName)}>
        <table
          className={cn(
            'w-full min-w-[36rem] border-collapse text-left text-[0.8125rem]',
            tableClassName,
          )}
        >
          <thead className="sticky top-0 z-10 bg-soft/70">
            <tr className="border-b border-border/70">
              {columns.map((column, index) => (
                <th
                  key={column.id}
                  scope="col"
                  className={cn(
                    'whitespace-nowrap px-3 py-2.5 font-semibold text-foreground',
                    index === 0 && 'rounded-tl-[0.875rem]',
                    index === columns.length - 1 && 'rounded-tr-[0.875rem]',
                    column.className,
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 text-center align-middle text-muted-foreground"
                >
                  <div className="flex min-h-[18rem] items-center justify-center py-8">
                    {emptyMessage}
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={rowKey(row)}
                  className="border-b border-border/70 transition-colors hover:bg-soft/40"
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        'px-3 py-2.5 align-middle text-foreground',
                        column.className,
                      )}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination ? (
        <Pagination
          mode="simple"
          showPageInfo={pagination.showPageInfo ?? true}
          hideWhenSinglePage={false}
          currentPage={pagination.currentPage}
          totalPages={Math.max(1, pagination.totalPages)}
          onPageChange={pagination.onPageChange}
          className="mt-0 shrink-0 rounded-b-[0.875rem] border-t border-border/70 bg-surface px-3 py-2.5 sm:px-4"
        />
      ) : null}
    </div>
  )

  if (!shell) return table

  return (
    <div className="mb-4 overflow-hidden rounded-[0.875rem] border border-border/70 bg-surface shadow-none">
      {toolbar ? (
        <div className="border-b border-border/70 bg-surface px-3 py-3 sm:px-4">{toolbar}</div>
      ) : null}
      <div className="p-3 sm:p-4">{table}</div>
    </div>
  )
}
