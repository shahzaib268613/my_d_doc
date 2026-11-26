import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ReusableButton } from '@/shared/components/ui'

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
 * Thin admin alias for ReusableButton (navy / outline).
 * Do not add local radius/color overrides here — change ReusableButton once.
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
  const sharedVariant = variant === 'solid' ? 'navy' : 'outline'

  if (to) {
    return (
      <ReusableButton href={to} variant={sharedVariant} size={size} className={className}>
        {children}
      </ReusableButton>
    )
  }

  return (
    <ReusableButton
      type={type}
      variant={sharedVariant}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </ReusableButton>
  )
}
