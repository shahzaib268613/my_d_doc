import type { SubscriberListQuery } from '../api/newsletterApi'

export const newsletterQueryKeys = {
  all: ['newsletter'] as const,
  subscribers: (query: SubscriberListQuery) =>
    [...newsletterQueryKeys.all, 'subscribers', query] as const,
  logs: (query: { page?: number; limit?: number }) =>
    [...newsletterQueryKeys.all, 'logs', query] as const,
  batch: (id: string) => [...newsletterQueryKeys.all, 'batch', id] as const,
}
