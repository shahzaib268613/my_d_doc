export { AdminShell } from './components/AdminShell'
export { AdminSidebar } from './components/AdminSidebar'
export { AdminHeader } from './components/AdminHeader'
export { PageHeader } from './components/PageHeader'
export { SidebarMenuItem } from './components/SidebarMenuItem'
export { SidebarSubmenu } from './components/SidebarSubmenu'
export { ContentContainer } from './components/ContentContainer'
export { StatCard } from './components/StatCard'
export { DataTable } from './components/DataTable'
export type { DataTableColumn } from './components/DataTable'
export { StatusBadge } from './components/StatusBadge'
export type { StatusTone } from './components/StatusBadge'
export { FormField } from './components/FormField'
export { LoadingState } from './components/LoadingState'
export { ErrorState } from './components/ErrorState'
export { ResponsiveDrawer } from './components/ResponsiveDrawer'
/** Prefer shared UI: SearchInput, FilterSelect, Pagination from `@/shared/components/ui`. */
export { AdminToolbar } from './components/AdminToolbar'
export { AdminPlaceholderPage } from './pages/AdminPlaceholderPage'
export { adminNavSections, ADMIN_BASE } from './constants/adminNav'
export { adminRouteDefs, getAdminRouteMeta } from './constants/adminRoutes'
export {
  BlogDashboardPage,
  AllBlogsPage,
  BlogListingsPage,
  BlogCategoriesPage,
  BlogDraftsPage,
  PublishedBlogsPage,
  ScheduledBlogsPage,
  EditBlogPage,
  BlogFormPage,
  BlogListPage,
  BlogCreateModalProvider,
  useBlogCreateModal,
} from './blog'

/** Shared primitives re-exported for consistent admin imports */
export { ConfirmDialog, EmptyState } from '@/shared/components/ui'
