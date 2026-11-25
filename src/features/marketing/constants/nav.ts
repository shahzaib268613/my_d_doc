import type { NavItem } from '../types/NavItem'

/** Header destinations stay disabled (hash) for now. */
export const navItems: NavItem[] = [
  { label: 'Home', to: '#' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '#' },
  { label: 'Brand Partnerships', to: '#' },
  { label: 'Speaking Engagements', to: '#' },
]

/** Blog nav — currently disabled in the header. */
export function isBlogNavEnabled(_pathname: string) {
  return false
}

/** Real destinations are navigable; hash placeholders stay inactive. */
export function isNavItemEnabled(item: NavItem, _pathname: string) {
  if (item.to === '#' || !item.to) return false
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
  { label: 'About', to: '/about' },
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
