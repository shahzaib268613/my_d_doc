import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logoUrl from '../../../assets/logo.jpg'
import { siteConfig } from '@/shared/config/site'
import { Container, IconButton, ReusableButton } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import { isNavItemEnabled, navItems } from '../../../constants/nav'

type Props = {
  isAdmin?: boolean
  onSignOut?: () => void
}

export function Navbar({ isAdmin = false, onSignOut }: Props) {
  const location = useLocation()
  const [openPath, setOpenPath] = useState<string | null>(null)
  const open = openPath === location.pathname
  const menuId = useId()
  const menuButtonId = useId()
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    document.getElementById(menuButtonId)?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenPath(null)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused.current?.focus()
    }
  }, [open, menuButtonId])

  function subscribeTarget() {
    setOpenPath(null)
    if (location.pathname === '/') {
      document.getElementById('newsletter')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      return
    }
    window.location.assign('/#newsletter')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-surface/95 shadow-sm backdrop-blur-md">
      <Container className="flex min-h-20 items-center justify-between gap-3">
        <Link
          to="/"
          className="flex min-h-[var(--spacing-touch)] items-center gap-2.5 no-underline"
        >
          <img
            src={logoUrl}
            alt={siteConfig.name}
            className="size-12 rounded-full object-cover ring-2 ring-soft sm:size-14"
            width={56}
            height={56}
          />
          <span className="font-display text-lg font-bold tracking-tight text-inverse sm:text-xl">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const enabled = isNavItemEnabled(item, location.pathname)
            const to = enabled ? item.to : '#'
            return (
              <NavLink
                key={item.label}
                to={to}
                end={item.to === '/' || item.to === '/blog'}
                onClick={(event) => {
                  if (!enabled) event.preventDefault()
                }}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3.5 py-2.5 text-[0.9375rem] font-medium no-underline transition-colors duration-[var(--duration-fast)] hover:bg-soft hover:text-inverse',
                    enabled && isActive ? 'bg-soft text-inverse' : 'text-foreground/90',
                    !enabled && 'cursor-default',
                  )
                }
              >
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {isAdmin ? (
            <>
              <ReusableButton href="/admin" variant="ghost" size="sm" className="hidden md:inline-flex">
                Admin
              </ReusableButton>
              {onSignOut ? (
                <ReusableButton
                  variant="ghost"
                  size="sm"
                  className="hidden md:inline-flex"
                  onClick={onSignOut}
                >
                  Sign out
                </ReusableButton>
              ) : null}
            </>
          ) : null}
          <ReusableButton
            variant="navy"
            size="md"
            showIcon
            className="hidden md:inline-flex"
            onClick={subscribeTarget}
          >
            Subscribe to Newsletter
          </ReusableButton>
          <IconButton
            id={menuButtonId}
            label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() =>
              setOpenPath((current) => (current === location.pathname ? null : location.pathname))
            }
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </IconButton>
        </div>
      </Container>

      {open ? (
        <div
          id={menuId}
          className="border-t border-border bg-surface lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <Container className="flex flex-col gap-2 py-4">
            {navItems.map((item) => {
              const enabled = isNavItemEnabled(item, location.pathname)
              const to = enabled ? item.to : '#'
              return (
                <NavLink
                  key={item.label}
                  to={to}
                  end={item.to === '/' || item.to === '/blog'}
                  onClick={(event) => {
                    if (!enabled) event.preventDefault()
                    setOpenPath(null)
                  }}
                  className={cn(
                    'min-h-[var(--spacing-touch)] rounded-md px-3 py-3 text-lg font-medium no-underline hover:bg-soft hover:text-inverse',
                    !enabled && 'cursor-default',
                  )}
                >
                  {item.label}
                </NavLink>
              )
            })}
            <ReusableButton
              variant="navy"
              showIcon
              onClick={subscribeTarget}
              className="mt-2 w-full"
            >
              Subscribe to Newsletter
            </ReusableButton>
            {isAdmin ? (
              <div className="mt-2 flex flex-col gap-2">
                <ReusableButton href="/admin" variant="outline" className="w-full">
                  Admin
                </ReusableButton>
                {onSignOut ? (
                  <ReusableButton variant="ghost" className="w-full" onClick={onSignOut}>
                    Sign out
                  </ReusableButton>
                ) : null}
              </div>
            ) : null}
          </Container>
        </div>
      ) : null}
    </header>
  )
}
