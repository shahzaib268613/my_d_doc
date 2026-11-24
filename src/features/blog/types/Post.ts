export type PostStatus = 'draft' | 'published'

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  body: string
  category: string
  coverImageUrl: string | null
  status: PostStatus
  publishedAt: string | null
  readingTimeMinutes: number
}
