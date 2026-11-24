import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/shared/utils/cn'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'solid' | 'outline'

type Props = {
  children: ReactNode
  className?: string
  size?: Size
  variant?: Variant
  /** When set, renders a React Router link with the same styles */
  to?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

const sizeClasses: Record<Size, string> = {
  sm: 'min-h-9 gap-1.5 px-4 text-sm',
  md: 'min-h-11 gap-2 px-5 text-sm',
  lg: 'min-h-11 gap-2 px-6 text-sm',
}

const variantClasses: Record<Variant, string> = {
  solid:
    'bg-[#061D46] text-white shadow-sm hover:bg-[#092B5C]',
  outline:
    'border border-[#061D46] bg-transparent text-[#061D46] shadow-none hover:bg-[#EAF3FF]',
}

/**
 * Reusable admin primary CTA (navy brand).
 * Use as `<AdminButton>` or `<AdminButton to="/path">` for navigation.
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
  const styles = cn(
    'inline-flex items-center justify-center rounded-lg font-semibold no-underline transition-colors',
    'disabled:pointer-events-none disabled:opacity-50',
    sizeClasses[size],
    variantClasses[variant],
    className,
  )

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={styles} {...props}>
      {children}
    </button>
  )
}
