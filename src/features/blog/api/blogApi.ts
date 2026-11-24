import { axiosInstance } from '@/shared/api/axiosInstance'
import type {
  AdminBlogQuery,
  Blog,
  BlogCounts,
  BlogListItem,
  BlogWritePayload,
  PaginatedBlogs,
} from '../types/blog'

export const blogApi = {
  async getAdminBlogs(query: AdminBlogQuery = {}) {
    const { data } = await axiosInstance.get<PaginatedBlogs<Blog>>('/admin/blogs', {
      params: query,
    })
    return data
  },

  async getBlogCounts() {
    const { data } = await axiosInstance.get<BlogCounts>('/admin/blogs/counts')
    return data
  },

  async getAdminBlog(id: string) {
    const { data } = await axiosInstance.get<Blog>(`/admin/blogs/${id}`)
    return data
  },

  async checkSlugAvailable(slug: string, excludeId?: string) {
    const { data } = await axiosInstance.get<{ available: boolean; slug: string }>(
      '/admin/blogs/check-slug',
      { params: { slug, excludeId } },
    )
    return data
  },

  async createBlog(payload: BlogWritePayload) {
    const { data } = await axiosInstance.post<Blog>('/admin/blogs', payload)
    return data
  },

  async updateBlog(id: string, payload: BlogWritePayload) {
    const { data } = await axiosInstance.patch<Blog>(`/admin/blogs/${id}`, payload)
    return data
  },

  async publishBlog(id: string) {
    const { data } = await axiosInstance.post<Blog>(`/admin/blogs/${id}/publish`)
    return data
  },

  async unpublishBlog(id: string) {
    const { data } = await axiosInstance.post<Blog>(`/admin/blogs/${id}/unpublish`)
    return data
  },

  async deleteBlog(id: string) {
    await axiosInstance.delete(`/admin/blogs/${id}`)
  },

  async getPublishedBlogs(params: { page?: number; limit?: number; category?: string } = {}) {
    const { data } = await axiosInstance.get<PaginatedBlogs<BlogListItem>>('/blogs', {
      params,
    })
    return data
  },

  async getPublishedBySlug(slug: string) {
    const { data } = await axiosInstance.get<Blog>(`/blogs/by-slug/${encodeURIComponent(slug)}`)
    return data
  },

  async recordView(slug: string) {
    const { data } = await axiosInstance.post<{ views: number }>(
      `/blogs/by-slug/${encodeURIComponent(slug)}/view`,
    )
    return data
  },
}
