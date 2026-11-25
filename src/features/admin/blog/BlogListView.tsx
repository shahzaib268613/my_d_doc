import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { AdminButton } from '@/features/admin/components/AdminButton'
import { useBlogCreateModal } from './BlogCreateModalContext'
import { ErrorState } from '@/features/admin/components/ErrorState'
import { LoadingState } from '@/features/admin/components/LoadingState'
import { blogCategories } from '@/shared/config/blogCategories'
import {
  Button,
  ConfirmDialog,
  FilterSelect,
  Pagination,
  SearchInput,
} from '@/shared/components/ui'
import { getApiErrorMessage } from '@/shared/api/axiosInstance'
import { useToast } from '@/shared/hooks/useToast'
import type { Blog, BlogStatus } from '@/features/blog/types/blog'
import { useAdminBlogs, useBlogMutations } from './hooks/useAdminBlogs'
import { useBlogCategories } from './hooks/useBlogCategories'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { BLOG_STATUS_FILTER_OPTIONS } from './utils/blogStatusLabels'
import { BlogPageHero, type BlogHeroVariant } from './BlogPageHero'
import { BlogTable } from './BlogTable'

const SORT_OPTIONS = [
  { value: 'updated-desc', label: 'Sort by: Newest' },
  { value: 'published-desc', label: 'Published date' },
  { value: 'title-asc', label: 'Title A–Z' },
] as const

export type BlogListVariant = 'all' | 'drafts' | 'published' | 'scheduled'

type SortKey = 'updated-desc' | 'title-asc' | 'published-desc'

type ListMeta = {
  title: string
  description: string
  emptyTitle: string
  emptyDescription: string
  variant: BlogListVariant
  status?: BlogStatus
  showStatusFilter: boolean
  showAddNewButton: boolean
  tableVariant: 'all' | 'published' | 'scheduled'
  enableBulkSelect: boolean
}

const LIST_META: Record<BlogListVariant, ListMeta> = {
  all: {
    title: 'All Blogs',
    description: 'Search, filter, and manage every article in one place.',
    emptyTitle: 'No blogs yet',
    emptyDescription: 'Add your first article to start building the library.',
    variant: 'all',
    showStatusFilter: true,
    showAddNewButton: true,
    tableVariant: 'all',
    enableBulkSelect: true,
  },
  drafts: {
    title: 'Inactive Blogs',
    description: 'Articles that are not live on the public site.',
    emptyTitle: 'No inactive blogs',
    emptyDescription: 'Save a blog as Inactive from Add New Blog to see it here.',
    variant: 'drafts',
    status: 'draft',
    showStatusFilter: false,
    showAddNewButton: false,
    tableVariant: 'all',
    enableBulkSelect: true,
  },
  published: {
    title: 'Active Blogs',
    description: 'Articles currently live on the public site.',
    emptyTitle: 'No active blogs',
    emptyDescription: 'Set a blog to Active to make it available to readers.',
    variant: 'published',
    status: 'published',
    showStatusFilter: false,
    showAddNewButton: false,
    tableVariant: 'published',
    enableBulkSelect: false,
  },
  scheduled: {
    title: 'Inactive Blogs',
    description: 'Articles that are not live on the public site.',
    emptyTitle: 'No inactive blogs',
    emptyDescription: 'Save a blog as Inactive from Add New Blog to see it here.',
    variant: 'scheduled',
    status: 'scheduled',
    showStatusFilter: false,
    showAddNewButton: false,
    tableVariant: 'all',
    enableBulkSelect: false,
  },
}

function sortBlogs(blogs: Blog[], sort: SortKey) {
  const copy = [...blogs]
  if (sort === 'title-asc') return copy.sort((a, b) => a.title.localeCompare(b.title))
  if (sort === 'published-desc') {
    return copy.sort((a, b) => {
      const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return bTime - aTime
    })
  }
  return copy.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )
}

type Props = {
  variant: BlogListVariant
}

