import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Mail } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

type Variant = 'primary' | 'outline' | 'ghost' | 'navy' | 'white' | 'inverse'
type Size = 'sm' | 'md' | 'lg'

type SharedProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  /** Show mail icon (handy for Subscribe CTAs). */
  showIcon?: boolean
}

type AsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    href?: undefined
  }

type AsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    href: string
  }

export type ReusableButtonProps = AsButton | AsLink

/** @deprecated Prefer ReusableButtonProps — kept for older imports. */
export type ButtonProps = ReusableButtonProps

const sizeClasses: Record<Size, string> = {
  sm: 'min-h-9 gap-1 px-2.5 text-[0.8125rem]',
  md: 'min-h-10 gap-1.5 px-3.5 text-sm',
  lg: 'min-h-11 gap-2 px-4 text-[0.9375rem]',
}

/**
 * Shared app button. Colors:
 * - `navy` / `inverse` → navy fill
 * - `white` → white fill
 * - `outline` → white/surface + border
 * - `primary` → brand blue
 * - `ghost` → transparent
 */
export function ReusableButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  showIcon = false,
  ...props
}: ReusableButtonProps) {
  const resolvedVariant = variant === 'inverse' ? 'navy' : variant

  const styles = cn(
    'ui-btn-shine inline-flex items-center justify-center rounded-md font-semibold no-underline',
    'transition-[box-shadow,opacity,background-color,color,border-color] duration-[var(--duration-normal)] ease-[var(--ease-standard)]',
    'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
    sizeClasses[size],
    resolvedVariant === 'primary' &&
      'bg-primary text-primary-foreground shadow-[var(--shadow-button)] hover:bg-primary/90 hover:shadow-[var(--shadow-button-hover)] active:shadow-[var(--shadow-button)]',
    resolvedVariant === 'outline' &&
      'border border-border bg-surface text-foreground shadow-[var(--shadow-button)] hover:border-primary/40 hover:bg-soft hover:shadow-[var(--shadow-button-hover)] active:shadow-[var(--shadow-button)]',
    resolvedVariant === 'ghost' &&
      'bg-transparent text-foreground shadow-none hover:bg-soft hover:shadow-[var(--shadow-button)] active:shadow-none',
    resolvedVariant === 'navy' &&
      'rounded-lg bg-inverse text-inverse-foreground shadow-[var(--shadow-button)] hover:bg-inverse/90 hover:shadow-[var(--shadow-button-hover)] active:shadow-[var(--shadow-button)]',
    resolvedVariant === 'white' &&
      'rounded-lg bg-white text-inverse shadow-[var(--shadow-button)] hover:bg-white/90 hover:shadow-[var(--shadow-button-hover)] active:shadow-[var(--shadow-button)]',
    className,
  )

  const content = (
    <span className="relative z-10 inline-flex items-center justify-center gap-[inherit]">
      {showIcon ? <Mail className="size-4 shrink-0" aria-hidden="true" /> : null}
      {children}
    </span>
  )

  if ('href' in props && props.href) {
    const { href, ...linkProps } = props
    return (
      <a href={href} className={styles} {...linkProps}>
        {content}
      </a>
    )
  }

  const buttonProps = props as AsButton
  return (
    <button type="button" className={styles} {...buttonProps}>
      {content}
    </button>
  )
}
