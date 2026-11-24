import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { NEWSLETTER_CHANGE_EVENT, newsletterStorage } from '../api/newsletterStorage'
import type { NewsletterCampaign, NewsletterSubscriber } from '../types'
import { NewsletterContext, type NewsletterContextValue } from './newsletter-context'

function readInitialStore() {
  if (typeof window === 'undefined') {
    return { subscribers: [] as NewsletterSubscriber[], campaigns: [] as NewsletterCampaign[] }
  }
  return newsletterStorage.load()
}

export function NewsletterProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(() => readInitialStore(), [])
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(
    () => initial.subscribers,
  )
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>(() => initial.campaigns)

  const refresh = useCallback(() => {
    const store = newsletterStorage.load()
    setSubscribers(store.subscribers)
    setCampaigns(store.campaigns)
  }, [])

  useEffect(() => {
    function onChange() {
      refresh()
    }

    window.addEventListener(NEWSLETTER_CHANGE_EVENT, onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener(NEWSLETTER_CHANGE_EVENT, onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [refresh])

  const stats = useMemo(() => newsletterStorage.getStats(subscribers), [subscribers])

  const value = useMemo<NewsletterContextValue>(
    () => ({
      subscribers,
      campaigns,
      stats,
      ready: true,
      refresh,
      addSubscriber: (input) => newsletterStorage.addSubscriber(input),
      updateSubscriber: (id, input) => newsletterStorage.updateSubscriber(id, input),
      setSubscriberStatus: (id, status) => newsletterStorage.setSubscriberStatus(id, status),
      deleteSubscriber: (id) => newsletterStorage.deleteSubscriber(id),
      createCampaign: (input) => newsletterStorage.createCampaign(input),
      updateCampaign: (id, input) => newsletterStorage.updateCampaign(id, input),
      deleteCampaign: (id) => newsletterStorage.deleteCampaign(id),
      exportSubscribersCsv: (list) => newsletterStorage.exportSubscribersCsv(list),
    }),
    [subscribers, campaigns, stats, refresh],
  )

  return (
    <NewsletterContext.Provider value={value}>{children}</NewsletterContext.Provider>
  )
}
