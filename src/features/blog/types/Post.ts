export type PostStatus = 'draft' | 'published'

export type PostFaq = {
  question: string
  answer: string
}

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
  updatedAt?: string | null
  author?: string
  heroImageAlt?: string
  tags?: string[]
  faqs?: PostFaq[]
  readingTimeMinutes: number
}
