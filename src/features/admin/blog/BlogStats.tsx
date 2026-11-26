import { FileEdit, FileText, Newspaper } from 'lucide-react'
import { StatsCard, StatsCardGrid } from '@/shared/components/ui'
import type { BlogCounts } from '@/features/blog/types/blog'

type Props = {
  counts?: BlogCounts
}

export function BlogStats({ counts }: Props) {
  return (
    <StatsCardGrid>
      <li>
        <StatsCard
          label="Total Blogs"
          value={counts?.all ?? '—'}
          icon={Newspaper}
          tone="primary"
        />
      </li>
      <li>
        <StatsCard
          label="Inactive"
          value={counts?.draft ?? '—'}
          icon={FileEdit}
          tone="muted"
        />
      </li>
      <li>
        <StatsCard
          label="Active"
          value={counts?.published ?? '—'}
          icon={FileText}
          tone="success"
        />
      </li>
    </StatsCardGrid>
  )
}
