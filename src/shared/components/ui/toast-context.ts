import { createContext } from 'react'

export type ToastTone = 'info' | 'success' | 'danger'

export type ToastContextValue = {
  toast: (message: string, tone?: ToastTone) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
