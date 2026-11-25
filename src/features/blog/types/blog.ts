export type BlogStatus = 'draft' | 'published' | 'scheduled'

export type Blog = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | null
  category: string
  tags: string[]
  status: BlogStatus
  publishedAt: string | null
  scheduledAt: string | null
  author?: string
  heroImageAlt?: string
  faqs?: { question: string; answer: string }[]
  views: number
  createdAt: string
  updatedAt: string
}

export type BlogListItem = Omit<Blog, 'content'>

export type PaginatedBlogs<T = BlogListItem> = {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type BlogCounts = {
  all: number
  draft: number
  published: number
  scheduled: number
}

export type BlogWritePayload = {
  title: string
  slug?: string
  excerpt?: string
  content?: string
  coverImage?: string | null
  category?: string
  tags?: string[]
  status?: BlogStatus
  scheduledAt?: string | null
}

export type AdminBlogQuery = {
  status?: BlogStatus
  search?: string
  page?: number
  limit?: number
}
