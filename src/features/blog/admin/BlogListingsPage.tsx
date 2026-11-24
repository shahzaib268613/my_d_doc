import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ImageIcon, Pencil, Plus, Trash2 } from 'lucide-react'
import { AdminButton } from '@/features/admin/components/AdminButton'
import { AdminSelect } from '@/features/admin/components/AdminSelect'
import { DataTable, type DataTableColumn } from '@/features/admin/components/DataTable'
import { ErrorState } from '@/features/admin/components/ErrorState'
import { LoadingState } from '@/features/admin/components/LoadingState'
import { Pagination } from '@/features/admin/components/Pagination'
import { SearchInput } from '@/features/admin/components/SearchInput'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import { ADMIN_BASE } from '@/features/admin/constants/adminNav'
import { Button, ConfirmDialog } from '@/shared/components/ui'
import { getApiErrorMessage } from '@/shared/api/axiosInstance'
import { siteConfig } from '@/shared/config/site'
import { useToast } from '@/shared/hooks/useToast'
import type { Blog, BlogStatus } from '../types/blog'
import { useAdminBlogs, useBlogMutations } from '../hooks/useAdminBlogs'
import { useBlogCategories } from '../hooks/useBlogCategories'
import { useDebounce } from '../hooks/useDebounce'
import { BLOG_STATUS_FILTER_OPTIONS, blogStatusLabel, blogStatusTone } from '../utils/blogStatusLabels'
import { formatBlogDate } from '../utils/formatDate'
import { useBlogCreateModal } from './BlogCreateModalContext'
import { BlogPageHero } from './BlogPageHero'

