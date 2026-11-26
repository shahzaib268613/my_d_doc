import { ScrollText } from 'lucide-react'
import { DataTable, type DataTableColumn } from '@/features/admin/components/DataTable'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import { Pagination, Spinner } from '@/shared/components/ui'
import { getApiErrorMessage } from '@/shared/api/axiosInstance'
import type { NewsletterEmailLog } from '../types'
import { useNewsletterLogs } from '../hooks/useNewsletterAdmin'
import { NewsletterEmptyState } from './NewsletterEmptyState'

type Props = {
  page: number
  onPageChange: (page: number) => void
}

function formatDate(value: string) {
  return new Date(value).toLocaleString()
}

export function SentLogsSection({ page, onPageChange }: Props) {
  const logsQuery = useNewsletterLogs({ page, limit: 10 })

  const columns: DataTableColumn<NewsletterEmailLog>[] = [
    {
      id: 'recipient',
      header: 'Recipient',
      cell: (row) => (
        <span className="font-medium text-foreground">{row.recipient}</span>
      ),
    },
    {
      id: 'subject',
      header: 'Subject',
      cell: (row) => (
        <span className="line-clamp-1 text-muted-foreground">{row.subject}</span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => (
        <StatusBadge
          label={row.status}
          tone={row.status === 'sent' ? 'success' : row.status === 'failed' ? 'danger' : 'neutral'}
        />
      ),
    },
    {
      id: 'created',
      header: 'Sent at',
      cell: (row) => (
        <span className="whitespace-nowrap text-muted-foreground">
          {formatDate(row.createdAt)}
        </span>
      ),
    },
  ]

  if (logsQuery.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-14">
        <Spinner label="Loading sent logs" />
        <p className="text-[0.8125rem] text-muted-foreground">Loading sent logs…</p>
      </div>
    )
  }

  if (logsQuery.isError) {
    return (
      <NewsletterEmptyState
        icon={ScrollText}
        title="Could not load logs"
        description={getApiErrorMessage(logsQuery.error)}
      />
    )
  }

  const data = logsQuery.data
  const items = data?.items ?? []

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <NewsletterEmptyState
          icon={ScrollText}
          title="No emails sent yet"
          description="Sent newsletter emails will appear here with delivery status."
        />
      ) : (
        <DataTable
          columns={columns}
          rows={items}
          rowKey={(row) => row.id}
          emptyMessage="No logs yet."
          className="rounded-[0.875rem] border-border/70 shadow-none"
        />
      )}
      <Pagination
        mode="simple"
        showPageInfo
        currentPage={data?.page ?? page}
        totalPages={Math.max(1, data?.totalPages ?? 1)}
        onPageChange={onPageChange}
        className="border-0 pt-0"
      />
    </div>
  )
}
