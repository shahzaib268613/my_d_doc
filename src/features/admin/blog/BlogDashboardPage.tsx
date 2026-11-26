import { Link } from 'react-router-dom'
import {
  ArrowRight,
  FileEdit,
  FilePlus2,
  FileText,
  Newspaper,
  Sparkles,
} from 'lucide-react'
import { AdminButton } from '@/features/admin/components/AdminButton'
import { LoadingState } from '@/features/admin/components/LoadingState'
import { ErrorState } from '@/features/admin/components/ErrorState'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import { ADMIN_BASE } from '@/features/admin/constants/adminNav'
import { ReusableButton, StatsCard, StatsCardGrid } from '@/shared/components/ui'
import { useBlogCreateModal } from './BlogCreateModalContext'
import { getApiErrorMessage } from '@/shared/api/axiosInstance'
import { useAdminBlogs, useBlogCounts } from './hooks/useAdminBlogs'
import { formatBlogDate } from '@/features/blog/utils/formatDate'
import { blogStatusLabel, blogStatusTone } from './utils/blogStatusLabels'

export function BlogDashboardPage() {
  const { openCreateBlog } = useBlogCreateModal()
  const countsQuery = useBlogCounts()
  const recentQuery = useAdminBlogs({ page: 1, limit: 3 })
  const today = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())

  if (countsQuery.isPending && recentQuery.isPending) {
    return <LoadingState label="Loading dashboard" className="rounded-[16px]" />
  }

  if (countsQuery.isError) {
    return (
      <ErrorState
        title="Could not load dashboard"
        description={getApiErrorMessage(countsQuery.error)}
        className="rounded-[16px]"
        action={
          <ReusableButton type="button" size="sm" onClick={() => void countsQuery.refetch()}>
            Retry
          </ReusableButton>
        }
      />
    )
  }

  const counts = countsQuery.data
  const recent = recentQuery.data?.items ?? []

  return (
    <div className="min-w-0 space-y-4 sm:space-y-5 lg:space-y-6">
      {/* Welcome banner */}
      <section
        className="relative overflow-hidden rounded-xl px-4 py-5 text-inverse-foreground shadow-md sm:rounded-2xl sm:px-7 sm:py-7"
        style={{ backgroundImage: 'var(--gradient-inverse)' }}
      >
        <div className="relative z-10 max-w-xl">
          <p className="text-xs font-medium text-inverse-muted sm:text-sm">{today}</p>
          <h1 className="mt-1.5 font-display text-xl font-bold tracking-tight sm:mt-2 sm:text-3xl">
            Welcome back, Admin!
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-inverse-muted sm:text-base">
            Manage diabetes education content, track publishing, and keep your library fresh.
          </p>
          <ReusableButton
            type="button"
            variant="white"
            size="lg"
            onClick={openCreateBlog}
            className="mt-4 w-full sm:mt-5 sm:w-auto"
          >
            <FilePlus2 className="size-4" aria-hidden="true" />
            Add New Blog
          </ReusableButton>
        </div>
        <div
          className="pointer-events-none absolute -right-6 bottom-0 hidden h-40 w-48 rounded-[20px] bg-white/10 md:block lg:right-8 lg:h-44 lg:w-56"
          aria-hidden="true"
        >
          <div className="absolute inset-4 rounded-[16px] border border-white/20 bg-white/10 backdrop-blur-sm" />
          <Sparkles className="absolute right-8 top-8 size-10 text-white/80" />
        </div>
      </section>

      <StatsCardGrid>
        <li>
          <StatsCard
            label="Total Blogs"
            value={counts?.all ?? 0}
            icon={Newspaper}
            tone="primary"
          />
        </li>
        <li>
          <StatsCard
            label="Inactive"
            value={counts?.draft ?? 0}
            icon={FileEdit}
            tone="muted"
          />
        </li>
        <li>
          <StatsCard
            label="Active"
            value={counts?.published ?? 0}
            icon={FileText}
            tone="success"
          />
        </li>
      </StatsCardGrid>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(14rem,0.8fr)]">
        {/* Recent blogs */}
        <section className="min-w-0 rounded-xl border border-border bg-surface p-4 shadow-sm sm:rounded-[16px] sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4 sm:gap-3">
            <h2 className="text-base font-bold text-foreground sm:text-lg">Recent Blogs</h2>
            <Link
              to={`${ADMIN_BASE}/blogs`}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary no-underline hover:underline"
            >
              View all
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          {recentQuery.isPending ? (
            <LoadingState label="Loading recent" className="min-h-32 border-0 shadow-none" />
          ) : recent.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No blogs yet. Create your first article.
            </p>
          ) : (
            <ul className="space-y-2.5 sm:space-y-3">
              {recent.map((blog) => (
                <li
                  key={blog.id}
                  className="flex flex-col gap-3 rounded-[12px] border border-border/80 bg-soft/40 p-3 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt=""
                        className="size-12 shrink-0 rounded-[10px] object-cover sm:size-14"
                      />
                    ) : (
                      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-soft text-primary sm:size-14">
                        <FileText className="size-5" aria-hidden="true" />
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-foreground">{blog.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {formatBlogDate(blog.publishedAt ?? blog.updatedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 self-start pl-[3.75rem] sm:self-center sm:pl-0">
                    <StatusBadge
                      label={blogStatusLabel(blog.status)}
                      tone={blogStatusTone(blog.status)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Quick actions */}
        <section className="min-w-0 rounded-xl border border-border bg-surface p-4 shadow-sm sm:rounded-[16px] sm:p-5">
          <h2 className="text-base font-bold text-foreground sm:text-lg">Quick Actions</h2>
          <div className="mt-3 space-y-2.5 sm:mt-4">
            <AdminButton
              type="button"
              className="flex min-h-11 w-full sm:min-h-12"
              onClick={openCreateBlog}
            >
              <FilePlus2 className="size-4" aria-hidden="true" />
              Add New Blog
            </AdminButton>
            <Link
              to={`${ADMIN_BASE}/blogs`}
              className="flex min-h-11 items-center justify-between rounded-[12px] border border-border px-4 text-sm font-semibold text-foreground no-underline hover:bg-soft"
            >
              View All Blogs
              <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
            </Link>
            <Link
              to={`${ADMIN_BASE}/blogs/drafts`}
              className="flex min-h-11 items-center justify-between rounded-[12px] border border-border px-4 text-sm font-semibold text-foreground no-underline hover:bg-soft"
            >
              Manage Inactive
              <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
