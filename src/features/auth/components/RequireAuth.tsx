import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAdminAuthenticated } from '../session'

export function RequireAuth() {
  const location = useLocation()

  if (!isAdminAuthenticated()) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />
  }

  return <Outlet />
}
