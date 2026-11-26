export type SubscriberStatus = 'active' | 'unsubscribed'
export type SubscriberSource = 'homepage' | 'admin' | 'import'

export type NewsletterSubscriber = {
  id: string
  name: string | null
  email: string
  status: SubscriberStatus
  source: SubscriberSource
  createdAt: string
  updatedAt: string
}

export type NewsletterStats = {
  total: number
}

export type CreateSubscriberInput = {
  email: string
  name?: string | null
  source?: SubscriberSource
}

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type NewsletterBatchStatus = {
  id: string
  total: number
  sent: number
  failed: number
  status: string
  subject: string
}

export type NewsletterEmailLog = {
  id: string
  batchId: string | null
  subscriberId: string | null
  recipient: string
  subject: string
  /** HTML body of the latest send for this recipient. */
  message: string | null
  status: 'sent' | 'failed' | 'pending'
  error: string | null
  createdAt: string
  /** Total emails sent to this recipient (grouped log row). */
  sendCount: number
}

export type ComposeMode =
  | { type: 'single'; subscriber: NewsletterSubscriber }
  | { type: 'selected'; subscriberIds: string[]; count: number }
  | { type: 'all'; total: number }
