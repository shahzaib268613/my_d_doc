import { cn } from '@/shared/utils/cn'

export type NewsletterTabId = 'subscribers' | 'logs'

type Tab = {
  id: NewsletterTabId
  label: string
}

type Props = {
  value: NewsletterTabId
  onChange: (value: NewsletterTabId) => void
  tabs?: Tab[]
  className?: string
}

const DEFAULT_TABS: Tab[] = [
  { id: 'subscribers', label: 'Subscribers' },
  { id: 'logs', label: 'Sent Logs' },
]

export function NewsletterTabs({
  value,
  onChange,
  tabs = DEFAULT_TABS,
  className,
}: Props) {
  return (
    <div
      role="tablist"
      aria-label="Newsletter sections"
      className={cn(
        'inline-flex w-full max-w-md rounded-[0.75rem] border border-border/80 bg-soft/60 p-1 sm:w-auto',
        className,
      )}
    >
      {tabs.map((tab) => {
        const active = value === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              'min-h-9 flex-1 rounded-[0.625rem] px-3.5 text-[0.8125rem] font-semibold transition-colors duration-[var(--duration-fast)] sm:flex-none sm:min-w-[8.5rem]',
              active
                ? 'bg-surface text-foreground shadow-sm ring-1 ring-border/70'
                : 'text-muted-foreground hover:bg-surface/60 hover:text-foreground',
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
