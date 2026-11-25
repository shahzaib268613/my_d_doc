import { Eye, MoreHorizontal, Pencil, Trash2, Upload, Undo2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ADMIN_BASE } from '@/features/admin/constants/adminNav'
import { cn } from '@/shared/utils/cn'
import type { Blog } from '@/features/blog/types/blog'

type Props = {
  blog: Blog
  busy?: boolean
  onPublish: (blog: Blog) => void
  onUnpublish: (blog: Blog) => void
  onDelete: (blog: Blog) => void
}

const iconBtn =
  'inline-flex size-9 items-center justify-center rounded-[10px] border border-border bg-surface text-foreground shadow-sm no-underline transition-colors hover:bg-background focus-visible:outline-none'

type MenuPos = { top: number; left: number; openUp: boolean }

export function BlogRowActions({
  blog,
  busy = false,
  onPublish,
  onUnpublish,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false)
  const [menuPos, setMenuPos] = useState<MenuPos | null>(null)
  const menuId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const isPublished = blog.status === 'published'

  function updatePosition() {
    const button = buttonRef.current
    if (!button) return
    const rect = button.getBoundingClientRect()
    const menuHeight = 96
    const spaceBelow = window.innerHeight - rect.bottom
    const openUp = spaceBelow < menuHeight + 12 && rect.top > spaceBelow
    const width = 176
    setMenuPos({
      top: openUp ? rect.top - 6 : rect.bottom + 6,
      left: Math.min(rect.right - width, window.innerWidth - width - 8),
      openUp,
    })
  }

  useLayoutEffect(() => {
    if (!open) {
      setMenuPos(null)
      return
    }
    updatePosition()
    function onReposition() {
      updatePosition()
    }
    window.addEventListener('resize', onReposition)
    window.addEventListener('scroll', onReposition, true)
    return () => {
      window.removeEventListener('resize', onReposition)
      window.removeEventListener('scroll', onReposition, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node
      if (buttonRef.current?.contains(target)) return
      if (menuRef.current?.contains(target)) return
      setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const menu =
    open && menuPos
      ? createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            style={{
              position: 'fixed',
              top: menuPos.openUp ? undefined : menuPos.top,
              bottom: menuPos.openUp
                ? window.innerHeight - menuPos.top
                : undefined,
              left: Math.max(8, menuPos.left),
              width: 176,
              zIndex: 90,
            }}
            className="overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-lg"
          >
            {isPublished ? (
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-foreground hover:bg-background"
                onClick={() => {
                  setOpen(false)
                  onUnpublish(blog)
                }}
              >
                <Undo2 className="size-4 text-primary" aria-hidden="true" />
                Unpublish
              </button>
            ) : (
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-foreground hover:bg-background"
                onClick={() => {
                  setOpen(false)
                  onPublish(blog)
                }}
              >
                <Upload className="size-4 text-primary" aria-hidden="true" />
                Publish
              </button>
            )}
            <button
              type="button"
              role="menuitem"
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-danger hover:bg-danger/10',
              )}
              onClick={() => {
                setOpen(false)
                onDelete(blog)
              }}
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Delete
            </button>
          </div>,
          document.body,
        )
      : null

  return (
    <div className="flex flex-nowrap items-center justify-end gap-1.5">
      <Link
        to={`${ADMIN_BASE}/blogs/edit/${blog.id}`}
        className={iconBtn}
        title="Edit"
        aria-label={`Edit ${blog.title}`}
      >
        <Pencil className="size-4" aria-hidden="true" />
      </Link>
      <Link
        to={`/blog/${blog.slug}`}
        className={iconBtn}
        title="View"
        aria-label={`View ${blog.title}`}
        target="_blank"
        rel="noreferrer"
      >
        <Eye className="size-4" aria-hidden="true" />
      </Link>
      <button
        ref={buttonRef}
        type="button"
        className={cn(iconBtn, busy && 'pointer-events-none opacity-50')}
        disabled={busy}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        title="More options"
        onClick={() => setOpen((value) => !value)}
      >
        <MoreHorizontal className="size-4" aria-hidden="true" />
      </button>
      {menu}
    </div>
  )
}
