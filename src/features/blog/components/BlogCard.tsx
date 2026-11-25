import { Link } from 'react-router-dom'
import { Badge, Card } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import fallbackCover from '@/features/marketing/assets/hero-bg.png'
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
  const coverSrc = post.coverImageUrl || fallbackCover

  return (
    <Card className="group flex h-full w-full min-w-0 flex-col overflow-hidden border-border/80 p-0 shadow-sm transition-[transform,box-shadow,border-color] duration-[var(--duration-normal)] hover:-translate-y-1 hover:border-primary/30 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link
        to={`/blog/${post.slug}`}
        className="flex h-full min-w-0 flex-col no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <div
          className={cn(
            'relative w-full shrink-0 overflow-hidden bg-soft',
            size === 'tall' ? 'aspect-[16/10]' : 'aspect-[16/10]',
          )}
        >
          <img
            src={coverSrc}
            alt=""
            className="absolute inset-0 size-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
            loading="lazy"
          />
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
          <div className="flex min-w-0 items-center justify-between gap-2">
            <Badge className="w-fit min-w-0 max-w-[65%] truncate">{post.category}</Badge>
            <p className="shrink-0 text-right text-xs text-muted-foreground">
              {formatDate(post.publishedAt)}
            </p>
          </div>
          <h3
            className={cn(
              'mt-3 line-clamp-2 break-words font-display font-semibold text-foreground transition-colors duration-[var(--duration-fast)] group-hover:text-primary',
              size === 'tall' ? 'text-lg leading-snug' : 'text-xl leading-snug',
            )}
          >
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 break-words text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </Card>
  )
}
