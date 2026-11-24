import { useId } from 'react'
import { cn } from '@/shared/utils/cn'
import { AdminSelect, type AdminSelectOption } from './AdminSelect'

export type FilterOption = AdminSelectOption

type Props = {
  label: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  hideLabel?: boolean
  className?: string
  id?: string
  disabled?: boolean
}

/** Labeled wrapper around AdminSelect for filters and forms. */
export function FilterDropdown({
  label,
  options,
  value,
  onChange,
  hideLabel = false,
  className,
  id,
  disabled,
}: Props) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div className={cn('w-full min-w-0 sm:w-auto sm:min-w-[10rem]', className)}>
      <label
        htmlFor={selectId}
        className={cn(
          'mb-1 block text-sm font-semibold text-foreground',
          hideLabel && 'sr-only',
        )}
      >
        {label}
      </label>
      <AdminSelect
        id={selectId}
        value={value}
        options={options}
        onChange={onChange}
        aria-label={label}
        disabled={disabled}
        fullWidth
      />
    </div>
  )
}
