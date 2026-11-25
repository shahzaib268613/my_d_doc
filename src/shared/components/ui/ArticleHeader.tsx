import { Badge } from './Badge'
import { cn } from '@/shared/utils/cn'

type Props = {
  className?: string
  category: string
  readingTimeMinutes: number
  title: string
  excerpt: string
  author: string
  authorAvatarUrl?: string
  dateText?: string
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
}

export function ArticleHeader({
  className,
  category,
  readingTimeMinutes,
  title,
  excerpt,
  author,
  authorAvatarUrl,
  dateText,
}: Props) {
  return (
    <header className={cn('mx-auto w-full max-w-[45rem]', className)}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Badge
          variant="neutral"
          className="max-w-full whitespace-normal break-words"
        >
          {category}
        </Badge>
        <p className="text-sm text-muted-foreground">{readingTimeMinutes} min read</p>
      </div>

      <h1 className="mt-4 break-words text-balance font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
        {excerpt}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
        {authorAvatarUrl ? (
          <img
            src={authorAvatarUrl}
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-full object-cover ring-1 ring-border"
          />
        ) : (
          <span
            aria-hidden="true"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-soft text-sm font-semibold text-primary"
          >
            {getInitials(author)}
          </span>
        )}
        <p className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
          <span className="font-semibold text-foreground">{author}</span>
          {dateText ? (
            <span className="text-muted-foreground">{dateText}</span>
          ) : null}
        </p>
      </div>
    </header>
  )
}
