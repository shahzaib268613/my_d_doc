/** Exact leaf match, plus blog edit screens under All Blogs. */
export function isNavPathActive(pathname: string, to: string) {
  const path = pathname.replace(/\/$/, '') || '/'
  const target = to.replace(/\/$/, '') || '/'

  if (target === '/admin') return path === '/admin'
  if (path === target) return true

  if (target === '/admin/blogs') {
    return (
      path === '/admin/blogs' ||
      /^\/admin\/blogs\/edit(\/|$)/.test(path)
    )
  }

  return false
}

/** True when any child route (or its nested screens) is current. */
export function isNavSectionActive(
  pathname: string,
  childPaths: Array<string | undefined>,
) {
  const path = pathname.replace(/\/$/, '') || '/'

  return childPaths.some((to) => {
    if (!to) return false
    const target = to.replace(/\/$/, '') || '/'
    if (path === target) return true
    if (target === '/admin/blogs' && /^\/admin\/blogs\/edit(\/|$)/.test(path)) return true
    return path.startsWith(`${target}/`)
  })
}
