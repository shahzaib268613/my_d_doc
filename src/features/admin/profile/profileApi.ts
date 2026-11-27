import { axiosInstance, getApiErrorMessage } from '@/shared/api/axiosInstance'
import type { AdminProfile } from './types'

export type AdminProfilePayload = {
  fullName: string
  email: string
  phone: string
  contactEmail: string
}

export type AdminProfileResponse = AdminProfile & {
  updatedAt?: string
}

export const profileApi = {
  async getProfile() {
    const { data } = await axiosInstance.get<AdminProfileResponse>('/admin/profile')
    return data
  },

  async updateProfile(payload: AdminProfilePayload) {
    const { data } = await axiosInstance.patch<AdminProfileResponse>(
      '/admin/profile',
      payload,
    )
    return data
  },
}

export function getProfileErrorMessage(error: unknown, fallback: string) {
  return getApiErrorMessage(error, fallback)
}
