import { Link } from 'react-router-dom'
import type { Post } from '@/features/blog/types/Post'

type Props = {
  posts: Post[]
}

function formatDate(value: string | null) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function RelatedBlogsList({ posts }: Props) {
  if (posts.length === 0) return null

  return (
    <nav aria-label="Related blogs">
      <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-foreground sm:text-2xl">
        Related blogs
      </h2>
      <div className="mt-2 h-[3px] w-full bg-border" aria-hidden="true">
        <div className="h-full w-1/5 bg-primary" />
      </div>
      <ul className="mt-5 space-y-5">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              to={`/blog/${post.slug}`}
              className="group flex min-w-0 gap-4 rounded-md no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-lg bg-soft">
                {post.coverImageUrl ? (
                  <img
                    src={post.coverImageUrl}
                    alt=""
                    width={128}
                    height={96}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                ) : null}
              </span>
              <span className="min-w-0">
                <span className="line-clamp-3 break-words text-base font-semibold leading-relaxed text-foreground group-hover:text-primary sm:text-lg">
                  {post.title}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
