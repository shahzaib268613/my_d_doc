import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import { useAdminProfile } from '@/features/admin/profile/useAdminProfile'
import type { AdminProfile } from '@/features/admin/profile/types'

type AdminProfileContextValue = {
  profile: AdminProfile | null
  loading: boolean
  saving: boolean
  error: string | null
  reload: () => void
  saveProfile: (next: Omit<AdminProfile, 'role'>) => Promise<AdminProfile>
}

const AdminProfileModalContext = createContext<AdminProfileContextValue | null>(null)

/** Loads admin profile for header/sidebar/settings. Name kept for existing imports. */
export function AdminProfileModalProvider({ children }: { children: ReactNode }) {
  const { profile, loading, saving, error, saveProfile, reload } = useAdminProfile({
    enabled: true,
  })

  const value = useMemo(
    () => ({
      profile,
      loading,
      saving,
      error,
      reload,
      saveProfile,
    }),
    [profile, loading, saving, error, reload, saveProfile],
  )

  return (
    <AdminProfileModalContext.Provider value={value}>
      {children}
    </AdminProfileModalContext.Provider>
  )
}

export function useAdminProfileModal() {
  const ctx = useContext(AdminProfileModalContext)
  if (!ctx) {
    throw new Error('useAdminProfileModal must be used within AdminProfileModalProvider')
  }
  return ctx
}
