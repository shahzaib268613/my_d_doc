import { Link, useParams } from 'react-router-dom'
import { Container, EmptyState, Section, Spinner } from '@/shared/components/ui'
import { sanitizeBasicHtml } from '../api/sanitizeHtml'
import { usePublishedPost } from '../hooks/usePublishedPosts'

export function BlogPostPage() {
  const { slug } = useParams()
  const { data: post, isPending, isError } = usePublishedPost(slug)

  if (isPending) {
    return (
      <Section>
        <Container className="flex justify-center py-16">
          <Spinner label="Loading article" />
        </Container>
      </Section>
    )
  }

  if (isError || !post) {
    return (
      <Section>
        <Container>
          <EmptyState
            title="Article not found"
            description="That post is not in the diabetes blog library."
            action={
              <Link to="/blog" className="text-sm font-semibold text-primary">
                Back to blog
              </Link>
            }
          />
        </Container>
      </Section>
    )
  }

  return (
    <Section>
      <Container className="max-w-3xl">
        <Link to="/blog" className="text-sm font-semibold text-primary no-underline hover:underline">
          Back to blog
        </Link>
        <p className="mt-6 text-sm text-muted-foreground">
          {post.category} · {post.readingTimeMinutes} min read
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-muted-foreground">{post.excerpt}</p>
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt=""
            className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
            loading="lazy"
          />
        ) : null}
        <div
          className="prose mt-8 max-w-[68ch] text-foreground [&_a]:text-primary [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_h1]:font-display [&_h1]:text-2xl [&_p]:mt-4 [&_p]:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: sanitizeBasicHtml(post.body) }}
        />
      </Container>
    </Section>
  )
}
