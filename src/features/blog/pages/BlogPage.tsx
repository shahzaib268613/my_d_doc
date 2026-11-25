import { useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  blogCategories,
  getBlogCategoryBySlug,
} from '@/shared/config/blogCategories'
import {
  Button,
  Container,
  EmptyState,
  FilterSelect,
  Pagination,
  SearchInput,
  Section,
} from '@/shared/components/ui'
import { BlogCard } from '../components/BlogCard'
import { BlogCardSkeleton } from '../components/BlogCardSkeleton'
import { blogCardGridClassName } from '../components/blogGrid'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { usePublishedPostsList } from '../hooks/usePublishedPosts'
import type { Post } from '../types/Post'

const PAGE_SIZE = 8
const SORT_NEWEST = 'newest'
const SORT_OLDEST = 'oldest'

function categoryToParam(title: string) {
  const known = blogCategories.find((category) => category.title === title)
  return known?.slug ?? title
}

function resolveCategoryTitle(param: string, posts: Post[]) {
  if (!param) return ''
  const fromSlug = getBlogCategoryBySlug(param)
  if (fromSlug) return fromSlug.title
  if (posts.some((post) => post.category === param)) return param
  return param
}

function matchesSearch(post: Post, query: string) {
  if (!query) return true
  const haystack = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase()
  return haystack.includes(query)
}

function sortPosts(posts: Post[], sort: string) {
  const sorted = [...posts]
  sorted.sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return sort === SORT_OLDEST ? aTime - bTime : bTime - aTime
  })
  return sorted
}

export function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: posts = [], isPending, isError } = usePublishedPostsList()

  const qParam = searchParams.get('q') ?? ''
  const categoryParam = searchParams.get('category') ?? ''
  const sortParam =
    searchParams.get('sort') === SORT_OLDEST ? SORT_OLDEST : SORT_NEWEST
  const pageParam = Number.parseInt(searchParams.get('page') ?? '1', 10)
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1

  const debouncedQuery = useDebounce(qParam.trim().toLowerCase(), 300)
  const selectedCategory = resolveCategoryTitle(categoryParam, posts)
  const resultsRef = useRef<HTMLDivElement>(null)
  const skipScrollRef = useRef(true)

  const categories = useMemo(() => {
    const unique = new Set(posts.map((post) => post.category).filter(Boolean))
    return Array.from(unique).sort((a, b) => a.localeCompare(b))
  }, [posts])

  const filteredPosts = useMemo(() => {
    const matched = posts.filter((post) => {
      const categoryOk = !selectedCategory || post.category === selectedCategory
      const searchOk = matchesSearch(post, debouncedQuery)
      return categoryOk && searchOk
    })
    return sortPosts(matched, sortParam)
  }, [posts, selectedCategory, debouncedQuery, sortParam])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageStart = filteredPosts.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE
  const pageEnd = Math.min(pageStart + PAGE_SIZE, filteredPosts.length)
  const pagePosts = filteredPosts.slice(pageStart, pageEnd)

  const filtersActive =
    Boolean(qParam.trim()) || Boolean(categoryParam) || sortParam !== SORT_NEWEST

  function writeParams(next: {
    q?: string
    category?: string
    sort?: string
    page?: number
  }) {
    const params = new URLSearchParams()

    const q = next.q !== undefined ? next.q : qParam
    const category = next.category !== undefined ? next.category : categoryParam
    const sort = next.sort !== undefined ? next.sort : sortParam
    const nextPage = next.page !== undefined ? next.page : page

    if (q.trim()) params.set('q', q)
    if (category) params.set('category', category)
    if (sort && sort !== SORT_NEWEST) params.set('sort', sort)
    if (nextPage > 1) params.set('page', String(nextPage))

    setSearchParams(params, { replace: true })
  }

  function clearFilters() {
    setSearchParams({}, { replace: true })
  }

  useEffect(() => {
    if (page > totalPages) {
      writeParams({ page: totalPages <= 1 ? 1 : totalPages })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only clamp when page exceeds total
  }, [page, totalPages])

  useEffect(() => {
    if (skipScrollRef.current) {
      skipScrollRef.current = false
      return
    }
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [safePage])

  return (
    <Section>
      <Container>
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Blog</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Practical diabetes education on nutrition, movement, monitoring, and everyday self-care.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-4">
          <SearchInput
            className="w-full md:max-w-md lg:max-w-lg"
            value={qParam}
            onChange={(value) => writeParams({ q: value, page: 1 })}
            placeholder="Search articles"
            ariaLabel="Search articles"
          />
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end md:w-auto md:justify-end">
            <div className="grid grid-cols-2 gap-3 sm:flex sm:items-end">
              <FilterSelect
                className="sm:w-44 lg:w-52"
                label="Category"
                value={selectedCategory}
                onChange={(value) =>
                  writeParams({
                    category: value ? categoryToParam(value) : '',
                    page: 1,
                  })
                }
                options={[
                  { value: '', label: 'All categories' },
                  ...categories.map((category) => ({
                    value: category,
                    label: category,
                  })),
                ]}
              />
              <FilterSelect
                className="sm:w-40 lg:w-44"
                label="Sort"
                value={sortParam}
                onChange={(value) => writeParams({ sort: value, page: 1 })}
                options={[
                  { value: SORT_NEWEST, label: 'Newest first' },
                  { value: SORT_OLDEST, label: 'Oldest first' },
                ]}
              />
            </div>
            {filtersActive ? (
              <Button
                type="button"
                variant="ghost"
                className="shrink-0 self-start px-2 text-sm font-semibold text-primary sm:self-end"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            ) : null}
          </div>
        </div>

        <div ref={resultsRef} className="mt-8 scroll-mt-28">
          {isPending ? (
            <>
              <div className="h-5 w-48 animate-pulse rounded bg-soft" aria-hidden="true" />
              <ul
                className={`mt-4 ${blogCardGridClassName}`}
                aria-busy="true"
                aria-label="Loading articles"
              >
                {Array.from({ length: PAGE_SIZE }, (_, index) => (
                  <li key={index} className="flex h-full min-w-0">
                    <BlogCardSkeleton />
                  </li>
                ))}
              </ul>
            </>
          ) : isError ? (
            <EmptyState
              title="Could not load articles"
              description="Check your connection and try again."
            />
          ) : filteredPosts.length === 0 ? (
            <EmptyState
              title="No articles found"
              description="Try a different search or clear your filters."
              action={
                <Button type="button" variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              }
            />
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Showing {pageStart + 1}–{pageEnd} of {filteredPosts.length}{' '}
                {filteredPosts.length === 1 ? 'article' : 'articles'}
              </p>
              <ul className={`mt-4 ${blogCardGridClassName}`}>
                {pagePosts.map((post) => (
                  <li key={post.id} className="flex h-full min-w-0">
                    <BlogCard post={post} />
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Pagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  onPageChange={(nextPage) => writeParams({ page: nextPage })}
                />
              </div>
            </>
          )}
        </div>
      </Container>
    </Section>
  )
}
