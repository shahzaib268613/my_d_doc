import { useEffect, type ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type Props = {
  open: boolean
  onClose: () => void
  children: ReactNode
  /** Keep panel in layout from `lg` breakpoint up (admin sidebar). */
  persistentOnDesktop?: boolean
  side?: 'left' | 'right'
  className?: string
  labelledBy?: string
}

/**
 * Mobile slide-in drawer with overlay. Optionally stays visible from `lg` up.
 */
export function ResponsiveDrawer({
  open,
  onClose,
  children,
  persistentOnDesktop = false,
  side = 'left',
  className,
  labelledBy,
}: Props) {
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-overlay transition-opacity duration-[var(--duration-normal)]',
          persistentOnDesktop && 'lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
        onClick={onClose}
      />
      <div
        role={persistentOnDesktop ? undefined : 'dialog'}
        aria-modal={persistentOnDesktop ? undefined : open ? true : undefined}
        aria-labelledby={labelledBy}
        className={cn(
          'fixed inset-y-0 z-50 max-w-[100vw] transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)]',
          side === 'left' ? 'left-0' : 'right-0',
          open
            ? 'translate-x-0'
            : side === 'left'
              ? '-translate-x-full'
              : 'translate-x-full',
          persistentOnDesktop && 'lg:static lg:z-auto lg:max-w-none lg:translate-x-0',
          className,
        )}
      >
        {children}
      </div>
    </>
  )
}
