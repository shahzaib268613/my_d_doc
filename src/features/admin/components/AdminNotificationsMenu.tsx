import { useEffect, useId, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Bell, CheckCheck, Mail, Trash2, X } from 'lucide-react'
import { IconButton } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import type { AdminNotification } from '../notifications/api'
import {
  useAdminNotifications,
  useClearAllNotifications,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useRemoveNotification,
} from '../notifications/useAdminNotifications'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function AdminNotificationsMenu() {
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useAdminNotifications()
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()
  const removeOne = useRemoveNotification()
  const clearAll = useClearAllNotifications()

  const unreadCount = data?.unreadCount ?? 0
  const items = data?.items ?? []
  const unreadLabel = unreadCount > 99 ? '99+ new' : `${unreadCount} new`

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
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

  function handleDismiss(event: ReactMouseEvent, id: string) {
    event.preventDefault()
    event.stopPropagation()
    removeOne.mutate(id)
  }

  function handleOpenItem(item: AdminNotification) {
    if (!item.read) markRead.mutate(item.id)
    setOpen(false)
  }

  return (
    <div className="relative" ref={rootRef}>
      <IconButton
        label="Notifications"
        className="relative focus-visible:outline-primary"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        <Bell className="size-5 text-foreground" />
        {unreadCount > 0 ? (
          <span className="absolute right-1.5 top-1.5 inline-flex min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[0.625rem] font-bold leading-4 text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        ) : null}
      </IconButton>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 z-50 mt-2 w-[min(26rem,calc(100vw-1.25rem))] overflow-hidden rounded-md border border-border bg-surface shadow-lg"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2.5 sm:px-3.5">
            <div className="flex min-w-0 items-center gap-2">
              <p className="text-sm font-bold text-foreground">Notifications</p>
              {unreadCount > 0 ? (
                <span className="inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-[0.6875rem] font-bold text-white">
                  {unreadLabel}
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[0.75rem] font-semibold text-primary disabled:opacity-40"
                onClick={() => markAllRead.mutate()}
                disabled={markAllRead.isPending || unreadCount === 0}
              >
                <CheckCheck className="size-3.5" aria-hidden="true" />
                Mark all read
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[0.75rem] font-semibold text-danger disabled:opacity-40"
                onClick={() => clearAll.mutate()}
                disabled={clearAll.isPending || items.length === 0}
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
                Clear all
              </button>
            </div>
          </div>

          <div className="scrollbar-admin max-h-[22rem] overflow-y-auto">
            {isLoading ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                Loading…
              </p>
            ) : items.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                No notifications yet
              </p>
            ) : (
              items.map((item) => {
                const body = (
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="size-3.5" aria-hidden="true" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={cn(
                            'text-sm leading-snug text-foreground',
                            !item.read ? 'font-bold' : 'font-semibold',
                          )}
                        >
                          {item.title}
                        </p>
                        <button
                          type="button"
                          aria-label="Dismiss notification"
                          className="inline-flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-soft hover:text-foreground"
                          onClick={(event) => handleDismiss(event, item.id)}
                        >
                          <X className="size-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <p className="mt-0.5 line-clamp-2 text-[0.8125rem] text-muted-foreground">
                        {item.body}
                      </p>

                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        <p className="text-[0.6875rem] text-muted-foreground">
                          {formatDate(item.createdAt)}
                        </p>
                        {!item.read ? (
                          <span className="inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-primary">
                            <CheckCheck className="size-3.5" aria-hidden="true" />
                            Unread
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )

                const rowClass = cn(
                  'block w-full border-b border-border/70 px-3 py-3 text-left last:border-b-0 transition-colors hover:bg-soft/60 sm:px-3.5',
                  !item.read && 'bg-soft/35',
                )

                if (item.href) {
                  return (
                    <Link
                      key={item.id}
                      to={item.href}
                      role="menuitem"
                      className={cn(rowClass, 'no-underline')}
                      onClick={() => handleOpenItem(item)}
                    >
                      {body}
                    </Link>
                  )
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    className={rowClass}
                    onClick={() => {
                      if (!item.read) markRead.mutate(item.id)
                    }}
                  >
                    {body}
                  </button>
                )
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
