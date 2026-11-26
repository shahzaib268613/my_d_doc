// import { blogCategories } from '@/shared/config/blogCategories'
import { slugifyTitle } from '../utils/slug'
import type { CategoryWriteInput, ManagedBlogCategory } from '../types/category'

/** v2 drops auto-seeded dummy categories; only admin-created rows are stored. */
const STORAGE_KEY = 'my-ddoc-blog-categories-v2'
// const STORAGE_KEY = 'my-ddoc-blog-categories'
export const CATEGORY_CHANGE_EVENT = 'my-ddoc-blog-categories-changed'

function createId() {
  return `cat_${crypto.randomUUID()}`
}

function emitChange() {
  window.dispatchEvent(new Event(CATEGORY_CHANGE_EVENT))
}

/** Dummy seed from shared config — disabled; categories come from admin CRUD only. */
// function seedFromConfig(): ManagedBlogCategory[] {
//   const now = new Date().toISOString()
//   return blogCategories.map((category) => ({
//     id: createId(),
//     name: category.title,
//     slug: category.slug,
//     description: category.description,
//     status: 'active' as const,
//     createdAt: now,
//     updatedAt: now,
//   }))
// }

function normalizeStored(raw: unknown): ManagedBlogCategory[] {
  if (!Array.isArray(raw)) return []
  const now = new Date().toISOString()
  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const row = item as Partial<ManagedBlogCategory>
      const name = typeof row.name === 'string' ? row.name.trim() : ''
      if (!name) return null
      return {
        id: typeof row.id === 'string' ? row.id : createId(),
        name,
        slug: slugifyTitle(typeof row.slug === 'string' && row.slug ? row.slug : name),
        description: typeof row.description === 'string' ? row.description : '',
        status: row.status === 'inactive' ? ('inactive' as const) : ('active' as const),
        createdAt: typeof row.createdAt === 'string' ? row.createdAt : now,
        updatedAt: typeof row.updatedAt === 'string' ? row.updatedAt : now,
      }
    })
    .filter((item): item is ManagedBlogCategory => Boolean(item))
}

function readAll(): ManagedBlogCategory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return normalizeStored(JSON.parse(raw))
  } catch {
    return []
  }
}

function writeAll(categories: ManagedBlogCategory[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
  emitChange()
}

function uniqueSlug(base: string, categories: ManagedBlogCategory[], excludeId?: string) {
  const root = slugifyTitle(base) || 'category'
  let slug = root
  let n = 2
  while (
    categories.some((item) => item.id !== excludeId && item.slug === slug)
  ) {
    slug = `${root}-${n}`
    n += 1
  }
  return slug
}

export class CategoryStorageError extends Error {
  code: 'INVALID' | 'DUPLICATE' | 'NOT_FOUND'

  constructor(code: CategoryStorageError['code'], message: string) {
    super(message)
    this.code = code
    this.name = 'CategoryStorageError'
  }
}

/** Frontend category store — actual admin-created categories only. */
export const categoryStorage = {
  list(): ManagedBlogCategory[] {
    return readAll().sort((a, b) => a.name.localeCompare(b.name))
  },

  getNames(): string[] {
    return this.list().map((category) => category.name)
  },

  create(input: CategoryWriteInput): ManagedBlogCategory {
    const name = input.name.trim()
    if (!name) throw new CategoryStorageError('INVALID', 'Category name is required')

    const categories = readAll()
    if (categories.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
      throw new CategoryStorageError('DUPLICATE', 'A category with this name already exists')
    }

    const now = new Date().toISOString()
    const category: ManagedBlogCategory = {
      id: createId(),
      name,
      slug: uniqueSlug(name, categories),
      description: (input.description ?? '').trim(),
      status: input.status === 'inactive' ? 'inactive' : 'active',
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
    if (!name) throw new CategoryStorageError('INVALID', 'Category name is required')

    if (
      categories.some(
        (item) => item.id !== id && item.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      throw new CategoryStorageError('DUPLICATE', 'A category with this name already exists')
    }

    const current = categories[index]!
    const updated: ManagedBlogCategory = {
      ...current,
      name,
      slug: uniqueSlug(name, categories, id),
      description: (input.description ?? '').trim(),
      status: input.status === 'inactive' ? 'inactive' : 'active',
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
