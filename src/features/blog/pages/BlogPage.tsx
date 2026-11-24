import { Link, useSearchParams } from 'react-router-dom'
import { getBlogCategoryBySlug } from '@/shared/config/blogCategories'
import { Container, EmptyState, Section, Spinner } from '@/shared/components/ui'
import { BlogCard } from '../components/BlogCard'
import { blogCardGridClassName } from '../components/blogGrid'
import { usePublishedPostsByCategory } from '../hooks/usePublishedPosts'

export function BlogPage() {
  const [searchParams] = useSearchParams()
  const category = getBlogCategoryBySlug(searchParams.get('category'))
  const { data: posts = [], isPending, isError } = usePublishedPostsByCategory(category?.title)

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              {category ? category.title : 'Blog'}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {category
                ? category.description
                : 'Practical diabetes education on nutrition, movement, monitoring, and everyday self-care.'}
            </p>
          </div>
          {category ? (
            <Link
              to="/blog"
              className="shrink-0 self-start text-sm font-semibold text-primary no-underline hover:underline sm:self-auto"
            >
              View all articles
            </Link>
          ) : null}
        </div>

        {isPending ? (
          <div className="mt-8 flex justify-center py-12">
            <Spinner label="Loading articles" />
          </div>
        ) : isError ? (
          <div className="mt-8">
            <EmptyState
              title="Could not load articles"
              description="Check your connection and try again."
            />
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="No articles in this topic yet"
              description="Check back soon, or browse all diabetes articles."
              action={
                <Link to="/blog" className="text-sm font-semibold text-primary">
                  View all articles
                </Link>
              }
            />
          </div>
        ) : (
          <ul className={`mt-8 ${blogCardGridClassName}`}>
            {posts.map((post) => (
              <li key={post.id} className="flex h-full min-w-0">
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  )
}
