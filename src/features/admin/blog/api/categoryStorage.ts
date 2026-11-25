import { blogCategories } from '@/shared/config/blogCategories'
import { slugifyTitle } from '../utils/slug'
import type { CategoryWriteInput, ManagedBlogCategory } from '../types/category'

const STORAGE_KEY = 'my-ddoc-blog-categories'
export const CATEGORY_CHANGE_EVENT = 'my-ddoc-blog-categories-changed'

function createId() {
  return `cat_${crypto.randomUUID()}`
}

function emitChange() {
  window.dispatchEvent(new Event(CATEGORY_CHANGE_EVENT))
}

function seedFromConfig(): ManagedBlogCategory[] {
  const now = new Date().toISOString()
  return blogCategories.map((category) => ({
    id: createId(),
    name: category.title,
    slug: category.slug,
    description: category.description,
    status: 'active' as const,
    createdAt: now,
    updatedAt: now,
  }))
}

function readAll(): ManagedBlogCategory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = seedFromConfig()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
      return seeded
    }
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return seedFromConfig()
    return parsed as ManagedBlogCategory[]
  } catch {
    return seedFromConfig()
  }
}

function writeAll(categories: ManagedBlogCategory[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
  emitChange()
}

export class CategoryStorageError extends Error {
  code: 'INVALID' | 'DUPLICATE' | 'NOT_FOUND'

  constructor(code: CategoryStorageError['code'], message: string) {
    super(message)
    this.code = code
    this.name = 'CategoryStorageError'
  }
}

/** Frontend category store — ready to swap for API calls later. */
export const categoryStorage = {
  list(): ManagedBlogCategory[] {
    return readAll().sort((a, b) => a.name.localeCompare(b.name))
  },

  getActiveNames(): string[] {
    return this.list()
      .filter((category) => category.status === 'active')
      .map((category) => category.name)
  },

  create(input: CategoryWriteInput): ManagedBlogCategory {
    const name = input.name.trim()
    const slug = slugifyTitle(input.slug || name)
    if (!name) throw new CategoryStorageError('INVALID', 'Category name is required')
    if (!slug) throw new CategoryStorageError('INVALID', 'Slug is required')

    const categories = readAll()
    if (categories.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
      throw new CategoryStorageError('DUPLICATE', 'A category with this name already exists')
    }
    if (categories.some((item) => item.slug === slug)) {
      throw new CategoryStorageError('DUPLICATE', 'A category with this slug already exists')
    }

    const now = new Date().toISOString()
    const category: ManagedBlogCategory = {
      id: createId(),
      name,
      slug,
      description: input.description.trim(),
      status: input.status,
      createdAt: now,
      updatedAt: now,
    }
    writeAll([category, ...categories])
    return category
  },

  update(id: string, input: CategoryWriteInput): ManagedBlogCategory {
    const categories = readAll()
    const index = categories.findIndex((item) => item.id === id)
    if (index < 0) throw new CategoryStorageError('NOT_FOUND', 'Category not found')

    const name = input.name.trim()
    const slug = slugifyTitle(input.slug || name)
    if (!name) throw new CategoryStorageError('INVALID', 'Category name is required')
    if (!slug) throw new CategoryStorageError('INVALID', 'Slug is required')

    if (
      categories.some(
        (item) => item.id !== id && item.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      throw new CategoryStorageError('DUPLICATE', 'A category with this name already exists')
    }
    if (categories.some((item) => item.id !== id && item.slug === slug)) {
      throw new CategoryStorageError('DUPLICATE', 'A category with this slug already exists')
    }

    const current = categories[index]!
    const updated: ManagedBlogCategory = {
      ...current,
      name,
      slug,
      description: input.description.trim(),
      status: input.status,
      updatedAt: new Date().toISOString(),
    }
    const next = [...categories]
    next[index] = updated
    writeAll(next)
    return updated
  },

  remove(id: string) {
    const categories = readAll()
    if (!categories.some((item) => item.id === id)) {
      throw new CategoryStorageError('NOT_FOUND', 'Category not found')
    }
    writeAll(categories.filter((item) => item.id !== id))
  },
}
