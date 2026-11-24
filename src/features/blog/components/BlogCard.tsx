import { Link } from 'react-router-dom'
import { Badge, Card } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import type { Post } from '../types/Post'

type Props = {
  post: Post
  /** Taller cover for the home “Latest” section. */
  size?: 'default' | 'tall'
}

function formatDate(value: string | null) {
  if (!value) return 'Draft'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function BlogCard({ post, size = 'default' }: Props) {
  return (
    <Card className="group flex h-full w-full min-w-0 flex-col overflow-hidden border-border/80 p-0 shadow-sm transition-[transform,box-shadow,border-color] duration-[var(--duration-normal)] hover:-translate-y-1 hover:border-primary/30 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link
        to={`/blog/${post.slug}`}
        className="flex h-full min-w-0 flex-col no-underline"
      >
        <div
          className={cn(
            'relative w-full shrink-0 overflow-hidden bg-soft',
            size === 'tall'
              ? 'h-44 sm:h-48 lg:h-60'
              : 'h-52 sm:h-56 lg:h-72',
          )}
        >
          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt=""
              className="absolute inset-0 size-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
              loading="lazy"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
              TODO(asset): cover image
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse/25 via-transparent to-transparent opacity-0 transition-opacity duration-[var(--duration-normal)] group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
        <div
          className={cn(
            'flex min-h-0 min-w-0 flex-1 flex-col',
            size === 'tall' ? 'p-4' : 'p-5',
          )}
        >
          <div className="flex min-h-6 min-w-0 items-center gap-2 overflow-hidden">
            <Badge className="shrink-0">{post.category}</Badge>
            <span className="truncate text-xs text-muted-foreground">
              {formatDate(post.publishedAt)} · {post.readingTimeMinutes} min read
            </span>
          </div>
          <h3
            className={cn(
              'mt-2 line-clamp-2 break-words font-display font-semibold text-foreground transition-colors duration-[var(--duration-fast)] group-hover:text-primary',
              size === 'tall'
                ? 'min-h-[2.75rem] text-lg leading-6'
                : 'mt-3 min-h-[3.5rem] text-xl leading-7',
            )}
          >
            {post.title}
          </h3>
          <p
            className={cn(
              'mt-1.5 line-clamp-2 break-words text-sm leading-5 text-muted-foreground',
              size === 'tall' ? 'min-h-0' : 'mt-2 min-h-10',
            )}
          >
            {post.excerpt}
          </p>
        </div>
      </Link>
    </Card>
  )
}
