import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Bell, ChevronDown, LogOut, Menu, User } from 'lucide-react'
import { siteConfig } from '@/shared/config/site'
import { IconButton } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import { getAdminRouteMeta } from '../constants/adminRoutes'
import { ADMIN_BASE } from '../constants/adminNav'

type Props = {
  pathname: string
  onMenuClick: () => void
  onLogout: () => void
}

function headerSubtitle(pathname: string, title: string) {
  const path = pathname.replace(/\/$/, '') || ADMIN_BASE
  if (path === ADMIN_BASE) {
    return 'Overview of blog activity, drafts, and publishing.'
  }
  if (path.startsWith(`${ADMIN_BASE}/blogs`)) {
    return 'Manage diabetes education articles and publishing.'
  }
  return `${title} · ${siteConfig.name} admin`
}

export function AdminHeader({ pathname, onMenuClick, onLogout }: Props) {
  const [profileOpenPath, setProfileOpenPath] = useState<string | null>(null)
  const profileOpen = profileOpenPath === pathname
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const meta = useMemo(() => getAdminRouteMeta(pathname), [pathname])
  const subtitle = headerSubtitle(pathname, meta.title)

  useEffect(() => {
    if (!profileOpen) return

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setProfileOpenPath(null)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setProfileOpenPath(null)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [profileOpen])

  return (
    <header className="sticky top-0 z-30 shrink-0 border-b border-border bg-surface">
      <div className="flex min-h-16 items-center gap-3 px-3 sm:gap-4 sm:px-6">
        <IconButton
          label="Open navigation"
          className="shrink-0 focus-visible:outline-primary lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="size-5" />
        </IconButton>

        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
            {meta.title}
          </h1>
          <p className="mt-0.5 hidden truncate text-xs text-muted-foreground sm:block">
            {subtitle}
          </p>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <IconButton label="Notifications" className="relative focus-visible:outline-primary">
            <Bell className="size-5 text-foreground" />
            <span className="absolute right-1.5 top-1.5 inline-flex min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[0.625rem] font-bold leading-4 text-white">
              4
            </span>
          </IconButton>

          <div className="relative" ref={rootRef}>
            <button
              type="button"
              className={cn(
                'inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-border bg-surface px-2 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-soft sm:px-2.5',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              )}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              aria-controls={menuId}
              onClick={() =>
                setProfileOpenPath((current) => (current === pathname ? null : pathname))
              }
            >
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-soft text-primary">
                <User className="size-3.5" aria-hidden="true" />
              </span>
              <span className="hidden max-w-[7rem] truncate sm:inline">Admin</span>
              <ChevronDown
                className={cn(
                  'hidden size-4 shrink-0 text-muted-foreground transition-transform sm:block',
                  profileOpen && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>

            {profileOpen ? (
              <div
                id={menuId}
                role="menu"
                className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-[12px] border border-border bg-surface py-1 shadow-lg"
              >
                <p className="px-3 py-2 text-xs text-muted-foreground">
                  {siteConfig.doctor.name}
                </p>
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-foreground hover:bg-soft"
                  onClick={() => setProfileOpenPath(null)}
                >
                  <User className="size-4 text-primary" aria-hidden="true" />
                  My Profile
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-foreground hover:bg-soft"
                  onClick={() => {
                    setProfileOpenPath(null)
                    onLogout()
                  }}
                >
                  <LogOut className="size-4 text-primary" aria-hidden="true" />
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
