import axios from 'axios'
import { getEnv } from '@/shared/config/env'

export const axiosInstance = axios.create({
  baseURL: getEnv().VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30_000,
})

export function getApiErrorMessage(error: unknown, fallback = 'Request failed') {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : fallback
  }
  const data = error.response?.data as
    | { message?: string | string[] }
    | undefined
  if (Array.isArray(data?.message)) return data.message.join(', ')
  if (typeof data?.message === 'string') return data.message
  return error.message || fallback
}
