import { FileEdit, FileText, Newspaper } from 'lucide-react'
import { StatCard } from '@/features/admin/components/StatCard'
import type { BlogCounts } from '../types/blog'

type Props = {
  counts?: BlogCounts
}

export function BlogStats({ counts }: Props) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <li>
        <StatCard
          label="Total Blogs"
          value={counts?.all ?? '—'}
          icon={Newspaper}
          className="rounded-[12px] border border-border bg-surface p-4 shadow-sm"
        />
      </li>
      <li>
        <StatCard
          label="Inactive"
          value={counts?.draft ?? '—'}
          icon={FileEdit}
          className="rounded-[12px] border border-border bg-surface p-4 shadow-sm"
        />
      </li>
      <li>
        <StatCard
          label="Active"
          value={counts?.published ?? '—'}
          icon={FileText}
          className="rounded-[12px] border border-border bg-surface p-4 shadow-sm"
        />
      </li>
    </ul>
  )
}
