import { FileText, Users } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { EmptyState } from '@/shared/components/ui'
import { getAdminRouteMeta } from '../constants/adminRoutes'
import { AdminToolbar } from '../components/AdminToolbar'
import { FilterDropdown } from '../components/FilterDropdown'
import { PageHeader } from '../components/PageHeader'
import { SearchInput } from '../components/SearchInput'
import { StatCard } from '../components/StatCard'

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
        <ul className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <li>
            <StatCard label="Published posts" value="—" icon={FileText} hint="Coming soon" />
          </li>
          <li>
            <StatCard label="Drafts" value="—" icon={FileText} hint="Coming soon" />
          </li>
          <li>
            <StatCard label="Subscribers" value="—" icon={Users} hint="Coming soon" />
          </li>
        </ul>
      ) : (
        <AdminToolbar>
          <SearchInput disabled aria-disabled="true" placeholder="Search (coming soon)" />
          <FilterDropdown
            label="Status"
            hideLabel
            disabled
            value="all"
            onChange={() => {}}
            options={[
              { value: 'all', label: 'All statuses' },
              { value: 'published', label: 'Published' },
              { value: 'draft', label: 'Draft' },
            ]}
          />
        </AdminToolbar>
      )}

      <EmptyState
        title={`${meta.title} coming soon`}
        description="Reusable admin components are in place. Module tools and data will appear here next."
      />
    </div>
  )
}
