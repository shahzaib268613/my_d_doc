import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ToastContext, type ToastTone } from '@/shared/components/ui/toast-context'
import { cn } from '@/shared/utils/cn'

type ToastItem = {
  id: string
  message: string
  tone: ToastTone
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const toast = useCallback(
    (message: string, tone: ToastTone = 'info') => {
      const id = crypto.randomUUID()
      setItems((current) => [...current, { id, message, tone }])
      window.setTimeout(() => dismiss(id), 4000)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4"
        aria-live="polite"
        aria-relevant="additions"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'pointer-events-auto w-full max-w-sm rounded-md border px-4 py-3 text-sm shadow-md',
              item.tone === 'info' && 'border-border bg-surface text-foreground',
              item.tone === 'success' && 'border-success bg-surface text-foreground',
              item.tone === 'danger' && 'border-danger bg-surface text-foreground',
            )}
            role="status"
          >
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
