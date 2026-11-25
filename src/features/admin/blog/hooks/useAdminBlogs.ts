import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { blogApi } from '@/features/blog/api/blogApi'
import { blogQueryKeys } from '@/features/blog/hooks/blogQueryKeys'
import type { AdminBlogQuery, BlogWritePayload } from '@/features/blog/types/blog'

export { blogQueryKeys }

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
