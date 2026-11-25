export type ArticleHeading = {
  id: string
  title: string
}

function headingSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function prepareArticleHtml(sanitizedHtml: string) {
  const document = new DOMParser().parseFromString(sanitizedHtml, 'text/html')

  document.body.querySelectorAll('h1').forEach((heading) => {
    const replacement = document.createElement('h2')
    replacement.innerHTML = heading.innerHTML
    heading.replaceWith(replacement)
  })

  const usedIds = new Set<string>()
  const headings: ArticleHeading[] = []

  document.body.querySelectorAll('h2').forEach((heading) => {
    const title = heading.textContent?.trim() ?? ''
    const baseId = `article-${headingSlug(title) || 'section'}`
    let id = baseId
    let suffix = 2

    while (usedIds.has(id)) {
      id = `${baseId}-${suffix}`
      suffix += 1
    }

    usedIds.add(id)
    heading.id = id
    headings.push({ id, title })
  })

  document.body.querySelectorAll('table').forEach((table) => {
    const wrapper = document.createElement('div')
    wrapper.setAttribute(
      'class',
      'my-8 max-w-full overflow-x-auto rounded-lg border border-border',
    )
    wrapper.setAttribute('role', 'region')
    wrapper.setAttribute('aria-label', 'Scrollable table')
    table.parentNode?.insertBefore(wrapper, table)
    wrapper.appendChild(table)
  })

  return { html: document.body.innerHTML, headings }
}
