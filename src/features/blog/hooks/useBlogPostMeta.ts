import { useEffect } from 'react'

type MetaAttribute = 'name' | 'property'

type MetaSnapshot = {
  element: HTMLMetaElement
  created: boolean
  previousContent: string | null
}

function setMetaContent(
  attribute: MetaAttribute,
  key: string,
  content: string,
): MetaSnapshot {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )
  const created = !element

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  const previousContent = element.getAttribute('content')
  element.setAttribute('content', content)
  return { element, created, previousContent }
}

function restoreMeta(snapshot: MetaSnapshot) {
  if (snapshot.created) {
    snapshot.element.remove()
  } else if (snapshot.previousContent == null) {
    snapshot.element.removeAttribute('content')
  } else {
    snapshot.element.setAttribute('content', snapshot.previousContent)
  }
}

export function useBlogPostMeta(
  title?: string,
  description?: string,
  imageUrl?: string | null,
) {
  useEffect(() => {
    if (!title) return

    const previousTitle = document.title
    document.title = `${title} | My Diabetes Doc`

    const snapshots = [
      setMetaContent('name', 'description', description ?? ''),
      setMetaContent('property', 'og:title', `${title} | My Diabetes Doc`),
      setMetaContent('property', 'og:description', description ?? ''),
    ]

    if (imageUrl) {
      snapshots.push(
        setMetaContent(
          'property',
          'og:image',
          new URL(imageUrl, window.location.origin).href,
        ),
      )
    }

    return () => {
      document.title = previousTitle
      snapshots.forEach(restoreMeta)
    }
  }, [description, imageUrl, title])
}
