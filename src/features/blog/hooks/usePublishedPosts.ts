import { useQuery } from '@tanstack/react-query'
import { blogApi } from '../api/blogApi'
import {
  getDummyPostBySlug,
  getDummyPosts,
  getDummyPostsByCategory,
} from '../data/dummyPosts'
import { blogQueryKeys } from './blogQueryKeys'
import { mapBlogToPost } from '../utils/mapBlogToPost'

/** Latest published blogs; falls back to dummy posts when API is empty/unavailable. */
export function usePublishedPosts(limit = 12) {
  return useQuery({
    queryKey: [...blogQueryKeys.publicLists(), { limit }],
    queryFn: async () => {
      try {
        const page = await blogApi.getPublishedBlogs({ page: 1, limit })
        const posts = page.items.map(mapBlogToPost)
        return posts.length > 0 ? posts : getDummyPosts(limit)
      } catch {
        return getDummyPosts(limit)
      }
    },
  })
}

export function usePublishedPostsByCategory(categoryTitle: string | undefined) {
  return useQuery({
    queryKey: [...blogQueryKeys.publicLists(), { category: categoryTitle ?? 'all', limit: 24 }],
    queryFn: async () => {
      try {
        const page = await blogApi.getPublishedBlogs({
          page: 1,
          limit: 24,
          category: categoryTitle || undefined,
        })
        const posts = page.items.map(mapBlogToPost)
        return posts.length > 0 ? posts : getDummyPostsByCategory(categoryTitle)
      } catch {
        return getDummyPostsByCategory(categoryTitle)
      }
    },
  })
}

/** Full published list for the public blog index (client-side filter/sort/paginate). */
export function usePublishedPostsList() {
  return useQuery({
    queryKey: [...blogQueryKeys.publicLists(), { all: true, limit: 100 }],
    queryFn: async () => {
      try {
        const page = await blogApi.getPublishedBlogs({ page: 1, limit: 100 })
        const posts = page.items.map(mapBlogToPost)
        return posts.length > 0 ? posts : getDummyPosts()
      } catch {
        return getDummyPosts()
      }
    },
  })
}

export function usePublishedPost(slug: string | undefined) {
  return useQuery({
    queryKey: blogQueryKeys.publicDetail(slug ?? ''),
    queryFn: async () => {
      try {
        const blog = await blogApi.getPublishedBySlug(slug!)
        void blogApi.recordView(slug!).catch(() => undefined)
        return mapBlogToPost(blog)
      } catch {
        const dummy = getDummyPostBySlug(slug!)
        if (dummy) return dummy
        throw new Error('Post not found')
      }
    },
    enabled: Boolean(slug),
    retry: false,
  })
}
