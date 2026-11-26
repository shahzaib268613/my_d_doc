import { axiosInstance } from '@/shared/api/axiosInstance'

export type AdminNotification = {
  id: string
  type: string
  title: string
  body: string
  href: string | null
  read: boolean
  createdAt: string
}

export type NotificationsResponse = {
  items: AdminNotification[]
  unreadCount: number
}

export const notificationsApi = {
  async list() {
    const { data } = await axiosInstance.get<NotificationsResponse>('/notifications')
    return data
  },

  async unreadCount() {
    const { data } = await axiosInstance.get<{ unreadCount: number }>(
      '/notifications/unread-count',
    )
    return data.unreadCount
  },

  async markRead(id: string) {
    const { data } = await axiosInstance.patch<{ ok: boolean; id: string }>(
      `/notifications/${id}/read`,
    )
    return data
  },

  async markAllRead() {
    const { data } = await axiosInstance.patch<{ ok: boolean; updated: number }>(
      '/notifications/read-all',
    )
    return data
  },

  async remove(id: string) {
    const { data } = await axiosInstance.delete<{ ok: boolean; id: string }>(
      `/notifications/${id}`,
    )
    return data
  },

  async clearAll() {
    const { data } = await axiosInstance.delete<{ ok: boolean; deleted: number }>(
      '/notifications/clear-all',
    )
    return data
  },
}