export function BlogListingsPage() {
  const { toast } = useToast()
  const { openCreateBlog } = useBlogCreateModal()
  const { activeNames } = useBlogCategories()
  const { remove } = useBlogMutations()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<BlogStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null)
  const debouncedSearch = useDebounce(search, 350)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, statusFilter, categoryFilter])

  const listQuery = useAdminBlogs({
    status: statusFilter === 'all' ? undefined : statusFilter,
    search: debouncedSearch || undefined,
    page,
    limit: 10,
  })

  const busyId = remove.isPending ? (remove.variables ?? null) : null

  const items = useMemo(() => {
    let rows = listQuery.data?.items ?? []
    if (categoryFilter !== 'all') {
      rows = rows.filter((blog) => blog.category === categoryFilter)
    }
    return rows
  }, [listQuery.data?.items, categoryFilter])

  const totalPages = listQuery.data?.totalPages ?? 1
  const showPagination = !listQuery.isPending && !listQuery.isError && items.length > 0

  async function confirmDelete() {
    if (!deleteTarget) return
    try {
      await remove.mutateAsync(deleteTarget.id)
      toast('Blog deleted', 'success')
      setDeleteTarget(null)
    } catch (error) {
      toast(getApiErrorMessage(error, 'Could not delete'), 'danger')
    }
  }

  const columns: DataTableColumn<Blog>[] = [
    {
      id: 'image',
      header: 'Featured Image',
      className: 'w-[5.5rem]',
      cell: (blog) =>
        blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt=""
            className="h-12 w-[4.25rem] rounded-lg object-cover ring-1 ring-[#DCE8F7]"
          />
        ) : (
          <span className="inline-flex h-12 w-[4.25rem] items-center justify-center rounded-lg bg-[#F4F8FF] text-[#0875F9] ring-1 ring-[#DCE8F7]">
            <ImageIcon className="size-4" aria-hidden="true" />
          </span>
        ),
    },
    {
      id: 'title',
      header: 'Blog Title',
      className: 'min-w-[14rem]',
      cell: (blog) => (
        <div className="min-w-0 max-w-md">
          <p className="truncate text-sm font-semibold text-[#1a2b4b]">{blog.title}</p>
          <p className="mt-0.5 line-clamp-1 text-xs text-[#71839F]">/{blog.slug}</p>
        </div>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      cell: (blog) => (
        <span className="text-sm text-[#5B6B82]">{blog.category || '—'}</span>
      ),
    },
    {
      id: 'author',
      header: 'Author',
      cell: () => (
        <span className="whitespace-nowrap text-sm text-[#5B6B82]">
          {siteConfig.doctor.name}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (blog) => (
        <StatusBadge
          label={blogStatusLabel(blog.status)}
          tone={blogStatusTone(blog.status)}
          className="rounded-full px-2.5 py-1 text-[0.7rem]"
        />
      ),
    },
    {
      id: 'date',
      header: 'Date',
      cell: (blog) => (
        <span className="whitespace-nowrap text-sm text-[#71839F]">
          {formatBlogDate(blog.publishedAt ?? blog.updatedAt)}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      className: 'text-right',
      cell: (blog) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link
            to={`${ADMIN_BASE}/blogs/edit/${blog.id}`}
            title="Edit"
            aria-label={`Edit ${blog.title}`}
            className="inline-flex size-9 items-center justify-center rounded-[10px] border border-[#DCE8F7] bg-white text-[#10264A] shadow-sm no-underline hover:bg-[#F4F8FF]"
          >
            <Pencil className="size-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            title="Delete"
            aria-label={`Delete ${blog.title}`}
            disabled={busyId === blog.id}
            className="inline-flex size-9 items-center justify-center rounded-[10px] border border-[#DCE8F7] bg-white text-[#B42318] shadow-sm hover:bg-[#FFF5F5] disabled:opacity-50"
            onClick={() => setDeleteTarget(blog)}
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col gap-5">
      <BlogPageHero
        variant="all"
        title="Blog Listings"
        description="Browse, filter, and manage every blog from one listings table."
      />

      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <SearchInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search blogs..."
          className="xl:max-w-xs"
        />
        <div className="flex min-w-0 flex-wrap items-center gap-2.5">
          <AdminSelect
            value={statusFilter}
            options={[...BLOG_STATUS_FILTER_OPTIONS]}
            onChange={(value) => setStatusFilter(value as BlogStatus | 'all')}
            aria-label="Filter by status"
          />
          <AdminSelect
            value={categoryFilter}
            options={[
              { value: 'all', label: 'All Categories' },
              ...activeNames.map((name) => ({ value: name, label: name })),
            ]}
            onChange={setCategoryFilter}
            aria-label="Filter by category"
          />
          <AdminButton
            type="button"
            size="md"
            className="min-h-10 shrink-0 rounded-lg px-4"
            onClick={openCreateBlog}
          >
            <Plus className="size-4" aria-hidden="true" />
            Add New Blog
          </AdminButton>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        {listQuery.isPending ? (
          <LoadingState label="Loading blogs" className="rounded-[16px]" />
        ) : listQuery.isError ? (
          <ErrorState
            title="Could not load blogs"
            description={getApiErrorMessage(listQuery.error)}
            className="rounded-[16px]"
            action={
              <Button type="button" size="sm" onClick={() => void listQuery.refetch()}>
                Retry
              </Button>
            }
          />
        ) : (
          <DataTable
            columns={columns}
            rows={items}
            rowKey={(blog) => blog.id}
            emptyMessage={
              <div className="flex flex-col items-center justify-center gap-3 py-10">
                <p className="text-base font-semibold text-[#1a2b4b]">No blogs found</p>
                <p className="max-w-sm text-sm text-[#71839F]">
                  Try another filter or add your first article.
                </p>
                <AdminButton type="button" className="mt-1" onClick={openCreateBlog}>
                  <Plus className="size-4" aria-hidden="true" />
                  Add New Blog
                </AdminButton>
              </div>
            }
            className="rounded-lg border-[#DCE8F7] shadow-sm [&_thead]:bg-[#F4F8FF] [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-[#5B6B82] [&_td]:px-4 [&_td]:py-3.5"
          />
        )}
      </div>

      <Pagination
        page={page}
        pageCount={showPagination ? totalPages : 1}
        onPageChange={setPage}
        sticky={false}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete blog?"
        description={
          deleteTarget ? `“${deleteTarget.title}” will be permanently removed.` : ''
        }
        confirmLabel="Delete"
        danger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => void confirmDelete()}
      />
    </div>
  )
}
