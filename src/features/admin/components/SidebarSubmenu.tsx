import type { MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/shared/utils/cn'
import type { AdminNavChild } from '../types/AdminNav'

type Props = {
  items: AdminNavChild[]
  open: boolean
  allowNavigate?: boolean
  onNavigate?: () => void
}

export function SidebarSubmenu({
  items,
  open,
  allowNavigate = true,
  onNavigate,
}: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>, enabled: boolean) {
    if (!allowNavigate || !enabled) {
      event.preventDefault()
      return
    }
    onNavigate?.()
  }

  return (
    <div
      className={cn(
        'grid transition-[grid-template-rows] duration-[var(--duration-normal)] ease-[var(--ease-standard)]',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <ul className="min-h-0 overflow-hidden" role="list">
        {items.map((item) => {
          const enabled = item.enabled !== false && Boolean(item.to)
          const Icon = item.icon

          if (!enabled) {
            return (
              <li key={item.id}>
                <span
                  title="Coming soon"
                  aria-disabled="true"
                  className={cn(
                    'ml-3 mt-0.5 flex cursor-default items-center gap-2.5 rounded-md border-l-2 border-transparent py-2 pl-4 pr-3 text-sm',
                    'text-white/40',
                  )}
                >
                  {Icon ? <Icon className="size-3.5 shrink-0 opacity-70" aria-hidden="true" /> : null}
                  <span className="min-w-0 truncate">{item.label}</span>
                </span>
              </li>
            )
          }

          return (
            <li key={item.id}>
              <NavLink
                to={item.to!}
                end
                onClick={(event) => handleClick(event, enabled)}
                className={({ isActive }) =>
                  cn(
                    'ml-3 mt-0.5 flex items-center gap-2.5 rounded-md border-l-2 py-2 pl-4 pr-3 text-sm transition-colors duration-[var(--duration-fast)]',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                    allowNavigate && isActive
                      ? 'border-transparent bg-white font-semibold text-[#021b44]'
                      : 'border-white/15 text-white/70 hover:bg-white/10 hover:text-white',
                  )
                }
              >
                {Icon ? <Icon className="size-3.5 shrink-0" aria-hidden="true" /> : null}
                <span className="min-w-0 truncate">{item.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
