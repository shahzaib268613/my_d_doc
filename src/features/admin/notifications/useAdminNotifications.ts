import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getEnv } from '@/shared/config/env'
import { notificationsApi } from './api'

export const notificationQueryKeys = {
  all: ['admin-notifications'] as const,
  list: () => [...notificationQueryKeys.all, 'list'] as const,
}

export function useAdminNotifications(enabled = true) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: notificationQueryKeys.list(),
    queryFn: () => notificationsApi.list(),
    enabled,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })

  useEffect(() => {
    if (!enabled) return

    const url = `${getEnv().VITE_API_URL.replace(/\/$/, '')}/notifications/stream`
    const source = new EventSource(url)

    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as { type?: string }
        if (data.type === 'ping') return
      } catch {
        /* ignore malformed payloads; still refresh */
      }
      void queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all })
    }

    source.onerror = () => {
      // Browser auto-reconnects EventSource; keep last cached data meanwhile.
    }

    return () => {
      source.close()
    }
  }, [enabled, queryClient])

  return query
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => notificationsApi.markRead(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all })
    },
  })
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => notificationsApi.markAllRead(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all })
    },
  })
}

export function useRemoveNotification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => notificationsApi.remove(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all })
    },
  })
}

export function useClearAllNotifications() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => notificationsApi.clearAll(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all })
    },
  })
}
