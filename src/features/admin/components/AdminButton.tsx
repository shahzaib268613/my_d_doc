import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ReusableButton } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'solid' | 'outline'

type Props = {
  children: ReactNode
  className?: string
  size?: Size
  variant?: Variant
  /** When set, renders an anchor with the same styles */
  to?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

/**
 * Admin CTA wrapper around ReusableButton (navy / outline).
 * Prefer ReusableButton from shared/components/ui for new code.
 */
export function AdminButton({
  children,
  className,
  size = 'md',
  variant = 'solid',
  to,
  type = 'button',
  ...props
}: Props) {
  const sharedVariant = variant === 'solid' ? 'inverse' : 'outline'
  const styles = cn('rounded-lg', className)

  if (to) {
    return (
      <ReusableButton href={to} variant={sharedVariant} size={size} className={styles}>
        {children}
      </ReusableButton>
    )
  }

  return (
    <ReusableButton type={type} variant={sharedVariant} size={size} className={styles} {...props}>
      {children}
    </ReusableButton>
  )
}
