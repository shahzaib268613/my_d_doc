import type { AdminBlogQuery } from '../types/blog'

/** Shared React Query keys for public and admin blog data. */
export const blogQueryKeys = {
  all: ['blogs'] as const,
  adminLists: () => [...blogQueryKeys.all, 'admin'] as const,
  adminList: (query: AdminBlogQuery) => [...blogQueryKeys.adminLists(), query] as const,
  counts: () => [...blogQueryKeys.all, 'counts'] as const,
  adminDetail: (id: string) => [...blogQueryKeys.all, 'admin', id] as const,
  publicLists: () => [...blogQueryKeys.all, 'public'] as const,
  publicDetail: (slug: string) => [...blogQueryKeys.all, 'public', slug] as const,
}
