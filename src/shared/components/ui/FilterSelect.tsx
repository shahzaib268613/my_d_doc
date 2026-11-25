import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export type FilterSelectOption = {
  value: string
  label: string
}

type Props = {
  label: string
  value: string
  options: FilterSelectOption[]
  onChange: (value: string) => void
  className?: string
  id?: string
  disabled?: boolean
  placeholder?: string
  /** Alias for accessibility when the visible label is hidden. */
  ariaLabel?: string
  /** Visually hide the label (still available to screen readers). */
  hideLabel?: boolean
  /**
   * `filled` — soft surface (marketing toolbars).
   * `outlined` — bordered trigger (admin toolbars/forms). Default for shared look.
   */
  variant?: 'filled' | 'outlined'
  size?: 'md' | 'sm'
  /** Stretch trigger to full container width (forms). */
  fullWidth?: boolean
  /** Optional error text shown under the control. */
  error?: string
}

type MenuPosition = {
  top: number
  left: number
  width: number
  openUp: boolean
}

/**
 * Shared custom dropdown (listbox) used by the public site and admin.
 * Portaled panel avoids clipping inside overflow containers and modals.
 */
export function FilterSelect({
  label,
  value,
  options,
  onChange,
  className,
  id,
  disabled = false,
  placeholder,
  ariaLabel,
  hideLabel = false,
  variant = 'outlined',
  size = 'md',
  fullWidth = false,
  error,
}: Props) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  const [menuPos, setMenuPos] = useState<MenuPosition | null>(null)
  const [typeBuffer, setTypeBuffer] = useState('')
  const typeTimerRef = useRef<number | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const generatedId = useId()
  const selectId = id ?? generatedId
  const listId = `${selectId}-listbox`
  const errorId = error ? `${selectId}-error` : undefined
  const selected = options.find((option) => option.value === value)
  const accessibleName = ariaLabel ?? label
  const isOpen = open && !disabled

  function measureMenuPosition(): MenuPosition | null {
    const button = buttonRef.current
    if (!button) return null
    const rect = button.getBoundingClientRect()
    const menuHeight = Math.min(240, options.length * 44 + 16)
    const spaceBelow = window.innerHeight - rect.bottom
    const openUp = spaceBelow < menuHeight + 12 && rect.top > spaceBelow
    return {
      top: openUp ? rect.top - 6 : rect.bottom + 6,
      left: rect.left,
      width: rect.width,
      openUp,
    }
  }

  function openMenu() {
    if (disabled) return
    const selectedIndex = Math.max(
      0,
      options.findIndex((option) => option.value === value),
    )
    setHighlight(selectedIndex)
    setMenuPos(measureMenuPosition())
    setOpen(true)
  }

  function closeMenu(focusTrigger = false) {
    setOpen(false)
    if (focusTrigger) buttonRef.current?.focus()
  }

  useLayoutEffect(() => {
    if (!isOpen) return

    function onReposition() {
      setMenuPos(measureMenuPosition())
    }

    onReposition()
    window.addEventListener('resize', onReposition)
    window.addEventListener('scroll', onReposition, true)
    return () => {
      window.removeEventListener('resize', onReposition)
      window.removeEventListener('scroll', onReposition, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- measure while open
  }, [isOpen, options.length])

  useEffect(() => {
    if (!isOpen) return

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node
      if (rootRef.current?.contains(target)) return
      if (menuRef.current?.contains(target)) return
      closeMenu()
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu(true)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (typeTimerRef.current) window.clearTimeout(typeTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isOpen || highlight < 0) return
    const optionEl = menuRef.current?.querySelector<HTMLElement>(
      `[data-option-index="${highlight}"]`,
    )
    optionEl?.scrollIntoView({ block: 'nearest' })
  }, [highlight, isOpen])

  function selectValue(next: string) {
    onChange(next)
    closeMenu(true)
  }

  function moveHighlight(delta: number) {
    if (options.length === 0) return
    setHighlight((current) => {
      const base = current < 0 ? (delta > 0 ? -1 : 0) : current
      return (base + delta + options.length) % options.length
    })
  }

  function handleTypeahead(character: string) {
    const nextBuffer = `${typeBuffer}${character.toLowerCase()}`
    setTypeBuffer(nextBuffer)
    if (typeTimerRef.current) window.clearTimeout(typeTimerRef.current)
    typeTimerRef.current = window.setTimeout(() => setTypeBuffer(''), 500)

    const matchIndex = options.findIndex((option) =>
      option.label.toLowerCase().startsWith(nextBuffer),
    )
    if (matchIndex >= 0) {
      setHighlight(matchIndex)
      if (!isOpen) selectValue(options[matchIndex]!.value)
    }
  }

  function onTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (disabled) return

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!isOpen) openMenu()
        else moveHighlight(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        if (!isOpen) openMenu()
        else moveHighlight(-1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (!isOpen) openMenu()
        else if (highlight >= 0 && options[highlight]) {
          selectValue(options[highlight]!.value)
        }
        break
      case 'Home':
        if (isOpen) {
          event.preventDefault()
          setHighlight(0)
        }
        break
      case 'End':
        if (isOpen) {
          event.preventDefault()
          setHighlight(options.length - 1)
        }
        break
      case 'Escape':
        if (isOpen) {
          event.preventDefault()
          closeMenu()
        }
        break
      default:
        if (event.key.length === 1 && /\S/.test(event.key)) {
          event.preventDefault()
          if (!isOpen) openMenu()
          handleTypeahead(event.key)
        }
    }
  }

  const menu =
    isOpen && menuPos
      ? createPortal(
          <ul
            ref={menuRef}
            id={listId}
            role="listbox"
            aria-label={accessibleName}
            style={{
              position: 'fixed',
              top: menuPos.openUp ? undefined : menuPos.top,
              bottom: menuPos.openUp
                ? window.innerHeight - menuPos.top
                : undefined,
              left: menuPos.left,
              width: Math.max(menuPos.width, 168),
              zIndex: 80,
            }}
            className="max-h-60 overflow-auto rounded-lg border border-border bg-surface py-1 shadow-lg"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value
              const isHighlighted = index === highlight
              return (
                <li key={option.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    data-option-index={index}
                    className={cn(
                      'flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-sm transition-colors',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring',
                      isSelected
                        ? 'bg-soft font-semibold text-foreground'
                        : 'font-medium text-muted-foreground hover:bg-soft hover:text-foreground',
                      isHighlighted && !isSelected && 'bg-soft/80 text-foreground',
                    )}
                    onMouseEnter={() => setHighlight(index)}
                    onClick={() => selectValue(option.value)}
                  >
                    <span className="min-w-0 truncate">{option.label}</span>
                    {isSelected ? (
                      <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    ) : null}
                  </button>
                </li>
              )
            })}
          </ul>,
          document.body,
        )
      : null

  return (
    <div
      ref={rootRef}
      className={cn(fullWidth ? 'relative w-full' : 'relative min-w-0', className)}
    >
      <label
        htmlFor={selectId}
        className={cn(
          'mb-1.5 block text-sm font-medium text-foreground',
          hideLabel && 'sr-only',
        )}
      >
        {label}
      </label>
      <button
        ref={buttonRef}
        id={selectId}
        type="button"
        disabled={disabled}
        aria-label={hideLabel ? accessibleName : undefined}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        aria-disabled={disabled || undefined}
        onClick={() => {
          if (isOpen) closeMenu()
          else openMenu()
        }}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          'flex w-full items-center justify-between gap-2 text-left text-sm font-medium text-foreground',
          'outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          size === 'md' && 'min-h-10',
          size === 'sm' && 'min-h-8 text-xs',
          variant === 'filled' && 'rounded-md border-0 bg-soft px-3 py-2 pr-2.5',
          variant === 'outlined' &&
            'rounded-lg border border-border bg-surface py-2 pl-3.5 pr-2.5 shadow-sm',
          isOpen && variant === 'outlined' && 'border-primary/40',
          error && 'border-danger',
        )}
      >
        <span className="min-w-0 truncate">
          {selected?.label ?? placeholder ?? 'Select'}
        </span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-fast)]',
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
      {menu}
    </div>
  )
}
