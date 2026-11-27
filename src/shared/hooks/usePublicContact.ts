import { useEffect, useState } from 'react'
import {
  contactApi,
  fallbackPublicContact,
  type PublicContact,
} from '@/shared/api/contactApi'

export function usePublicContact() {
  const [contact, setContact] = useState<PublicContact>(fallbackPublicContact)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    void contactApi
      .getPublicContact()
      .then((data) => {
        if (active) setContact(data)
      })
      .catch(() => {
        if (active) setContact(fallbackPublicContact)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { contact, loading }
}
