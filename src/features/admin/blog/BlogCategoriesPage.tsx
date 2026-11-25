import { useEffect, useMemo, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { AdminButton } from '@/features/admin/components/AdminButton'
import { DataTable, type DataTableColumn } from '@/features/admin/components/DataTable'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import { ConfirmDialog, Pagination, SearchInput } from '@/shared/components/ui'
import { useToast } from '@/shared/hooks/useToast'
import { CategoryStorageError } from './api/categoryStorage'
import { useAdminBlogs } from './hooks/useAdminBlogs'
import { useBlogCategories } from './hooks/useBlogCategories'
import type { CategoryWriteInput, ManagedBlogCategory } from './types/category'
import { BlogPageHero } from './BlogPageHero'
import { CategoryFormModal } from './CategoryFormModal'

type Row = ManagedBlogCategory & { blogCount: number }

const PAGE_SIZE = 5

export function BlogCategoriesPage() {
  const { toast } = useToast()
  const { categories, create, update, remove } = useBlogCategories()
  const blogsQuery = useAdminBlogs({ page: 1, limit: 200 })
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<ManagedBlogCategory | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<ManagedBlogCategory | null>(null)

  const blogCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const blog of blogsQuery.data?.items ?? []) {
      const key = blog.category.trim().toLowerCase()
      if (!key) continue
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
    return counts
  }, [blogsQuery.data?.items])

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase()
    return categories
      .map((category) => ({
        ...category,
        blogCount: blogCounts.get(category.name.toLowerCase()) ?? 0,
      }))
      .filter((category) => {
        if (!q) return true
        return (
          category.name.toLowerCase().includes(q) ||
          category.slug.toLowerCase().includes(q) ||
          category.description.toLowerCase().includes(q)
        )
      })
  }, [categories, blogCounts, search])

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE))

  useEffect(() => {
    setPage(1)
  }, [search])

  useEffect(() => {
    if (page > pageCount) setPage(pageCount)
  }, [page, pageCount])

  const rows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredRows.slice(start, start + PAGE_SIZE)
  }, [filteredRows, page])

  function handleSave(input: CategoryWriteInput) {
    try {
      if (editing) {
        update(editing.id, input)
        toast('Category updated', 'success')
      } else {
        create(input)
        toast('Category created', 'success')
      }
    } catch (error) {
      const message =
        error instanceof CategoryStorageError
          ? error.message
          : 'Could not save category'
      toast(message, 'danger')
      throw error
    }
  }

  function confirmDelete() {
    if (!deleteTarget) return
    try {
      remove(deleteTarget.id)
      toast('Category deleted', 'success')
      setDeleteTarget(null)
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Could not delete', 'danger')
    }
  }

  const columns: DataTableColumn<Row>[] = [
    {
      id: 'name',
      header: 'Category Name',
      className: 'min-w-[12rem]',
      cell: (row) => (
        <div className="min-w-0 max-w-md">
          <p className="font-semibold text-foreground">{row.name}</p>
          {row.description ? (
            <p className="mt-0.5 whitespace-normal break-words text-xs leading-relaxed text-muted-foreground">
              {row.description}
            </p>
          ) : null}
        </div>
      ),
    },
    {
      id: 'slug',
      header: 'Slug',
      cell: (row) => (
        <span className="whitespace-nowrap font-mono text-xs text-muted-foreground">{row.slug}</span>
      ),
    },
    {
      id: 'count',
      header: 'Blog Count',
      cell: (row) => (
        <span className="tabular-nums text-sm font-semibold text-foreground">
          {row.blogCount}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => (
        <StatusBadge
          label={row.status === 'active' ? 'Active' : 'Inactive'}
          tone={row.status === 'active' ? 'success' : 'neutral'}
          className="rounded-full px-2.5 py-1 text-[0.7rem]"
        />
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      className: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            title="Edit"
            aria-label={`Edit ${row.name}`}
            className="inline-flex size-9 items-center justify-center rounded-[10px] border border-border bg-surface text-foreground shadow-sm hover:bg-background"
            onClick={() => {
              setEditing(row)
              setCreateOpen(true)
            }}
          >
            <Pencil className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            title="Delete"
            aria-label={`Delete ${row.name}`}
            className="inline-flex size-9 items-center justify-center rounded-[10px] border border-border bg-surface text-danger shadow-sm hover:bg-danger/10"
            onClick={() => setDeleteTarget(row)}
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col gap-5">
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <BlogPageHero
          variant="all"
          title="Blog Categories"
          description="Create and manage categories used when publishing blogs."
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            variant="outlined"
            value={search}
            onChange={setSearch}
            placeholder="Search categories..."
            ariaLabel="Search categories"
            className="sm:max-w-xs"
          />
          <AdminButton
            type="button"
            size="md"
            className="min-h-10 shrink-0 rounded-lg px-4"
            onClick={() => {
              setEditing(null)
              setCreateOpen(true)
            }}
          >
            <Plus className="size-4" aria-hidden="true" />
            Add Category
          </AdminButton>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row.id}
          emptyMessage="No categories yet. Create your first category."
          className="rounded-lg border-border shadow-sm [&_thead]:bg-background [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-muted-foreground [&_td]:px-4 [&_td]:py-3.5 [&_td]:align-top"
        />
      </div>

      <Pagination
        mode="simple"
        showPageInfo
        currentPage={page}
        totalPages={pageCount}
        onPageChange={setPage}
      />

      <CategoryFormModal
        open={createOpen}
        category={editing}
        onClose={() => {
          setCreateOpen(false)
          setEditing(null)
        }}
        onSubmit={handleSave}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete category?"
        description={
          deleteTarget
            ? `“${deleteTarget.name}” will be removed. Existing blogs keep their category text.`
            : ''
        }
        confirmLabel="Delete"
        danger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
