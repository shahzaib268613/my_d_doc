import { FileText, Users } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import {
  EmptyState,
  FilterSelect,
  SearchInput,
  StatsCard,
  StatsCardGrid,
} from '@/shared/components/ui'
import { getAdminRouteMeta } from '../constants/adminRoutes'
import { AdminToolbar } from '../components/AdminToolbar'
import { PageHeader } from '../components/PageHeader'

export function AdminPlaceholderPage() {
  const { pathname } = useLocation()
  const meta = getAdminRouteMeta(pathname)
  const isDashboard = pathname === '/admin' || pathname === '/admin/'

  return (
    <div className="min-w-0">
      <PageHeader
        title={meta.title}
        breadcrumbs={meta.breadcrumbs}
        description="This module is ready for content. Functionality will be added in a later milestone."
      />

      {isDashboard ? (
        <StatsCardGrid className="mb-6">
          <li>
            <StatsCard
              label="Published posts"
              value="—"
              icon={FileText}
              tone="primary"
              hint="Coming soon"
            />
          </li>
          <li>
            <StatsCard
              label="Drafts"
              value="—"
              icon={FileText}
              tone="muted"
              hint="Coming soon"
            />
          </li>
          <li>
            <StatsCard
              label="Subscribers"
              value="—"
              icon={Users}
              tone="success"
              hint="Coming soon"
            />
          </li>
        </StatsCardGrid>
      ) : (
        <AdminToolbar>
          <SearchInput
            variant="outlined"
            disabled
            value=""
            onChange={() => {}}
            placeholder="Search…"
            ariaLabel="Search"
          />
          <FilterSelect
            label="Status"
            hideLabel
            disabled
            value="all"
            options={[{ value: 'all', label: 'All statuses' }]}
            onChange={() => {}}
          />
        </AdminToolbar>
      )}

      <EmptyState
        title={`${meta.title} coming soon`}
        description="Layout and navigation are in place. Connect data and actions in the next iteration."
      />
    </div>
  )
}
