type Props = {
  name: string
  bio: string
  imageUrl?: string
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

export function AuthorBox({ name, bio, imageUrl }: Props) {
  return (
    <section
      aria-label="About the author"
      className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:p-6"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          width={64}
          height={64}
          className="size-16 shrink-0 rounded-full object-cover ring-1 ring-border"
          loading="lazy"
        />
      ) : (
        <span
          aria-hidden="true"
          className="inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-soft font-semibold text-primary"
        >
          {getInitials(name)}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <h2 className="font-display text-lg font-semibold text-foreground">
          {name}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{bio}</p>
      </div>
    </section>
  )
}
