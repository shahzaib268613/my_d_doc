import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Megaphone, Users } from 'lucide-react'
import { Button, Card } from '@/shared/components/ui'
import { PageHeader } from '@/features/admin/components/PageHeader'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import { ADMIN_BASE } from '@/features/admin/constants/adminNav'
import { useNewsletter } from '../hooks/useNewsletter'
import { NewsletterEmptyState } from '../components/NewsletterEmptyState'
import { NewsletterStats } from '../components/NewsletterStats'
import { SubscriberStatusBadge } from '../components/SubscriberStatusBadge'
import type { CampaignStatus } from '../types'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function campaignTone(status: CampaignStatus) {
  if (status === 'ready') return 'info' as const
  if (status === 'draft') return 'warning' as const
  return 'neutral' as const
}

function campaignLabel(status: CampaignStatus) {
  if (status === 'ready') return 'Ready'
  if (status === 'draft') return 'Draft'
  return 'Not Sent'
}

function initials(name: string | null, email: string) {
  const source = (name || email).trim()
  const parts = source.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase()
  return source.slice(0, 2).toUpperCase()
}

export function NewsletterOverviewPage() {
  const { subscribers, campaigns, stats, ready } = useNewsletter()
  const recentSubscribers = subscribers.slice(0, 5)
  const recentCampaigns = campaigns.slice(0, 5)

  return (
    <div className="min-w-0 space-y-4 sm:space-y-5">
      <PageHeader
        title="Newsletter"
        breadcrumbs={[
          { label: 'Admin', to: ADMIN_BASE },
          { label: 'Newsletter' },
        ]}
        description="Track subscribers and prepare campaign drafts. Counts update live from local storage."
      />

      <section className="relative overflow-hidden rounded-xl border border-border bg-[linear-gradient(135deg,#1b2f43_0%,#244863_45%,#2f7fb0_100%)] p-4 text-inverse-foreground shadow-sm sm:p-5">
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-white/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-12 left-1/3 size-36 rounded-full bg-primary/30"
          aria-hidden="true"
        />
        <div className="relative flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white/70">
              Audience snapshot
            </p>
            <h2 className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl">
              {stats.active} active of {stats.total} subscribers
            </h2>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-white/75">
              Homepage sign-ups and admin adds share the same list. Sending unlocks after email
              service integration.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Button
              href={`${ADMIN_BASE}/newsletter/active`}
              size="sm"
              className="bg-white text-inverse hover:bg-white/90"
            >
              <Users className="size-3.5" aria-hidden="true" />
              Active list
            </Button>
            <Button
              href={`${ADMIN_BASE}/newsletter/campaigns`}
              size="sm"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/15"
            >
              <Megaphone className="size-3.5" aria-hidden="true" />
              Campaigns
            </Button>
          </div>
        </div>
      </section>

      {!ready ? null : <NewsletterStats stats={stats} />}

      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="min-w-0 overflow-hidden border-border/80 p-0 shadow-sm">
          <div className="flex items-center justify-between gap-2 border-b border-border bg-soft/40 px-3.5 py-2.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary/15 text-primary">
                <Users className="size-3.5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-base font-semibold">Recent subscribers</h2>
            </div>
            <Link
              to={`${ADMIN_BASE}/newsletter/subscribers`}
              className="inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-primary no-underline hover:underline"
            >
              View all
              <ArrowRight className="size-3" aria-hidden="true" />
            </Link>
          </div>
          <div className="p-1.5 sm:p-2">
            {recentSubscribers.length === 0 ? (
              <NewsletterEmptyState
                compact
                icon={Users}
                title="No subscribers yet"
                description="Homepage and admin sign-ups will appear here."
              />
            ) : (
              <ul className="divide-y divide-border/70">
                {recentSubscribers.map((subscriber) => (
                  <li
                    key={subscriber.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-2.5 py-2 transition-colors hover:bg-soft/50"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-soft text-[0.625rem] font-bold text-primary">
                        {initials(subscriber.name, subscriber.email)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[0.8125rem] font-medium text-foreground">
                          {subscriber.name || subscriber.email}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {subscriber.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <SubscriberStatusBadge status={subscriber.status} />
                      <span className="text-[0.6875rem] text-muted-foreground">
                        {formatDate(subscriber.subscribedAt)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>

        <Card className="min-w-0 overflow-hidden border-border/80 p-0 shadow-sm">
          <div className="flex items-center justify-between gap-2 border-b border-border bg-soft/40 px-3.5 py-2.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary/15 text-primary">
                <Mail className="size-3.5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-base font-semibold">Recent campaigns</h2>
            </div>
            <Link
              to={`${ADMIN_BASE}/newsletter/campaigns`}
              className="inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-primary no-underline hover:underline"
            >
              View all
              <ArrowRight className="size-3" aria-hidden="true" />
            </Link>
          </div>
          <div className="p-1.5 sm:p-2">
            {recentCampaigns.length === 0 ? (
              <NewsletterEmptyState
                compact
                icon={Megaphone}
                title="No campaigns yet"
                description="Create a draft campaign to prepare newsletter content."
              />
            ) : (
              <ul className="divide-y divide-border/70">
                {recentCampaigns.map((campaign) => (
                  <li
                    key={campaign.id}
                    className="flex flex-wrap items-start justify-between gap-2 rounded-lg px-2.5 py-2 transition-colors hover:bg-soft/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[0.8125rem] font-medium text-foreground">
                        {campaign.title}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {campaign.subject}
                      </p>
                      <p className="mt-0.5 text-[0.6875rem] text-muted-foreground">
                        Updated {formatDate(campaign.updatedAt)}
                      </p>
                    </div>
                    <StatusBadge
                      label={campaignLabel(campaign.status)}
                      tone={campaignTone(campaign.status)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
