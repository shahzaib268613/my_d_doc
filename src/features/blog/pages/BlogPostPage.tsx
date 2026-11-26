import { useMemo } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import doctorPortrait from '@/features/about/assets/doctor.png'
import {
  ArticleContent,
  ArticleHero,
  AuthorBox,
  Badge,
  ReusableButton,
  Container,
  FaqAccordion,
  RelatedBlogsList,
  Section,
  Skeleton,
  prepareArticleHtml,
} from '@/shared/components/ui'
import { sanitizeBasicHtml } from '../api/sanitizeHtml'
import { usePublishedPosts, usePublishedPost } from '../hooks/usePublishedPosts'
import { useBlogPostMeta } from '../hooks/useBlogPostMeta'
import type { Post } from '../types/Post'

const DEFAULT_AUTHOR = 'Dr. Jonas Leibowitz'
const AUTHOR_BIO =
  'Endocrinologist sharing clear, practical guidance for living well with diabetes.'

function formatFullDate(value: string | null | undefined) {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function getDateText(post: Post) {
  const updatedDate = formatFullDate(post.updatedAt)
  if (updatedDate && post.updatedAt !== post.publishedAt) {
    return `Updated ${updatedDate}`
  }

  const publishedDate = formatFullDate(post.publishedAt)
  return publishedDate ? `Published ${publishedDate}` : undefined
}

function getPublishedTimestamp(post: Post) {
  const timestamp = post.publishedAt ? Date.parse(post.publishedAt) : 0
  return Number.isNaN(timestamp) ? 0 : timestamp
}

function ArticleLoadingState() {
  return (
    <Section className="bg-background pt-20 sm:pt-24">
      <Container role="status" aria-label="Loading article" aria-busy="true">
        <Skeleton className="mb-6 h-5 w-28" />
        <Skeleton className="h-[260px] w-full rounded-xl sm:h-[320px] lg:h-[360px]" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
          <div className="space-y-5">
            <Skeleton className="h-7 w-4/5" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="mt-8 h-8 w-2/3" />
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-60 w-full" />
          </div>
        </div>
      </Container>
    </Section>
  )
}

function ArticleNotFound() {
  return (
    <Section className="bg-background pt-24 sm:pt-28">
      <Container>
        <div className="mx-auto max-w-[47.5rem]">
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            We couldn&apos;t find that article.
          </h1>
          <p className="mt-3 text-muted-foreground">
            It may have been removed or is no longer available.
          </p>
          <ReusableButton href="/blog" variant="outline" className="mt-6">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to blog
          </ReusableButton>
        </div>
      </Container>
    </Section>
  )
}

export function BlogPostPage() {
  const { slug } = useParams()
  const { data: post, isPending, isError } = usePublishedPost(slug)
  const { data: posts = [] } = usePublishedPosts(50)
  const publishedPost = post?.status === 'published' ? post : undefined

  useBlogPostMeta(
    publishedPost?.title,
    publishedPost?.excerpt,
    publishedPost?.coverImageUrl,
  )

  const relatedPosts = useMemo(() => {
    if (!publishedPost) return []

    return posts
      .filter(
        (candidate) =>
          candidate.status === 'published' &&
          candidate.slug !== publishedPost.slug &&
          candidate.category === publishedPost.category,
      )
      .sort((a, b) => getPublishedTimestamp(b) - getPublishedTimestamp(a))
      .slice(0, 6)
  }, [posts, publishedPost])

  const sanitizedBody = useMemo(
    () => (publishedPost ? sanitizeBasicHtml(publishedPost.body) : ''),
    [publishedPost],
  )
  const article = useMemo(
    () => prepareArticleHtml(sanitizedBody),
    [sanitizedBody],
  )

  if (isPending && slug) return <ArticleLoadingState />
  if (isError || !publishedPost) return <ArticleNotFound />

  const author = publishedPost.author?.trim() || DEFAULT_AUTHOR
  const authorAvatarUrl = author === DEFAULT_AUTHOR ? doctorPortrait : undefined
  const tags = Array.from(
    new Set((publishedPost.tags ?? []).map((tag) => tag.trim()).filter(Boolean)),
  )
  const faqs = publishedPost.faqs ?? []

  return (
    <Section className="bg-background pt-24 sm:pt-28">
      <Container>
        <Link
          to="/blog"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to blog
        </Link>

        <ArticleHero
          category={publishedPost.category}
          title={publishedPost.title}
          author={author}
          dateText={getDateText(publishedPost)}
          imageUrl={publishedPost.coverImageUrl}
          imageAlt={publishedPost.heroImageAlt || publishedPost.title}
        />

        <div className="mt-8 grid min-w-0 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] lg:gap-12 xl:gap-14">
          <main className="min-w-0" aria-label="Article">
            <p className="mb-8 w-full max-w-[47.5rem] break-words text-xl leading-relaxed text-muted-foreground sm:text-2xl">
              {publishedPost.excerpt}
            </p>

            <ArticleContent sanitizedHtml={article.html} />

            {faqs.length > 0 ? (
              <section className="mt-10 w-full max-w-[47.5rem]" aria-labelledby="article-faq-heading">
                <h2
                  id="article-faq-heading"
                  className="mb-4 font-display text-2xl font-semibold text-foreground sm:text-3xl"
                >
                  Frequently asked questions
                </h2>
                <FaqAccordion faqs={faqs} />
              </section>
            ) : null}

            {tags.length > 0 ? (
              <section className="mt-10 w-full max-w-[47.5rem]" aria-label="Article tags">
                <p className="text-sm font-semibold text-foreground">Tags</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <Badge variant="soft">{tag}</Badge>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="mt-10 w-full max-w-[47.5rem] border-t border-border pt-5">
              <aside className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Educational content only. It is not a substitute for personalized medical advice.
                Talk to your healthcare provider about your own care.
              </aside>
            </div>

            <div className="mt-8 w-full max-w-[47.5rem]">
              <AuthorBox
                name={author}
                bio={
                  author === DEFAULT_AUTHOR
                    ? AUTHOR_BIO
                    : "Contributor to My Diabetes Doc's educational articles."
                }
                imageUrl={authorAvatarUrl}
              />
            </div>
          </main>

          <aside
            aria-label="Article sidebar"
            className="min-w-0 space-y-8 border-t border-border pt-8 lg:sticky lg:top-24 lg:self-start lg:border-0 lg:pt-0"
          >
            <RelatedBlogsList posts={relatedPosts} />
          </aside>
        </div>
      </Container>
    </Section>
  )
}
