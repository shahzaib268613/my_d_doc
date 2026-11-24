import { Eye, Pencil, Trash2, UserMinus, UserPlus } from 'lucide-react'
import { Button } from '@/shared/components/ui'
import { DataTable, type DataTableColumn } from '@/features/admin/components/DataTable'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import type { NewsletterSubscriber } from '../types'
import { SubscriberStatusBadge } from './SubscriberStatusBadge'

type Props = {
  rows: NewsletterSubscriber[]
  onView: (subscriber: NewsletterSubscriber) => void
  onEdit: (subscriber: NewsletterSubscriber) => void
  onToggleStatus: (subscriber: NewsletterSubscriber) => void
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

export function SubscriberTable({
  rows,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}: Props) {
  const columns: DataTableColumn<NewsletterSubscriber>[] = [
    {
      id: 'subscriber',
      header: 'Subscriber',
      cell: (row) => (
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-soft text-[0.625rem] font-bold text-primary">
            {initials(row.name, row.email)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[0.8125rem] font-medium text-foreground">
              {row.name || '—'}
            </p>
            <p className="truncate text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => <SubscriberStatusBadge status={row.status} />,
    },
    {
      id: 'date',
      header: 'Subscribed',
      cell: (row) => (
        <span className="whitespace-nowrap text-muted-foreground">
          {formatDate(row.subscribedAt)}
        </span>
      ),
    },
    {
      id: 'source',
      header: 'Source',
      cell: (row) => (
        <StatusBadge
          label={row.source === 'homepage' ? 'Homepage' : 'Admin'}
          tone={row.source === 'homepage' ? 'info' : 'neutral'}
        />
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      className: 'min-w-[14rem]',
      cell: (row) => (
        <div className="flex flex-wrap items-center gap-1.5">
          <Button type="button" size="sm" variant="ghost" onClick={() => onView(row)}>
            <Eye className="size-3.5" aria-hidden="true" />
            View
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => onEdit(row)}>
            <Pencil className="size-3.5" aria-hidden="true" />
            Edit
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => onToggleStatus(row)}>
            {row.status === 'active' ? (
              <UserMinus className="size-3.5" aria-hidden="true" />
            ) : (
              <UserPlus className="size-3.5" aria-hidden="true" />
            )}
            {row.status === 'active' ? 'Unsubscribe' : 'Reactivate'}
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onDelete(row)}>
            <Trash2 className="size-3.5" aria-hidden="true" />
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      emptyMessage="No subscribers match your filters."
      className="shadow-sm"
    />
  )
}
