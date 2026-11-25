import { Container, Reveal, Section } from '@/shared/components/ui'
import { aboutDoctor } from '../constants/content'

export function MeetYourDoctor() {
  return (
    <Section className="bg-surface">
      <Container>
        <Reveal>
          <div className="grid items-start gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12">
            <figure className="shrink-0">
              {aboutDoctor.photoUrl ? (
                <img
                  src={aboutDoctor.photoUrl}
                  alt={aboutDoctor.photoAlt}
                  className="size-28 rounded-2xl object-cover shadow-sm ring-1 ring-border sm:size-32"
                  width={128}
                  height={128}
                />
              ) : (
                // Compact fallback until the client supplies a portrait photo.
                <div
                  className="flex size-28 items-center justify-center rounded-2xl bg-soft font-display text-2xl font-bold tracking-wide text-primary ring-1 ring-primary/15 sm:size-32 sm:text-3xl"
                  role="img"
                  aria-label={aboutDoctor.photoAlt}
                >
                  {aboutDoctor.initials}
                </div>
              )}
            </figure>

            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {aboutDoctor.name}
              </h2>
              <p className="mt-2 text-base font-medium text-foreground/80 sm:text-lg">
                {aboutDoctor.role}
              </p>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                {aboutDoctor.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
