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
  User,
  Users,
} from 'lucide-react'
import type { AdminNavSection } from '../types/AdminNav'

export const ADMIN_BASE = '/admin'

/**
 * Sidebar is scoped to blog work for now.
 * Only these item ids render (logout stays for sign-out).
 */
export const VISIBLE_ADMIN_NAV_IDS = new Set(['dashboard', 'blog', 'logout'])

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
        label: 'Blog Management',
        icon: Newspaper,
        children: [
          { id: 'blog-all', label: 'All Blogs', to: `${ADMIN_BASE}/blogs` },
          {
            id: 'blog-listings',
            label: 'Blog Listings',
            icon: List,
            enabled: false,
          },
          {
            id: 'blog-categories',
            label: 'Blog Categories',
            icon: Tags,
            enabled: false,
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
        children: [
          { id: 'newsletter-overview', label: 'Overview', to: `${ADMIN_BASE}/newsletter` },
          {
            id: 'newsletter-subscribers',
            label: 'All Subscribers',
            to: `${ADMIN_BASE}/newsletter/subscribers`,
          },
          {
            id: 'newsletter-active',
            label: 'Active Subscribers',
            to: `${ADMIN_BASE}/newsletter/active`,
          },
          {
            id: 'newsletter-campaigns',
            label: 'Campaigns',
            to: `${ADMIN_BASE}/newsletter/campaigns`,
          },
        ],
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
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        children: [
          { id: 'settings-general', label: 'General Settings', to: `${ADMIN_BASE}/settings` },
          {
            id: 'settings-social',
            label: 'Social Links',
            to: `${ADMIN_BASE}/settings/social-links`,
          },
          { id: 'settings-email', label: 'Email Settings', to: `${ADMIN_BASE}/settings/email` },
        ],
      },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    items: [
      {
        id: 'profile',
        label: 'My Profile',
        icon: User,
        to: `${ADMIN_BASE}/profile`,
      },
      {
        id: 'logout',
        label: 'Logout',
        icon: LogOut,
      },
    ],
  },
]
