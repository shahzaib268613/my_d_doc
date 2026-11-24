import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import {
  NewsletterStorageError,
  newsletterStorage,
} from '../api/newsletterStorage'
import type { CreateSubscriberInput, NewsletterSubscriber } from '../types'

type NewsletterContextValue = {
  addSubscriber: (input: CreateSubscriberInput) => NewsletterSubscriber
}

const NewsletterContext = createContext<NewsletterContextValue | null>(null)

export function NewsletterProvider({ children }: { children: ReactNode }) {
  const addSubscriber = useCallback((input: CreateSubscriberInput) => {
    return newsletterStorage.addSubscriber(input)
  }, [])

  const value = useMemo(() => ({ addSubscriber }), [addSubscriber])

  return (
    <NewsletterContext.Provider value={value}>
      {children}
    </NewsletterContext.Provider>
  )
}

export function useNewsletter() {
  const context = useContext(NewsletterContext)
  if (!context) {
    throw new Error('useNewsletter must be used within NewsletterProvider')
  }
  return context
}

export { NewsletterStorageError }
