import { useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { BlogCreateModalProvider } from '@/features/admin/blog'
import { ContentContainer } from './ContentContainer'
import { AdminHeader } from './AdminHeader'
import { AdminProfileModalProvider } from './AdminProfileModalContext'
import { AdminSidebar } from './AdminSidebar'

type Props = {
  children: ReactNode
  onLogout: () => void
}

export function AdminShell({ children, onLogout }: Props) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpenPath, setMobileOpenPath] = useState<string | null>(null)
  const mobileOpen = mobileOpenPath === location.pathname

  return (
    <BlogCreateModalProvider>
      <AdminProfileModalProvider>
        <div className="admin-dashboard flex h-dvh min-h-0 min-w-0 overflow-hidden bg-background text-foreground">
          <AdminSidebar
            collapsed={collapsed}
            mobileOpen={mobileOpen}
            onCollapsedChange={setCollapsed}
            onMobileOpenChange={(open) =>
              setMobileOpenPath(open ? location.pathname : null)
            }
            onLogout={onLogout}
          />
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <AdminHeader
              pathname={location.pathname}
              onMenuClick={() => setMobileOpenPath(location.pathname)}
              onLogout={onLogout}
            />
            <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              <div
                id="admin-main-scroll"
                className="scrollbar-page flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6"
              >
                <ContentContainer>{children}</ContentContainer>
              </div>
            </main>
          </div>
        </div>
      </AdminProfileModalProvider>
    </BlogCreateModalProvider>
  )
}
