import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components/ui'
import { DataTable, type DataTableColumn } from '@/features/admin/components/DataTable'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import type { CampaignStatus, NewsletterCampaign } from '../types'

type Props = {
  rows: NewsletterCampaign[]
  onEdit: (campaign: NewsletterCampaign) => void
  onDelete: (campaign: NewsletterCampaign) => void
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function statusTone(status: CampaignStatus) {
  if (status === 'ready') return 'info' as const
  if (status === 'draft') return 'warning' as const
  return 'neutral' as const
}

function statusLabel(status: CampaignStatus) {
  if (status === 'ready') return 'Ready'
  if (status === 'draft') return 'Draft'
  return 'Not Sent'
}

export function CampaignTable({ rows, onEdit, onDelete }: Props) {
  const columns: DataTableColumn<NewsletterCampaign>[] = [
    {
      id: 'campaign',
      header: 'Campaign',
      cell: (row) => (
        <div className="min-w-0 max-w-xs">
          <p className="truncate font-semibold text-foreground">{row.title}</p>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{row.subject}</p>
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => (
        <StatusBadge label={statusLabel(row.status)} tone={statusTone(row.status)} />
      ),
    },
    {
      id: 'updated',
      header: 'Updated',
      cell: (row) => (
        <span className="whitespace-nowrap text-muted-foreground">
          {formatDate(row.updatedAt)}
        </span>
      ),
    },
    {
      id: 'preview',
      header: 'Preview',
      cell: (row) => (
        <p className="max-w-[14rem] truncate text-sm text-muted-foreground">
          {row.content.replace(/\s+/g, ' ').trim() || '—'}
        </p>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      className: 'min-w-[10rem]',
      cell: (row) => (
        <div className="flex flex-wrap gap-1.5">
          <Button type="button" size="sm" variant="outline" onClick={() => onEdit(row)}>
            <Pencil className="size-3.5" aria-hidden="true" />
            Edit
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
      emptyMessage="No campaigns yet."
      className="shadow-sm"
    />
  )
}
