import type { MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

type Props = {
  label: string
  icon: LucideIcon
  to?: string
  collapsed?: boolean
  expandable?: boolean
  expanded?: boolean
  active?: boolean
  /** When false, click does not navigate (link still looks normal). */
  allowNavigate?: boolean
  onToggle?: () => void
  onClick?: () => void
  onNavigate?: () => void
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

export function SidebarMenuItem({
  label,
  icon: Icon,
  to,
  collapsed = false,
  expandable = false,
  expanded = false,
  active = false,
  allowNavigate = true,
  onToggle,
  onClick,
  onNavigate,
}: Props) {
  const baseClass = cn(
    'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-colors duration-[var(--duration-fast)]',
    focusRing,
    active
      ? 'bg-surface text-inverse shadow-sm'
      : 'text-inverse-foreground/85 hover:bg-white/10 hover:text-inverse-foreground',
    collapsed && 'lg:justify-center lg:px-2',
  )

  const labelClass = cn('min-w-0 truncate', collapsed && 'lg:hidden')

  if (onClick && !expandable && !to) {
    return (
      <button
        type="button"
        className={baseClass}
        title={collapsed ? label : undefined}
        onClick={onClick}
      >
        <Icon className="size-5 shrink-0" aria-hidden="true" />
        <span className={labelClass}>{label}</span>
      </button>
    )
  }

  if (expandable) {
    return (
      <button
        type="button"
        className={cn(
          'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-colors duration-[var(--duration-fast)]',
          focusRing,
          expanded || active
            ? 'bg-white/10 text-inverse-foreground'
            : 'text-inverse-foreground/85 hover:bg-white/10 hover:text-inverse-foreground',
          collapsed && 'lg:justify-center lg:px-2',
        )}
        aria-expanded={expanded}
        title={collapsed ? label : undefined}
        onClick={onToggle}
      >
        <Icon className="size-5 shrink-0" aria-hidden="true" />
        <span className={cn(labelClass, 'flex-1 text-left')}>{label}</span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 transition-transform duration-[var(--duration-normal)]',
            collapsed && 'lg:hidden',
            expanded && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>
    )
  }

  if (!to) return null

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!allowNavigate) {
      event.preventDefault()
      return
    }
    onNavigate?.()
  }

  return (
    <NavLink
      to={to}
      end
      title={collapsed ? label : undefined}
      onClick={handleClick}
      className={({ isActive }) =>
        cn(
          'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-colors duration-[var(--duration-fast)]',
          focusRing,
          collapsed && 'lg:justify-center lg:px-2',
          isActive || active
            ? 'bg-surface text-inverse shadow-sm'
            : 'text-inverse-foreground/85 hover:bg-white/10 hover:text-inverse-foreground',
        )
      }
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      <span className={labelClass}>{label}</span>
    </NavLink>
  )
}
