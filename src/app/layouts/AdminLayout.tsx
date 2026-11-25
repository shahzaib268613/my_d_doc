import { useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AdminShell } from '@/features/admin'
import { clearAdminSession } from '@/features/auth'
import { ScrollToTop } from '@/shared/components/ScrollToTop'

export function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    clearAdminSession()
    navigate('/', { replace: true })
  }, [navigate])

  return (
    <AdminShell onLogout={handleLogout}>
      <ScrollToTop containerSelector="#admin-main-scroll" />
      <Outlet />
    </AdminShell>
  )
}
