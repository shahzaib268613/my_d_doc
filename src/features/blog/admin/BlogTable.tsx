import type { ReactNode } from 'react'
import { ImageIcon } from 'lucide-react'
import { DataTable, type DataTableColumn } from '@/features/admin/components/DataTable'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import type { Blog } from '../types/blog'
import { formatBlogDate } from '../utils/formatDate'
import { blogStatusLabel, blogStatusTone } from '../utils/blogStatusLabels'
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
}: Props) {
  const showCheckbox = Boolean(onToggleSelect && selectedIds)
  const allSelected = showCheckbox && blogs.length > 0 && blogs.every((b) => selectedIds!.has(b.id))

  const columns: DataTableColumn<Blog>[] = []

  if (showCheckbox) {
    columns.push({
      id: 'select',
      header: (
        <input
          type="checkbox"
          className="size-4 rounded border-[#C9D7EA] accent-[#0875F9]"
          checked={allSelected}
          onChange={onToggleSelectAll}
          aria-label="Select all blogs on this page"
        />
      ),
      className: 'w-12',
      cell: (blog) => (
        <input
          type="checkbox"
          className="size-4 rounded border-[#C9D7EA] accent-[#0875F9]"
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
      header: 'Title',
      className: 'min-w-[16rem]',
      cell: (blog) => (
        <div className="min-w-0 max-w-md">
          <p className="truncate text-sm font-semibold text-[#1a2b4b]">{blog.title}</p>
          <p className="mt-0.5 line-clamp-1 text-xs text-[#71839F]">
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
      <span className="whitespace-nowrap text-sm text-[#71839F]">
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
    <DataTable
      columns={columns}
      rows={blogs}
      rowKey={(blog) => blog.id}
      emptyMessage={emptyContent ?? 'No blogs match this filter.'}
      className="rounded-lg border-[#DCE8F7] shadow-sm [&_thead]:bg-[#F4F8FF] [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-[#5B6B82] [&_td]:px-4 [&_td]:py-3.5"
    />
  )
}
