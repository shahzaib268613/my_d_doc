import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  newsletterApi,
  type SendBulkPayload,
  type SendSinglePayload,
  type SubscriberListQuery,
} from '../api/newsletterApi'
import type { CreateSubscriberInput } from '../types'
import { newsletterQueryKeys } from './newsletterQueryKeys'

export function useNewsletterSubscribers(query: SubscriberListQuery) {
  return useQuery({
    queryKey: newsletterQueryKeys.subscribers(query),
    queryFn: () => newsletterApi.listSubscribers(query),
  })
}

export function useNewsletterLogs(query: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: newsletterQueryKeys.logs(query),
    queryFn: () => newsletterApi.listLogs(query),
  })
}

export function useNewsletterBatch(batchId: string | null) {
  return useQuery({
    queryKey: newsletterQueryKeys.batch(batchId ?? ''),
    queryFn: () => newsletterApi.getBatch(batchId!),
    enabled: Boolean(batchId),
    refetchInterval: (query) => {
      const status = query.state.data?.status
      if (!status || status === 'completed' || status === 'failed') return false
      return 1000
    },
  })
}

export function useNewsletterMutations() {
  const queryClient = useQueryClient()

  function invalidateAll() {
    void queryClient.invalidateQueries({ queryKey: newsletterQueryKeys.all })
  }

  const create = useMutation({
    mutationFn: (payload: CreateSubscriberInput) =>
      newsletterApi.createSubscriber(payload),
    onSuccess: invalidateAll,
  })

  const remove = useMutation({
    mutationFn: (id: string) => newsletterApi.deleteSubscriber(id),
    onSuccess: invalidateAll,
  })

  const sendSingle = useMutation({
    mutationFn: (payload: SendSinglePayload) => newsletterApi.sendSingle(payload),
    onSuccess: invalidateAll,
  })

  const sendBulk = useMutation({
    mutationFn: (payload: SendBulkPayload) => newsletterApi.sendBulk(payload),
    onSuccess: invalidateAll,
  })

  return { create, remove, sendSingle, sendBulk, invalidateAll }
}
