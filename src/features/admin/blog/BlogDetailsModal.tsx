import { useEffect, useId, type ReactNode } from 'react'
import { ImageIcon, X } from 'lucide-react'
import { AdminButton } from '@/features/admin/components/AdminButton'
import { ErrorState } from '@/features/admin/components/ErrorState'
import { LoadingState } from '@/features/admin/components/LoadingState'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import { siteConfig } from '@/shared/config/site'
import { IconButton } from '@/shared/components/ui'
import { formatBlogDate } from '@/features/blog/utils/formatDate'
import { useAdminBlog } from './hooks/useAdminBlogs'
import { blogStatusLabel, blogStatusTone } from './utils/blogStatusLabels'

type Props = {
  open: boolean
  blogId: string | null
  onClose: () => void
}

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="min-w-0 text-sm text-foreground">{children}</dd>
    </div>
  )
}

export function BlogDetailsModal({ open, blogId, onClose }: Props) {
  const titleId = useId()
  const detailQuery = useAdminBlog(open ? (blogId ?? undefined) : undefined)

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const blog = detailQuery.data

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-overlay backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(92dvh,44rem)] w-full max-w-[min(40rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-lg sm:rounded-xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-5">
          <div className="min-w-0">
            <h2 id={titleId} className="text-lg font-bold text-foreground">
              Blog Details
            </h2>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {blog?.title || 'Loading blog information…'}
            </p>
          </div>
          <IconButton
            label="Close"
            onClick={onClose}
            className="shrink-0 text-muted-foreground hover:bg-soft hover:text-foreground"
          >
            <X className="size-5" />
          </IconButton>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
          {detailQuery.isPending ? (
            <LoadingState label="Loading blog" className="rounded-[14px] border-0 shadow-none" />
          ) : detailQuery.isError || !blog ? (
            <ErrorState
              title="Unable to load blog"
              description="Please try again."
              className="rounded-[14px] border-0 bg-transparent py-8 shadow-none"
              action={
                <AdminButton type="button" variant="outline" onClick={() => void detailQuery.refetch()}>
                  Try again
                </AdminButton>
              }
            />
          ) : (
            <div className="space-y-5">
              <div className="overflow-hidden rounded-[14px] border border-border bg-background">
                {blog.coverImage ? (
                  <img
                    src={blog.coverImage}
                    alt=""
                    className="h-44 w-full object-cover sm:h-52"
                  />
                ) : (
                  <div className="flex h-44 w-full items-center justify-center bg-soft text-primary sm:h-52">
                    <ImageIcon className="size-8" aria-hidden="true" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground">/{blog.slug}</p>
              </div>

              <dl className="space-y-3.5 rounded-[14px] border border-border bg-background p-4">
                <DetailRow label="Status">
                  <StatusBadge
                    label={blogStatusLabel(blog.status)}
                    tone={blogStatusTone(blog.status)}
                    className="rounded-full px-2.5 py-1 text-[0.7rem]"
                  />
                </DetailRow>
                <DetailRow label="Category">{blog.category || '—'}</DetailRow>
                <DetailRow label="Author">{blog.author || siteConfig.doctor.name}</DetailRow>
                <DetailRow label="Views">
                  <span className="tabular-nums">{blog.views}</span>
                </DetailRow>
                <DetailRow label="Published">
                  {blog.publishedAt ? formatBlogDate(blog.publishedAt) : '—'}
                </DetailRow>
                <DetailRow label="Scheduled">
                  {blog.scheduledAt ? formatBlogDate(blog.scheduledAt) : '—'}
                </DetailRow>
                <DetailRow label="Updated">{formatBlogDate(blog.updatedAt)}</DetailRow>
                <DetailRow label="Created">{formatBlogDate(blog.createdAt)}</DetailRow>
                <DetailRow label="Tags">
                  {blog.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-soft px-2.5 py-0.5 text-xs font-medium text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    '—'
                  )}
                </DetailRow>
              </dl>

              <section className="rounded-[14px] border border-border bg-background p-4">
                <h4 className="text-sm font-bold text-foreground">Excerpt</h4>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {blog.excerpt?.trim() || 'No excerpt provided.'}
                </p>
              </section>

              <section className="rounded-[14px] border border-border bg-background p-4">
                <h4 className="text-sm font-bold text-foreground">Content</h4>
                <div
                  className="prose prose-sm mt-2 max-w-none text-muted-foreground [&_img]:rounded-lg"
                  dangerouslySetInnerHTML={{
                    __html: blog.content?.trim() || '<p>No content provided.</p>',
                  }}
                />
              </section>
            </div>
          )}
        </div>

        <div className="flex shrink-0 justify-end border-t border-border px-4 py-3 sm:px-5">
          <AdminButton type="button" variant="outline" onClick={onClose}>
            Close
          </AdminButton>
        </div>
      </div>
    </div>
  )
}
