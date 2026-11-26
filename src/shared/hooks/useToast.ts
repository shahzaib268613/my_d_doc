import { toast as sonnerToast } from 'sonner'

export type ToastTone = 'info' | 'success' | 'danger'

/**
 * Thin wrapper around sonner. Dismisses any visible toasts before showing a new one.
 */
export function useToast() {
  function toast(message: string, tone: ToastTone = 'info') {
    sonnerToast.dismiss()

    if (tone === 'success') {
      sonnerToast.success(message)
      return
    }
    if (tone === 'danger') {
      sonnerToast.error(message)
      return
    }
    sonnerToast.message(message)
  }

  return { toast }
}
