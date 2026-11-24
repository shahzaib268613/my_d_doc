import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Info, Megaphone, Plus } from 'lucide-react'
import { Button, Card, ConfirmDialog } from '@/shared/components/ui'
import { PageHeader } from '@/features/admin/components/PageHeader'
import { ADMIN_BASE } from '@/features/admin/constants/adminNav'
import { useNewsletter } from '../hooks/useNewsletter'
import { CampaignModal } from '../components/CampaignModal'
import { CampaignTable } from '../components/CampaignTable'
import { NewsletterEmptyState } from '../components/NewsletterEmptyState'
import type { NewsletterCampaign } from '../types'

export function CampaignsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { campaigns, createCampaign, deleteCampaign } = useNewsletter()
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<NewsletterCampaign | null>(null)

  useEffect(() => {
    if (searchParams.get('create') === '1') {
      setCreateOpen(true)
      const next = new URLSearchParams(searchParams)
      next.delete('create')
      setSearchParams(next, { replace: true })
    }
  }, [searchParams, setSearchParams])

  function openCreate() {
    setCreateOpen(true)
  }

  function closeCreate() {
    setCreateOpen(false)
  }

  return (
    <div className="min-w-0 space-y-4">
      <PageHeader
        title="Campaigns"
        breadcrumbs={[
          { label: 'Admin', to: ADMIN_BASE },
          { label: 'Newsletter', to: `${ADMIN_BASE}/newsletter` },
          { label: 'Campaigns' },
        ]}
        description="Draft and prepare newsletter campaigns. Sending requires a future email-service integration."
        actions={
          <Button type="button" size="sm" onClick={openCreate}>
            <Plus className="size-3.5" aria-hidden="true" />
            Create campaign
          </Button>
        }
      />

      <div className="flex gap-2.5 rounded-xl border border-primary/20 bg-soft/60 px-3 py-2.5 text-[0.8125rem] text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
        <p>
          Campaigns stay as Draft, Ready, or Not Sent. Delivery metrics and send actions will
          appear once an email provider is connected.
        </p>
      </div>

      {campaigns.length === 0 ? (
        <NewsletterEmptyState
          icon={Megaphone}
          title="No campaigns yet"
          description="Create a draft to store title, subject, and content locally."
          action={
            <Button type="button" size="sm" onClick={openCreate}>
              <Plus className="size-3.5" aria-hidden="true" />
              Create campaign
            </Button>
          }
        />
      ) : (
        <Card className="overflow-hidden border-border/80 p-0 shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-soft/30 px-3.5 py-2.5">
            <p className="text-[0.8125rem] text-muted-foreground">
              <span className="font-semibold text-foreground">{campaigns.length}</span>{' '}
              {campaigns.length === 1 ? 'campaign' : 'campaigns'}
            </p>
          </div>
          <div className="p-2 sm:p-3">
            <CampaignTable
              rows={campaigns}
              onEdit={(campaign) =>
                navigate(`${ADMIN_BASE}/newsletter/campaigns/edit/${campaign.id}`)
              }
              onDelete={(campaign) => setDeleteTarget(campaign)}
            />
          </div>
        </Card>
      )}

      <CampaignModal
        open={createOpen}
        submitLabel="Save campaign"
        onClose={closeCreate}
        onSubmit={(values) => {
          createCampaign(values)
          closeCreate()
        }}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete campaign?"
        description={`Delete “${deleteTarget?.title ?? 'this campaign'}”? This cannot be undone.`}
        confirmLabel="Delete"
        danger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteCampaign(deleteTarget.id)
          setDeleteTarget(null)
        }}
      />
    </div>
  )
}
