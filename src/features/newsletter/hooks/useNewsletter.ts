import { useContext } from 'react'
import { NewsletterContext } from '../context/newsletter-context'

export function useNewsletter() {
  const context = useContext(NewsletterContext)
  if (!context) {
    throw new Error('useNewsletter must be used within NewsletterProvider')
  }
  return context
}
