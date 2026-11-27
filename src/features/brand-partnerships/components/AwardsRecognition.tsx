import { cn } from '@/shared/utils/cn'
import { awards } from '../constants/content'

function awardAlt(title: string, caption?: string, year?: string) {
  return [title, caption, year].filter(Boolean).join(' — ')
}

/** Horizontal awards marquee — sits below the hero, above the rating strip. */
export function AwardsRecognition() {
  if (awards.length === 0) return null

  const track = [...awards, ...awards]

  return (
    <div
      className="relative mt-auto shrink-0 overflow-hidden bg-white"
      role="region"
      aria-label="Awards and recognition"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-14"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-14"
        aria-hidden="true"
      />

      <ul
        className={cn(
          'highlights-marquee flex w-max items-center gap-8 py-4 sm:gap-10 sm:py-5',
          'motion-reduce:animate-none motion-reduce:h-auto motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center',
        )}
      >
        {track.map((award, index) => (
          <li
            key={`${award.title}-${index}`}
            className="flex h-16 w-[8.5rem] shrink-0 items-center justify-center sm:h-20 sm:w-40"
            aria-hidden={index >= awards.length || undefined}
          >
            <img
              src={award.image}
              alt={index >= awards.length ? '' : awardAlt(award.title, award.caption, award.year)}
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
