import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

export type DataTableColumn<T> = {
  id: string
  header: ReactNode
  className?: string
  cell: (row: T) => ReactNode
}

type Props<T> = {
  columns: DataTableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string
  emptyMessage?: ReactNode
  className?: string
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = 'No records found.',
  className,
}: Props<T>) {
  return (
    <div
      className={cn(
        'max-w-full overflow-hidden rounded-lg border border-border bg-surface shadow-sm',
        className,
      )}
    >
      <div className="max-w-full overflow-x-auto overscroll-x-contain">
        <table className="w-full min-w-[36rem] border-collapse text-left text-[0.8125rem]">
          <thead className="bg-soft/70">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className={cn(
                    'whitespace-nowrap px-3 py-2.5 font-semibold text-foreground',
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
                  className="px-3 py-8 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={rowKey(row)}
                  className="border-t border-border transition-colors hover:bg-soft/40"
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn('px-3 py-2.5 text-foreground align-middle', column.className)}
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
    </div>
  )
}
