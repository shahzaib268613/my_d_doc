import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card } from '@/shared/components/ui'
import { PageHeader } from '@/features/admin/components/PageHeader'
import { ErrorState } from '@/features/admin/components/ErrorState'
import { ADMIN_BASE } from '@/features/admin/constants/adminNav'
import { useNewsletter } from '../hooks/useNewsletter'
import { CampaignForm } from '../components/CampaignForm'

type Props = {
  mode?: 'edit'
}

/** Edit-only campaign page. Create uses a modal on CampaignsPage. */
export function CampaignEditorPage({ mode = 'edit' }: Props) {
  void mode
  const { id } = useParams()
  const navigate = useNavigate()
  const { campaigns, updateCampaign } = useNewsletter()
  const existing = campaigns.find((item) => item.id === id)

  if (!existing) {
    return (
      <ErrorState
        title="Campaign not found"
        description="That campaign is not in local storage."
        action={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate(`${ADMIN_BASE}/newsletter/campaigns`)}
          >
            Back to campaigns
          </Button>
        }
      />
    )
  }

  return (
    <div className="min-w-0 space-y-4">
      <PageHeader
        title="Edit campaign"
        breadcrumbs={[
          { label: 'Admin', to: ADMIN_BASE },
          { label: 'Newsletter', to: `${ADMIN_BASE}/newsletter` },
          { label: 'Campaigns', to: `${ADMIN_BASE}/newsletter/campaigns` },
          { label: 'Edit' },
        ]}
        description="Compose locally with a live preview. Email sending will be available after backend integration."
      />

      <Card className="overflow-hidden border-border/80 p-0 shadow-sm">
        <div className="border-b border-border bg-soft/40 px-4 py-3 sm:px-5">
          <h2 className="font-display text-base font-semibold text-foreground">
            {existing.title}
          </h2>
          <p className="mt-0.5 text-[0.8125rem] text-muted-foreground">
            Set status to Draft while writing, or Ready when the content is prepared.
          </p>
        </div>
        <div className="p-4 sm:p-5">
          <CampaignForm
            initial={existing}
            submitLabel="Save changes"
            onCancel={() => navigate(`${ADMIN_BASE}/newsletter/campaigns`)}
            onSubmit={(values) => {
              updateCampaign(existing.id, values)
              navigate(`${ADMIN_BASE}/newsletter/campaigns`)
            }}
          />
        </div>
      </Card>
    </div>
  )
}
