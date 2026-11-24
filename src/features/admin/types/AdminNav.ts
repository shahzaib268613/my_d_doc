import type { LucideIcon } from 'lucide-react'

export type AdminNavChild = {
  id: string
  label: string
  /** Omit or leave empty when the item is not navigable yet. */
  to?: string
  icon?: LucideIcon
  /**
   * When false, the item is visible but does not navigate.
   * Defaults to true when `to` is set.
   */
  enabled?: boolean
}

export type AdminNavItem = {
  id: string
  label: string
  icon: LucideIcon
  /** Leaf link when there are no children (omit for actions like Logout). */
  to?: string
  children?: AdminNavChild[]
}

export type AdminNavSection = {
  id: string
  label: string
  items: AdminNavItem[]
}

export type AdminRouteMeta = {
  title: string
  breadcrumbs: Array<{ label: string; to?: string }>
}
