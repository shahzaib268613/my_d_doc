import type { AdminProfile } from './types'

export function profileInitials(profile: Pick<AdminProfile, 'fullName'> | null) {
  const fromName = profile?.fullName
    ?.split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return fromName || 'A'
}

export function profileDisplayName(profile: Pick<AdminProfile, 'fullName'> | null) {
  const fullName = profile?.fullName?.trim()
  return fullName || 'Admin'
}
