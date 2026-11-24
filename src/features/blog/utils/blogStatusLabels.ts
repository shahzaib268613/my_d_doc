import type { StatusTone } from '@/features/admin/components/StatusBadge'
import type { BlogStatus } from '../types/blog'

/** UI labels only — API still uses draft | published | scheduled. */
export type BlogStatusUiLabel = 'Active' | 'Inactive'

/** published → Active; draft/scheduled → Inactive (display only). */
export function blogStatusLabel(status: BlogStatus): BlogStatusUiLabel {
  return status === 'published' ? 'Active' : 'Inactive'
}

export function blogStatusTone(status: BlogStatus): StatusTone {
  return status === 'published' ? 'success' : 'neutral'
}

/** Status filter values that still hit the API (no scheduled). */
export const BLOG_STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'published', label: 'Active' },
  { value: 'draft', label: 'Inactive' },
] as const

/** Form select — maps to published / draft payloads. */
export const BLOG_STATUS_FORM_OPTIONS = [
  { value: 'published', label: 'Active' },
  { value: 'draft', label: 'Inactive' },
] as const

/** Normalize legacy scheduled into draft for form controls. */
export function toFormStatus(status: BlogStatus): 'published' | 'draft' {
  return status === 'published' ? 'published' : 'draft'
}
