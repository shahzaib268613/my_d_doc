import { useEffect } from 'react'
import { brandPartnershipsMeta } from '../constants/content'

/** Sets document title and description meta for Brand Partnerships. */
export function useBrandPartnershipsPageMeta() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = brandPartnershipsMeta.title

    let meta = document.querySelector('meta[name="description"]')
    const created = !meta
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    const previousDescription = meta.getAttribute('content')
    meta.setAttribute('content', brandPartnershipsMeta.description)

    return () => {
      document.title = previousTitle
      if (created && meta) {
        meta.remove()
      } else if (meta) {
        if (previousDescription == null) meta.removeAttribute('content')
        else meta.setAttribute('content', previousDescription)
      }
    }
  }, [])
}
