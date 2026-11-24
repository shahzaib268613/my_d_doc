import { useMemo, useState } from 'react'
import { Download, Plus, UserCheck, UserRound, Users } from 'lucide-react'
import { Button, Card, ConfirmDialog } from '@/shared/components/ui'
import { AdminToolbar } from '@/features/admin/components/AdminToolbar'
import { FilterDropdown } from '@/features/admin/components/FilterDropdown'
import { PageHeader } from '@/features/admin/components/PageHeader'
import { Pagination } from '@/features/admin/components/Pagination'
import { SearchInput } from '@/features/admin/components/SearchInput'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import { ADMIN_BASE } from '@/features/admin/constants/adminNav'
import { useNewsletter } from '../hooks/useNewsletter'
import { NewsletterEmptyState } from '../components/NewsletterEmptyState'
import { SubscriberForm } from '../components/SubscriberForm'
import { SubscriberModal } from '../components/SubscriberModal'
import { SubscriberStatusBadge } from '../components/SubscriberStatusBadge'
import { SubscriberTable } from '../components/SubscriberTable'
import type { NewsletterSubscriber, SubscriberStatus } from '../types'
import { downloadCsv } from '../utils/downloadCsv'

const PAGE_SIZE = 8

type Mode = 'list' | 'create' | 'edit' | 'view'
type StatusFilter = 'all' | SubscriberStatus

type Props = {
  lockedStatus?: 'active'
  title: string
  description: string
}

