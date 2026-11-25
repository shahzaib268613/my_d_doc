import { useId, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LogOut, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react'
import logoUrl from '@/shared/assets/logo.jpg'
import { siteConfig } from '@/shared/config/site'
import { IconButton } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import { adminNavSections, isAdminNavVisible } from '../constants/adminNav'
import { isNavPathActive, isNavSectionActive } from '../utils/navMatch'
import { ResponsiveDrawer } from './ResponsiveDrawer'
import { SidebarMenuItem } from './SidebarMenuItem'
import { SidebarSubmenu } from './SidebarSubmenu'

type Props = {
  collapsed: boolean
  mobileOpen: boolean
  onCollapsedChange: (collapsed: boolean) => void
  onMobileOpenChange: (open: boolean) => void
  onLogout: () => void
}

export function AdminSidebar({
  collapsed,
  mobileOpen,
  onCollapsedChange,
  onMobileOpenChange,
  onLogout,
}: Props) {
  const location = useLocation()
  const pathname = location.pathname
  const brandTitleId = useId()

  const visibleSections = useMemo(
    () =>
      adminNavSections
        .map((section) => ({
          ...section,
          items: section.items.filter(
            (item) => item.id !== 'logout' && isAdminNavVisible(item.id),
          ),
        }))
        .filter((section) => section.items.length > 0),
    [],
  )

  const routeOpenIds = useMemo(() => {
    const open = new Set<string>(['blog'])
    for (const section of visibleSections) {
      for (const item of section.items) {
        if (
          item.children &&
          isNavSectionActive(
            pathname,
            item.children.map((child) => child.to),
          )
        ) {
          open.add(item.id)
        }
      }
    }
    return open
  }, [pathname, visibleSections])

  const [overridesByPath, setOverridesByPath] = useState<
    Record<string, Record<string, boolean>>
  >({})
  const pathOverrides = overridesByPath[pathname] ?? {}

  function isExpanded(id: string) {
    if (id in pathOverrides) return pathOverrides[id] === true
    return routeOpenIds.has(id)
  }

  function toggleExpanded(id: string) {
    setOverridesByPath((current) => {
      const existing = current[pathname] ?? {}
      return {
        ...current,
        [pathname]: { ...existing, [id]: !isExpanded(id) },
      }
    })
  }

  function closeMobile() {
    onMobileOpenChange(false)
  }

  const aside = (
    <aside
      className={cn(
        'flex h-full min-h-0 w-72 flex-col text-white transition-[width] duration-[var(--duration-normal)] ease-[var(--ease-standard)]',
        collapsed && 'lg:w-[4.5rem]',
      )}
      style={{
        background:
          'linear-gradient(180deg, var(--inverse) 0%, var(--admin-sidebar-deep) 48%, var(--admin-sidebar-mid) 100%)',
      }}
    >
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 px-3">
        <Link
          to="/admin"
          onClick={closeMobile}
          className={cn(
            'flex min-w-0 flex-1 items-center gap-2.5 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
            collapsed && 'lg:hidden',
          )}
        >
          <img
            src={logoUrl}
            alt=""
            className="size-9 shrink-0 rounded-lg object-cover ring-1 ring-white/20"
            width={36}
            height={36}
          />
          <span id={brandTitleId} className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-bold text-inverse-foreground">
              {siteConfig.name}
            </span>
            <span className="block truncate text-[0.6875rem] font-medium text-inverse-muted">
              Admin Panel
            </span>
          </span>
        </Link>
        <IconButton
          label="Close menu"
          className="ml-auto text-inverse-foreground hover:bg-white/10 focus-visible:outline-ring lg:hidden"
          onClick={closeMobile}
        >
          <X className="size-5" />
        </IconButton>
        <IconButton
          label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={cn(
            'hidden text-inverse-foreground/90 hover:bg-white/10 focus-visible:outline-ring lg:inline-flex',
            collapsed ? 'mx-auto' : 'ml-auto shrink-0',
          )}
          onClick={() => onCollapsedChange(!collapsed)}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-5" />
          ) : (
            <PanelLeftClose className="size-5" />
          )}
        </IconButton>
      </div>

      <nav
        aria-label="Admin"
        className="scrollbar-admin min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-2 py-4"
      >
        {visibleSections.map((section) => (
          <div key={section.id} className="mb-5">
            <p
              className={cn(
                'mb-2 px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white/45',
                collapsed && 'lg:hidden',
              )}
            >
              {section.label}
            </p>
            {collapsed ? (
              <div
                className="mb-2 hidden border-t border-white/10 lg:block"
                aria-hidden="true"
              />
            ) : null}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const hasChildren = Boolean(item.children?.length)
                const expanded = isExpanded(item.id)
                const childActive = item.children
                  ? isNavSectionActive(
                      pathname,
                      item.children
                        .filter((child) => child.enabled !== false && child.to)
                        .map((child) => child.to),
                    )
                  : false
                const leafActive = item.to ? isNavPathActive(pathname, item.to) : false

                return (
                  <li key={item.id}>
                    {hasChildren && item.children ? (
                      <>
                        <SidebarMenuItem
                          label={item.label}
                          icon={item.icon}
                          collapsed={collapsed}
                          expandable
                          expanded={expanded}
                          active={childActive}
                          onToggle={() => {
                            if (collapsed) {
                              onCollapsedChange(false)
                              setOverridesByPath((current) => ({
                                ...current,
                                [pathname]: {
                                  ...(current[pathname] ?? {}),
                                  [item.id]: true,
                                },
                              }))
                              return
                            }
                            toggleExpanded(item.id)
                          }}
                        />
                        <div className={cn(collapsed && 'lg:hidden')}>
                          <SidebarSubmenu
                            items={item.children}
                            open={expanded}
                            onNavigate={closeMobile}
                          />
                        </div>
                      </>
                    ) : (
                      <SidebarMenuItem
                        label={item.label}
                        icon={item.icon}
                        to={item.to}
                        collapsed={collapsed}
                        active={leafActive}
                        onNavigate={closeMobile}
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 bg-black/25 p-2">
        <SidebarMenuItem
          label="Logout"
          icon={LogOut}
          collapsed={collapsed}
          onClick={onLogout}
        />
      </div>
    </aside>
  )

  return (
    <ResponsiveDrawer
      open={mobileOpen}
      onClose={closeMobile}
      persistentOnDesktop
      side="left"
      labelledBy={brandTitleId}
    >
      {aside}
    </ResponsiveDrawer>
  )
}
