import { useCallback, useEffect, useState } from 'react'
import { getProfileErrorMessage, profileApi } from './profileApi'
import type { AdminProfile } from './types'

type Options = {
  enabled?: boolean
}

export function useAdminProfile({ enabled = true }: Options = {}) {
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [loading, setLoading] = useState(enabled)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => {
    setReloadKey((current) => current + 1)
  }, [])

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }

    let active = true
    setLoading(true)
    setError(null)

    void profileApi
      .getProfile()
      .then((data) => {
        if (!active) return
        setProfile({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          username: data.username,
          role: data.role || 'Admin',
        })
      })
      .catch((err: unknown) => {
        if (!active) return
        setProfile(null)
        setError(
          getProfileErrorMessage(err, 'Unable to load your profile right now.'),
        )
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [enabled, reloadKey])

  const saveProfile = useCallback(async (next: Omit<AdminProfile, 'role'>) => {
    setSaving(true)
    setError(null)

    try {
      const saved = await profileApi.updateProfile({
        fullName: next.fullName,
        email: next.email,
        phone: next.phone,
        username: next.username,
      })
      const profile: AdminProfile = {
        fullName: saved.fullName,
        email: saved.email,
        phone: saved.phone,
        username: saved.username,
        role: saved.role || 'Admin',
      }
      setProfile(profile)
      return profile
    } catch (err: unknown) {
      const message = getProfileErrorMessage(
        err,
        'Unable to save your profile. Please try again.',
      )
      setError(message)
      throw new Error(message)
    } finally {
      setSaving(false)
    }
  }, [])

  return {
    profile,
    loading,
    saving,
    error,
    saveProfile,
    reload,
  }
}
