import {
  FileText,
  FolderTree,
  LayoutDashboard,
  List,
  LogOut,
  Mail,
  Newspaper,
  Settings,
  Tags,
  Users,
} from 'lucide-react'
import type { AdminNavSection } from '../types/AdminNav'

export const ADMIN_BASE = '/admin'

/**
 * Only these top-level item ids render in the sidebar (logout stays for sign-out).
 */
export const VISIBLE_ADMIN_NAV_IDS = new Set([
  'dashboard',
  'blog',
  'newsletter',
  'settings',
  'logout',
])

export function isAdminNavVisible(id: string) {
  return VISIBLE_ADMIN_NAV_IDS.has(id)
}

/** @deprecated Prefer isAdminNavVisible — remaining items are fully hidden. */
export function isAdminNavEnabled(id: string) {
  return isAdminNavVisible(id)
}

export const adminNavSections: AdminNavSection[] = [
  {
    id: 'main',
    label: 'Main Menu',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        to: ADMIN_BASE,
      },
      {
        id: 'blog',
        label: 'Blogs Management',
        icon: Newspaper,
        children: [
          {
            id: 'blog-categories',
            label: 'Blog Categories',
            icon: Tags,
            to: `${ADMIN_BASE}/blogs/categories`,
          },
          {
            id: 'blog-listings',
            label: 'Blog Listings',
            icon: List,
            to: `${ADMIN_BASE}/blogs/listings`,
          },
        ],
      },
      {
        id: 'categories',
        label: 'Categories & Topics',
        icon: FolderTree,
        children: [
          { id: 'categories-all', label: 'All Categories', to: `${ADMIN_BASE}/categories` },
          { id: 'categories-create', label: 'Add Category', to: `${ADMIN_BASE}/categories/create` },
        ],
      },
      {
        id: 'newsletter',
        label: 'Newsletter',
        icon: Mail,
        to: `${ADMIN_BASE}/newsletter`,
      },
      {
        id: 'pages',
        label: 'Pages Management',
        icon: FileText,
        children: [
          { id: 'pages-index', label: 'All Pages', to: `${ADMIN_BASE}/pages` },
          { id: 'pages-home', label: 'Home', to: `${ADMIN_BASE}/pages/home` },
          { id: 'pages-about', label: 'About', to: `${ADMIN_BASE}/pages/about` },
          {
            id: 'pages-partnerships',
            label: 'Brand Partnerships',
            to: `${ADMIN_BASE}/pages/brand-partnerships`,
          },
          {
            id: 'pages-speaking',
            label: 'Speaking Engagements',
            to: `${ADMIN_BASE}/pages/speaking-engagements`,
          },
        ],
      },
    ],
  },
  {
    id: 'system',
    label: 'System',
    items: [
      {
        id: 'users',
        label: 'Admin Users',
        icon: Users,
        children: [
          { id: 'users-all', label: 'All Admins', to: `${ADMIN_BASE}/users` },
          { id: 'users-create', label: 'Add Admin', to: `${ADMIN_BASE}/users/create` },
        ],
      },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    items: [
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        to: `${ADMIN_BASE}/settings`,
      },
      {
        id: 'logout',
        label: 'Logout',
        icon: LogOut,
      },
    ],
  },
]
