import {
  BookOpen,
  ClipboardPlus,
  PlayCircle,
  Users,
} from 'lucide-react'
import { Container } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import { highlights } from '../../../constants/highlights'

const icons = {
  book: ClipboardPlus,
  users: Users,
  share: PlayCircle,
  compass: BookOpen,
} as const

/** Static trust strip under the hero (v1 / default). */
export function Highlights() {
  return (
    <div className="relative z-10 border-t border-inverse/10 bg-white/95 shadow-sm backdrop-blur-sm">
      <Container>
        <ul className="grid grid-cols-1 divide-y divide-soft sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = icons[item.icon]
            return (
              <li
                key={item.title}
                className={cn(
                  'flex items-start gap-3.5 px-1 py-3 sm:px-4 sm:py-3.5',
                  index > 0 && 'lg:border-l lg:border-soft',
                )}
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-soft text-inverse ring-1 ring-inverse/15">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug text-inverse sm:text-[0.9375rem]">
                    {item.title}
                  </p>
                  <p className="mt-1 hidden text-xs leading-relaxed text-inverse/65 sm:block">
                    {item.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </div>
  )
}
