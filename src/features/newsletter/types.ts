export type SubscriberStatus = 'active' | 'unsubscribed'
export type SubscriberSource = 'homepage' | 'admin'

export type NewsletterSubscriber = {
  id: string
  name: string | null
  email: string
  status: SubscriberStatus
  subscribedAt: string
  updatedAt: string
  source: SubscriberSource
}

export type CampaignStatus = 'draft' | 'ready' | 'not_sent'

export type NewsletterCampaign = {
  id: string
  title: string
  subject: string
  content: string
  status: CampaignStatus
  createdAt: string
  updatedAt: string
}

export type NewsletterStats = {
  total: number
  active: number
  unsubscribed: number
}

export type CreateSubscriberInput = {
  email: string
  name?: string | null
  source: SubscriberSource
}

export type UpdateSubscriberInput = {
  name?: string | null
  email?: string
  status?: SubscriberStatus
}

export type CreateCampaignInput = {
  title: string
  subject: string
  content: string
  status?: CampaignStatus
}

export type UpdateCampaignInput = {
  title?: string
  subject?: string
  content?: string
  status?: CampaignStatus
}
