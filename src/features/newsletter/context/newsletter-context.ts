import { createContext } from 'react'
import type {
  CreateCampaignInput,
  CreateSubscriberInput,
  NewsletterCampaign,
  NewsletterStats,
  NewsletterSubscriber,
  UpdateCampaignInput,
  UpdateSubscriberInput,
} from '../types'

export type NewsletterContextValue = {
  subscribers: NewsletterSubscriber[]
  campaigns: NewsletterCampaign[]
  stats: NewsletterStats
  ready: boolean
  refresh: () => void
  addSubscriber: (input: CreateSubscriberInput) => NewsletterSubscriber
  updateSubscriber: (id: string, input: UpdateSubscriberInput) => NewsletterSubscriber
  setSubscriberStatus: (
    id: string,
    status: NewsletterSubscriber['status'],
  ) => NewsletterSubscriber
  deleteSubscriber: (id: string) => void
  createCampaign: (input: CreateCampaignInput) => NewsletterCampaign
  updateCampaign: (id: string, input: UpdateCampaignInput) => NewsletterCampaign
  deleteCampaign: (id: string) => void
  exportSubscribersCsv: (list?: NewsletterSubscriber[]) => string
}

export const NewsletterContext = createContext<NewsletterContextValue | null>(null)
