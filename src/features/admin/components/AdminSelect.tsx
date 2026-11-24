import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export type AdminSelectOption = {
  value: string
  label: string
}

type Props = {
  value: string
  options: AdminSelectOption[]
  onChange: (value: string) => void
  'aria-label'?: string
  id?: string
  disabled?: boolean
  className?: string
  placeholder?: string
  /** Stretch trigger to full container width (forms). */
  fullWidth?: boolean
}

type MenuPosition = {
  top: number
  left: number
  width: number
  openUp: boolean
}

/** Styled select with a portaled dropdown (works inside overflow/modals). */
export function AdminSelect({
  value,
  options,
  onChange,
  className,
  placeholder,
  id,
  disabled = false,
  fullWidth = false,
  'aria-label': ariaLabel,
}: Props) {
  const [open, setOpen] = useState(false)
  const [menuPos, setMenuPos] = useState<MenuPosition | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const listId = useId()
  const selected = options.find((option) => option.value === value)

  function updateMenuPosition() {
    const button = buttonRef.current
    if (!button) return
    const rect = button.getBoundingClientRect()
    const menuHeight = Math.min(240, options.length * 44 + 16)
    const spaceBelow = window.innerHeight - rect.bottom
    const openUp = spaceBelow < menuHeight + 12 && rect.top > spaceBelow
    setMenuPos({
      top: openUp ? rect.top - 6 : rect.bottom + 6,
      left: rect.left,
      width: rect.width,
      openUp,
    })
  }

  useLayoutEffect(() => {
    if (!open) {
      setMenuPos(null)
      return
    }
    updateMenuPosition()
    function onReposition() {
      updateMenuPosition()
    }
    window.addEventListener('resize', onReposition)
    window.addEventListener('scroll', onReposition, true)
    return () => {
      window.removeEventListener('resize', onReposition)
      window.removeEventListener('scroll', onReposition, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- measure on open / options length
  }, [open, options.length])

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node
      if (rootRef.current?.contains(target)) return
      if (menuRef.current?.contains(target)) return
      setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (disabled) setOpen(false)
  }, [disabled])

  const menu =
    open && menuPos
      ? createPortal(
          <ul
            ref={menuRef}
            id={listId}
            role="listbox"
            aria-label={ariaLabel}
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
            className="max-h-60 overflow-auto rounded-lg border border-[#DCE8F7] bg-white py-1 shadow-[0_10px_28px_rgba(2,27,68,0.14)]"
          >
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <li key={option.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    className={cn(
                      'flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-sm transition-colors',
                      isSelected
                        ? 'bg-[#EAF3FF] font-semibold text-[#021b44]'
                        : 'font-medium text-[#5B6B82] hover:bg-[#F4F8FF] hover:text-[#021b44]',
                    )}
                    onClick={() => {
                      onChange(option.value)
                      setOpen(false)
                    }}
                  >
                    <span className="min-w-0 truncate">{option.label}</span>
                    {isSelected ? (
                      <Check className="size-4 shrink-0 text-[#2f7fb0]" aria-hidden="true" />
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
      className={cn(fullWidth ? 'relative w-full' : 'relative min-w-[10.5rem]', className)}
    >
      <button
        ref={buttonRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          'flex min-h-10 w-full items-center justify-between gap-2 rounded-lg border border-[#DCE8F7] bg-white py-2 pl-3.5 pr-2.5 text-left text-sm font-medium text-[#10264A] shadow-sm outline-none ring-0 transition-colors',
          'hover:border-[#DCE8F7] focus-visible:border-[#DCE8F7] focus-visible:outline-none focus-visible:ring-0',
          open && 'border-[#DCE8F7]',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        <span className="min-w-0 truncate">
          {selected?.label ?? placeholder ?? 'Select'}
        </span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-[#71839F] transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>
      {menu}
    </div>
  )
}
