import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Bold,
  CloudUpload,
  Code2,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Underline,
  Video,
} from 'lucide-react'
import { AdminButton } from '@/features/admin/components/AdminButton'
import { AdminSelect } from '@/features/admin/components/AdminSelect'
import { FormField } from '@/features/admin/components/FormField'
import { ErrorState } from '@/features/admin/components/ErrorState'
import { LoadingState } from '@/features/admin/components/LoadingState'
import { ADMIN_BASE } from '@/features/admin/constants/adminNav'
import { blogCategories } from '@/shared/config/blogCategories'
import { Input } from '@/shared/components/ui'
import { getApiErrorMessage } from '@/shared/api/axiosInstance'
import { useToast } from '@/shared/hooks/useToast'
import { cn } from '@/shared/utils/cn'
import { blogApi } from '../api/blogApi'
import type { BlogStatus } from '../types/blog'
import { useAdminBlog, useBlogMutations } from '../hooks/useAdminBlogs'
import { useDebounce } from '../hooks/useDebounce'
import { normalizeSlugInput, slugifyTitle } from '../utils/slug'
import {
  BLOG_STATUS_FORM_OPTIONS,
  toFormStatus,
} from '../utils/blogStatusLabels'
import { BlogPageHero } from './BlogPageHero'

type FormState = {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  status: Extract<BlogStatus, 'draft' | 'published'>
}

const emptyForm: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  category: blogCategories[0]?.title ?? '',
  status: 'published',
}

const fieldClass =
  'w-full rounded-lg border border-[#D6E3F3] bg-white px-3.5 py-2.5 text-sm text-[#10264A] outline-none ring-0 focus:border-[#D6E3F3] focus:outline-none focus:ring-0 placeholder:text-[#9AA8BC]'

