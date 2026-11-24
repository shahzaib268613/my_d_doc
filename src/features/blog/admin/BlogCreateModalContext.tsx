import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { BlogCreateModal } from './BlogCreateModal'

type BlogCreateModalContextValue = {
  openCreateBlog: () => void
  closeCreateBlog: () => void
}

const BlogCreateModalContext = createContext<BlogCreateModalContextValue | null>(null)

export function BlogCreateModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openCreateBlog = useCallback(() => setOpen(true), [])
  const closeCreateBlog = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ openCreateBlog, closeCreateBlog }),
    [openCreateBlog, closeCreateBlog],
  )

  return (
    <BlogCreateModalContext.Provider value={value}>
      {children}
      <BlogCreateModal open={open} onClose={closeCreateBlog} />
    </BlogCreateModalContext.Provider>
  )
}

export function useBlogCreateModal() {
  const ctx = useContext(BlogCreateModalContext)
  if (!ctx) {
    throw new Error('useBlogCreateModal must be used within BlogCreateModalProvider')
  }
  return ctx
}
