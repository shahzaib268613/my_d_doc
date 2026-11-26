import { axiosInstance } from '@/shared/api/axiosInstance'
import type {
  CreateSubscriberInput,
  NewsletterBatchStatus,
  NewsletterEmailLog,
  NewsletterSubscriber,
  Paginated,
} from '../types'

export type SubscriberListQuery = {
  search?: string
  page?: number
  limit?: number
}

export type SendSinglePayload = {
  subscriberId: string
  subject: string
  html: string
}

export type SendBulkPayload = {
  subscriberIds?: string[]
  sendToAll?: boolean
  subject: string
  html: string
}

export type ImportPayload = {
  subscribers: Array<{
    email: string
    name?: string | null
    status?: 'active' | 'unsubscribed'
    source?: 'homepage' | 'admin' | 'import'
    createdAt?: string
  }>
}

function mapSubscriber(raw: NewsletterSubscriber): NewsletterSubscriber {
  return {
    ...raw,
    createdAt:
      typeof raw.createdAt === 'string'
        ? raw.createdAt
        : new Date(raw.createdAt as unknown as string).toISOString(),
    updatedAt:
      typeof raw.updatedAt === 'string'
        ? raw.updatedAt
        : new Date(raw.updatedAt as unknown as string).toISOString(),
  }
}

export const newsletterApi = {
  async listSubscribers(query: SubscriberListQuery = {}) {
    const { data } = await axiosInstance.get<Paginated<NewsletterSubscriber>>(
      '/newsletter/subscribers',
      { params: query },
    )
    return {
      ...data,
      items: data.items.map(mapSubscriber),
    }
  },

  async createSubscriber(payload: CreateSubscriberInput) {
    const { data } = await axiosInstance.post<NewsletterSubscriber>(
      '/newsletter/subscribers',
      payload,
    )
    return mapSubscriber(data)
  },

  async importSubscribers(payload: ImportPayload) {
    const { data } = await axiosInstance.post<{
      imported: number
      skipped: number
      total: number
    }>('/newsletter/subscribers/import', payload)
    return data
  },

  async deleteSubscriber(id: string) {
    await axiosInstance.delete(`/newsletter/subscribers/${id}`)
  },

  async subscribePublic(payload: { email: string; name?: string | null }) {
    const { data } = await axiosInstance.post<NewsletterSubscriber>(
      '/newsletter/subscribe',
      payload,
    )
    return mapSubscriber(data)
  },

  async sendSingle(payload: SendSinglePayload) {
    const { data } = await axiosInstance.post<{
      batchId: string
      total: number
      sent: number
      failed: number
    }>('/newsletter/send-single', payload)
    return data
  },

  async sendBulk(payload: SendBulkPayload) {
    const { data } = await axiosInstance.post<{ batchId: string; total: number }>(
      '/newsletter/send-bulk',
      payload,
    )
    return data
  },

  async getBatch(batchId: string) {
    const { data } = await axiosInstance.get<NewsletterBatchStatus>(
      `/newsletter/batch/${batchId}`,
    )
    return data
  },

  async listLogs(query: { page?: number; limit?: number } = {}) {
    const { data } = await axiosInstance.get<Paginated<NewsletterEmailLog>>(
      '/newsletter/logs',
      { params: query },
    )
    return {
      ...data,
      items: (data.items ?? []).map((item) => ({
        ...item,
        message: item.message ?? null,
        sendCount: Number(item.sendCount ?? 1),
        createdAt:
          typeof item.createdAt === 'string'
            ? item.createdAt
            : new Date(item.createdAt as unknown as string).toISOString(),
      })),
    }
  },

  async unsubscribe(token: string) {
    const { data } = await axiosInstance.get<{
      ok: boolean
      email: string
      alreadyUnsubscribed: boolean
    }>('/newsletter/unsubscribe', { params: { token } })
    return data
  },
}