export function SubscribersPage({ lockedStatus, title, description }: Props) {
  const {
    subscribers,
    stats,
    addSubscriber,
    updateSubscriber,
    setSubscriberStatus,
    deleteSubscriber,
    exportSubscribersCsv,
  } = useNewsletter()

  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(lockedStatus ?? 'all')
  const [page, setPage] = useState(1)
  const [mode, setMode] = useState<Mode>('list')
  const [selected, setSelected] = useState<NewsletterSubscriber | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<NewsletterSubscriber | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return subscribers.filter((item) => {
      if (lockedStatus && item.status !== lockedStatus) return false
      if (!lockedStatus && statusFilter !== 'all' && item.status !== statusFilter) return false
      if (!q) return true
      return (
        item.email.toLowerCase().includes(q) ||
        (item.name?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [subscribers, query, statusFilter, lockedStatus])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const modalOpen = mode === 'create' || mode === 'edit' || mode === 'view'

  function openCreate() {
    setSelected(null)
    setMode('create')
  }

  function closePanel() {
    setMode('list')
    setSelected(null)
  }

  const summaryCards = lockedStatus === 'active'
    ? [
        { label: 'Active shown', value: filtered.length, icon: UserCheck },
        { label: 'Total in list', value: stats.total, icon: Users },
      ]
    : [
        { label: 'Showing', value: filtered.length, icon: Users },
        { label: 'Active', value: stats.active, icon: UserCheck },
      ]

  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col gap-4">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <PageHeader
          title={title}
          breadcrumbs={[
            { label: 'Admin', to: ADMIN_BASE },
            { label: 'Newsletter', to: `${ADMIN_BASE}/newsletter` },
            { label: title },
          ]}
          description={description}
          actions={
            <div className="flex flex-wrap gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  downloadCsv(
                    'newsletter-subscribers.csv',
                    exportSubscribersCsv(filtered),
                  )
                }
              >
                <Download className="size-3.5" aria-hidden="true" />
                Export CSV
              </Button>
              <Button type="button" size="sm" onClick={openCreate}>
                <Plus className="size-3.5" aria-hidden="true" />
                Add subscriber
              </Button>
            </div>
          }
        />

        <ul className="grid gap-3 sm:grid-cols-2">
          {summaryCards.map((card) => {
            const Icon = card.icon
            return (
              <li key={card.label}>
                <Card className="flex items-center gap-3 border-border/80 p-3.5 shadow-sm">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-soft text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">{card.label}</p>
                    <p className="font-display text-xl font-bold tracking-tight text-foreground">
                      {card.value}
                    </p>
                  </div>
                </Card>
              </li>
            )
          })}
        </ul>

        <Card className="overflow-hidden border-border/80 p-0 shadow-sm">
          <div className="border-b border-border bg-soft/30 px-3 py-2.5 sm:px-4">
            <AdminToolbar className="mb-0">
              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-end">
                <SearchInput
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setPage(1)
                  }}
                  placeholder="Search name or email"
                  className="w-full sm:max-w-xs"
                />
                {!lockedStatus ? (
                  <FilterDropdown
                    label="Status"
                    hideLabel
                    value={statusFilter}
                    onChange={(value) => {
                      setStatusFilter(value as StatusFilter)
                      setPage(1)
                    }}
                    options={[
                      { value: 'all', label: 'All statuses' },
                      { value: 'active', label: 'Active' },
                      { value: 'unsubscribed', label: 'Unsubscribed' },
                    ]}
                  />
                ) : (
                  <StatusBadge label="Active only" tone="success" />
                )}
              </div>
              <p className="text-[0.8125rem] text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'result' : 'results'}
              </p>
            </AdminToolbar>
          </div>

          <div className="p-2 sm:p-3">
            {filtered.length === 0 ? (
              <NewsletterEmptyState
                icon={UserRound}
                title="No subscribers found"
                description={
                  lockedStatus === 'active'
                    ? 'No active subscribers yet. Add one manually or wait for homepage sign-ups.'
                    : 'Try a different search, or add a subscriber manually.'
                }
                action={
                  <Button type="button" size="sm" onClick={openCreate}>
                    <Plus className="size-3.5" aria-hidden="true" />
                    Add subscriber
                  </Button>
                }
              />
            ) : (
              <SubscriberTable
                rows={pageRows}
                onView={(subscriber) => {
                  setSelected(subscriber)
                  setMode('view')
                }}
                onEdit={(subscriber) => {
                  setSelected(subscriber)
                  setMode('edit')
                }}
                onToggleStatus={(subscriber) => {
                  setSubscriberStatus(
                    subscriber.id,
                    subscriber.status === 'active' ? 'unsubscribed' : 'active',
                  )
                }}
                onDelete={(subscriber) => setDeleteTarget(subscriber)}
              />
            )}
          </div>
        </Card>
      </div>

      <Pagination page={safePage} pageCount={Math.max(1, pageCount)} onPageChange={setPage} />

      <SubscriberModal
        open={modalOpen}
        title={
          mode === 'create'
            ? 'Add subscriber'
            : mode === 'edit'
              ? 'Edit subscriber'
              : 'Subscriber details'
        }
        description={
          mode === 'view'
            ? undefined
            : 'Changes save instantly to this browser’s local storage.'
        }
        onClose={closePanel}
      >
        {mode === 'view' && selected ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <UserRound className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-base font-semibold">
                  {selected.name || selected.email}
                </p>
                <p className="mt-0.5 truncate text-[0.8125rem] text-muted-foreground">
                  {selected.email}
                </p>
              </div>
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Status
                </dt>
                <dd className="mt-1">
                  <SubscriberStatusBadge status={selected.status} />
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Source
                </dt>
                <dd className="mt-1">
                  <StatusBadge
                    label={selected.source === 'homepage' ? 'Homepage' : 'Admin'}
                    tone={selected.source === 'homepage' ? 'info' : 'neutral'}
                  />
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Subscribed
                </dt>
                <dd className="mt-1 text-[0.8125rem] text-foreground">
                  {new Date(selected.subscribedAt).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Last updated
                </dt>
                <dd className="mt-1 text-[0.8125rem] text-foreground">
                  {new Date(selected.updatedAt).toLocaleString()}
                </dd>
              </div>
            </dl>
            <div className="flex flex-wrap justify-end gap-1.5 border-t border-border pt-4">
              <Button type="button" size="sm" variant="outline" onClick={() => setMode('edit')}>
                Edit
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={closePanel}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <SubscriberForm
            key={`${mode}-${selected?.id ?? 'new'}`}
            initial={selected ?? undefined}
            submitLabel={mode === 'create' ? 'Add subscriber' : 'Save changes'}
            showStatus={mode === 'edit'}
            onCancel={closePanel}
            onSubmit={async (values) => {
              if (mode === 'create') {
                addSubscriber({
                  email: values.email,
                  name: values.name,
                  source: 'admin',
                })
              } else if (selected) {
                updateSubscriber(selected.id, {
                  email: values.email,
                  name: values.name,
                  status: values.status,
                })
              }
              closePanel()
              setPage(1)
            }}
          />
        )}
      </SubscriberModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete subscriber?"
        description={`This permanently removes ${deleteTarget?.email ?? 'this subscriber'} from local storage.`}
        confirmLabel="Delete"
        danger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteSubscriber(deleteTarget.id)
          setDeleteTarget(null)
          if (selected?.id === deleteTarget?.id) closePanel()
        }}
      />
    </div>
  )
}

export function AllSubscribersPage() {
  return (
    <SubscribersPage
      title="All Subscribers"
      description="Search, filter, and manage every newsletter subscriber stored in this browser."
    />
  )
}

export function ActiveSubscribersPage() {
  return (
    <SubscribersPage
      lockedStatus="active"
      title="Active Subscribers"
      description="Only currently active newsletter subscriptions."
    />
  )
}
