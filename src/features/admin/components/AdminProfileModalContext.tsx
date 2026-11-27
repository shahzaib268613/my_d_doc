import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useAdminProfile } from '@/features/admin/profile/useAdminProfile'
import type { AdminProfile } from '@/features/admin/profile/types'
import { AdminProfileModal } from './AdminProfileModal'

type AdminProfileModalContextValue = {
  profile: AdminProfile | null
  loading: boolean
  saving: boolean
  error: string | null
  openProfile: () => void
  closeProfile: () => void
  reload: () => void
  saveProfile: (next: Omit<AdminProfile, 'role'>) => Promise<AdminProfile>
}

const AdminProfileModalContext = createContext<AdminProfileModalContextValue | null>(
  null,
)

export function AdminProfileModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const { profile, loading, saving, error, saveProfile, reload } = useAdminProfile({
    enabled: true,
  })

  const openProfile = useCallback(() => setOpen(true), [])
  const closeProfile = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({
      profile,
      loading,
      saving,
      error,
      openProfile,
      closeProfile,
      reload,
      saveProfile,
    }),
    [
      profile,
      loading,
      saving,
      error,
      openProfile,
      closeProfile,
      reload,
      saveProfile,
    ],
  )

  return (
    <AdminProfileModalContext.Provider value={value}>
      {children}
      <AdminProfileModal
        open={open}
        onClose={closeProfile}
        profile={profile}
        loading={loading}
        saving={saving}
        error={error}
        saveProfile={saveProfile}
        reload={reload}
      />
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
