import { Badge } from './Badge'

type Props = {
  category: string
  title: string
  author: string
  dateText?: string
  imageUrl?: string | null
  imageAlt: string
}

export function ArticleHero({
  category,
  title,
  author,
  dateText,
  imageUrl,
  imageAlt,
}: Props) {
  return (
    <header className="relative isolate flex min-h-[260px] w-full items-end overflow-hidden rounded-xl bg-[image:var(--gradient-primary)] px-5 py-7 text-primary-foreground sm:px-8 sm:py-9 lg:min-h-[360px] lg:px-12 lg:py-11">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={imageAlt}
          width={1600}
          height={640}
          className="absolute inset-0 z-0 size-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      ) : null}
      {imageUrl ? (
        <div
          className="absolute inset-0 z-10 bg-inverse/35"
          aria-hidden="true"
        />
      ) : null}

      <div className="relative z-20 w-full max-w-4xl">
        <Badge
          variant="primary"
          className="max-w-full whitespace-normal break-words"
        >
          {category}
        </Badge>
        <h1 className="mt-4 break-words text-balance font-display text-3xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-primary-foreground/90">
          <span>{author}</span>
          {dateText ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{dateText}</span>
            </>
          ) : null}
        </p>
      </div>
    </header>
  )
}
