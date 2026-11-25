import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type Variant = 'primary' | 'outline' | 'ghost' | 'inverse'
type Size = 'sm' | 'md' | 'lg'

type SharedProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    href?: undefined
  }

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

const sizeClasses: Record<Size, string> = {
  sm: 'min-h-9 gap-1 px-2.5 text-[0.8125rem]',
  md: 'min-h-10 gap-1.5 px-3.5 text-sm',
  lg: 'min-h-11 gap-2 px-4 text-[0.9375rem]',
}

/**
 * Shared button — on hover, shadow shifts left→right and a shine
 * animates left→right. The button itself does not move.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = cn(
    'ui-btn-shine inline-flex items-center justify-center rounded-md font-semibold no-underline',
    'transition-[box-shadow,opacity,background-color,color,border-color] duration-[var(--duration-normal)] ease-[var(--ease-standard)]',
    'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
    sizeClasses[size],
    variant === 'primary' &&
      'bg-primary text-primary-foreground shadow-[var(--shadow-button)] hover:bg-primary/90 hover:shadow-[var(--shadow-button-hover)] active:shadow-[var(--shadow-button)]',
    variant === 'outline' &&
      'border border-border bg-surface text-foreground shadow-[var(--shadow-button)] hover:border-primary/40 hover:bg-soft hover:shadow-[var(--shadow-button-hover)] active:shadow-[var(--shadow-button)]',
    variant === 'ghost' &&
      'bg-transparent text-foreground shadow-none hover:bg-soft hover:shadow-[var(--shadow-button)] active:shadow-none',
    variant === 'inverse' &&
      'bg-inverse text-inverse-foreground shadow-[var(--shadow-button)] hover:bg-inverse/90 hover:shadow-[var(--shadow-button-hover)] active:shadow-[var(--shadow-button)]',
    className,
  )

  const content = (
    <span className="relative z-10 inline-flex items-center justify-center gap-[inherit]">
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

  const buttonProps = props as ButtonAsButton
  return (
    <button type="button" className={styles} {...buttonProps}>
      {content}
    </button>
  )
}
