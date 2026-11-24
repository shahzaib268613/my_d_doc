import { useCallback, useEffect, useState } from 'react'
import {
  CATEGORY_CHANGE_EVENT,
  categoryStorage,
} from '../api/categoryStorage'
import type { CategoryWriteInput, ManagedBlogCategory } from '../types/category'

export function useBlogCategories() {
  const [categories, setCategories] = useState<ManagedBlogCategory[]>(() =>
    typeof window === 'undefined' ? [] : categoryStorage.list(),
  )

  const refresh = useCallback(() => {
    setCategories(categoryStorage.list())
  }, [])

  useEffect(() => {
    refresh()
    function onChange() {
      refresh()
    }
    window.addEventListener(CATEGORY_CHANGE_EVENT, onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener(CATEGORY_CHANGE_EVENT, onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [refresh])

  const create = useCallback((input: CategoryWriteInput) => {
    const created = categoryStorage.create(input)
    refresh()
    return created
  }, [refresh])

  const update = useCallback((id: string, input: CategoryWriteInput) => {
    const updated = categoryStorage.update(id, input)
    refresh()
    return updated
  }, [refresh])

  const remove = useCallback((id: string) => {
    categoryStorage.remove(id)
    refresh()
  }, [refresh])

  return {
    categories,
    activeNames: categories
      .filter((category) => category.status === 'active')
      .map((category) => category.name),
    refresh,
    create,
    update,
    remove,
  }
}
