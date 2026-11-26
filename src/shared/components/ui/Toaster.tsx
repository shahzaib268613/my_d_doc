import { Toaster as SonnerToaster } from 'sonner'

/** App-wide sonner host — top center, navy to match site. */
export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      duration={3500}
      theme="dark"
      toastOptions={{
        classNames: {
          toast:
            '!border !border-white/10 !bg-[var(--inverse)] !text-[var(--inverse-foreground)] !shadow-lg font-sans',
          title: '!text-[var(--inverse-foreground)]',
          description: '!text-[var(--inverse-muted)]',
          success: '!bg-[var(--inverse)] !text-[var(--inverse-foreground)]',
          error: '!bg-[var(--inverse)] !text-[var(--inverse-foreground)]',
          info: '!bg-[var(--inverse)] !text-[var(--inverse-foreground)]',
        },
      }}
    />
  )
}
