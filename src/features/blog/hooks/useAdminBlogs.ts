import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { blogApi } from '../api/blogApi'
import type { AdminBlogQuery, BlogWritePayload } from '../types/blog'

export const blogQueryKeys = {
  all: ['blogs'] as const,
  adminLists: () => [...blogQueryKeys.all, 'admin'] as const,
  adminList: (query: AdminBlogQuery) => [...blogQueryKeys.adminLists(), query] as const,
  counts: () => [...blogQueryKeys.all, 'counts'] as const,
  adminDetail: (id: string) => [...blogQueryKeys.all, 'admin', id] as const,
  publicLists: () => [...blogQueryKeys.all, 'public'] as const,
  publicDetail: (slug: string) => [...blogQueryKeys.all, 'public', slug] as const,
}

export function useAdminBlogs(query: AdminBlogQuery) {
  return useQuery({
    queryKey: blogQueryKeys.adminList(query),
    queryFn: () => blogApi.getAdminBlogs(query),
  })
}

export function useBlogCounts() {
  return useQuery({
    queryKey: blogQueryKeys.counts(),
    queryFn: () => blogApi.getBlogCounts(),
  })
}

export function useAdminBlog(id: string | undefined) {
  return useQuery({
    queryKey: blogQueryKeys.adminDetail(id ?? ''),
    queryFn: () => blogApi.getAdminBlog(id!),
    enabled: Boolean(id),
  })
}

export function useBlogMutations() {
  const queryClient = useQueryClient()

  function invalidateAll() {
    void queryClient.invalidateQueries({ queryKey: blogQueryKeys.all })
  }

  const create = useMutation({
    mutationFn: (payload: BlogWritePayload) => blogApi.createBlog(payload),
    onSuccess: invalidateAll,
  })

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: BlogWritePayload }) =>
      blogApi.updateBlog(id, payload),
    onSuccess: invalidateAll,
  })

  const publish = useMutation({
    mutationFn: (id: string) => blogApi.publishBlog(id),
    onSuccess: invalidateAll,
  })

  const unpublish = useMutation({
    mutationFn: (id: string) => blogApi.unpublishBlog(id),
    onSuccess: invalidateAll,
  })

  const remove = useMutation({
    mutationFn: (id: string) => blogApi.deleteBlog(id),
    onSuccess: invalidateAll,
  })

  return { create, update, publish, unpublish, remove }
}
