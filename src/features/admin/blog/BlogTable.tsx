import type { ReactNode } from 'react'
import { ImageIcon } from 'lucide-react'
import {
  ReusableTable,
  type ReusableTableColumn,
} from '@/shared/components/ui'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import type { Blog } from '@/features/blog/types/blog'
import { formatBlogDate } from '@/features/blog/utils/formatDate'
import { blogStatusLabel, blogStatusTone } from './utils/blogStatusLabels'
import { BlogRowActions } from './BlogRowActions'

type Props = {
  blogs: Blog[]
  busyId?: string | null
  variant?: 'all' | 'published' | 'scheduled'
  selectedIds?: Set<string>
  onToggleSelect?: (id: string) => void
  onToggleSelectAll?: () => void
  onPublish: (blog: Blog) => void
  onUnpublish: (blog: Blog) => void
  onDelete: (blog: Blog) => void
  /** Shown inside the table when there are no rows (placeholder empty state) */
  emptyContent?: ReactNode
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  toolbar?: ReactNode
  shell?: boolean
}

export function BlogTable({
  blogs,
  busyId,
  variant = 'all',
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onPublish,
  onUnpublish,
  onDelete,
  emptyContent,
  currentPage,
  totalPages,
  onPageChange,
  toolbar,
  shell = true,
}: Props) {
  const showCheckbox = Boolean(onToggleSelect && selectedIds)
  const allSelected = showCheckbox && blogs.length > 0 && blogs.every((b) => selectedIds!.has(b.id))

  const columns: ReusableTableColumn<Blog>[] = []

  if (showCheckbox) {
    columns.push({
      id: 'select',
      header: (
        <input
          type="checkbox"
          className="size-4 rounded border-border accent-primary"
          checked={allSelected}
          onChange={onToggleSelectAll}
          aria-label="Select all blogs on this page"
        />
      ),
      className: 'w-12',
      cell: (blog) => (
        <input
          type="checkbox"
          className="size-4 rounded border-border accent-primary"
          checked={selectedIds!.has(blog.id)}
          onChange={() => onToggleSelect!(blog.id)}
          aria-label={`Select ${blog.title}`}
        />
      ),
    })
  }

  columns.push(
    {
      id: 'thumb',
      header: 'Thumbnail',
      className: 'w-[5.5rem]',
      cell: (blog) =>
        blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt=""
            className="h-12 w-[4.25rem] rounded-lg object-cover ring-1 ring-border"
          />
        ) : (
          <span className="inline-flex h-12 w-[4.25rem] items-center justify-center rounded-lg bg-background text-primary ring-1 ring-border">
            <ImageIcon className="size-4" aria-hidden="true" />
          </span>
        ),
    },
    {
      id: 'title',
      header: 'Title',
      className: 'min-w-[16rem]',
      cell: (blog) => (
        <div className="min-w-0 max-w-md">
          <p className="truncate text-sm font-semibold text-foreground">{blog.title}</p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {blog.excerpt || `/${blog.slug}`}
          </p>
        </div>
      ),
    },
  )

  if (variant === 'all') {
    columns.push({
      id: 'status',
      header: 'Status',
      cell: (blog) => (
        <StatusBadge
          label={blogStatusLabel(blog.status)}
          tone={blogStatusTone(blog.status)}
          className="rounded-full px-2.5 py-1 text-[0.7rem]"
        />
      ),
    })
  }

  columns.push({
    id: 'published',
    header: 'Published On',
    cell: (blog) => (
      <span className="whitespace-nowrap text-sm text-muted-foreground">
        {formatBlogDate(blog.publishedAt ?? blog.updatedAt)}
      </span>
    ),
  })

  columns.push({
    id: 'actions',
    header: 'Actions',
    className: 'text-right',
    cell: (blog) => (
      <BlogRowActions
        blog={blog}
        busy={busyId === blog.id}
        onPublish={onPublish}
        onUnpublish={onUnpublish}
        onDelete={onDelete}
      />
    ),
  })

  return (
    <ReusableTable
      shell={shell}
      toolbar={toolbar}
      columns={columns}
      rows={blogs}
      rowKey={(blog) => blog.id}
      emptyMessage={emptyContent ?? 'No blogs match this filter.'}
      pagination={
        currentPage != null && totalPages != null && onPageChange
          ? {
              currentPage,
              totalPages,
              onPageChange,
            }
          : undefined
      }
    />
  )
}
