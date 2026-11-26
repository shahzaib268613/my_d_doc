import { useEffect, useState } from 'react'
import {
  AlertCircle,
  Download,
  Mail,
  Plus,
  SearchX,
  UserRound,
  Users,
} from 'lucide-react'
import {
  Card,
  ConfirmDialog,
  Pagination,
  ReusableButton,
  SearchInput,
  Spinner,
} from '@/shared/components/ui'
import { PageHeader } from '@/features/admin/components/PageHeader'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import { ADMIN_BASE } from '@/features/admin/constants/adminNav'
import { getApiErrorMessage } from '@/shared/api/axiosInstance'
import { useToast } from '@/shared/hooks/useToast'
import { newsletterApi } from '../api/newsletterApi'
import { ComposeEmailModal } from '../components/ComposeEmailModal'
import { NewsletterEmptyState } from '../components/NewsletterEmptyState'
import { NewsletterStatCard } from '../components/NewsletterStatCard'
import { NewsletterTabs, type NewsletterTabId } from '../components/NewsletterTabs'
import { SentLogsSection } from '../components/SentLogsSection'
import { SubscriberForm } from '../components/SubscriberForm'
import { SubscriberModal } from '../components/SubscriberModal'
import { SubscriberTable } from '../components/SubscriberTable'
import {
  useNewsletterBatch,
  useNewsletterMutations,
  useNewsletterSubscribers,
} from '../hooks/useNewsletterAdmin'
import type { ComposeMode, NewsletterSubscriber } from '../types'
import { downloadCsv } from '../utils/downloadCsv'

const PAGE_SIZE = 8

type PanelMode = 'list' | 'create' | 'view'

function toCsv(rows: NewsletterSubscriber[]) {
  const header = ['id', 'name', 'email', 'status', 'createdAt', 'source']
  const lines = rows.map((item) =>
    [item.id, item.name ?? '', item.email, item.status, item.createdAt, item.source]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(','),
  )
  return [header.join(','), ...lines].join('\n')
}

