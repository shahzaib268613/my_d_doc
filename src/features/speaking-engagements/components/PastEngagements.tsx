import { Container, Reveal, Section } from '@/shared/components/ui'
import { pastEngagements } from '../constants/content'

/**
 * Past speaking engagements gallery.
 * TODO: Replace with client-provided event photos, venues, and dates.
 */
export function PastEngagements() {
  if (pastEngagements.length === 0) return null

  return (
    <Section className="bg-surface">
      <Container>
        <Reveal>
          <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Gallery
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Past Engagements
            </h2>
          </header>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {pastEngagements.map((item, index) => (
            <li key={`${item.eventName}-${item.date}`} className="min-w-0">
              <Reveal delayMs={(index % 3) * 60}>
                <article className="overflow-hidden rounded-2xl border border-border/90 bg-background shadow-sm">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="aspect-[16/10] w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div
                      className="flex aspect-[16/10] items-center justify-center bg-soft text-sm font-semibold text-muted-foreground"
                      aria-hidden="true"
                    >
                      Event photo
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {item.eventName}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.venue}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
