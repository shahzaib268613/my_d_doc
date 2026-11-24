import { useId, type InputHTMLAttributes } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
}

export function SearchInput({
  label = 'Search',
  className,
  id,
  ...props
}: Props) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={cn('relative w-full min-w-0 max-w-full sm:max-w-xs', className)}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        id={inputId}
        type="search"
        className="pl-9"
        placeholder={props.placeholder ?? 'Search…'}
        {...props}
      />
    </div>
  )
}
