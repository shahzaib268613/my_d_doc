import {
  BookOpen,
  ClipboardPlus,
  PlayCircle,
  Users,
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { highlights } from '../../../constants/highlights'

const icons = {
  book: ClipboardPlus,
  users: Users,
  share: PlayCircle,
  compass: BookOpen,
} as const

function HighlightItem({
  title,
  description,
  icon,
  decorative = false,
}: (typeof highlights)[number] & { decorative?: boolean }) {
  const Icon = icons[icon]
  return (
    <li
      className="flex w-[min(22rem,80vw)] shrink-0 items-start gap-3.5 px-5 py-3.5 sm:w-[24rem] sm:px-6"
      aria-hidden={decorative || undefined}
    >
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#021b44] ring-1 ring-[#021b44]/12">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-snug text-[#021b44] sm:text-[0.9375rem]">
          {title}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[#5B6B82]">{description}</p>
      </div>
    </li>
  )
}

/** Infinite horizontal marquee of hero trust highlights (v4). */
export function HighlightsMarquee() {
  const track = [...highlights, ...highlights]

  return (
    <div
      className="relative z-10 overflow-hidden border-t border-inverse/10 bg-[#F4F8FF]/95 shadow-sm backdrop-blur-sm"
      role="region"
      aria-label="Brand highlights"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#F4F8FF] to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#F4F8FF] to-transparent sm:w-16" />

      <ul
        className={cn(
          'highlights-marquee flex w-max items-stretch',
          'motion-reduce:animate-none motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center',
        )}
      >
        {track.map((item, index) => (
          <HighlightItem
            key={`${item.title}-${index}`}
            {...item}
            decorative={index >= highlights.length}
          />
        ))}
      </ul>
    </div>
  )
}
