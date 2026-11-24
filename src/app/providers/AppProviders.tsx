import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { NewsletterProvider } from '@/features/newsletter'
import { ToastProvider } from '@/shared/components/ui/Toast'

type Props = {
  children: ReactNode
}

export function AppProviders({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <NewsletterProvider>
        <ToastProvider>{children}</ToastProvider>
      </NewsletterProvider>
    </QueryClientProvider>
  )
}
