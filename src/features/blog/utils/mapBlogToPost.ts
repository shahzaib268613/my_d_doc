import type { Blog, BlogListItem } from '../types/blog'
import type { Post } from '../types/Post'

export function readingTimeMinutes(html: string) {
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

/** Maps API blog → marketing `Post` shape used by cards / public pages. */
export function mapBlogToPost(blog: BlogListItem | Blog): Post {
  const body = 'content' in blog && typeof blog.content === 'string' ? blog.content : ''
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    body,
    category: blog.category || 'General',
    coverImageUrl: blog.coverImage,
    status: blog.status === 'published' ? 'published' : 'draft',
    publishedAt: blog.publishedAt,
    updatedAt: blog.updatedAt,
    author: blog.author,
    heroImageAlt: blog.heroImageAlt,
    tags: blog.tags ?? [],
    faqs: blog.faqs,
    readingTimeMinutes: body
      ? readingTimeMinutes(body)
      : Math.max(1, Math.ceil((blog.excerpt || '').split(/\s+/).filter(Boolean).length / 200)),
  }
}
