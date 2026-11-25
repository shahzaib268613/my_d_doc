import { useId, type ChangeEvent } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { IconButton } from './IconButton'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  ariaLabel?: string
  className?: string
  id?: string
  disabled?: boolean
  /**
   * `filled` — soft marketing style (public Blog).
   * `outlined` — bordered admin style.
   */
  variant?: 'filled' | 'outlined'
}

/** Shared search field with left icon and clear control. */
export function SearchInput({
  value,
  onChange,
  placeholder = 'Search articles',
  ariaLabel = 'Search articles',
  className,
  id,
  disabled = false,
  variant = 'filled',
}: Props) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value)
  }

  return (
    <div className={cn('relative w-full min-w-0', className)}>
      <label htmlFor={inputId} className="sr-only">
        {ariaLabel}
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id={inputId}
        type="search"
        value={value}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'min-h-10 w-full px-10 text-sm text-foreground',
          'placeholder:text-muted-foreground outline-none ring-0',
          'disabled:cursor-not-allowed disabled:opacity-60',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          '[&::-webkit-search-cancel-button]:appearance-none',
          variant === 'filled' &&
            'rounded-md border-0 bg-soft focus-visible:bg-surface',
          variant === 'outlined' &&
            'rounded-lg border border-border bg-surface shadow-sm',
        )}
      />
      {value && !disabled ? (
        <IconButton
          type="button"
          label="Clear search"
          className="absolute right-1.5 top-1/2 size-9 -translate-y-1/2 text-muted-foreground hover:bg-soft hover:text-foreground"
          onClick={() => onChange('')}
        >
          <X className="size-4" aria-hidden="true" />
        </IconButton>
      ) : null}
    </div>
  )
}
