import { useQuery } from '@tanstack/react-query'
import { blogApi } from '../api/blogApi'
import { blogQueryKeys } from './useAdminBlogs'
import { mapBlogToPost } from '../utils/mapBlogToPost'

/** Latest published blogs (newest first — API orders by publishedAt desc). */
export function usePublishedPosts(limit = 12) {
  return useQuery({
    queryKey: [...blogQueryKeys.publicLists(), { limit }],
    queryFn: async () => {
      const page = await blogApi.getPublishedBlogs({ page: 1, limit })
      return page.items.map(mapBlogToPost)
    },
  })
}

export function usePublishedPostsByCategory(categoryTitle: string | undefined) {
  return useQuery({
    queryKey: [...blogQueryKeys.publicLists(), { category: categoryTitle ?? 'all', limit: 24 }],
    queryFn: async () => {
      const page = await blogApi.getPublishedBlogs({
        page: 1,
        limit: 24,
        category: categoryTitle || undefined,
      })
      return page.items.map(mapBlogToPost)
    },
  })
}

export function usePublishedPost(slug: string | undefined) {
  return useQuery({
    queryKey: blogQueryKeys.publicDetail(slug ?? ''),
    queryFn: async () => {
      const blog = await blogApi.getPublishedBySlug(slug!)
      void blogApi.recordView(slug!).catch(() => undefined)
      return mapBlogToPost(blog)
    },
    enabled: Boolean(slug),
    retry: false,
  })
}
