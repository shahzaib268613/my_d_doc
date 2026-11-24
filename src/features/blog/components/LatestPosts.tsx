import { Link } from 'react-router-dom'
import { EmptyState, Spinner } from '@/shared/components/ui'
import { usePublishedPosts } from '../hooks/usePublishedPosts'
import { BlogCard } from './BlogCard'
import { blogCardGridClassName } from './blogGrid'

export function LatestPosts() {
  const { data: posts = [], isPending, isError } = usePublishedPosts(4)

  if (isPending) {
    return (
      <div className="flex justify-center py-12">
        <Spinner label="Loading latest blogs" />
      </div>
    )
  }

  if (isError) {
    return (
      <EmptyState
        title="Could not load blogs"
        description="Check your connection and try again."
      />
    )
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        title="No published blogs yet"
        description="New articles will appear here once they are published."
        action={
          <Link to="/blog" className="text-sm font-semibold text-primary">
            Browse blog
          </Link>
        }
      />
    )
  }

  return (
    <ul className={blogCardGridClassName}>
      {posts.map((post) => (
        <li key={post.id} className="flex h-full min-w-0">
          <BlogCard post={post} size="tall" />
        </li>
      ))}
    </ul>
  )
}
