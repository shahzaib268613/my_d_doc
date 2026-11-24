import type { NavItem } from '../types/NavItem'

/** Most destinations stay disabled (hash). Home + Blog are live for v1. */
export const navItems: NavItem[] = [
  { label: 'Home', to: '/v1' },
  { label: 'About', to: '#' },
  { label: 'Blog', to: '/blog' },
  { label: 'Brand Partnerships', to: '#' },
  { label: 'Speaking Engagements', to: '#' },
]

/** Blog nav is active on Home v1/v4 and public blog pages — not on v2. */
export function isBlogNavEnabled(pathname: string) {
  return (
    pathname === '/v1' ||
    pathname === '/v3' ||
    pathname === '/home3' ||
    pathname.startsWith('/blog')
  )
}

/** Home is always navigable on marketing pages. */
export function isNavItemEnabled(item: NavItem, pathname: string) {
  if (item.to === '#' || !item.to) return false
  if (item.label === 'Home') return true
  if (item.label === 'Blog') return isBlogNavEnabled(pathname)
  return true
}

export const footerNavItems: NavItem[] = [
  ...navItems,
  { label: 'Contact', to: '#' },
  { label: 'Privacy', to: '#' },
  { label: 'Terms', to: '#' },
]

/** Footer column 2 — Quick Links */
export const footerQuickLinks: NavItem[] = [
  { label: 'Home', to: '/v1' },
  { label: 'About', to: '#' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '#' },
]

/** Footer column 3 — Resources */
export const footerResourceLinks: NavItem[] = [
  { label: 'Brand Partnerships', to: '#' },
  { label: 'Speaking Engagements', to: '#' },
  { label: 'Privacy', to: '#' },
  { label: 'Terms', to: '#' },
]
