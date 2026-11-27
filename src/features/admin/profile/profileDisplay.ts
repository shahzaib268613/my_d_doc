import type { AdminProfile } from './types'

export function profileInitials(profile: Pick<AdminProfile, 'fullName' | 'username'> | null) {
  const fromName = profile?.fullName
    ?.split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  if (fromName) return fromName

  const username = profile?.username?.trim()
  if (username) return username.slice(0, 2).toUpperCase()
  return 'A'
}

export function profileDisplayName(profile: Pick<AdminProfile, 'username'> | null) {
  const username = profile?.username?.trim()
  return username || 'Admin'
}
