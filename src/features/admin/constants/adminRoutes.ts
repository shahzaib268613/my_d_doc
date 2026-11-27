import type { AdminRouteMeta } from '../types/AdminNav'
import { ADMIN_BASE } from './adminNav'

type AdminRouteDef = {
  path: string
  meta: AdminRouteMeta
}

function crumb(...parts: Array<{ label: string; to?: string }>): AdminRouteMeta['breadcrumbs'] {
  return [{ label: 'Admin', to: ADMIN_BASE }, ...parts]
}

/** Central route table for admin placeholders (relative to /admin parent). */
export const adminRouteDefs: AdminRouteDef[] = [
  {
    path: '',
    meta: { title: 'Dashboard', breadcrumbs: crumb({ label: 'Dashboard' }) },
  },
  {
    path: 'blogs',
    meta: {
      title: 'All Blogs',
      breadcrumbs: crumb(
        { label: 'Blog Management', to: `${ADMIN_BASE}/blogs` },
        { label: 'All Blogs' },
      ),
    },
  },
  {
    path: 'blogs/listings',
    meta: {
      title: 'Blog Listings',
      breadcrumbs: crumb(
        { label: 'Blog Management', to: `${ADMIN_BASE}/blogs` },
        { label: 'Blog Listings' },
      ),
    },
  },
  {
    path: 'blogs/categories',
    meta: {
      title: 'Blog Categories',
      breadcrumbs: crumb(
        { label: 'Blog Management', to: `${ADMIN_BASE}/blogs` },
        { label: 'Blog Categories' },
      ),
    },
  },
  {
    path: 'blogs/edit/:id',
    meta: {
      title: 'Edit Blog',
      breadcrumbs: crumb(
        { label: 'Blog Management', to: `${ADMIN_BASE}/blogs` },
        { label: 'Edit Blog' },
      ),
    },
  },
  {
    path: 'blogs/drafts',
    meta: {
      title: 'Inactive Blogs',
      breadcrumbs: crumb(
        { label: 'Blog Management', to: `${ADMIN_BASE}/blogs` },
        { label: 'Inactive' },
      ),
    },
  },
  {
    path: 'blogs/published',
    meta: {
      title: 'Active Blogs',
      breadcrumbs: crumb(
        { label: 'Blog Management', to: `${ADMIN_BASE}/blogs` },
        { label: 'Active' },
      ),
    },
  },
  {
    path: 'blogs/scheduled',
    meta: {
      title: 'Inactive Blogs',
      breadcrumbs: crumb(
        { label: 'Blog Management', to: `${ADMIN_BASE}/blogs` },
        { label: 'Inactive' },
      ),
    },
  },
  {
    path: 'categories',
    meta: {
      title: 'All Categories',
      breadcrumbs: crumb(
        { label: 'Categories & Topics', to: `${ADMIN_BASE}/categories` },
        { label: 'All Categories' },
      ),
    },
  },
  {
    path: 'categories/create',
    meta: {
      title: 'Add Category',
      breadcrumbs: crumb(
        { label: 'Categories & Topics', to: `${ADMIN_BASE}/categories` },
        { label: 'Add Category' },
      ),
    },
  },
  {
    path: 'newsletter',
    meta: {
      title: 'Newsletter',
      breadcrumbs: crumb({ label: 'Newsletter' }),
    },
  },
  // Legacy newsletter URLs → single Newsletter page
  {
    path: 'newsletter/subscribers',
    meta: {
      title: 'Newsletter',
      breadcrumbs: crumb({ label: 'Newsletter' }),
    },
  },
  {
    path: 'newsletter/active',
    meta: {
      title: 'Newsletter',
      breadcrumbs: crumb({ label: 'Newsletter' }),
    },
  },
  {
    path: 'newsletter/campaigns',
    meta: {
      title: 'Newsletter',
      breadcrumbs: crumb({ label: 'Newsletter' }),
    },
  },
  {
    path: 'newsletter/campaigns/edit/:id',
    meta: {
      title: 'Newsletter',
      breadcrumbs: crumb({ label: 'Newsletter' }),
    },
  },
  {
    path: 'pages',
    meta: {
      title: 'Pages Management',
      breadcrumbs: crumb({ label: 'Pages Management' }),
    },
  },
  {
    path: 'pages/home',
    meta: {
      title: 'Home Page',
      breadcrumbs: crumb(
        { label: 'Pages Management', to: `${ADMIN_BASE}/pages` },
        { label: 'Home' },
      ),
    },
  },
  {
    path: 'pages/about',
    meta: {
      title: 'About Page',
      breadcrumbs: crumb(
        { label: 'Pages Management', to: `${ADMIN_BASE}/pages` },
        { label: 'About' },
      ),
    },
  },
  {
    path: 'pages/brand-partnerships',
    meta: {
      title: 'Brand Partnerships',
      breadcrumbs: crumb(
        { label: 'Pages Management', to: `${ADMIN_BASE}/pages` },
        { label: 'Brand Partnerships' },
      ),
    },
  },
  {
    path: 'pages/speaking-engagements',
    meta: {
      title: 'Speaking Engagements',
      breadcrumbs: crumb(
        { label: 'Pages Management', to: `${ADMIN_BASE}/pages` },
        { label: 'Speaking Engagements' },
      ),
    },
  },
  {
    path: 'users',
    meta: {
      title: 'All Admins',
      breadcrumbs: crumb(
        { label: 'Admin Users', to: `${ADMIN_BASE}/users` },
        { label: 'All Admins' },
      ),
    },
  },
  {
    path: 'users/create',
    meta: {
      title: 'Add Admin',
      breadcrumbs: crumb(
        { label: 'Admin Users', to: `${ADMIN_BASE}/users` },
        { label: 'Add Admin' },
      ),
    },
  },
  {
    path: 'settings',
    meta: {
      title: 'Settings',
      breadcrumbs: [
        { label: 'Dashboard', to: ADMIN_BASE },
        { label: 'Settings' },
      ],
    },
  },
  {
    path: 'settings/social-links',
    meta: {
      title: 'Social Links',
      breadcrumbs: crumb(
        { label: 'Settings', to: `${ADMIN_BASE}/settings` },
        { label: 'Social Links' },
      ),
    },
  },
  {
    path: 'settings/email',
    meta: {
      title: 'Email Settings',
      breadcrumbs: crumb(
        { label: 'Settings', to: `${ADMIN_BASE}/settings` },
        { label: 'Email Settings' },
      ),
    },
  },
]

function matchRoutePath(pattern: string, relative: string) {
  if (!pattern.includes(':')) return pattern === relative
  const patternParts = pattern.split('/')
  const valueParts = relative.split('/')
  if (patternParts.length !== valueParts.length) return false
  return patternParts.every(
    (part, index) => part.startsWith(':') || part === valueParts[index],
  )
}

export function getAdminRouteMeta(pathname: string): AdminRouteMeta {
  const normalized = pathname.replace(/\/$/, '') || ADMIN_BASE
  const relative =
    normalized === ADMIN_BASE ? '' : normalized.replace(`${ADMIN_BASE}/`, '')

  const match = adminRouteDefs.find((def) => matchRoutePath(def.path, relative))
  if (match) return match.meta

  return {
    title: 'Admin',
    breadcrumbs: crumb({ label: 'Admin' }),
  }
}