/** Shared list UI — used by All / Drafts / Published / Scheduled pages. */
export function BlogListView({ variant }: Props) {
  const meta = LIST_META[variant]
  const [searchParams] = useSearchParams()
  const { toast } = useToast()
  const { activeNames } = useBlogCategories()
  const categoryOptions =
    activeNames.length > 0 ? activeNames : blogCategories.map((category) => category.title)

  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [statusFilter, setStatusFilter] = useState<BlogStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortKey>('updated-desc')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null)
  const debouncedSearch = useDebounce(search, 350)

  useEffect(() => {
    const fromQuery = searchParams.get('search')
    if (fromQuery) setSearch(fromQuery)
  }, [searchParams])

  useEffect(() => {
    setPage(1)
    setSelectedIds(new Set())
  }, [variant, debouncedSearch, statusFilter, categoryFilter])

  const queryStatus =
    meta.status ?? (statusFilter === 'all' ? undefined : statusFilter)

  const query = {
    status: queryStatus,
    search: debouncedSearch || undefined,
    page,
    limit: 10,
  }

  const listQuery = useAdminBlogs(query)
  const { publish, unpublish, remove } = useBlogMutations()

  const busyId =
    publish.isPending || unpublish.isPending || remove.isPending
      ? (publish.variables ?? unpublish.variables ?? remove.variables ?? null)
      : null

  const items = useMemo(() => {
    let rows = listQuery.data?.items ?? []
    if (categoryFilter !== 'all') {
      rows = rows.filter((blog) => blog.category === categoryFilter)
    }
    return sortBlogs(rows, sort)
  }, [listQuery.data?.items, categoryFilter, sort])

  const totalPages = listQuery.data?.totalPages ?? 1

  async function handlePublish(blog: Blog) {
    try {
      await publish.mutateAsync(blog.id)
      toast('Blog published', 'success')
    } catch (error) {
      toast(getApiErrorMessage(error, 'Could not publish'), 'danger')
    }
  }

  async function handleUnpublish(blog: Blog) {
    try {
      await unpublish.mutateAsync(blog.id)
      toast('Blog unpublished', 'success')
    } catch (error) {
      toast(getApiErrorMessage(error, 'Could not unpublish'), 'danger')
    }
  }

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

  function toggleSelect(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    setSelectedIds((current) => {
      if (items.length > 0 && items.every((blog) => current.has(blog.id))) {
        return new Set()
      }
      return new Set(items.map((blog) => blog.id))
    })
  }

  const heroVariant = meta.variant as BlogHeroVariant
  const { openCreateBlog } = useBlogCreateModal()
  const showPagination =
    !listQuery.isPending && !listQuery.isError && items.length > 0

  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col gap-5">
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <BlogPageHero
          variant={heroVariant}
          title={meta.title}
          description={meta.description}
        />

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <SearchInput
            variant="outlined"
            value={search}
            onChange={setSearch}
            placeholder="Search blogs..."
            ariaLabel="Search blogs"
            className="xl:max-w-xs"
          />
          <div className="flex min-w-0 flex-wrap items-center gap-2.5">
            {meta.showStatusFilter ? (
              <FilterSelect
                variant="outlined"
                hideLabel
                label="Filter by status"
                className="min-w-[10.5rem]"
                value={statusFilter}
                options={[...BLOG_STATUS_FILTER_OPTIONS]}
                onChange={(value) => setStatusFilter(value as BlogStatus | 'all')}
              />
            ) : null}
            <FilterSelect
              variant="outlined"
              hideLabel
              label="Filter by category"
              className="min-w-[10.5rem]"
              value={categoryFilter}
              options={[
                { value: 'all', label: 'All Categories' },
                ...categoryOptions.map((name) => ({
                  value: name,
                  label: name,
                })),
              ]}
              onChange={setCategoryFilter}
            />
            <FilterSelect
              variant="outlined"
              hideLabel
              label="Sort blogs"
              className="min-w-[10.5rem]"
              value={sort}
              options={[...SORT_OPTIONS]}
              onChange={(value) => setSort(value as SortKey)}
            />

            {meta.showAddNewButton ? (
              <AdminButton
                type="button"
                size="md"
                className="min-h-10 shrink-0 rounded-lg px-4"
                onClick={openCreateBlog}
              >
                <Plus className="size-4" aria-hidden="true" />
                Add New Blog
              </AdminButton>
            ) : null}
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
            <BlogTable
              blogs={items}
              busyId={busyId}
              variant={meta.tableVariant}
              selectedIds={meta.enableBulkSelect ? selectedIds : undefined}
              onToggleSelect={meta.enableBulkSelect ? toggleSelect : undefined}
              onToggleSelectAll={meta.enableBulkSelect ? toggleSelectAll : undefined}
              onPublish={(blog) => void handlePublish(blog)}
              onUnpublish={(blog) => void handleUnpublish(blog)}
              onDelete={setDeleteTarget}
              emptyContent={
                <div className="flex flex-col items-center justify-center gap-3 py-10">
                  <p className="text-base font-semibold text-foreground">{meta.emptyTitle}</p>
                  <p className="max-w-sm text-sm text-muted-foreground">{meta.emptyDescription}</p>
                  <AdminButton type="button" className="mt-1" onClick={openCreateBlog}>
                    <Plus className="size-4" aria-hidden="true" />
                    Add New Blog
                  </AdminButton>
                </div>
              }
            />
          )}
        </div>
      </div>

      <Pagination
        mode="simple"
        showPageInfo
        currentPage={page}
        totalPages={showPagination ? totalPages : 1}
        onPageChange={setPage}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete blog?"
        description={
          deleteTarget
            ? `“${deleteTarget.title}” will be permanently removed.`
            : ''
        }
        confirmLabel="Delete"
        danger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => void confirmDelete()}
      />
    </div>
  )
}
