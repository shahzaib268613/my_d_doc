import { StatusBadge } from '@/features/admin/components/StatusBadge'
import type { SubscriberStatus } from '../types'

type Props = {
  status: SubscriberStatus
}

export function SubscriberStatusBadge({ status }: Props) {
  return (
    <StatusBadge
      label={status === 'active' ? 'Active' : 'Unsubscribed'}
      tone={status === 'active' ? 'success' : 'neutral'}
      className="capitalize"
    />
  )
}
