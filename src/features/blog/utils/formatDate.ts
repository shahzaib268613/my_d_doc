export function formatBlogDate(value: string | null | undefined) {
  if (!value) return '—'
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatBlogDateTime(value: string | null | undefined) {
  if (!value) return '—'
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

/** Convert datetime-local value (local wall time) to UTC ISO for the API. */
export function localDateTimeToUtcIso(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date/time')
  }
  return date.toISOString()
}

/** Convert UTC ISO to datetime-local input value in local time. */
export function utcIsoToLocalDateTime(value: string | null | undefined): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function isFutureLocalDateTime(value: string): boolean {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return false
  return date.getTime() > Date.now()
}
