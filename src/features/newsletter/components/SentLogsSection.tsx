import { useMemo, useState } from 'react'
import { ScrollText } from 'lucide-react'
import {
  ReusableTable,
  type ReusableTableColumn,
  Spinner,
} from '@/shared/components/ui'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import { getApiErrorMessage } from '@/shared/api/axiosInstance'
import type { NewsletterEmailLog } from '../types'
import { useNewsletterLogs } from '../hooks/useNewsletterAdmin'
import { NewsletterEmptyState } from './NewsletterEmptyState'
import { SubscriberModal } from './SubscriberModal'

type Props = {
  page: number
  onPageChange: (page: number) => void
}

const MESSAGE_PREVIEW_CHARS = 80

function formatDate(value: string) {
  return new Date(value).toLocaleString()
}

function stripEmailFooter(html: string) {
  return html
    .replace(
      /<hr[^>]*>\s*<p[^>]*>[\s\S]*?You are receiving this email because you subscribed to My Diabetes Doc updates\.[\s\S]*?<\/p>\s*$/i,
      '',
    )
    .replace(
      /You are receiving this email because you subscribed to My Diabetes Doc updates\.?\s*Unsubscribe\s*$/i,
      '',
    )
    .trim()
}

function stripHtml(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function messagePreview(message: string | null) {
  if (!message?.trim()) {
    return { text: 'No message saved', truncated: false, full: '' }
  }
  const adminMessage = stripEmailFooter(message)
  const plain = stripHtml(adminMessage)
  if (!plain) {
    return { text: 'No message saved', truncated: false, full: adminMessage }
  }
  if (plain.length <= MESSAGE_PREVIEW_CHARS) {
    return { text: plain, truncated: false, full: adminMessage }
  }
  return {
    text: `${plain.slice(0, MESSAGE_PREVIEW_CHARS).trimEnd()}…`,
    truncated: true,
    full: adminMessage,
  }
}

export function SentLogsSection({ page, onPageChange }: Props) {
  const logsQuery = useNewsletterLogs({ page, limit: 10 })
  const [messageModal, setMessageModal] = useState<{
    recipient: string
    subject: string
    html: string
  } | null>(null)

  const columns: ReusableTableColumn<NewsletterEmailLog>[] = useMemo(
    () => [
      {
        id: 'recipient',
        header: 'Recipient',
        cell: (row) => (
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{row.recipient}</p>
            {(row.sendCount ?? 1) > 1 ? (
              <p className="mt-0.5 text-[0.75rem] text-muted-foreground">
                Sent {row.sendCount} times
              </p>
            ) : null}
          </div>
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
        id: 'message',
        header: 'Message',
        className: 'min-w-[12rem] max-w-[18rem]',
        cell: (row) => {
          const preview = messagePreview(row.message)
          return (
            <div className="min-w-0">
              <p className="line-clamp-2 text-[0.8125rem] text-muted-foreground">
                {preview.text}
              </p>
              {preview.truncated ? (
                <button
                  type="button"
                  className="mt-1 border-0 bg-transparent p-0 text-[0.75rem] font-semibold text-primary shadow-none outline-none ring-0 hover:bg-transparent hover:underline focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:bg-transparent"
                  onClick={() =>
                    setMessageModal({
                      recipient: row.recipient,
                      subject: row.subject,
                      html: preview.full,
                    })
                  }
                >
                  Read more
                </button>
              ) : null}
            </div>
          )
        },
      },
      {
        id: 'count',
        header: 'Count',
        className: 'w-20',
        cell: (row) => (
          <span className="tabular-nums font-semibold text-foreground">
            {row.sendCount ?? 1}
          </span>
        ),
      },
      {
        id: 'status',
        header: 'Status',
        cell: (row) => (
          <StatusBadge
            label={row.status}
            tone={
              row.status === 'sent' ? 'success' : row.status === 'failed' ? 'danger' : 'neutral'
            }
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
    ],
    [],
  )

  if (logsQuery.isLoading) {
    return (
      <div className="overflow-hidden rounded-[0.875rem] border border-border/70 bg-surface shadow-none">
        <div className="flex min-h-[22rem] flex-col items-center justify-center gap-3 p-3 sm:p-4">
          <Spinner label="Loading sent logs" />
          <p className="text-[0.8125rem] text-muted-foreground">Loading sent logs…</p>
        </div>
      </div>
    )
  }

  if (logsQuery.isError) {
    return (
      <div className="overflow-hidden rounded-[0.875rem] border border-border/70 bg-surface shadow-none">
        <div className="flex min-h-[22rem] items-center justify-center p-3 sm:p-4">
          <NewsletterEmptyState
            icon={ScrollText}
            title="Could not load logs"
            description={getApiErrorMessage(logsQuery.error)}
          />
        </div>
      </div>
    )
  }

  const data = logsQuery.data
  const items = data?.items ?? []

  return (
    <>
      <ReusableTable
        columns={columns}
        rows={items}
        rowKey={(row) => row.id}
        emptyMessage={
          <NewsletterEmptyState
            icon={ScrollText}
            title="No emails sent yet"
            description="Sent newsletter emails will appear here with delivery status."
          />
        }
        pagination={{
          currentPage: data?.page ?? page,
          totalPages: Math.max(1, data?.totalPages ?? 1),
          onPageChange,
        }}
      />

      <SubscriberModal
        open={Boolean(messageModal)}
        title="Email message"
        description={
          messageModal
            ? `${messageModal.recipient} · ${messageModal.subject}`
            : undefined
        }
        onClose={() => setMessageModal(null)}
      >
        {messageModal ? (
          <div
            className="prose prose-sm max-w-none text-foreground [&_a]:text-primary"
            dangerouslySetInnerHTML={{ __html: messageModal.html }}
          />
        ) : null}
      </SubscriberModal>
    </>
  )
}