export type BlogFormPageProps = {
  /** page = full route view; modal = embed in dialog (create) */
  mode?: 'page' | 'modal'
  /** Override route param for edit (optional) */
  blogId?: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function BlogFormPage({
  mode = 'page',
  blogId: blogIdProp,
  onSuccess,
  onCancel,
}: BlogFormPageProps = {}) {
  const { id: routeId } = useParams()
  const id = blogIdProp ?? routeId
  const isEdit = Boolean(id)
  const isModal = mode === 'modal'
  const navigate = useNavigate()
  const { toast } = useToast()
  const blogQuery = useAdminBlog(id)
  const { create, update } = useBlogMutations()
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  /** Once the admin edits the slug, title changes must not overwrite it. */
  const [slugManual, setSlugManual] = useState(false)
  const debouncedSlug = useDebounce(form.slug, 400)

  useEffect(() => {
    if (!isEdit) {
      setForm(emptyForm)
      setErrors({})
      setFormError(null)
      setSlugManual(false)
    }
  }, [isEdit, isModal])

  useEffect(() => {
    if (!blogQuery.data) return
    const blog = blogQuery.data
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      coverImage: blog.coverImage ?? '',
      category: blog.category || blogCategories[0]?.title || '',
      status: toFormStatus(blog.status),
    })
    setSlugManual(true)
  }, [blogQuery.data])

  useEffect(() => {
    const candidate = slugifyTitle(debouncedSlug)
    if (!candidate) return

    let cancelled = false
    void blogApi
      .checkSlugAvailable(candidate, isEdit ? id : undefined)
      .then((result) => {
        if (cancelled) return
        if (!result.available) {
          setErrors((current) => ({
            ...current,
            slug: 'This slug is already in use. Choose a different URL slug.',
          }))
        } else {
          setErrors((current) => {
            if (!current.slug?.includes('already in use')) return current
            const next = { ...current }
            delete next.slug
            return next
          })
        }
      })
      .catch(() => undefined)

    return () => {
      cancelled = true
    }
  }, [debouncedSlug, id, isEdit])

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugManual ? current.slug : slugifyTitle(value),
    }))
    setErrors((current) => {
      const next = { ...current }
      delete next.title
      if (!slugManual) delete next.slug
      return next
    })
  }

  function handleSlugChange(value: string) {
    setSlugManual(true)
    setField('slug', normalizeSlugInput(value))
  }

  function wrapSelection(before: string, after = before) {
    const el = contentRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = form.content.slice(start, end) || 'text'
    const next =
      form.content.slice(0, start) + before + selected + after + form.content.slice(end)
    setField('content', next)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + before.length, start + before.length + selected.length)
    })
  }

  function validate(): boolean {
    const next: Record<string, string> = {}
    if (!form.title.trim()) next.title = 'Title is required'
    const normalizedSlug = slugifyTitle(form.slug)
    if (!normalizedSlug) next.slug = 'URL slug is required'
    if (!form.content.trim()) next.content = 'Content is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleCancel() {
    if (onCancel) {
      onCancel()
      return
    }
    navigate(`${ADMIN_BASE}/blogs`)
  }

  function friendlySaveError(raw: string) {
    if (/entity too large|payload too large|413/i.test(raw)) {
      return 'Cover image is too large for the server. Choose a smaller image and try again.'
    }
    return raw
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    if (!validate()) return
    if (create.isPending || update.isPending) return

    const normalizedSlug = slugifyTitle(form.slug)
    const payload = {
      title: form.title.trim(),
      slug: normalizedSlug,
      excerpt: form.excerpt.trim(),
      content: form.content,
      coverImage: form.coverImage.trim() || null,
      category: form.category.trim(),
      status: form.status,
      scheduledAt: null,
    }

    try {
      const availability = await blogApi.checkSlugAvailable(
        normalizedSlug,
        isEdit ? id : undefined,
      )
      if (!availability.available) {
        setErrors((current) => ({
          ...current,
          slug: 'This slug is already in use. Choose a different URL slug.',
        }))
        return
      }

      if (isEdit && id) {
        await update.mutateAsync({ id, payload })
        toast('Blog updated', 'success')
      } else {
        await create.mutateAsync(payload)
        toast(form.status === 'published' ? 'Blog published' : 'Blog saved', 'success')
      }
      if (onSuccess) {
        onSuccess()
        return
      }
      navigate(`${ADMIN_BASE}/blogs`)
    } catch (error) {
      const message = friendlySaveError(getApiErrorMessage(error, 'Could not save blog'))
      if (/slug already exists/i.test(message)) {
        setErrors((current) => ({
          ...current,
          slug: 'This slug is already in use. Choose a different URL slug.',
        }))
        return
      }
      setFormError(message)
    }
  }

  async function onPickFile(file: File | undefined) {
    if (!file) return
    setFormError(null)
    try {
      const { compressCoverImage } = await import('../utils/compressCoverImage')
      const dataUrl = await compressCoverImage(file)
      setField('coverImage', dataUrl)
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Could not process image',
      )
    }
  }

  if (isEdit && blogQuery.isPending) {
    return <LoadingState label="Loading blog" className="rounded-[16px]" />
  }

  if (isEdit && blogQuery.isError) {
    return (
      <ErrorState
        title="Blog not found"
        description={getApiErrorMessage(blogQuery.error)}
        className="rounded-[16px]"
        action={
          <AdminButton type="button" size="sm" onClick={handleCancel}>
            Back to blogs
          </AdminButton>
        }
      />
    )
  }

  const saving = create.isPending || update.isPending
  const toolbarBtn =
    'inline-flex size-9 items-center justify-center rounded-md text-[#5B6B82] transition-colors hover:bg-[#EAF3FF] hover:text-primary'

  return (
    <div className={cn('min-w-0', isModal ? 'space-y-4' : 'space-y-5')}>
      {!isModal ? (
        <BlogPageHero
          variant={isEdit ? 'edit' : 'add'}
          title={isEdit ? 'Edit Blog' : 'Add New Blog'}
          description={isEdit ? 'Update your blog post.' : 'Create a new blog post.'}
        />
      ) : null}

      <form onSubmit={(event) => void onSubmit(event)}>
        {formError ? (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-[#F5C2C7] bg-[#FFF5F5] px-4 py-3 text-sm font-medium text-[#B42318]"
          >
            {formError}
          </div>
        ) : null}
        <div
          className={cn(
            'grid items-start gap-5',
            isModal
              ? 'lg:grid-cols-[minmax(0,1.2fr)_minmax(15rem,0.8fr)]'
              : 'xl:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.85fr)]',
          )}
        >
          <section
            className={cn(
              'min-w-0 space-y-4 rounded-[14px] border border-[#DCE8F7] bg-white shadow-sm',
              isModal ? 'p-4 sm:p-5' : 'p-5 sm:p-6',
            )}
          >
            <FormField id="title" label="Blog Title" required error={errors.title}>
              <Input
                id="title"
                className="rounded-lg border-[#D6E3F3] outline-none ring-0 focus:border-[#D6E3F3] focus:outline-none focus:ring-0"
                placeholder="Enter blog title..."
                value={form.title}
                onChange={(event) => handleTitleChange(event.target.value)}
              />
            </FormField>

            <FormField
              id="slug"
              label="URL Slug"
              required
              error={errors.slug}
              hint="Editable independently of the title. Spaces become hyphens."
            >
              <Input
                id="slug"
                className="rounded-lg border-[#D6E3F3] font-mono text-[0.8125rem] outline-none ring-0 focus:border-[#D6E3F3] focus:outline-none focus:ring-0"
                placeholder="my-custom-blog-url"
                value={form.slug}
                onChange={(event) => handleSlugChange(event.target.value)}
                onBlur={() => {
                  const cleaned = slugifyTitle(form.slug)
                  if (cleaned !== form.slug) setField('slug', cleaned)
                }}
                autoComplete="off"
                spellCheck={false}
              />
              <p className="mt-1.5 text-xs text-[#5B6B82]">
                Live URL:{' '}
                <span className="font-mono text-[#021b44]">
                  /blog/{slugifyTitle(form.slug) || '…'}
                </span>
              </p>
            </FormField>

            <FormField id="excerpt" label="Short Description">
              <textarea
                id="excerpt"
                rows={2}
                className={cn(fieldClass, 'min-h-0 resize-none')}
                placeholder="Enter a short description..."
                value={form.excerpt}
                onChange={(event) => setField('excerpt', event.target.value)}
              />
            </FormField>

            <FormField id="content" label="Content" required error={errors.content}>
              <div className="overflow-hidden rounded-lg border border-[#D6E3F3]">
                <div className="flex flex-wrap gap-0.5 border-b border-[#D6E3F3] bg-[#F7FAFE] px-2 py-1.5">
                  <button type="button" className={toolbarBtn} title="Bold" onClick={() => wrapSelection('<strong>', '</strong>')}>
                    <Bold className="size-4" />
                  </button>
                  <button type="button" className={toolbarBtn} title="Italic" onClick={() => wrapSelection('<em>', '</em>')}>
                    <Italic className="size-4" />
                  </button>
                  <button type="button" className={toolbarBtn} title="Underline" onClick={() => wrapSelection('<u>', '</u>')}>
                    <Underline className="size-4" />
                  </button>
                  <span className="mx-1 w-px self-stretch bg-[#D6E3F3]" aria-hidden="true" />
                  <button type="button" className={toolbarBtn} title="Bullet list" onClick={() => wrapSelection('<ul><li>', '</li></ul>')}>
                    <List className="size-4" />
                  </button>
                  <button type="button" className={toolbarBtn} title="Numbered list" onClick={() => wrapSelection('<ol><li>', '</li></ol>')}>
                    <ListOrdered className="size-4" />
                  </button>
                  <span className="mx-1 w-px self-stretch bg-[#D6E3F3]" aria-hidden="true" />
                  <button type="button" className={toolbarBtn} title="Link" onClick={() => wrapSelection('<a href="">', '</a>')}>
                    <Link2 className="size-4" />
                  </button>
                  <button type="button" className={toolbarBtn} title="Image" onClick={() => wrapSelection('<img src="" alt="" />', '')}>
                    <ImageIcon className="size-4" />
                  </button>
                  <button type="button" className={toolbarBtn} title="Video embed" onClick={() => wrapSelection('<iframe src=""></iframe>', '')}>
                    <Video className="size-4" />
                  </button>
                  <button type="button" className={toolbarBtn} title="Code" onClick={() => wrapSelection('<code>', '</code>')}>
                    <Code2 className="size-4" />
                  </button>
                </div>
                <textarea
                  id="content"
                  ref={contentRef}
                  rows={isModal ? 4 : 5}
                  className={cn(
                    'w-full resize-none border-0 bg-white px-3.5 py-3 text-sm text-[#10264A] outline-none ring-0 focus:outline-none focus:ring-0 placeholder:text-[#9AA8BC]',
                    isModal ? 'min-h-[100px]' : 'min-h-[120px]',
                  )}
                  placeholder="Write your content here..."
                  value={form.content}
                  onChange={(event) => setField('content', event.target.value)}
                />
              </div>
            </FormField>

            <div className="flex flex-wrap gap-3 pt-1">
              <AdminButton type="submit" size="lg" disabled={saving}>
                {saving ? 'Saving…' : 'Save Blog'}
              </AdminButton>
              <AdminButton
                type="button"
                variant="outline"
                size="lg"
                disabled={saving}
                onClick={handleCancel}
              >
                Cancel
              </AdminButton>
            </div>
          </section>

          <aside className={cn('min-w-0', !isModal && 'xl:sticky xl:top-24 xl:self-start')}>
            <div className="space-y-4 rounded-[14px] border border-[#DCE8F7] bg-white p-5 shadow-sm">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#10264A]">Featured Image</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => void onPickFile(event.target.files?.[0])}
                />
                <div
                  className={cn(
                    'flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#061D46]/25 bg-[#F4F8FF] px-4 text-center',
                    isModal ? 'py-4' : 'py-6',
                  )}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault()
                    void onPickFile(event.dataTransfer.files?.[0])
                  }}
                >
                  <CloudUpload className="size-8 text-[#061D46]" aria-hidden="true" />
                  <p className="text-sm text-[#5B6B82]">Drag & drop an image here or</p>
                  <AdminButton
                    type="button"
                    size="sm"
                    className="mt-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose File
                  </AdminButton>
                </div>
                {form.coverImage ? (
                  <img
                    src={form.coverImage}
                    alt=""
                    className="max-h-40 w-full rounded-xl border border-[#DCE8F7] object-cover"
                  />
                ) : null}
              </div>

              <FormField id="status" label="Status">
                <AdminSelect
                  id="status"
                  fullWidth
                  value={form.status}
                  aria-label="Status"
                  options={[...BLOG_STATUS_FORM_OPTIONS]}
                  onChange={(value) =>
                    setField('status', value as Extract<BlogStatus, 'draft' | 'published'>)
                  }
                />
              </FormField>

              <FormField id="category" label="Category">
                <AdminSelect
                  id="category"
                  fullWidth
                  value={form.category}
                  aria-label="Category"
                  options={blogCategories.map((category) => ({
                    value: category.title,
                    label: category.title,
                  }))}
                  onChange={(value) => setField('category', value)}
                />
              </FormField>
            </div>
          </aside>
        </div>
      </form>
    </div>
  )
}
