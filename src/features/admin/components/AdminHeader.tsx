import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { ChevronDown, LogOut, Menu, User } from 'lucide-react'
import { siteConfig } from '@/shared/config/site'
import { IconButton } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import { getAdminRouteMeta } from '../constants/adminRoutes'
import { ADMIN_BASE } from '../constants/adminNav'
import {
  profileDisplayName,
  profileInitials,
} from '@/features/admin/profile/profileDisplay'
import { useAdminProfileModal } from './AdminProfileModalContext'
import { AdminNotificationsMenu } from './AdminNotificationsMenu'

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
  const { openProfile, profile } = useAdminProfileModal()
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const meta = useMemo(() => getAdminRouteMeta(pathname), [pathname])
  const subtitle = headerSubtitle(pathname, meta.title)
  const displayName = profileDisplayName(profile)
  const initials = profileInitials(profile)

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
      <div className="flex min-h-14 items-center gap-2 px-3 sm:min-h-16 sm:gap-4 sm:px-6">
        <IconButton
          label="Open navigation"
          className="shrink-0 focus-visible:outline-primary lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="size-5" />
        </IconButton>

        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-sm font-bold tracking-tight text-foreground sm:text-lg">
            {meta.title}
          </h1>
          <p className="mt-0.5 hidden truncate text-xs text-muted-foreground sm:block">
            {subtitle}
          </p>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-2">
          <AdminNotificationsMenu />

          <div className="relative" ref={rootRef}>
            <button
              type="button"
              className={cn(
                'inline-flex min-h-10 max-w-full items-center gap-2 rounded-full border border-border bg-surface px-1.5 py-1 text-sm font-semibold text-foreground transition-colors hover:bg-soft sm:min-h-11 sm:px-2.5 sm:py-1.5',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              )}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              aria-controls={menuId}
              onClick={() =>
                setProfileOpenPath((current) => (current === pathname ? null : pathname))
              }
            >
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-soft text-[0.6875rem] font-bold text-primary">
                {initials || <User className="size-3.5" aria-hidden="true" />}
              </span>
              <span className="hidden max-w-[7rem] truncate sm:inline">{displayName}</span>
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
                  {profile?.fullName?.trim() || siteConfig.doctor.name}
                </p>
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-foreground hover:bg-soft"
                  onClick={() => {
                    setProfileOpenPath(null)
                    openProfile()
                  }}
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
