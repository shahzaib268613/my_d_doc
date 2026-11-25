import type { NavItem } from '../types/NavItem'

/** Header destinations stay disabled (hash) for now. */
export const navItems: NavItem[] = [
  { label: 'Home', to: '#' },
  { label: 'About', to: '#' },
  { label: 'Blog', to: '/blog' },
  { label: 'Brand Partnerships', to: '#' },
  { label: 'Speaking Engagements', to: '#' },
]

/** Blog nav is active on public blog routes. */
export function isBlogNavEnabled(pathname: string) {
  return pathname.startsWith('/blog')
}

/** Real destinations are navigable; hash placeholders stay inactive. */
export function isNavItemEnabled(item: NavItem, pathname: string) {
  if (item.to === '#' || !item.to) return false
  if (item.label === 'Blog') return isBlogNavEnabled(pathname) || item.to === '/blog'
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
