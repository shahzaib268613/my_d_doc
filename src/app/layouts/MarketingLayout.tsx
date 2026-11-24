import { Outlet } from 'react-router-dom'
import { Footer } from '@/features/marketing/components/sections/footer'
import { Navbar } from '@/features/marketing/components/sections/navbar'
import { ScrollToTop } from '@/shared/components/ScrollToTop'

type Props = {
  isAdmin?: boolean
  onSignOut?: () => void
}

export function MarketingLayout({ isAdmin = false, onSignOut }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar isAdmin={isAdmin} onSignOut={onSignOut} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
