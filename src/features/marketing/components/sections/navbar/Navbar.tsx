import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Mail, Menu, X } from 'lucide-react'
import logoUrl from '../../../assets/logo.jpg'
import { siteConfig } from '@/shared/config/site'
import { Button, Container, IconButton } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import { isNavItemEnabled, navItems } from '../../../constants/nav'

type Props = {
  isAdmin?: boolean
  onSignOut?: () => void
}

export function Navbar({ isAdmin = false, onSignOut }: Props) {
  const location = useLocation()
  const isV4 = location.pathname === '/v3'
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
    if (
      location.pathname === '/v1' ||
      location.pathname === '/v2' ||
      location.pathname === '/v3'
    ) {
      document.getElementById('newsletter')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      return
    }
    window.location.assign('/v1#newsletter')
  }

  const homeTo = isV4 ? '/v3' : '/v1'

  const bar = (
    <>
      <Container
        className={cn(
          'flex items-center justify-between gap-3',
          isV4 ? 'min-h-[4.25rem] px-3 sm:min-h-[4.5rem] sm:px-4' : 'min-h-20',
        )}
      >
        <Link
          to={homeTo}
          className="flex min-h-[var(--spacing-touch)] items-center gap-2.5 no-underline"
        >
          <img
            src={logoUrl}
            alt={siteConfig.name}
            className={cn(
              'rounded-full object-cover ring-2 ring-soft',
              isV4 ? 'size-10 sm:size-11' : 'size-12 sm:size-14',
            )}
            width={56}
            height={56}
          />
          <span
            className={cn(
              'font-display font-bold tracking-tight text-inverse',
              isV4 ? 'text-base sm:text-lg' : 'text-lg sm:text-xl',
            )}
          >
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
                end={item.to === '/blog'}
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
              <Button href="/admin" variant="ghost" size="sm" className="hidden md:inline-flex">
                Admin
              </Button>
              {onSignOut ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:inline-flex"
                  onClick={onSignOut}
                >
                  Sign out
                </Button>
              ) : null}
            </>
          ) : null}
          <Button
            variant="primary"
            size="md"
            className="hidden bg-inverse text-white hover:bg-inverse/90 md:inline-flex"
            onClick={subscribeTarget}
          >
            <Mail className="size-4" aria-hidden="true" />
            Subscribe to Newsletter
          </Button>
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
          className={cn(
            'lg:hidden',
            isV4
              ? 'border-t border-border/60 bg-white/80 backdrop-blur-xl'
              : 'border-t border-border bg-surface',
          )}
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
                  end={item.to === '/blog'}
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
            <Button
              onClick={subscribeTarget}
              className="mt-2 w-full bg-inverse text-white hover:bg-inverse/90"
            >
              <Mail className="size-4" aria-hidden="true" />
              Subscribe to Newsletter
            </Button>
            {isAdmin ? (
              <div className="mt-2 flex flex-col gap-2">
                <Button href="/admin" variant="outline" className="w-full">
                  Admin
                </Button>
                {onSignOut ? (
                  <Button variant="ghost" className="w-full" onClick={onSignOut}>
                    Sign out
                  </Button>
                ) : null}
              </div>
            ) : null}
          </Container>
        </div>
      ) : null}
    </>
  )

  if (isV4) {
    return (
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className={cn(
            'pointer-events-auto mx-auto w-full max-w-[85rem] overflow-hidden rounded-2xl',
            'border border-white/55 bg-white/70 shadow-[0_8px_28px_rgba(2,27,68,0.14)]',
            'backdrop-blur-xl backdrop-saturate-150',
          )}
        >
          {bar}
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-surface/95 shadow-sm backdrop-blur-md">
      {bar}
    </header>
  )
}
