import { Eye, Mail, Trash2 } from 'lucide-react'
import { ReusableButton } from '@/shared/components/ui'
import { DataTable, type DataTableColumn } from '@/features/admin/components/DataTable'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import { cn } from '@/shared/utils/cn'
import type { NewsletterSubscriber } from '../types'

type Props = {
  rows: NewsletterSubscriber[]
  selectedIds: Set<string>
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
  onView: (subscriber: NewsletterSubscriber) => void
  onSendEmail: (subscriber: NewsletterSubscriber) => void
  onDelete: (subscriber: NewsletterSubscriber) => void
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function initials(name: string | null, email: string) {
  const source = (name || email).trim()
  const parts = source.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase()
  return source.slice(0, 2).toUpperCase()
}

const checkboxClass =
  'size-4 cursor-pointer rounded border-border accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30'

export function SubscriberTable({
  rows,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onView,
  onSendEmail,
  onDelete,
}: Props) {
  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.has(row.id))

  const columns: DataTableColumn<NewsletterSubscriber>[] = [
    {
      id: 'select',
      header: (
        <input
          type="checkbox"
          className={checkboxClass}
          checked={allSelected}
          onChange={onToggleSelectAll}
          aria-label="Select all subscribers on this page"
        />
      ),
      className: 'w-12',
      cell: (row) => (
        <input
          type="checkbox"
          className={checkboxClass}
          checked={selectedIds.has(row.id)}
          onChange={() => onToggleSelect(row.id)}
          aria-label={`Select ${row.email}`}
        />
      ),
    },
    {
      id: 'subscriber',
      header: 'Subscriber',
      cell: (row) => (
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              'inline-flex size-9 shrink-0 items-center justify-center rounded-full',
              'bg-primary/10 text-[0.6875rem] font-semibold tracking-wide text-primary',
            )}
          >
            {initials(row.name, row.email)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[0.8125rem] font-semibold text-foreground">
              {row.name || 'Unnamed subscriber'}
            </p>
            <p className="mt-0.5 truncate text-[0.75rem] text-muted-foreground">
              {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'date',
      header: 'Subscribed',
      cell: (row) => (
        <span className="whitespace-nowrap text-[0.8125rem] text-muted-foreground">
          {formatDate(row.createdAt)}
        </span>
      ),
    },
    {
      id: 'source',
      header: 'Source',
      cell: (row) => (
        <StatusBadge
          label={
            row.source === 'homepage'
              ? 'Homepage'
              : row.source === 'import'
                ? 'Import'
                : 'Admin'
          }
          tone={row.source === 'homepage' ? 'info' : 'neutral'}
        />
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      className: 'w-[7.5rem]',
      cell: (row) => (
        <div className="flex flex-nowrap items-center gap-1">
          <ReusableButton
            type="button"
            size="sm"
            variant="ghost"
            aria-label="View subscriber"
            title="View"
            className="size-8 min-h-8 px-0 text-muted-foreground hover:text-foreground"
            onClick={() => onView(row)}
          >
            <Eye className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
          </ReusableButton>
          <ReusableButton
            type="button"
            size="sm"
            variant="ghost"
            aria-label="Send email"
            title="Send email"
            className="size-8 min-h-8 px-0 text-muted-foreground hover:text-foreground"
            onClick={() => onSendEmail(row)}
          >
            <Mail className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
          </ReusableButton>
          <ReusableButton
            type="button"
            size="sm"
            variant="ghost"
            aria-label="Delete subscriber"
            title="Delete"
            className="size-8 min-h-8 px-0 text-muted-foreground hover:text-danger"
            onClick={() => onDelete(row)}
          >
            <Trash2 className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
          </ReusableButton>
        </div>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      emptyMessage="No subscribers yet."
      className="rounded-[0.875rem] border-border/70 shadow-none"
    />
  )
}
