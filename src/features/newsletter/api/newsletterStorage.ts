import type {
  CreateCampaignInput,
  CreateSubscriberInput,
  NewsletterCampaign,
  NewsletterStats,
  NewsletterSubscriber,
  UpdateCampaignInput,
  UpdateSubscriberInput,
} from '../types'

const SUBSCRIBERS_KEY = 'my-ddoc-newsletter-subscribers'
const CAMPAIGNS_KEY = 'my-ddoc-newsletter-campaigns'
export const NEWSLETTER_CHANGE_EVENT = 'my-ddoc-newsletter-changed'

type StoreShape = {
  subscribers: NewsletterSubscriber[]
  campaigns: NewsletterCampaign[]
}

function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    return parsed as T
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

function emitChange() {
  window.dispatchEvent(new Event(NEWSLETTER_CHANGE_EVENT))
}

function getSubscribers(): NewsletterSubscriber[] {
  return readJson<NewsletterSubscriber[]>(SUBSCRIBERS_KEY, [])
}

function setSubscribers(subscribers: NewsletterSubscriber[]) {
  writeJson(SUBSCRIBERS_KEY, subscribers)
  emitChange()
}

function getCampaigns(): NewsletterCampaign[] {
  return readJson<NewsletterCampaign[]>(CAMPAIGNS_KEY, [])
}

function setCampaigns(campaigns: NewsletterCampaign[]) {
  writeJson(CAMPAIGNS_KEY, campaigns)
  emitChange()
}

export function getNewsletterStats(subscribers = getSubscribers()): NewsletterStats {
  return {
    total: subscribers.length,
    active: subscribers.filter((item) => item.status === 'active').length,
    unsubscribed: subscribers.filter((item) => item.status === 'unsubscribed').length,
  }
}

export function loadNewsletterStore(): StoreShape {
  return {
    subscribers: getSubscribers(),
    campaigns: getCampaigns(),
  }
}

export class NewsletterStorageError extends Error {
  code: 'INVALID_EMAIL' | 'DUPLICATE' | 'NOT_FOUND'

  constructor(code: NewsletterStorageError['code'], message: string) {
    super(message)
    this.code = code
    this.name = 'NewsletterStorageError'
  }
}

/** Central localStorage access — swap these methods for API calls later. */
export const newsletterStorage = {
  getSubscribers,
  getCampaigns,
  getStats: getNewsletterStats,
  load: loadNewsletterStore,

  addSubscriber(input: CreateSubscriberInput): NewsletterSubscriber {
    const email = normalizeEmail(input.email)
    if (!isValidEmail(email)) {
      throw new NewsletterStorageError('INVALID_EMAIL', 'Enter a valid email address')
    }

    const subscribers = getSubscribers()
    if (subscribers.some((item) => item.email === email)) {
      throw new NewsletterStorageError('DUPLICATE', 'This email is already subscribed')
    }

    const now = new Date().toISOString()
    const subscriber: NewsletterSubscriber = {
      id: createId('sub'),
      name: input.name?.trim() || null,
      email,
      status: 'active',
      subscribedAt: now,
      updatedAt: now,
      source: input.source,
    }

    setSubscribers([subscriber, ...subscribers])
    return subscriber
  },

  updateSubscriber(id: string, input: UpdateSubscriberInput): NewsletterSubscriber {
    const subscribers = getSubscribers()
    const index = subscribers.findIndex((item) => item.id === id)
    if (index < 0) {
      throw new NewsletterStorageError('NOT_FOUND', 'Subscriber not found')
    }

    const current = subscribers[index]!
    let nextEmail = current.email
    if (input.email !== undefined) {
      nextEmail = normalizeEmail(input.email)
      if (!isValidEmail(nextEmail)) {
        throw new NewsletterStorageError('INVALID_EMAIL', 'Enter a valid email address')
      }
      if (subscribers.some((item) => item.id !== id && item.email === nextEmail)) {
        throw new NewsletterStorageError('DUPLICATE', 'This email is already subscribed')
      }
    }

    const updated: NewsletterSubscriber = {
      ...current,
      name: input.name !== undefined ? input.name?.trim() || null : current.name,
      email: nextEmail,
      status: input.status ?? current.status,
      updatedAt: new Date().toISOString(),
    }

    const next = [...subscribers]
    next[index] = updated
    setSubscribers(next)
    return updated
  },

  setSubscriberStatus(id: string, status: NewsletterSubscriber['status']) {
    return this.updateSubscriber(id, { status })
  },

  deleteSubscriber(id: string) {
    const subscribers = getSubscribers()
    if (!subscribers.some((item) => item.id === id)) {
      throw new NewsletterStorageError('NOT_FOUND', 'Subscriber not found')
    }
    setSubscribers(subscribers.filter((item) => item.id !== id))
  },

  createCampaign(input: CreateCampaignInput): NewsletterCampaign {
    const now = new Date().toISOString()
    const campaign: NewsletterCampaign = {
      id: createId('camp'),
      title: input.title.trim(),
      subject: input.subject.trim(),
      content: input.content.trim(),
      status: input.status ?? 'draft',
      createdAt: now,
      updatedAt: now,
    }
    setCampaigns([campaign, ...getCampaigns()])
    return campaign
  },

  updateCampaign(id: string, input: UpdateCampaignInput): NewsletterCampaign {
    const campaigns = getCampaigns()
    const index = campaigns.findIndex((item) => item.id === id)
    if (index < 0) {
      throw new NewsletterStorageError('NOT_FOUND', 'Campaign not found')
    }

    const current = campaigns[index]!
    const updated: NewsletterCampaign = {
      ...current,
      title: input.title?.trim() ?? current.title,
      subject: input.subject?.trim() ?? current.subject,
      content: input.content?.trim() ?? current.content,
      status: input.status ?? current.status,
      updatedAt: new Date().toISOString(),
    }

    const next = [...campaigns]
    next[index] = updated
    setCampaigns(next)
    return updated
  },

  deleteCampaign(id: string) {
    const campaigns = getCampaigns()
    if (!campaigns.some((item) => item.id === id)) {
      throw new NewsletterStorageError('NOT_FOUND', 'Campaign not found')
    }
    setCampaigns(campaigns.filter((item) => item.id !== id))
  },

  exportSubscribersCsv(subscribers = getSubscribers()) {
    const header = ['id', 'name', 'email', 'status', 'subscribedAt', 'source']
    const rows = subscribers.map((item) =>
      [
        item.id,
        item.name ?? '',
        item.email,
        item.status,
        item.subscribedAt,
        item.source,
      ]
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(','),
    )
    return [header.join(','), ...rows].join('\n')
  },
}
