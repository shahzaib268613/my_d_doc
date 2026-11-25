import { NavLink } from 'react-router-dom'
import { ADMIN_BASE } from '@/features/admin/constants/adminNav'
import { cn } from '@/shared/utils/cn'
import type { BlogCounts } from '@/features/blog/types/blog'

const tabs = [
  { id: 'all', label: 'All Blogs', to: `${ADMIN_BASE}/blogs`, countKey: 'all' as const },
  {
    id: 'inactive',
    label: 'Inactive',
    to: `${ADMIN_BASE}/blogs/drafts`,
    countKey: 'draft' as const,
  },
  {
    id: 'active',
    label: 'Active',
    to: `${ADMIN_BASE}/blogs/published`,
    countKey: 'published' as const,
  },
]

type Props = {
  counts?: BlogCounts
}

export function BlogTabs({ counts }: Props) {
  return (
    <nav
      aria-label="Blog status filters"
      className="flex flex-wrap gap-2 rounded-[12px] border border-border bg-surface p-1.5 shadow-sm"
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.to}
          end={tab.id === 'all'}
          className={({ isActive }) =>
            cn(
              'inline-flex min-h-10 items-center gap-2 rounded-[10px] px-3.5 py-2 text-sm font-semibold no-underline transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-soft hover:text-foreground',
            )
          }
        >
          {tab.label}
          <span
            className={cn(
              'rounded-full px-1.5 py-0.5 text-[0.6875rem] font-bold tabular-nums',
              'bg-soft text-foreground',
            )}
          >
            {counts?.[tab.countKey] ?? 0}
          </span>
        </NavLink>
      ))}
    </nav>
  )
}
