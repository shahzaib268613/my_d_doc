import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
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
