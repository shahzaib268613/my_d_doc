import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { usePublishedPosts } from '@/features/blog/hooks/usePublishedPosts'
import { Badge, Container, Reveal, Section } from '@/shared/components/ui'

function formatDate(value: string | null) {
  if (!value) return 'Draft'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function LatestBlogV2() {
  const { data: posts = [] } = usePublishedPosts(4)
  const [featured, ...rest] = posts

  return (
    <Section className="relative overflow-hidden bg-[image:var(--gradient-inverse)] text-inverse-foreground">
      <div
        className="pointer-events-none absolute -left-16 top-8 size-56 rounded-full bg-primary/30 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 right-0 size-64 rounded-full bg-primary/25 blur-2xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-soft">
                Latest Blog
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                Fresh insights for real-life diabetes care
              </h2>
              <p className="mt-3 text-white/70">
                Practical articles on nutrition, blood sugar, and living well with diabetes.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex min-h-[var(--spacing-touch)] items-center gap-1.5 self-start rounded-lg border border-white/20 bg-white px-4 text-sm font-semibold text-inverse no-underline transition-colors hover:bg-soft sm:self-auto"
            >
              View all articles
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {!featured ? (
            <p className="text-sm text-inverse-muted">Latest articles will appear here.</p>
          ) : (
            <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
              <Link
                to={`/blog/${featured.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-inverse-foreground/10 bg-inverse-foreground/5 no-underline shadow-md transition-[transform,box-shadow] duration-[var(--duration-normal)] hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:col-span-7"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-soft/20 sm:aspect-[16/9]">
                  {featured.coverImageUrl ? (
                    <img
                      src={featured.coverImageUrl}
                      alt=""
                      className="absolute inset-0 size-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                      loading="lazy"
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-inverse via-inverse/20 to-transparent"
                    aria-hidden="true"
                  />
                </div>
                <div className="relative -mt-20 space-y-3 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-white/15 text-white">{featured.category}</Badge>
                    <span className="text-xs text-inverse-muted">
                      {formatDate(featured.publishedAt)} · {featured.readingTimeMinutes} min read
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-inverse-foreground sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="line-clamp-2 max-w-2xl text-sm text-inverse-muted sm:text-base">
                    {featured.excerpt}
                  </p>
                </div>
              </Link>

              <ul className="flex flex-col gap-3 lg:col-span-5">
                {rest.map((post) => (
                  <li key={post.id} className="min-w-0 flex-1">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex h-full gap-4 rounded-2xl border border-white/15 bg-white p-4 no-underline shadow-sm transition-[transform,box-shadow,border-color] duration-[var(--duration-normal)] hover:-translate-y-0.5 hover:border-inverse/30 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-5"
                    >
                      <div className="relative hidden size-24 shrink-0 overflow-hidden rounded-xl bg-soft sm:block">
                        {post.coverImageUrl ? (
                          <img
                            src={post.coverImageUrl}
                            alt=""
                            className="absolute inset-0 size-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105 motion-reduce:group-hover:scale-100"
                            loading="lazy"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wide text-inverse/70">
                          {post.category}
                        </p>
                        <h3 className="mt-1 line-clamp-2 font-display text-lg font-semibold text-inverse transition-colors group-hover:text-inverse">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-xs text-inverse/65">
                          {formatDate(post.publishedAt)} · {post.readingTimeMinutes} min read
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
      </Container>
    </Section>
  )
}
