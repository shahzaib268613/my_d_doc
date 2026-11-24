import type { ReactNode } from 'react'
import { Label } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'

type Props = {
  id: string
  label: string
  children: ReactNode
  hint?: string
  error?: string
  className?: string
  required?: boolean
}

export function FormField({
  id,
  label,
  children,
  hint,
  error,
  className,
  required,
}: Props) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={cn('min-w-0 space-y-1.5', className)}>
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </Label>
      {children}
      {hint && !error ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