export function NewsletterPage() {
  const { toast } = useToast()
  const mutations = useNewsletterMutations()

  const [tab, setTab] = useState<NewsletterTabId>('subscribers')
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [page, setPage] = useState(1)
  const [logsPage, setLogsPage] = useState(1)
  const [panelMode, setPanelMode] = useState<PanelMode>('list')
  const [selected, setSelected] = useState<NewsletterSubscriber | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<NewsletterSubscriber | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [composeMode, setComposeMode] = useState<ComposeMode | null>(null)
  const [composeOpen, setComposeOpen] = useState(false)
  const [confirmAllOpen, setConfirmAllOpen] = useState(false)
  const [pendingAllCompose, setPendingAllCompose] = useState(false)
  const [activeBatchId, setActiveBatchId] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim())
      setPage(1)
    }, 250)
    return () => window.clearTimeout(timer)
  }, [query])

  const listQuery = useNewsletterSubscribers({
    search: debouncedQuery || undefined,
    page,
    limit: PAGE_SIZE,
  })

  // Unfiltered total so the stat card stays stable when search/filters change.
  const statsQuery = useNewsletterSubscribers({ page: 1, limit: 1 })

  const batchQuery = useNewsletterBatch(activeBatchId)
  const items = listQuery.data?.items ?? []
  const filteredTotal = listQuery.data?.total ?? 0
  const total = statsQuery.data?.total ?? filteredTotal
  const totalPages = Math.max(1, listQuery.data?.totalPages ?? 1)
  const hasSelection = selectedIds.size > 0
  const isSearching = Boolean(debouncedQuery)

  useEffect(() => {
    const batch = batchQuery.data
    if (!batch || !activeBatchId) return
    if (batch.status !== 'completed' && batch.status !== 'failed') return

    setSending(false)
    if (batch.failed > 0) {
      toast(`Finished with ${batch.sent} sent, ${batch.failed} failed`, 'danger')
    } else {
      toast(`Sent ${batch.sent} email${batch.sent === 1 ? '' : 's'}`, 'success')
    }
    setActiveBatchId(null)
    setComposeOpen(false)
    setComposeMode(null)
  }, [batchQuery.data, activeBatchId, toast])

  function openCreate() {
    setSelected(null)
    setPanelMode('create')
  }

  function closePanel() {
    setPanelMode('list')
    setSelected(null)
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    const allSelected = items.length > 0 && items.every((item) => selectedIds.has(item.id))
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (allSelected) {
        for (const item of items) next.delete(item.id)
      } else {
        for (const item of items) next.add(item.id)
      }
      return next
    })
  }

  async function handleSend(values: { subject: string; html: string }) {
    if (!composeMode) return
    setSending(true)
    try {
      if (composeMode.type === 'single') {
        await mutations.sendSingle.mutateAsync({
          subscriberId: composeMode.subscriber.id,
          subject: values.subject,
          html: values.html,
        })
        toast('Email sent', 'success')
        setSending(false)
        setComposeOpen(false)
        setComposeMode(null)
        return
      }

      const result = await mutations.sendBulk.mutateAsync({
        subject: values.subject,
        html: values.html,
        sendToAll: composeMode.type === 'all',
        subscriberIds:
          composeMode.type === 'selected' ? composeMode.subscriberIds : undefined,
      })
      setActiveBatchId(result.batchId)
    } catch (error) {
      setSending(false)
      toast(getApiErrorMessage(error, 'Could not send email'), 'danger')
      throw error instanceof Error ? error : new Error(getApiErrorMessage(error))
    }
  }

  const progress =
    batchQuery.data && activeBatchId
      ? {
          sent: batchQuery.data.sent,
          failed: batchQuery.data.failed,
          total: batchQuery.data.total,
        }
      : null

  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col gap-5">
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <PageHeader
          className="mb-0 sm:mb-0"
          title="Newsletter"
          breadcrumbs={[
            { label: 'Admin', to: ADMIN_BASE },
            { label: 'Newsletter' },
          ]}
          description="Manage subscribers and send newsletter emails from one place."
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <ReusableButton
                type="button"
                variant="outline"
                size="sm"
                disabled={total === 0}
                onClick={() => {
                  void newsletterApi
                    .listSubscribers({
                      search: debouncedQuery || undefined,
                      page: 1,
                      limit: 100,
                    })
                    .then((result) => {
                      downloadCsv(
                        'newsletter-subscribers.csv',
                        toCsv(result.items),
                      )
                      toast('CSV downloaded (active subscribers)', 'success')
                    })
                    .catch((error) => {
                      toast(getApiErrorMessage(error, 'Export failed'), 'danger')
                    })
                }}
              >
                <Download className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
                Export CSV
              </ReusableButton>
              <ReusableButton type="button" size="sm" variant="navy" onClick={openCreate}>
                <Plus className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
                Add subscriber
              </ReusableButton>
            </div>
          }
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <NewsletterStatCard
            className="w-full sm:w-auto sm:min-w-[14rem]"
            label="Total subscribers"
            value={statsQuery.isLoading && !statsQuery.data ? '—' : total}
            icon={Users}
            hint="Active subscribers only"
          />
          <NewsletterTabs value={tab} onChange={setTab} />
        </div>

        {tab === 'logs' ? (
          <Card className="overflow-hidden rounded-[0.875rem] border-border/70 p-3 shadow-none sm:p-4">
            <SentLogsSection page={logsPage} onPageChange={setLogsPage} />
          </Card>
        ) : (
          <>
            <Card className="overflow-hidden rounded-[0.875rem] border-border/70 p-0 shadow-none">
              <div className="border-b border-border/70 bg-surface px-3 py-3 sm:px-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                    <SearchInput
                      variant="outlined"
                      value={query}
                      onChange={setQuery}
                      placeholder="Search name or email"
                      ariaLabel="Search name or email"
                      className="w-full sm:max-w-sm"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      {hasSelection ? (
                        <ReusableButton
                          type="button"
                          size="sm"
                          variant="navy"
                          disabled={sending}
                          onClick={() => {
                            setComposeMode({
                              type: 'selected',
                              subscriberIds: [...selectedIds],
                              count: selectedIds.size,
                            })
                            setComposeOpen(true)
                          }}
                        >
                          <Mail className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
                          Email Selected ({selectedIds.size})
                        </ReusableButton>
                      ) : (
                        <ReusableButton
                          type="button"
                          size="sm"
                          variant="outline"
                          disabled
                        >
                          <Mail className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
                          Email Selected (0)
                        </ReusableButton>
                      )}
                      <ReusableButton
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={total === 0 || sending}
                        onClick={() => {
                          setPendingAllCompose(true)
                          setConfirmAllOpen(true)
                        }}
                      >
                        <Mail className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
                        Email All
                      </ReusableButton>
                    </div>
                  </div>
                  <p className="shrink-0 text-[0.8125rem] text-muted-foreground lg:text-right">
                    <span className="font-semibold text-foreground">{selectedIds.size}</span>{' '}
                    selected
                    {isSearching ? (
                      <span className="text-muted-foreground">
                        {' '}
                        · {filteredTotal} match{filteredTotal === 1 ? '' : 'es'}
                      </span>
                    ) : total > 0 ? (
                      <span className="text-muted-foreground">
                        {' '}
                        · {total} total
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-4">
                {listQuery.isLoading ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-14">
                    <Spinner label="Loading subscribers" />
                    <p className="text-[0.8125rem] text-muted-foreground">
                      Loading subscribers…
                    </p>
                  </div>
                ) : listQuery.isError ? (
                  <NewsletterEmptyState
                    icon={AlertCircle}
                    title="Could not load subscribers"
                    description={getApiErrorMessage(listQuery.error)}
                    action={
                      <ReusableButton
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => void listQuery.refetch()}
                      >
                        Try again
                      </ReusableButton>
                    }
                  />
                ) : items.length === 0 && isSearching ? (
                  <NewsletterEmptyState
                    icon={SearchX}
                    title="No search results"
                    description={`No subscribers match “${debouncedQuery}”. Try a different name or email.`}
                    action={
                      <ReusableButton
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setQuery('')}
                      >
                        Clear search
                      </ReusableButton>
                    }
                  />
                ) : items.length === 0 ? (
                  <NewsletterEmptyState
                    icon={UserRound}
                    title="No subscribers yet"
                    description="Add a subscriber manually or wait for homepage sign-ups."
                    action={
                      <ReusableButton type="button" size="sm" variant="navy" onClick={openCreate}>
                        <Plus className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
                        Add subscriber
                      </ReusableButton>
                    }
                  />
                ) : (
                  <SubscriberTable
                    rows={items}
                    selectedIds={selectedIds}
                    onToggleSelect={toggleSelect}
                    onToggleSelectAll={toggleSelectAll}
                    onView={(subscriber) => {
                      setSelected(subscriber)
                      setPanelMode('view')
                    }}
                    onSendEmail={(subscriber) => {
                      setComposeMode({ type: 'single', subscriber })
                      setComposeOpen(true)
                    }}
                    onDelete={setDeleteTarget}
                  />
                )}
              </div>
            </Card>
          </>
        )}
      </div>

      {tab === 'subscribers' && !listQuery.isLoading && !listQuery.isError ? (
        <Pagination
          mode="simple"
          showPageInfo
          sticky
          currentPage={Math.min(page, totalPages)}
          totalPages={totalPages}
          onPageChange={setPage}
          className="justify-end sm:justify-between"
        />
      ) : null}

      <SubscriberModal
        open={panelMode === 'create' || panelMode === 'view'}
        title={panelMode === 'create' ? 'Add subscriber' : 'Subscriber details'}
        description={
          panelMode === 'create'
            ? 'New subscribers are saved to the server database.'
            : undefined
        }
        onClose={closePanel}
      >
        {panelMode === 'view' && selected ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {(selected.name || selected.email).slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-base font-semibold tracking-tight">
                  {selected.name || 'Unnamed subscriber'}
                </p>
                <p className="mt-0.5 truncate text-[0.8125rem] text-muted-foreground">
                  {selected.email}
                </p>
              </div>
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Source
                </dt>
                <dd className="mt-1">
                  <StatusBadge
                    label={
                      selected.source === 'homepage'
                        ? 'Homepage'
                        : selected.source === 'import'
                          ? 'Import'
                          : 'Admin'
                    }
                    tone={selected.source === 'homepage' ? 'info' : 'neutral'}
                  />
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Subscribed
                </dt>
                <dd className="mt-1 text-[0.8125rem] text-foreground">
                  {new Date(selected.createdAt).toLocaleString()}
                </dd>
              </div>
            </dl>
            <div className="flex flex-wrap justify-end gap-2 border-t border-border pt-4">
              <ReusableButton
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setComposeMode({ type: 'single', subscriber: selected })
                  setComposeOpen(true)
                  closePanel()
                }}
              >
                <Mail className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
                Send Email
              </ReusableButton>
              <ReusableButton type="button" size="sm" variant="ghost" onClick={closePanel}>
                Close
              </ReusableButton>
            </div>
          </div>
        ) : (
          <SubscriberForm
            key="create"
            submitLabel="Add subscriber"
            showStatus={false}
            onCancel={closePanel}
            onSubmit={async (values) => {
              try {
                await mutations.create.mutateAsync({
                  email: values.email,
                  name: values.name,
                  source: 'admin',
                })
                toast('Subscriber added', 'success')
                closePanel()
                setPage(1)
              } catch (error) {
                throw new Error(getApiErrorMessage(error, 'Could not add subscriber'))
              }
            }}
          />
        )}
      </SubscriberModal>

      <ComposeEmailModal
        open={composeOpen}
        mode={composeMode}
        sending={sending}
        progress={progress}
        onClose={() => {
          if (sending) return
          setComposeOpen(false)
          setComposeMode(null)
          setActiveBatchId(null)
        }}
        onSend={handleSend}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete subscriber?"
        description={`This permanently removes ${deleteTarget?.email ?? 'this subscriber'} from the database.`}
        confirmLabel="Delete"
        danger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return
          void mutations.remove
            .mutateAsync(deleteTarget.id)
            .then(() => {
              toast('Subscriber deleted', 'success')
              setSelectedIds((prev) => {
                const next = new Set(prev)
                next.delete(deleteTarget.id)
                return next
              })
              if (selected?.id === deleteTarget.id) closePanel()
            })
            .catch((error) => {
              toast(getApiErrorMessage(error, 'Could not delete'), 'danger')
            })
            .finally(() => setDeleteTarget(null))
        }}
      />

      <ConfirmDialog
        open={confirmAllOpen}
        title="Email all subscribers?"
        description={`This will send to all ${total} active subscriber${total === 1 ? '' : 's'}. Continue?`}
        confirmLabel="Continue"
        onCancel={() => {
          setConfirmAllOpen(false)
          setPendingAllCompose(false)
        }}
        onConfirm={() => {
          setConfirmAllOpen(false)
          if (!pendingAllCompose) return
          setPendingAllCompose(false)
          setComposeMode({ type: 'all', total })
          setComposeOpen(true)
        }}
      />
    </div>
  )
}
